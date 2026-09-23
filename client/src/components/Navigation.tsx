import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: DropdownItem[];
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { language } = useLanguage();
  const shellLanguage = window.location.pathname === "/guardian" ? language : "en";

  const labels = shellLanguage === "zh"
    ? {
        home: "首頁", platform: "平台", platformOverview: "平台總覽", realCases: "扳手事件",
        guardian: "Wrenchy AI", tokenomics: "代幣經濟", airdrop: "空投", riskAssessment: "頭蓋骨檢測", whitepaper: "白皮書",
        securityGuide: "安全指南", privacyToolkit: "隱私工具包",
        menu: "切換選單", follow: "在 X 追蹤 @5wa_io",
      }
    : {
        home: "Home", platform: "Platform", platformOverview: "Platform Overview", realCases: "Wrenching Cases",
        guardian: "Wrenchy AI", tokenomics: "Tokenomics", airdrop: "Airdrop", riskAssessment: "Skull Check", whitepaper: "Whitepaper",
        securityGuide: "Security Guide", privacyToolkit: "Privacy Toolkit",
        menu: "Toggle menu", follow: "Follow @5wa_io on X",
      };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navItems: NavItem[] = [
    { label: labels.home, href: "/" },
    {
      label: labels.platform,
      href: "/platform",
      children: [
        { label: labels.platformOverview, href: "/platform" },
        { label: labels.realCases, href: "/real-cases" },
        { label: labels.securityGuide, href: "/security-guide" },
        { label: labels.privacyToolkit, href: "/privacy-toolkit" },
      ],
    },
    { label: labels.guardian, href: language === "zh" ? "/guardian?lang=zh" : "/guardian" },
    { label: labels.tokenomics, href: "/tokenomics" },
    { label: labels.airdrop, href: "/airdrop" },
    { label: labels.riskAssessment, href: "/risk-assessment" },
    { label: labels.whitepaper, href: "/whitepaper" },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownEnter = () => {
    clearTimeout(timeoutRef.current);
    setPlatformOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setPlatformOpen(false), 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b1120] border-b border-border backdrop-blur-none">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/5wa-coinlogo.png" alt="5WA Logo" className="w-8 h-8" />
          <span className="font-bold text-sm text-foreground hidden sm:inline">$5 Wrench Attack</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors font-medium"
                  onClick={() => setPlatformOpen((v) => !v)}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    platformOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                  }`}
                >
                  <div className="bg-[#0f1729] border border-border rounded-lg shadow-xl shadow-black/40 min-w-[200px] overflow-hidden">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={(e) => {
                          handleNavClick(e, child.href);
                          setPlatformOpen(false);
                        }}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-muted-foreground hover:text-accent transition-colors font-medium"
              >
                {item.label}
              </a>
            )
          )}
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
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden border-t border-border bg-card">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex items-center justify-between w-full py-3 text-muted-foreground hover:text-accent transition-colors font-medium"
                    onClick={() => setMobilePlatformOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePlatformOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobilePlatformOpen && (
                    <div className="pl-4 pb-2 flex flex-col gap-1 border-l border-border/50 ml-2">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="py-2 text-sm text-muted-foreground hover:text-accent transition-colors font-medium block"
                          onClick={(e) => {
                            handleNavClick(e, child.href);
                            setIsOpen(false);
                            setMobilePlatformOpen(false);
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-3 text-muted-foreground hover:text-accent transition-colors font-medium block"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
