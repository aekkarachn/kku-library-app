import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="space-y-6">
      <div className="relative h-40 w-full overflow-hidden rounded-lg border">
        <Image src="/images/banner.jpg" alt="KKU Library" fill className="object-cover" priority />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">KKU Library</h1>
        <p className="text-sm text-gray-600">Next.js + Tailwind + Express API</p>
      </div>

      <div className="space-x-3 text-sm">
        <Link className="underline" href="/login">Login</Link>
        <Link className="underline" href="/register">Create user</Link>
        <Link className="underline" href="/me">Me</Link>
      </div>
    </main>
  );
}