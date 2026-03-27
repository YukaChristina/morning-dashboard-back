function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NewsSummary({ data }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-blue-100 mb-3">市況ニュース</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* ニュース一覧 */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shadow-sm">
          <h3 className="text-sm font-medium text-blue-400 mb-3">最新ヘッドライン</h3>
          <ul className="space-y-3">
            {data.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-xs text-slate-500 whitespace-nowrap mt-0.5">
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
          {data.updatedAt && (
            <p className="text-xs text-slate-500 mt-4">
              更新：{new Date(data.updatedAt).toLocaleString('ja-JP')}
            </p>
          )}
        </div>

        {data.summary && (
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-blue-700 mb-3">AI市況サマリー</h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{data.summary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
