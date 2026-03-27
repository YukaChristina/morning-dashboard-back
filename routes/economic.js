import express from 'express';

const router = express.Router();

const SERIES = [
  {
    id: 'PAYEMS',
    name: '雇用統計（NFP）',
    format: (v) => `${Number(v).toLocaleString()}千人`,
  },
  {
    id: 'ADPWNUSNERSA',
    name: 'ADP雇用統計',
    format: (v) => `${Math.round(Number(v) / 1000).toLocaleString()}千人`,
  },
  {
    id: 'CPIAUCSL',
    name: 'CPI（消費者物価指数）',
    format: (v) => Number(v).toFixed(2),
  },
  {
    id: 'RSAFS',
    name: '小売売上高',
    format: (v) => `$${Number(v).toLocaleString()}M`,
  },
  {
    id: 'A191RL1Q225SBEA',
    name: 'GDP成長率',
    format: (v) => `${Number(v).toFixed(1)}%`,
  },
  {
    id: 'DFEDTARU',
    name: 'FOMC（政策金利上限）',
    format: (v) => `${Number(v).toFixed(2)}%`,
  },
];

async function fetchSeries(id, key) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${key}&file_type=json&sort_order=desc&limit=2`;
  const res = await fetch(url);
  const data = await res.json();
  return data.observations || [];
}

router.get('/', async (_req, res) => {
  try {
    const key = process.env.FRED_API_KEY;
    const results = await Promise.all(
      SERIES.map(async (s) => {
        const obs = await fetchSeries(s.id, key);
        const latest = obs[0];
        const prev = obs[1];
        return {
          name: s.name,
          date: latest?.date || '',
          actual: latest?.value && latest.value !== '.' ? s.format(latest.value) : null,
          previous: prev?.value && prev.value !== '.' ? s.format(prev.value) : null,
        };
      })
    );
    res.json(results);
  } catch (err) {
    console.error('Economic error:', err);
    res.status(500).json({ error: '経済指標の取得に失敗しました' });
  }
});

export default router;
