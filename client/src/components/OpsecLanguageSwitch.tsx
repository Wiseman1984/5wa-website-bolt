import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getOpsecUiCopy } from "@shared/opsecUi";

export default function OpsecLanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const copy = getOpsecUiCopy(language);

  return (
    <div
      role="group"
      aria-label={copy.languageLabel}
      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/25 bg-[#050b14]/90 p-1"
    >
      {!compact && <Languages className="ml-1.5 h-4 w-4 text-cyan-400" aria-hidden="true" />}
      {(["en", "zh"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={`min-h-8 rounded-md px-2.5 text-xs font-bold transition active:scale-[0.97] ${
            language === item
              ? "bg-cyan-500/15 text-cyan-200 shadow-[0_0_14px_rgba(6,182,212,0.12)]"
              : "text-slate-500 hover:bg-slate-800/70 hover:text-slate-200"
          }`}
        >
          {item === "en" ? copy.englishLabel : copy.traditionalChineseLabel}
        </button>
      ))}
    </div>
  );
}
