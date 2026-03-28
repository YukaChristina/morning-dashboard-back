import express from 'express';
import Parser from 'rss-parser';
import axios from 'axios';

const router = express.Router();
const parser = new Parser();

// Bloomberg Japan の RSS フィード（直接）
const RSS_URLS = [
  'https://www.bloomberg.co.jp/feeds/bbiz',
  'https://www.bloomberg.co.jp/feeds/bpol',
];

router.get('/', async (_req, res) => {
  try {
    const results = await Promise.allSettled(
      RSS_URLS.map(async (url) => {
        const { data: xml } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          },
          timeout: 10000,
        });
        const feed = await parser.parseString(xml);
        return feed.items;
      })
    );

    const allItems = results
      .filter((r) => r.status === 'fulfilled')
      .flatMap((r) => r.value);

    const items = allItems
      .sort((a, b) => new Date(b.pubDate || b.isoDate) - new Date(a.pubDate || a.isoDate))
      .slice(0, 8)
      .map((item) => ({
        title: item.title?.trim(),
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
      }));

    if (items.length === 0) {
      return res.status(500).json({ error: 'ニュースが取得できませんでした' });
    }

    res.json(items);
  } catch (err) {
    console.error('Bloomberg error:', err.message);
    res.status(500).json({ error: 'ニュースの取得に失敗しました', detail: err.message });
  }
});

export default router;
