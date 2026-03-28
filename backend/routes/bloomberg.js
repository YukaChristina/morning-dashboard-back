import express from 'express';
import Parser from 'rss-parser';
import axios from 'axios';

const router = express.Router();
const parser = new Parser();

const RSS_URL = 'https://news.google.com/rss/search?q=%E3%80%90%E7%B1%B3%E5%9B%BD%E5%B8%82%E6%B3%81%E3%80%91+Bloomberg&hl=ja&gl=JP&ceid=JP:ja';

router.get('/', async (_req, res) => {
  try {
    const { data: xml } = await axios.get(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'ja,en;q=0.9',
      },
      timeout: 10000,
    });
    const feed = await parser.parseString(xml);
    const items = feed.items
      .filter((item) => item.title?.includes('【米国市況】'))
      .slice(0, 5)
      .map((item) => ({
        title: item.title?.replace(' - Bloomberg', '').trim(),
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
      }));
    res.json(items);
  } catch (err) {
    console.error('Bloomberg error:', err.message);
    res.status(500).json({ error: 'ニュースの取得に失敗しました', detail: err.message });
  }
});

export default router;
