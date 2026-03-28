import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const key = process.env.NEWS_API_KEY;
    const { data } = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'Bloomberg',
        language: 'ja',
        sortBy: 'publishedAt',
        pageSize: 8,
        apiKey: key,
      },
      timeout: 10000,
    });

    console.log('NewsAPI response:', JSON.stringify(data).slice(0, 500));
    const items = (data.articles || []).map((a) => ({
      title: a.title?.replace(' - Bloomberg', '').trim(),
      link: a.url,
      pubDate: a.publishedAt,
    }));

    res.json(items);
  } catch (err) {
    console.error('Bloomberg error:', err.message);
    res.status(500).json({ error: 'ニュースの取得に失敗しました', detail: err.message });
  }
});

export default router;
