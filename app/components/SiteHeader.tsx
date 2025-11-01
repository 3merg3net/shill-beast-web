export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050913]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Shill Beast" className="w-7 h-7" />
          <span className="text-sm font-semibold tracking-wide text-cyan-300">SHILL BEAST</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/" className="hover:text-cyan-300">Home</a>
          <a href="/portal" className="hover:text-cyan-300">Portal</a>
          <a href="/s/basegold-1" className="hover:text-cyan-300">OG Demo</a>
        </nav>
      </div>
    </header>
  );
}
