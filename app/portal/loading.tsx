export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="h-80 rounded bg-white/5" />
        <div className="h-80 rounded bg-white/5" />
      </div>
    </main>
  );
}
