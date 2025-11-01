export default function Home() {
  return (
    <main className="relative">
      {/* subtle grid / glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,216,245,0.10),_transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-6 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              <span className="block text-cyan-300">Shill Beast</span>
              <span className="block text-white/90">Tailor, Deploy & Track Every Shill</span>
            </h1>
            <p className="mt-4 text-gray-300 max-w-xl">
              A Telegram-first engine to power community promotion. Projects upload assets & copy; shillers post with one tap; X shows rich cards via our OG links.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="/portal"
                className="px-6 py-3 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold"
              >
                Launch Portal
              </a>
              <a
                href="/s/basegold-1"
                className="px-6 py-3 rounded-xl border border-cyan-400/40 text-cyan-300 hover:bg-white/5"
              >
                View OG Demo
              </a>
            </div>
          </div>
          <div className="relative">
            <img src="/hero.png" alt="Shill Beast" className="w-full rounded-2xl border border-white/10 shadow-lg" />
            <div className="absolute -inset-2 rounded-2xl border border-cyan-400/20 blur-[2px] opacity-60" />
          </div>
        </div>
      </div>
    </main>
  );
}
