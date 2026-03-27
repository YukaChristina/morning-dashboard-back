import { useEffect, useRef } from 'react';

export default function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    // すでにスクリプトが追加されていれば再追加しない
    if (container.current.querySelector('script')) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'TVC:NI225',
      interval: 'D',
      timezone: 'Asia/Tokyo',
      theme: 'light',
      style: '1',
      locale: 'ja',
      allow_symbol_change: true,
    });
    container.current.appendChild(script);
  }, []);

  return (
    <section>
      <h2 className="text-lg font-semibold text-blue-100 mb-3">チャート</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        <div
          ref={container}
          className="tradingview-widget-container"
          style={{ height: '1350px', width: '100%' }}
        >
          <div
            className="tradingview-widget-container__widget"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}
