export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cyan-300">Page not found</h1>
        <p className="mt-2 text-gray-400">The page you’re looking for doesn’t exist.</p>
        <a className="mt-4 inline-block rounded bg-cyan-500/90 px-4 py-2 text-black" href="/">Back home</a>
      </div>
    </main>
  );
}
