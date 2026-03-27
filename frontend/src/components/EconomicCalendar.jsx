const IMPACT_STYLES = {
  high: 'bg-red-100 text-red-700',
  mid:  'bg-yellow-100 text-yellow-700',
  low:  'bg-gray-100 text-gray-500',
};

const IMPACT_LABELS = {
  high: '高',
  mid:  '中',
  low:  '低',
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' });
}

export default function EconomicCalendar({ events }) {
  if (!events || events.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section>
      <h2 className="text-lg font-semibold text-blue-100 mb-3">経済指標カレンダー</h2>
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-700">
                <th className="text-left px-4 py-3 text-xs font-medium text-blue-400 w-28">日付</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-blue-400">指標名</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-blue-400 w-16">重要度</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-blue-400 w-28">前回</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-blue-400 w-28">予想</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-blue-400 w-28">実績</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {events.map((event, i) => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                const isPast = eventDate < today;

                return (
                  <tr
                    key={i}
                    className={isPast ? 'opacity-40' : 'hover:bg-slate-700'}
                  >
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-4 py-3 text-slate-200 font-medium">{event.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${IMPACT_STYLES[event.impact] || IMPACT_STYLES.low}`}>
                        {IMPACT_LABELS[event.impact] || event.impact}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">{event.previous || '---'}</td>
                    <td className="px-4 py-3 text-right text-slate-400">{event.forecast || '---'}</td>
                    <td className="px-4 py-3 text-right font-medium text-blue-100">
                      {event.actual || <span className="text-slate-600">---</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
