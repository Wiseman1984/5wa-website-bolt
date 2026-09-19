
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();
  const shellLanguage = window.location.pathname === "/guardian" ? language : "en";
  const copy = shellLanguage === "zh"
    ? {
        airdropLead: "參加 Season 1 空投 →",
        airdropText: "透過安全知識測驗獲得 $5WA 代幣",
        takeQuiz: "參加測驗",
        brandDescription: "面向 Web3 參與者的 AI 實體安全平台，結合公開威脅情報、實用 OpSec 指引與透明基礎設施。",
        quickLinks: "快速連結",
        legal: "法律資訊",
        home: "首頁",
        platform: "平台",
        tokenomics: "代幣經濟",
        airdrop: "空投",
        whitepaper: "白皮書",
        privacy: "隱私政策",
        terms: "服務條款",
        contact: "聯絡我們",
        disclaimer: "本網站僅供資訊參考，不構成財務建議。投資前請自行研究。",
        copyright: "© 2025 $5 Wrench Attack。保留所有權利。",
      }
    : {
        airdropLead: "Join Season 1 Airdrop →",
        airdropText: "Earn $5WA tokens by proving your security knowledge",
        takeQuiz: "Take the Quiz",
        brandDescription: "An AI-powered physical security platform combining public threat intelligence, practical OpSec guidance, and transparent infrastructure for Web3 participants.",
        quickLinks: "Quick Links",
        legal: "Legal",
        home: "Home",
        platform: "Platform",
        tokenomics: "Tokenomics",
        airdrop: "Airdrop",
        whitepaper: "Whitepaper",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact",
        disclaimer: "This website is for informational purposes only. It is not financial advice. Always conduct your own research before investing.",
        copyright: "© 2025 $5 Wrench Attack. All rights reserved.",
      };
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12">
        {/* Airdrop CTA */}
        <div className="mb-8 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-300">
            <span className="text-cyan-400 font-semibold">{copy.airdropLead}</span> {copy.airdropText}
          </p>
          <a href="/airdrop" className="shrink-0 text-sm font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 rounded px-4 py-1.5 hover:bg-cyan-500/10 transition-colors">
            {copy.takeQuiz}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              $5 Wrench Attack
            </h3>
            <p className="text-muted-foreground text-sm">
              {copy.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{copy.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.home}
                </a>
              </li>
              <li>
                <a href="/platform" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.platform}
                </a>
              </li>
              <li>
                <a href={language === "zh" ? "/guardian?lang=zh" : "/guardian"} className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  Guardian AI
                </a>
              </li>
              <li>
                <a href="/tokenomics" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.tokenomics}
                </a>
              </li>
              <li>
                <a href="/airdrop" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.airdrop}
                </a>
              </li>
              <li>
                <a href="/whitepaper" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.whitepaper}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{copy.legal}</h4>
            <ul className="space-y-2">
              <li>
                <a href="/whitepaper" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.privacy}
                </a>
              </li>
              <li>
                <a href="/whitepaper" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.terms}
                </a>
              </li>
              <li>
                <a href="mailto:team@5wa.io" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  {copy.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mb-4">
            {copy.disclaimer}
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            {copy.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
