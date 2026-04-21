import { headers } from 'next/headers';

async function getHealth() {
  // เมื่อเรียกจากฝั่ง Server (Server Component) ต้องใช้ Full URL
  const host = (await headers()).get('host') || 'localhost:3001';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  const resp = await fetch(`${protocol}://${host}/api/health`, { cache: 'no-store' });
  return resp.json();
}

export default async function HealthPage() {
  const data = await getHealth();
  
  return (
    <main className="space-y-3 p-6">
      <h1 className="text-xl font-bold">Health Check</h1>
      <p className="text-sm text-gray-600">
        ข้อมูลนี้ดึงมาจาก <code className="bg-gray-100 px-1">/api/health</code> (Route Handler)
      </p>
      <div className="bg-gray-50 border rounded-lg p-4">
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="text-xs text-green-600 font-medium">✓ Fetching from Server Component completed.</div>
    </main>
  );
}