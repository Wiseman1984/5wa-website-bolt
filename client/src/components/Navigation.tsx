import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const shellLanguage = window.location.pathname === "/guardian" ? language : "en";
  const labels = shellLanguage === "zh"
    ? { home: "首頁", platform: "平台", guardian: "Guardian AI", tokenomics: "代幣經濟", airdrop: "空投", whitepaper: "白皮書", menu: "切換選單", follow: "在 X 追蹤 @5wa_io" }
    : { home: "Home", platform: "Platform", guardian: "Guardian AI", tokenomics: "Tokenomics", airdrop: "Airdrop", whitepaper: "Whitepaper", menu: "Toggle menu", follow: "Follow @5wa_io on X" };
  
  // Handle navigation with SPA-style routing
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navItems = [
    { label: labels.home, href: "/" },
    { label: labels.platform, href: "/platform" },
    { label: labels.guardian, href: language === "zh" ? "/guardian?lang=zh" : "/guardian" },
    { label: labels.tokenomics, href: "/tokenomics" },
    { label: labels.airdrop, href: "/airdrop" },
    { label: labels.whitepaper, href: "/whitepaper" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1120] border-b border-border backdrop-blur-none">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img 
            src="/5wa-coinlogo.png" 
            alt="5WA Logo" 
            className="w-8 h-8"
          />
          <span className="font-bold text-lg text-foreground hidden sm:inline">
            5WA
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-muted-foreground hover:text-accent transition-colors font-medium">
              {item.label}
            </a>
          ))}
        </div>

        {/* X (Twitter) Social Link + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/5wa_io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label={labels.follow}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 hover:bg-card rounded transition-colors"
            aria-label={labels.menu}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-accent transition-colors font-medium block"
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
