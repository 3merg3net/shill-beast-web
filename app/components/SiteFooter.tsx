export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050913]">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Shill Beast — Powering Decentralized Promotion</span>
        <span className="text-cyan-300">Built for Base • v0.1</span>
      </div>
    </footer>
  );
}
