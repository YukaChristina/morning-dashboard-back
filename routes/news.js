import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

const RSS_URL = 'https://news.yahoo.co.jp/rss/topics/business.xml';

const MARKET_KEYWORDS = [
  '株', '日経', 'ダウ', 'ナスダック', 'S&P', '相場', '為替', '円', 'ドル', 'ユーロ',
  '金利', '国債', '利上げ', '利下げ', 'FRB', '日銀', '金融政策', '長期金利',
  '原油', '金価格', 'コモディティ', 'VIX', '先物', '市場', '上昇', '下落', '急落', '急騰',
  '指数', 'インフレ', 'CPI', 'GDP', '景気',
];

function isMarketNews(title) {
  return MARKET_KEYWORDS.some((kw) => title.includes(kw));
}

router.get('/', async (_req, res) => {
  try {
    const feed = await parser.parseURL(RSS_URL);
    const items = feed.items
      .filter((item) => isMarketNews(item.title))
      .slice(0, 5)
      .map((item) => ({
        title: item.title,
        pubDate: item.pubDate || item.isoDate,
        link: item.link,
      }));

    res.json({
      items,
      summary: null,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('News error:', err);
    res.status(500).json({ error: 'ニュースデータの取得に失敗しました' });
  }
});

export default router;
