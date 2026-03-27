import { useState, useEffect } from 'react';
import MarketGrid from './components/MarketGrid';
import EconomicCalendar from './components/EconomicCalendar';
import TradingViewWidget from './components/TradingViewWidget';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

export default function App() {
  const [markets, setMarkets] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [m, c] = await Promise.all([
        fetch(`${API_BASE}/markets`).then((r) => r.json()),
        fetch(`${API_BASE}/calendar`).then((r) => r.json()),
      ]);
      setMarkets(m);
      setCalendar(c);
      setLastUpdated(new Date());
    } catch (e) {
      console.error('データ取得エラー:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-blue-100">モーニングダッシュボード</h1>
            {lastUpdated && (
              <p className="text-sm text-blue-400 mt-1">
                最終更新：{lastUpdated.toLocaleString('ja-JP')}
              </p>
            )}
          </div>
          <button
            onClick={fetchAll}
            disabled={loading}
            className="px-4 py-2 text-sm border border-blue-700 text-blue-300 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? '取得中...' : '更新'}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-24 text-blue-400">データ取得中...</div>
        ) : (
          <div className="space-y-8">
            <MarketGrid data={markets} />
            <TradingViewWidget />
            <EconomicCalendar events={calendar} />
          </div>
        )}
      </div>
    </div>
  );
}
