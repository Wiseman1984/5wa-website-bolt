import type { Language } from "./i18n";

export const OPSEC_REGION_IDS = [
  "global",
  "north-america",
  "europe",
  "latin-america",
  "asia-pacific",
  "middle-east-africa",
] as const;

export const OPSEC_SCENARIO_IDS = [
  "daily-routine",
  "travel",
  "otc-meeting",
  "home-security",
  "conference",
] as const;

export type OpsecRegionId = (typeof OPSEC_REGION_IDS)[number];
export type OpsecScenarioId = (typeof OPSEC_SCENARIO_IDS)[number];
export type OpsecRiskLevel = "guarded" | "elevated" | "high";

export interface OpsecRegion {
  id: OpsecRegionId;
  label: string;
  shortLabel: string;
  context: string;
  adjustments: string[];
  countries: string[];
}

export interface OpsecScenario {
  id: OpsecScenarioId;
  label: string;
  shortLabel: string;
  description: string;
  riskLevel: OpsecRiskLevel;
  priorities: string[];
  before: string[];
  during: string[];
  after: string[];
  redFlags: string[];
  suggestedQuestions: string[];
}

export interface OpsecGuide {
  region: OpsecRegion;
  scenario: OpsecScenario;
  riskLevel: OpsecRiskLevel;
  priorities: string[];
  before: string[];
  during: string[];
  after: string[];
  redFlags: string[];
  suggestedQuestions: string[];
}

export const OPSEC_REGIONS: OpsecRegion[] = [
  {
    id: "global",
    label: "Global / Remote",
    shortLabel: "Global",
    context: "Use this baseline when your region is not listed or when your activity crosses borders.",
    adjustments: [
      "Use a trusted contact who understands your travel or meeting plan.",
      "Confirm the local emergency number and a safe public fallback location before you move.",
      "Avoid publishing live location, travel dates, holdings, or identifiable transaction details.",
    ],
    countries: [],
  },
  {
    id: "north-america",
    label: "North America",
    shortLabel: "N. America",
    context: "Plan for long travel distances, vehicle-based routines, public meetups, and address exposure through public records.",
    adjustments: [
      "Use staffed public venues with visible cameras and more than one exit.",
      "Do not let a trading contact choose your home, hotel, or regular workplace as the meeting point.",
      "Review which business filings, social profiles, and delivery records expose your address.",
    ],
    countries: ["United States", "USA", "United States of America", "Canada", "Mexico"],
  },
  {
    id: "europe",
    label: "Europe",
    shortLabel: "Europe",
    context: "Account for cross-border movement, dense public transit, conferences, and repeated walking routes.",
    adjustments: [
      "Separate conference identity and travel plans from accounts connected to your holdings.",
      "Vary the final leg of repeated routes and avoid posting venue photos until after departure.",
      "Keep passport, primary wallet access, and backup recovery material in separate locations.",
    ],
    countries: ["France", "United Kingdom", "UK", "Spain", "Netherlands", "Germany", "Italy", "Portugal", "Belgium", "Switzerland", "Turkey"],
  },
  {
    id: "latin-america",
    label: "Latin America",
    shortLabel: "LatAm",
    context: "Prioritize verified transportation, controlled meeting locations, and reduced visible wealth signals.",
    adjustments: [
      "Use transportation arranged through a trusted channel rather than a counterparty.",
      "Avoid carrying the device, seed material, and signing capability needed to access full holdings.",
      "Establish timed check-ins and a duress phrase before any in-person transaction.",
    ],
    countries: ["Brazil", "Argentina", "Colombia", "Mexico", "Chile", "Peru", "Uruguay", "Venezuela"],
  },
  {
    id: "asia-pacific",
    label: "Asia Pacific",
    shortLabel: "APAC",
    context: "Plan around dense cities, high device usage, cross-border travel, and informal OTC introductions.",
    adjustments: [
      "Verify both the venue and the introducer through a separate communication channel.",
      "Disable lock-screen previews and hide exchange, wallet, and portfolio apps from casual view.",
      "Use hotel or venue security for arrival and departure when a meeting involves public crypto identity.",
    ],
    countries: ["Hong Kong", "Taiwan", "Thailand", "India", "Philippines", "Vietnam", "Japan", "Singapore", "Australia", "South Korea", "Malaysia", "Indonesia"],
  },
  {
    id: "middle-east-africa",
    label: "Middle East & Africa",
    shortLabel: "MEA",
    context: "Prioritize trusted local support, venue control, transportation verification, and resilient communications.",
    adjustments: [
      "Confirm local support and emergency contacts before disclosing a meeting location.",
      "Use a separate travel device and minimize account access while moving between venues.",
      "Keep the counterparty away from your accommodation, family routine, and primary workplace.",
    ],
    countries: ["United Arab Emirates", "UAE", "South Africa", "Nigeria", "Kenya", "Ghana", "Egypt", "Morocco", "Israel", "Saudi Arabia"],
  },
];

export const OPSEC_SCENARIOS: OpsecScenario[] = [
  {
    id: "daily-routine",
    label: "Daily Routine",
    shortLabel: "Daily",
    description: "Reduce the link between your public identity, regular movements, and access to digital assets.",
    riskLevel: "guarded",
    priorities: [
      "Separate public identity from the email, phone, and devices used for asset custody.",
      "Remove portfolio balances, wallet screenshots, and live-location posts from public channels.",
      "Use transaction limits and a low-value daily wallet that cannot reach primary reserves.",
      "Create a household duress phrase and a trusted-contact escalation plan.",
    ],
    before: [
      "Audit which profiles expose your employer, home area, family, vehicle, or repeated schedule.",
      "Turn off lock-screen notification previews for wallet, exchange, and messaging apps.",
      "Keep recovery material and primary signing capability outside your everyday carry.",
    ],
    during: [
      "Avoid discussing holdings, custody setup, or recent gains in public or semi-public spaces.",
      "Notice repeated vehicles, people, or unsolicited questions about your routine.",
      "Use a trusted channel to confirm unusual requests, even when they appear to come from friends.",
    ],
    after: [
      "Review new public exposure after conferences, media appearances, or large on-chain activity.",
      "Document suspicious contact patterns and update trusted contacts without confronting anyone.",
    ],
    redFlags: ["Repeated questions about holdings", "Unexpected account-recovery requests", "People mapping your routine"],
    suggestedQuestions: [
      "What should I remove from my public profile?",
      "How do I create a safe daily wallet setup?",
      "What should a household duress plan include?",
    ],
  },
  {
    id: "travel",
    label: "Travel / New Location",
    shortLabel: "Travel",
    description: "Limit exposure while moving through airports, hotels, unfamiliar transport, and temporary workspaces.",
    riskLevel: "elevated",
    priorities: [
      "Travel without seed phrases, full-balance devices, or access to primary reserves.",
      "Share itinerary and timed check-ins with one trusted contact, not publicly.",
      "Pre-plan verified transport, emergency numbers, and two safe fallback locations.",
      "Delay travel posts until you have left the location.",
    ],
    before: [
      "Use a travel device with minimal accounts and remote-lock capability.",
      "Remove sensitive files, wallet history, and authentication backups from carried devices.",
      "Agree on a missed-check-in action and duress phrase with a trusted contact.",
    ],
    during: [
      "Keep devices out of sight during border queues, rides, and public conversations.",
      "Do not accept last-minute venue or driver changes without independent verification.",
      "Move to a staffed public area if you suspect surveillance; do not return directly to lodging.",
    ],
    after: [
      "Rotate temporary credentials and review device sessions after returning.",
      "Log suspicious encounters while details are fresh and notify relevant local support if needed.",
    ],
    redFlags: ["Unverified driver or venue change", "Unknown person knows your itinerary", "Pressure to unlock devices while isolated"],
    suggestedQuestions: [
      "How should I configure a travel phone?",
      "What should I do if I think I am being followed?",
      "How can I attend a crypto event without exposing my hotel?",
    ],
  },
  {
    id: "otc-meeting",
    label: "OTC / In-Person Trade",
    shortLabel: "OTC",
    description: "Treat every in-person trade as a controlled security operation, not a casual meetup.",
    riskLevel: "high",
    priorities: [
      "Do not meet at a home, hotel room, vehicle, warehouse, or venue selected only by the counterparty.",
      "Use a staffed public venue with cameras, multiple exits, and a trusted observer nearby.",
      "Carry only the transaction amount in a segregated wallet with no path to reserves.",
      "Cancel immediately if identity, venue, amount, or payment method changes unexpectedly.",
    ],
    before: [
      "Verify identity and reputation through at least two independent channels.",
      "Set a hard value limit and conduct a small test transaction before meeting.",
      "Provide a trusted contact with the counterpart, venue, time window, and missed-check-in action.",
    ],
    during: [
      "Keep control of your device and never disclose recovery phrases or total balances.",
      "Do not move to a second location, enter another vehicle, or accept additional people.",
      "End the meeting if urgency, intimidation, surveillance, or unexplained companions appear.",
    ],
    after: [
      "Leave by a pre-planned route and avoid travelling directly to home or lodging.",
      "Revoke temporary sessions and move remaining funds out of the meeting wallet.",
    ],
    redFlags: ["Last-minute location change", "Request to prove total balance", "Pressure to enter a vehicle or private room"],
    suggestedQuestions: [
      "How should I choose a safe OTC meeting venue?",
      "What information should my trusted contact have?",
      "Which last-minute changes mean I should cancel?",
    ],
  },
  {
    id: "home-security",
    label: "Home & Family",
    shortLabel: "Home",
    description: "Reduce the chance that asset access, public identity, and household routines converge at one address.",
    riskLevel: "elevated",
    priorities: [
      "Keep primary signing capability and recovery material away from the residence when feasible.",
      "Do not reveal custody architecture, backup locations, or who can authorize transfers.",
      "Create a family response plan that prioritizes life safety over assets.",
      "Use layered entry, lighting, cameras, and a safe retreat area without advertising wealth.",
    ],
    before: [
      "Audit address exposure through deliveries, business registrations, social posts, and data brokers.",
      "Give household members simple instructions for strangers, deliveries, and unexpected visitors.",
      "Separate daily-access funds from reserves using limits, delay, and multi-party approval where appropriate.",
    ],
    during: [
      "Do not open the door based only on uniforms, caller ID, or a familiar name.",
      "Use a pre-agreed duress phrase during suspicious calls or messages.",
      "If danger is immediate, prioritize escape or a secure retreat and contact local emergency services.",
    ],
    after: [
      "Preserve video, messages, and access logs only when it is safe to do so.",
      "Review address exposure and custody assumptions after any suspicious visit or targeting attempt.",
    ],
    redFlags: ["Unexpected utility or delivery visit", "Questions about who lives at the address", "Threats mentioning family or custody"],
    suggestedQuestions: [
      "How do I reduce public exposure of my home address?",
      "What should my family do during a coercion attempt?",
      "How can I separate home access from primary reserves?",
    ],
  },
  {
    id: "conference",
    label: "Conference / Public Event",
    shortLabel: "Event",
    description: "Participate without turning your badge, conversations, devices, and travel routine into a target profile.",
    riskLevel: "elevated",
    priorities: [
      "Use a public-facing identity that is not directly connected to custody accounts.",
      "Carry a low-value event device and avoid displaying balances or signing transactions publicly.",
      "Keep hotel, transport, and after-party plans off public channels.",
      "Leave private follow-up meetings for a separately verified time and controlled venue.",
    ],
    before: [
      "Review badge, speaker bio, and social profiles for unnecessary wealth or location signals.",
      "Disable automatic Wi-Fi, Bluetooth discovery, and lock-screen previews.",
      "Plan check-ins, transport, and a safe exit before evening networking events.",
    ],
    during: [
      "Do not scan unknown QR codes or connect signing devices to shared equipment.",
      "Avoid detailed custody conversations, even with people who appear well connected.",
      "Verify invitations and venue changes through an official or previously trusted channel.",
    ],
    after: [
      "Review new contacts before moving conversations to private channels.",
      "Revoke event sessions, remove temporary apps, and post photos only after leaving.",
    ],
    redFlags: ["Persistent balance questions", "Unplanned private after-party", "Someone follows from venue to lodging"],
    suggestedQuestions: [
      "How should I configure a conference phone?",
      "Which event conversations create physical risk?",
      "How do I safely handle a private meeting invitation?",
    ],
  },
];

type LocalizedRegionCopy = Omit<OpsecRegion, "id" | "countries">;
type LocalizedScenarioCopy = Omit<OpsecScenario, "id" | "riskLevel">;

const OPSEC_REGION_COPY_ZH: Record<OpsecRegionId, LocalizedRegionCopy> = {
  global: {
    label: "全球／遠端",
    shortLabel: "全球",
    context: "當所在地區未列出，或活動跨越不同國家時，請使用此基準。",
    adjustments: [
      "指定一位了解你行程或會面計畫的可信任聯絡人。",
      "行動前先確認當地緊急電話與一處安全的公共備援地點。",
      "避免公開即時位置、旅行日期、持有資產或可識別的交易細節。",
    ],
  },
  "north-america": {
    label: "北美洲",
    shortLabel: "北美",
    context: "將長距離移動、以車輛為主的日常路線、公開聚會，以及公共紀錄造成的地址暴露納入規劃。",
    adjustments: [
      "選擇有人員管理、可見監視器且具多個出口的公共場所。",
      "不要讓交易對象把住家、飯店或固定工作地點選為會面位置。",
      "檢查商業登記、社群帳號與配送紀錄是否暴露你的地址。",
    ],
  },
  europe: {
    label: "歐洲",
    shortLabel: "歐洲",
    context: "將跨境移動、密集大眾運輸、會議活動與重複步行路線納入考量。",
    adjustments: [
      "將會議公開身分與旅行計畫，和連結資產保管的帳號分離。",
      "改變固定路線的最後一段，並在離開後才發布場地照片。",
      "將護照、主要錢包存取與備援復原資料分開存放。",
    ],
  },
  "latin-america": {
    label: "拉丁美洲",
    shortLabel: "拉美",
    context: "優先使用經驗證的交通、可控的會面地點，並降低可見的財富訊號。",
    adjustments: [
      "交通應由可信任管道安排，而不是交由交易對象決定。",
      "不要同時攜帶可存取全部資產的裝置、助記資料與簽署能力。",
      "任何面對面交易前，先建立定時報平安與脅迫暗語。",
    ],
  },
  "asia-pacific": {
    label: "亞太地區",
    shortLabel: "亞太",
    context: "針對高密度城市、大量裝置使用、跨境旅行與非正式 OTC 介紹進行規劃。",
    adjustments: [
      "透過另一個獨立通訊管道，同時驗證場地與介紹人。",
      "關閉鎖定畫面預覽，並避免讓交易所、錢包與資產組合 App 被旁人看到。",
      "若會面涉及公開加密身分，可運用飯店或場地保全協助抵達與離開。",
    ],
  },
  "middle-east-africa": {
    label: "中東與非洲",
    shortLabel: "中東非洲",
    context: "優先安排可信任的在地支援、場地控制、交通驗證與具韌性的通訊方式。",
    adjustments: [
      "在透露會面地點前，先確認在地支援與緊急聯絡人。",
      "移動於不同場地時使用獨立旅行裝置，並降低帳號存取範圍。",
      "不要讓交易對象接觸你的住宿地點、家庭作息或主要工作場所。",
    ],
  },
};

const OPSEC_SCENARIO_COPY_ZH: Record<OpsecScenarioId, LocalizedScenarioCopy> = {
  "daily-routine": {
    label: "日常作息",
    shortLabel: "日常",
    description: "降低公開身分、固定移動模式與數位資產存取之間的連結。",
    priorities: [
      "將公開身分與用於資產保管的電子郵件、電話及裝置分離。",
      "從公開管道移除資產餘額、錢包截圖與即時位置貼文。",
      "使用交易限額與無法直接存取主要儲備的低額日常錢包。",
      "建立家庭脅迫暗語與可信任聯絡人的升級處理計畫。",
    ],
    before: [
      "盤點哪些公開資料暴露雇主、住家區域、家人、車輛或固定行程。",
      "關閉錢包、交易所與通訊 App 的鎖定畫面通知預覽。",
      "不要在日常隨身物品中攜帶復原資料或主要簽署能力。",
    ],
    during: [
      "避免在公開或半公開場所討論持有資產、保管架構或近期獲利。",
      "留意重複出現的車輛、人員，或針對日常作息的無端詢問。",
      "即使請求看似來自朋友，也應透過可信任管道獨立確認。",
    ],
    after: [
      "在參加會議、媒體曝光或大額鏈上活動後，重新檢查公開資訊暴露。",
      "記錄可疑接觸模式並通知可信任的人，不要自行對質。",
    ],
    redFlags: ["反覆詢問持有資產", "突如其來的帳號復原要求", "有人刻意掌握你的日常路線"],
    suggestedQuestions: ["我的公開個人資料應移除哪些內容？", "如何建立安全的日常錢包配置？", "家庭脅迫應變計畫應包含什麼？"],
  },
  travel: {
    label: "旅行／新地點",
    shortLabel: "旅行",
    description: "在機場、飯店、陌生交通與臨時工作環境中移動時降低暴露。",
    priorities: [
      "旅行時不要攜帶助記詞、顯示完整餘額的裝置或主要儲備存取權。",
      "只與一位可信任聯絡人分享行程與定時報平安安排，不公開發布。",
      "預先規劃經驗證的交通、緊急電話與兩處安全備援地點。",
      "離開所在地後再發布旅行內容。",
    ],
    before: [
      "使用帳號最小化且可遠端鎖定的旅行裝置。",
      "從攜帶裝置移除敏感檔案、錢包歷史與驗證備份。",
      "與可信任聯絡人約定失聯處理方式與脅迫暗語。",
    ],
    during: [
      "在邊境排隊、搭車與公開交談時，讓裝置保持不被旁人看見。",
      "未經獨立確認，不接受臨時更換場地或司機。",
      "若懷疑遭監視，前往有人員管理的公共區域，不要直接返回住宿地點。",
    ],
    after: [
      "返程後更換臨時憑證並檢查裝置登入工作階段。",
      "趁記憶清楚時記錄可疑接觸，必要時通知在地支援。",
    ],
    redFlags: ["未經驗證的司機或場地變更", "陌生人知道你的行程", "在孤立環境中被要求解鎖裝置"],
    suggestedQuestions: ["旅行手機應如何設定？", "如果懷疑被跟蹤，我該怎麼做？", "如何參加加密活動而不暴露飯店？"],
  },
  "otc-meeting": {
    label: "OTC／面對面交易",
    shortLabel: "OTC",
    description: "將每次面對面交易視為受控的安全作業，而不是一般聚會。",
    priorities: [
      "不要在住家、飯店房間、車輛、倉庫或只由交易對象選定的場所會面。",
      "選擇有人員管理、具監視器與多個出口的公共場所，並讓可信任觀察者在附近。",
      "只攜帶交易金額，使用與主要儲備無直接路徑的隔離錢包。",
      "身分、場地、金額或付款方式若臨時改變，立即取消。",
    ],
    before: [
      "至少透過兩個獨立管道驗證身分與信譽。",
      "設定明確金額上限，並在會面前先做小額測試交易。",
      "向可信任聯絡人提供對象、場地、時間範圍與失聯處理方式。",
    ],
    during: [
      "保持裝置控制權，絕不透露復原詞或總餘額。",
      "不要移動到第二地點、進入他人車輛或接受額外人員加入。",
      "若出現催促、威嚇、監視或未說明的同行者，立即結束會面。",
    ],
    after: [
      "依預定路線離開，不要直接前往住家或住宿地點。",
      "撤銷臨時工作階段，並將剩餘資金移出會面錢包。",
    ],
    redFlags: ["臨時更換地點", "要求證明總餘額", "施壓要求進入車輛或私人房間"],
    suggestedQuestions: ["如何選擇安全的 OTC 會面地點？", "可信任聯絡人應掌握哪些資訊？", "哪些臨時變更代表我應該取消？"],
  },
  "home-security": {
    label: "住家與家人",
    shortLabel: "住家",
    description: "降低資產存取、公開身分與家庭作息集中於同一地址的風險。",
    priorities: [
      "在可行時，將主要簽署能力與復原資料移出住所。",
      "不要透露保管架構、備份位置或誰能授權轉帳。",
      "建立以人身安全優先於資產的家庭應變計畫。",
      "採用分層門禁、照明、攝影與安全退避區，但不要展示財富。",
    ],
    before: [
      "盤點配送、商業登記、社群貼文與資料仲介造成的地址暴露。",
      "讓家庭成員了解如何應對陌生人、配送與未預期訪客。",
      "透過限額、延遲與多人核准，在適當情況下分離日常資金與儲備。",
    ],
    during: [
      "不要只因制服、來電顯示或熟悉姓名就開門。",
      "在可疑通話或訊息中使用事先約定的脅迫暗語。",
      "若有立即危險，優先逃離或進入安全退避區，並聯絡當地緊急服務。",
    ],
    after: [
      "只在安全時保留影像、訊息與門禁紀錄。",
      "任何可疑拜訪或鎖定行為後，重新檢查地址暴露與保管假設。",
    ],
    redFlags: ["未預期的公用事業或配送訪客", "詢問誰住在此地址", "威脅內容提及家人或資產保管"],
    suggestedQuestions: ["如何降低住家地址的公開暴露？", "家人遇到脅迫時應怎麼做？", "如何讓住家存取與主要儲備分離？"],
  },
  conference: {
    label: "會議／公開活動",
    shortLabel: "活動",
    description: "參與活動時，避免讓名牌、談話、裝置與行程共同形成可鎖定的目標輪廓。",
    priorities: [
      "使用不直接連結資產保管帳號的公開身分。",
      "攜帶低價值活動裝置，避免在公共場合展示餘額或簽署交易。",
      "不要在公開管道揭露飯店、交通與續攤計畫。",
      "私人後續會面應另行驗證時間，並選擇可控場地。",
    ],
    before: [
      "檢查名牌、講者介紹與社群資料，移除不必要的財富或位置訊號。",
      "關閉自動 Wi-Fi、藍牙探索與鎖定畫面預覽。",
      "晚間社交活動前，先規劃報平安、交通與安全離場方式。",
    ],
    during: [
      "不要掃描不明 QR code，也不要把簽署裝置連接共享設備。",
      "即使對方看似人脈廣泛，也避免深入討論資產保管。",
      "透過官方或既有可信任管道驗證邀請與場地變更。",
    ],
    after: [
      "在把新認識的人移至私人管道前，先重新檢查其身分。",
      "撤銷活動工作階段、移除臨時 App，並在離開後才發布照片。",
    ],
    redFlags: ["持續詢問餘額", "臨時私人續攤", "有人從場地一路跟到住宿處"],
    suggestedQuestions: ["會議手機應如何設定？", "哪些活動對話會增加實體風險？", "如何安全處理私人會面邀請？"],
  },
};

export function getOpsecRegions(language: Language = "en"): OpsecRegion[] {
  if (language === "en") return OPSEC_REGIONS;
  return OPSEC_REGIONS.map((region) => ({ ...region, ...OPSEC_REGION_COPY_ZH[region.id] }));
}

export function getOpsecScenarios(language: Language = "en"): OpsecScenario[] {
  if (language === "en") return OPSEC_SCENARIOS;
  return OPSEC_SCENARIOS.map((scenario) => ({ ...scenario, ...OPSEC_SCENARIO_COPY_ZH[scenario.id] }));
}

export function getOpsecGuide(regionId: OpsecRegionId, scenarioId: OpsecScenarioId, language: Language = "en"): OpsecGuide {
  const regions = getOpsecRegions(language);
  const scenarios = getOpsecScenarios(language);
  const region = regions.find((item) => item.id === regionId) ?? regions[0];
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  return {
    region,
    scenario,
    riskLevel: scenario.riskLevel,
    priorities: [...scenario.priorities, ...region.adjustments.slice(0, 1)],
    before: [...region.adjustments.slice(1), ...scenario.before],
    during: scenario.during,
    after: scenario.after,
    redFlags: scenario.redFlags,
    suggestedQuestions: scenario.suggestedQuestions,
  };
}

export function isOpsecRegionId(value: string): value is OpsecRegionId {
  return OPSEC_REGION_IDS.includes(value as OpsecRegionId);
}

export function isOpsecScenarioId(value: string): value is OpsecScenarioId {
  return OPSEC_SCENARIO_IDS.includes(value as OpsecScenarioId);
}
