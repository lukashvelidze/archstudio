// app/detectors/page.js

export default async function DetectorsPage() {
  const res = await fetch('http://localhost:3000/api/detectors', { cache: 'no-store' });

  const data = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detectors</h1>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li key={index} className="p-3 border rounded shadow">
            {item.name} {/* Replace with real column names */}
          </li>
        ))}
      </ul>
    </div>
  );
}
