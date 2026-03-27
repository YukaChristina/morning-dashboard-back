import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

const RSS_URL = 'https://news.google.com/rss/search?q=Bloomberg+%E7%B1%B3%E5%9B%BD%E5%B8%82%E6%B3%81&hl=ja&gl=JP&ceid=JP:ja';

router.get('/', async (_req, res) => {
  try {
    const feed = await parser.parseURL(RSS_URL);
    const items = feed.items.slice(0, 5).map((item) => ({
      title: item.title?.replace(' - Bloomberg', '').trim(),
      link: item.link,
      pubDate: item.pubDate || item.isoDate,
    }));
    res.json(items);
  } catch (err) {
    console.error('Bloomberg error:', err);
    res.status(500).json({ error: 'ニュースの取得に失敗しました' });
  }
});

export default router;
