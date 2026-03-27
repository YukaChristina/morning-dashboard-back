import express from 'express';
import axios from 'axios';

const router = express.Router();

const SYMBOLS = [
  { id: 'nikkei',   label: '日経平均',         symbol: '^N225' },
  { id: 'dow',      label: 'NYダウ',           symbol: '^DJI' },
  { id: 'nasdaq',   label: 'ナスダック',        symbol: '^IXIC' },
  { id: 'sp500',    label: 'S&P500',           symbol: '^GSPC' },
  { id: 'vix',      label: 'VIX',              symbol: '^VIX' },
  { id: 'usdjpy',   label: 'ドル円',            symbol: 'USDJPY=X' },
  { id: 'gold',     label: 'ゴールド',          symbol: 'GC=F' },
  { id: 'oil',      label: '原油（WTI）',       symbol: 'CL=F' },
  { id: 'tnx',      label: '米10年国債利回り',  symbol: '^TNX' },
];

async function fetchQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`;
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    timeout: 8000,
  });
  const meta = data.chart.result[0].meta;
  const price = meta.regularMarketPrice;
  const prev  = meta.chartPreviousClose;
  const change = price - prev;
  const changePercent = (change / prev) * 100;
  return { price, change, changePercent };
}

router.get('/', async (_req, res) => {
  try {
    const results = await Promise.allSettled(
      SYMBOLS.map(async (s) => {
        const quote = await fetchQuote(s.symbol);
        return { ...s, ...quote };
      })
    );

    const markets = results.map((r, i) => {
      if (r.status === 'fulfilled') return r.value;
      console.error(`Failed to fetch ${SYMBOLS[i].symbol}:`, r.reason?.message);
      return { ...SYMBOLS[i], price: null, change: null, changePercent: null };
    });

    res.json(markets);
  } catch (err) {
    console.error('Markets error:', err);
    res.status(500).json({ error: 'マーケットデータの取得に失敗しました' });
  }
});

export default router;
