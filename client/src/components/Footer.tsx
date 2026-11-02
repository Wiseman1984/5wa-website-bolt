import logoSrc from "@/coinlogo.png";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/15 bg-[var(--bg-surface)]">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="$5WA Logo" className="h-10 w-10 object-contain" />
              <h3 className="text-lg font-bold text-slate-100">$5 Wrench Attack</h3>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              The hardest-working meme in crypto. A $5 wrench beats a $500 hardware wallet — we can't fix that, but we can meme about it. Proof of Build, Proof of Helmet.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Site</h4>
            <ul className="space-y-2">
              {[["Home", "/"], ["Museum", "/museum"], ["Defense Hub", "/defense-hub"], ["Roadmap & Manifesto", "/roadmap"]].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-slate-400 transition hover:text-cyan-300">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-sm text-slate-400 transition hover:text-cyan-300">Terms of Service</a></li>
              <li><a href="/privacy" className="text-sm text-slate-400 transition hover:text-cyan-300">Privacy Policy</a></li>
              <li><a href="mailto:team@5wa.io" className="text-sm text-slate-400 transition hover:text-cyan-300">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="text-xs text-slate-500">Not financial advice. Not a security service. Just the hardest-working meme in crypto. Don't get hit by a $5 wrench. DYOR.</p>
          <p className="mt-2 text-xs text-slate-600">© 2025 $5 Wrench Attack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
