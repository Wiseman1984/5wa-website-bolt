import type { Language } from "./i18n";
import type { OpsecRiskLevel } from "./opsecGuide";

export const OPSEC_LANGUAGE_IDS = ["en", "zh"] as const;

export const OPSEC_UI_COPY: Record<Language, {
  languageLabel: string;
  englishLabel: string;
  traditionalChineseLabel: string;
  guide: {
    badge: string;
    title: string;
    description: string;
    broadRegion: string;
    activity: string;
    riskPosture: string;
    riskLabels: Record<OpsecRiskLevel, string>;
    priorityActions: string;
    regionalAdjustment: string;
    abortEscalate: string;
    before: string;
    during: string;
    after: string;
    privacyLabel: string;
    privacyText: string;
    immediateDangerLabel: string;
    immediateDangerText: string;
    continueTitle: string;
    readOnlyBeta: string;
    continuePrefix: string;
    continueMiddle: string;
    continueSuffix: string;
    openGuardian: string;
  };
  guardian: {
    pageTitle: string;
    pageDescription: string;
    backToGuide: string;
    readOnlyBeta: string;
    title: string;
    intro: string;
    privacyBoundary: string;
    privacyText: string;
    broadRegion: string;
    activity: string;
    activeContext: string;
    activeContextDetail: string;
    modelLine: string;
    followUpPrefix: string;
    followUpMiddle: string;
    followUpSuffix: string;
    threatContext: string;
    loading: string;
    publicRecords: string;
    guideOnly: string;
    session: string;
    notStored: string;
    canDo: string;
    canDoText: string;
    cannotDo: string;
    cannotDoText: string;
    doNotEnter: string;
    doNotEnterText: string;
    requestNote: string;
    placeholder: string;
    emptyState: string;
    unavailable: string;
    immediateDangerLabel: string;
    immediateDangerText: string;
  };
}> = {
  en: {
    languageLabel: "Language",
    englishLabel: "EN",
    traditionalChineseLabel: "繁中",
    guide: {
      badge: "Location OpSec Guide",
      title: "Plan Before Exposure Becomes a Pattern",
      description: "Choose only a broad region and activity. The guide builds a practical physical-security checklist without asking for an address, wallet, identity, or live location.",
      broadRegion: "Broad region",
      activity: "Activity / scenario",
      riskPosture: "Risk posture",
      riskLabels: { guarded: "Guarded", elevated: "Elevated", high: "High" },
      priorityActions: "Priority actions",
      regionalAdjustment: "Regional adjustment",
      abortEscalate: "Abort / escalate when",
      before: "Before",
      during: "During",
      after: "After",
      privacyLabel: "Privacy:",
      privacyText: "selections remain in your browser and are not stored.",
      immediateDangerLabel: "Immediate danger:",
      immediateDangerText: "move to safety and contact local emergency services. This guide is not an emergency service.",
      continueTitle: "Continue with Guardian AI",
      readOnlyBeta: "Read-only beta",
      continuePrefix: "Open a focused page for follow-up questions using the selected",
      continueMiddle: "and",
      continueSuffix: "context. No exact location or private data is carried forward.",
      openGuardian: "Open Guardian AI",
    },
    guardian: {
      pageTitle: "$5WA Guardian AI | Read-Only Physical Security Guidance",
      pageDescription: "Read-only Groq-powered physical-security guidance grounded in the 5WA Location OpSec Guide and bounded public threat intelligence.",
      backToGuide: "Back to Location OpSec Guide",
      readOnlyBeta: "Read-only beta",
      title: "Guardian AI",
      intro: "Ask defensive follow-up questions after reviewing the Location OpSec Guide. Guardian AI uses only a broad region, an activity scenario, and bounded public threat context.",
      privacyBoundary: "Privacy boundary",
      privacyText: "Do not enter an exact address, live location, wallet address, balance, seed phrase, private key, password, phone number, or identity document.",
      broadRegion: "Broad region",
      activity: "Activity / scenario",
      activeContext: "Active Guide context",
      activeContextDetail: "Only these broad selections are included with your question.",
      modelLine: "Live Groq inference · GPT-OSS 20B · server-side · no tools",
      followUpPrefix: "Ask a follow-up about the selected",
      followUpMiddle: "and",
      followUpSuffix: "context. Answers combine the deterministic guide with bounded public incident summaries.",
      threatContext: "Threat context",
      loading: "Loading",
      publicRecords: "public records",
      guideOnly: "Guide only",
      session: "Session",
      notStored: "Not stored",
      canDo: "What it can do",
      canDoText: "Explain defensive OpSec, preparation steps, red flags, and abort criteria for the selected context.",
      cannotDo: "What it cannot do",
      cannotDoText: "No wallet access, transfers, tracking, alerts, third-party contact, monitoring, or emergency dispatch.",
      doNotEnter: "Do not enter",
      doNotEnterText: "Exact address, live location, wallet address, balance, seed phrase, private key, password, phone number, or identity document.",
      requestNote: "Each submitted question makes a bounded server-side Groq request. Public incident data may be incomplete and is not a prediction of individual risk.",
      placeholder: "Ask a defensive OpSec question—do not include private data",
      emptyState: "Choose a safe follow-up. Guardian AI does not need your exact location, wallet, identity, or balance.",
      unavailable: "Guardian AI is temporarily unavailable. Your deterministic Location OpSec Guide remains available. Please try again later, and contact local emergency services if danger may be immediate.",
      immediateDangerLabel: "Immediate danger:",
      immediateDangerText: "move to safety and contact local emergency services or a trusted person. Guardian AI is not emergency response, legal advice, or a substitute for a qualified security professional.",
    },
  },
  zh: {
    languageLabel: "語言",
    englishLabel: "EN",
    traditionalChineseLabel: "繁中",
    guide: {
      badge: "位置 OpSec 指南",
      title: "在暴露成為固定模式前先行規劃",
      description: "只需選擇廣泛地區與活動情境。本指南不要求地址、錢包、身分或即時位置，即可建立實用的實體安全檢查清單。",
      broadRegion: "廣泛地區",
      activity: "活動／情境",
      riskPosture: "風險姿態",
      riskLabels: { guarded: "警戒", elevated: "提高警戒", high: "高風險" },
      priorityActions: "優先措施",
      regionalAdjustment: "地區調整",
      abortEscalate: "出現以下情況時中止／升級處理",
      before: "事前",
      during: "進行中",
      after: "事後",
      privacyLabel: "隱私：",
      privacyText: "選擇只保留在你的瀏覽器中，不會儲存。",
      immediateDangerLabel: "立即危險：",
      immediateDangerText: "請移動至安全地點並聯絡當地緊急服務。本指南不是緊急救援服務。",
      continueTitle: "接續使用 Guardian AI",
      readOnlyBeta: "唯讀 Beta",
      continuePrefix: "開啟獨立頁面，使用已選擇的",
      continueMiddle: "與",
      continueSuffix: "情境繼續提問。不會帶入精確位置或私人資料。",
      openGuardian: "開啟 Guardian AI",
    },
    guardian: {
      pageTitle: "$5WA Guardian AI｜唯讀實體安全指引",
      pageDescription: "由 Groq 驅動的唯讀實體安全指引，以 5WA Location OpSec Guide 與有限公開威脅情報為基礎。",
      backToGuide: "返回 Location OpSec Guide",
      readOnlyBeta: "唯讀 Beta",
      title: "Guardian AI",
      intro: "閱讀 Location OpSec Guide 後，可在此提出防禦性追問。Guardian AI 只使用廣泛地區、活動情境與有限的公開威脅資訊。",
      privacyBoundary: "隱私界線",
      privacyText: "請勿輸入精確地址、即時位置、錢包地址、餘額、助記詞、私鑰、密碼、電話號碼或身分證件。",
      broadRegion: "廣泛地區",
      activity: "活動／情境",
      activeContext: "目前 Guide 情境",
      activeContextDetail: "問題只會附帶這些廣泛選擇。",
      modelLine: "Groq 即時推理 · GPT-OSS 20B · 伺服器端 · 無工具",
      followUpPrefix: "針對已選擇的",
      followUpMiddle: "與",
      followUpSuffix: "情境繼續提問。回答會結合固定指南與有限的公開事件摘要。",
      threatContext: "威脅情境",
      loading: "載入中",
      publicRecords: "筆公開紀錄",
      guideOnly: "僅使用 Guide",
      session: "工作階段",
      notStored: "不儲存",
      canDo: "可以做什麼",
      canDoText: "針對所選情境說明防禦性 OpSec、準備步驟、警訊與中止條件。",
      cannotDo: "不能做什麼",
      cannotDoText: "無錢包存取、轉帳、追蹤、警報、聯絡第三方、監控或緊急派遣能力。",
      doNotEnter: "請勿輸入",
      doNotEnterText: "精確地址、即時位置、錢包地址、餘額、助記詞、私鑰、密碼、電話號碼或身分證件。",
      requestNote: "每次提問都會發出一次受限的伺服器端 Groq 請求。公開事件資料可能不完整，也不代表對個人風險的預測。",
      placeholder: "提出防禦性 OpSec 問題——請勿包含私人資料",
      emptyState: "選擇一個安全的追問。Guardian AI 不需要你的精確位置、錢包、身分或餘額。",
      unavailable: "Guardian AI 暫時無法使用。固定規則的 Location OpSec Guide 仍可正常使用。請稍後再試；若可能有立即危險，請聯絡當地緊急服務。",
      immediateDangerLabel: "立即危險：",
      immediateDangerText: "請移動至安全地點，並聯絡當地緊急服務或可信任的人。Guardian AI 不是緊急救援、法律建議，也不能取代合格的安全專業人士。",
    },
  },
};

export function getOpsecUiCopy(language: Language) {
  return OPSEC_UI_COPY[language];
}
