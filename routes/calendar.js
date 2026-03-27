import express from 'express';

const router = express.Router();

const CALENDAR = [
  {
    date: '2026-04-02',
    name: 'ADP雇用統計',
    impact: 'high',
    previous: '15.5万人',
    forecast: '13.0万人',
    actual: null,
  },
  {
    date: '2026-04-04',
    name: '雇用統計（NFP）',
    impact: 'high',
    previous: '15.1万人',
    forecast: '13.5万人',
    actual: null,
  },
  {
    date: '2026-04-10',
    name: 'CPI（消費者物価指数）',
    impact: 'high',
    previous: '前月比+0.2%',
    forecast: '前月比+0.3%',
    actual: null,
  },
  {
    date: '2026-04-16',
    name: '小売売上高',
    impact: 'high',
    previous: '前月比+0.6%',
    forecast: '前月比+0.1%',
    actual: null,
  },
  {
    date: '2026-04-30',
    name: 'GDP（速報値）',
    impact: 'high',
    previous: '前期比年率+2.3%',
    forecast: '前期比年率+0.4%',
    actual: null,
  },
  {
    date: '2026-05-01',
    name: 'ISM製造業景況指数',
    impact: 'high',
    previous: '50.3',
    forecast: '49.5',
    actual: null,
  },
  {
    date: '2026-05-05',
    name: 'ISM非製造業景況指数',
    impact: 'high',
    previous: '53.5',
    forecast: '52.5',
    actual: null,
  },
  {
    date: '2026-05-07',
    name: 'FOMC（政策金利）',
    impact: 'high',
    previous: '4.25〜4.50%',
    forecast: '4.25〜4.50%（据え置き予想）',
    actual: null,
  },
];

router.get('/', (_req, res) => {
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);

  // 今日から30日以内のイベントに絞り込み（過去も含めてソート）
  const filtered = CALENDAR.filter((event) => {
    const d = new Date(event.date);
    return d >= new Date(today.toDateString());
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json(filtered);
});

export default router;
