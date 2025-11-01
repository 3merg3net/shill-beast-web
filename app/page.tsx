export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight text-cyan-300">
            One-click shilling for crypto communities
          </h1>
          <p className="text-gray-400">
            Shill Beast lets your community share <span className="text-cyan-300">unique, OG-card</span> posts to X
            from a Telegram bot. Projects manage images, copy, and links in a simple portal.
          </p>
          <div className="flex gap-3">
            <a href="/portal" className="btn btn-primary">Launch Portal</a>
            <a href="/s/basegold-1" className="btn btn-secondary">View OG Demo</a>
          </div>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-gray-400">
            <li>Projects upload images & copy once; community shares endlessly</li>
            <li>X renders large images via OG link; Telegram shows rich preview</li>
            <li>Credits/cooldowns to control cadence; multi-project ready</li>
          </ul>
        </div>

        <div className="card p-3 relative">
          <img src="/hero.png" alt="Shill Beast" className="w-full rounded-xl relative z-10" />
          {/* cyan floor glow */}
          <div className="absolute inset-x-6 bottom-2 h-8 rounded-full blur-2xl bg-cyan-500/20" />
        </div>
      </section>
    </main>
  );
}
