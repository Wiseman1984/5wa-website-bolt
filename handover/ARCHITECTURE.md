# Architecture

## 技術基線

5WA 是 React 19 + TypeScript 5.9 的單頁應用程式，使用 Vite 7 建置、Wouter 3 路由、Tailwind CSS 4 與 Radix/shadcn UI。後端為 Node.js 22、Express 4、tRPC 11、SuperJSON 與 Zod 4。前端以 TanStack Query 5 管理 tRPC mutation；公共威脅事件與 Airdrop 提交由 `@supabase/supabase-js` 直接連 Supabase。3D 地球使用 `globe.gl`，平面地圖使用 Mapbox GL 3，地理處理另含 D3 Geo 與 World Atlas。

| 層 | 鎖檔版本／核心套件 |
|---|---|
| Runtime | Node.js 22、pnpm |
| Frontend | React / React DOM 19.2.1、Vite 7.1.7、Wouter 3.3.5 |
| API | Express 4.21.2、tRPC 11.6.0、SuperJSON 1.13.3、Zod 4.1.12 |
| Data | Supabase JS 2.108.1、Drizzle ORM 0.44.5、MySQL2 3.15.0 |
| Map | globe.gl 2.46.1、Mapbox GL 3.28.1、D3 Geo 3.1.1 |
| Styling | Tailwind CSS 4.1.14、Radix UI、Lucide React 0.453.0 |
| Test | Vitest 2.1.9、jsdom 27.0.0 |

`client/src/main.tsx` 建立 tRPC client 與 TanStack Query；`client/src/App.tsx` 提供 ErrorBoundary、ThemeProvider、LanguageProvider、TooltipProvider、Sonner、全站背景與 Wouter routes。`server/_core/index.ts` 建立 Express/HTTP server，依序掛載 storage proxy、OAuth、OG、page meta、Whitepaper download、tRPC，再於 development 掛載 Vite，於 production 提供 `dist/public` 與 SPA fallback。

## 主要資料夾

| 路徑 | 用途 |
|---|---|
| `client/src/pages/` | 公開頁面與未掛載的歷史頁面 |
| `client/src/components/` | Navigation、Footer、ThreatGlobe、Guardian、OpSec Guide 與 UI primitives |
| `client/src/contexts/` | 全域語言狀態 |
| `client/public/` | favicon、coin logo、靜態 OG 圖與 Manus 開發檔 |
| `server/routers/` | Guardian AI tRPC 子路由 |
| `server/_core/` | Express、tRPC、OAuth、Groq、Vite、storage 與平台 helper |
| `server/*.test.ts` | Vitest unit/config/integration-gated tests |
| `shared/` | Guide canonical rules、Guardian URL context、i18n 與 quiz data |
| `drizzle/` | MySQL `users` schema、SQL migration 與 Drizzle meta |
| `patches/` | pnpm patch artifacts |
| `handover/` | 本交接文件 |

## 公開頁面與 routes

| Route | 用途 | 核心檔案／資料流 |
|---|---|---|
| `/` | Hero、統計與互動 Threat Globe/Flat Map | `Home.tsx` → Supabase `threat_incidents` → `ThreatGlobe.tsx` |
| `/platform` | Detect → Interpret → Prepare、功能狀態、Location OpSec Guide | `Platform.tsx`、`LocationOpsecGuide.tsx`、`shared/opsecGuide.ts` |
| `/guardian` | 獨立唯讀 Guardian AI；支援 EN/繁中與廣泛情境 URL | `Guardian.tsx`、`GuardianAiPanel.tsx`、`shared/guardianContext.ts` |
| `/tokenomics` | 供給生命週期、配置、解鎖與鏈上外連 | `Tokenomics.tsx`、`shared/i18n.ts` |
| `/airdrop` | 6 題安全測驗、X 分享與 Supabase 提交 | `Airdrop.tsx`、`shared/quizData.ts` |
| `/whitepaper` | Whitepaper V5 長文與 PDF 下載 | `Whitepaper.tsx`、`server/download-routes.ts` |
| `/404`、其他 path | Not Found；注意 SPA fallback 的 HTTP 仍可能為 200 | `NotFound.tsx` |

未掛載但仍存在的歷史頁面包括 `Dashboard.tsx`、`BurnMechanism.tsx`、`BuyGuide.tsx`、`Verification.tsx`、`SecurityGuide.tsx`、`RealCases.tsx` 與 `ComponentShowcase.tsx`。未使用元件包括舊 `ThreatMap.tsx`、Google `Map.tsx`、DashboardLayout 與部分 template 元件。不要把這些檔案誤認為正式 route。

## 非 SPA 公開端點

| Endpoint | 行為 |
|---|---|
| `POST /api/trpc/guardianAi.ask?batch=1` | 公開 Guardian mutation |
| `GET /api/download/whitepaper` | 由 Manus storage 取得 PDF，回傳乾淨檔名 |
| `GET /manus-storage/*` | 取得 storage presigned URL 後 307 redirect |
| `GET /api/og-image` | 動態產生 Airdrop 成績 PNG |
| `GET /api/og-default` | 動態預設 OG PNG；主要 meta 使用靜態 `/og-default.png` |
| `GET /airdrop/share` | 對 crawler 輸出成績 OG HTML，真人導回 `/airdrop` |
| `GET /api/oauth/callback` | Manus OAuth callback；Guardian 不要求登入 |

## 主要功能資料流

### Threat Intelligence 視覺化

`Home.tsx` 用 Supabase anon 直接 SELECT `threat_incidents`，固定篩選 `published_at >= 2024-01-01`、`country != Unknown` 並依日期降冪。事件交給 `ThreatGlobe`；只有有 latitude/longitude 的記錄會繪製。severity 7–10 為紅、4–6 為橙、1–3 為黃、null 預設紅。3D Globe 會從 jsDelivr 取得 World Atlas，Mapbox Flat Map 使用 Dark v11、Mercator、1.5–12 zoom。

### Location OpSec Guide

Guide 是完全 deterministic 的 shared data，包含 6 個廣泛地區與 5 個情境，支援 English / Traditional Chinese。URL 只攜帶 `region`、`scenario`、`lang`，不收集 GPS、地址或即時位置。Platform CTA 將這三個低敏感選項帶到 `/guardian`。

### Guardian AI

Guardian client 另用 Supabase 讀最多 400 筆公開事件，再依區域、severity 與日期選最多 12 筆，連同最近 6 則對話與當前問題送到 public tRPC。Server 先限流、做緊急／敏感輸入 fast path，再組合 deterministic Guide prompt，呼叫 Groq `openai/gpt-oss-20b`。沒有 tools、wallet、交易、追蹤、第三方聯絡或資料庫寫入。對話僅存在 React state，但未攔截的內容會傳至 Groq；development debug collector 亦可能將 request/response 寫入 `.manus-logs`。

### Airdrop

Quiz 選題、計分、reward 與 elite 判斷都在瀏覽器。使用者透過 X web intent 分享後，前端直接 INSERT `username`、wallet、tweet URL、score、reward、question IDs 與 elite flag 到 Supabase。這是 UI 流程，不是可信派獎系統；所有資格與金額都必須移至受驗證的 server-side 流程。

## Shared chrome 與 i18n

`Navigation.tsx` 與 `Footer.tsx` 只在 `/guardian` 使用繁中 chrome；Platform 只有 Guide 區塊雙語，其餘頁面仍為英文。這是刻意避免未翻譯頁面出現半套繁中的折衷。全站雙語應另立 phase，統一文案來源、URL locale 與 route meta。
