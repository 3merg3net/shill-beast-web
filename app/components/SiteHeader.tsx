// app/components/SiteHeader.tsx
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      {/* Glow bar */}
      <div className="relative h-[3px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/60 to-cyan-500/0 sb-shimmer" />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="group flex items-center gap-3">
          <img src="/logo.png" alt="Shill Beast" className="h-8 w-8 rounded" />
          <span className="text-lg font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
            Shill Beast
          </span>
        </a>

        <nav className="flex items-center gap-5 text-sm">
          <a href="/portal" className="text-gray-300 hover:text-cyan-300 transition-colors">
            Portal
          </a>
          <a href="https://t.me/" target="_blank" className="text-gray-300 hover:text-cyan-300 transition-colors">
            Telegram
          </a>
          <a href="https://x.com/" target="_blank" className="text-gray-300 hover:text-cyan-300 transition-colors">
            X
          </a>
        </nav>
      </div>
    </header>
  );
}
