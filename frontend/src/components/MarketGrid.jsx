function formatPrice(price, symbol) {
  if (price === null || price === undefined) return '---';
  // 利回り・VIX・為替は小数点2桁、株価指数は整数または1桁
  if (['vix', 'tnx', 'usdjpy'].includes(symbol)) {
    return price.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (['gold', 'oil'].includes(symbol)) {
    return price.toLocaleString('ja-JP', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return price.toLocaleString('ja-JP', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatChange(change, changePercent) {
  if (change === null || change === undefined) return null;
  const sign = change >= 0 ? '+' : '';
  const pct = changePercent !== null
    ? ` (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`
    : '';
  return `${sign}${change.toFixed(2)}${pct}`;
}

function MarketCard({ item }) {
  const isPositive = item.change > 0;
  const isNegative = item.change < 0;
  const changeColor = isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-slate-400';
  const changeText = formatChange(item.change, item.changePercent);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-sm">
      <p className="text-xs text-blue-400 mb-1">{item.label}</p>
      <p className="text-xl font-semibold text-blue-100">
        {formatPrice(item.price, item.id)}
      </p>
      {changeText && (
        <p className={`text-sm mt-1 ${changeColor}`}>{changeText}</p>
      )}
    </div>
  );
}

export default function MarketGrid({ data }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-blue-100 mb-3">マーケット概況</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <MarketCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
