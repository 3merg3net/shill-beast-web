export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-400">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Shill Beast — Powering decentralized promotion.</p>
          <div className="flex gap-4">
            <a className="hover:text-cyan-300 link-underline" href="/portal">Portal</a>
<a className="hover:text-cyan-300 link-underline" href="/s/basegold-1">OG Demo</a>

          </div>
        </div>
      </div>
    </footer>
  );
}
