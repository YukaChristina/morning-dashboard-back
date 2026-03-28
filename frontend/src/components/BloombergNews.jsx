function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function BloombergNews({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-blue-100 mb-3">Bloomberg ニュース</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-sm">
        <ul className="space-y-3">
          {data.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-xs text-slate-500 whitespace-nowrap mt-0.5 w-20 shrink-0">
                {formatDate(item.pubDate)}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-200 hover:text-blue-400 hover:underline leading-snug"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
