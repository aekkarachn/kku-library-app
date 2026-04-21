export default function BorrowTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-50 text-left">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 font-medium text-gray-900">Book</th>
            <th className="px-4 py-3 font-medium text-gray-900">Due</th>
            <th className="px-4 py-3 font-medium text-gray-900">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-gray-200 last:border-b-0">
              <td className="px-4 py-3">{r.title}</td>
              <td className="px-4 py-3 text-gray-600">{r.dueDate}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}