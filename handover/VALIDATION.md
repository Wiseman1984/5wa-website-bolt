# Validation Report — 2026-09-19

所有命令均從 `/home/ubuntu/5wa-token-site` 執行。本任務未部署正式站、未執行錢包／合約操作、未執行 `pnpm db:push`，也未修改 Supabase 資料。

## Build and test results

| Check | Command | Result |
|---|---|---|
| Dependency lock | `pnpm install --frozen-lockfile` | Pass；lockfile up to date，pnpm 10.4.1 |
| TypeScript | `pnpm check` | Pass；0 errors |
| Lint | `pnpm run lint` | Not configured；`package.json` 無 lint script，repo 無 ESLint config |
| Unit/config tests | `pnpm test` | Pass；12 files passed、1 skipped；75 tests passed、2 skipped |
| Groq integration | `RUN_GROQ_INTEGRATION=1 pnpm vitest run server/groq.key.test.ts` | Pass；2/2，含模型列舉與繁中 server-side generation |
| Production build | `pnpm build` | Pass；Vite 35.86s、server esbuild 12ms |
| Git integrity | `git fsck --full` | Pass；1515 objects |
| Handover secret patterns | path-only scan | Pass；handover 文件未命中 key/private-token pattern |
| Git bundle recovery | `git bundle verify` + clone to clean directory | Pass；bundle 記錄 complete history，clone HEAD 正確 |
| Clean-room rebuild | frozen install + check + test + build in cloned directory | Pass；75/77 tests、2 skipped，build 37.18s |

Build 有 Rollup chunk-size warning。最大 client chunks 約為 index 2.36 MB、Mapbox 1.87 MB、Globe 1.85 MB（未 gzip）；不是 build failure，但應列入效能優化。

## Local production smoke test

以 `NODE_ENV=production PORT=3100 pnpm start` 啟動剛建置的 `dist/`。下列 endpoint 均成功：

| Path | Status / type |
|---|---|
| `/` | 200 HTML |
| `/platform` | 200 HTML |
| `/guardian?region=asia-pacific&scenario=conference&lang=zh` | 200 HTML |
| `/tokenomics` | 200 HTML |
| `/airdrop` | 200 HTML |
| `/whitepaper` | 200 HTML |
| `/404` | 200 HTML；SPA fallback 行為 |
| `/og-default.png` | 200 PNG，287,769 bytes |
| `/api/og-default` | 200 PNG，148,878 bytes |
| `/api/download/whitepaper` | 200 PDF |
| `system.health` tRPC | 200，`ok: true` |

## Production routes and browser

`https://5wa.io`、`https://www.5wa.io` 與 `https://5wa-token-jvkbesda.manus.space` 的 Home、Platform、Guardian zh、Tokenomics、Airdrop、Whitepaper、404、static OG 與 version endpoint 均為 200。正式 Guardian 經真實瀏覽器確認：URL 正規化後只保留 `region=asia-pacific&scenario=conference&lang=zh`；導航、頁尾、區域／情境與 Guardian 面板為繁中；頁面顯示 Groq GPT-OSS 20B、server-side、no tools 與 not stored。

正式 tRPC 使用無敏感資訊的合成問題「會議手機應如何設定？」成功回傳 `provider: groq`、`model: openai/gpt-oss-20b`、`readOnly: true`，答案為繁中並含五個要求區段與 emergency escalation。

## Supabase and feature configuration

| Area | Result |
|---|---|
| Threat Map query | Pass；anon 可讀 2024+、非 Unknown 事件，count 881 |
| Guardian threat context | Source 可讀最多 400 筆，再本機選 12 筆；正常 query 失敗時 Guide-only fallback |
| Airdrop insert configuration | 程式存在且欄位 contract 完整；未做寫入 smoke test，以避免產生假 production submission |
| Airdrop RLS read | **Fail / security risk**；anon HEAD/limit=0 可 SELECT PII-like fields，表 count 2 |
| Mapbox | normal tests通過；token 是 public client token，需確認正式 allowed origins/scope |
| Storage images | 四個 `/manus-storage/` 圖均 200 |
| Whitepaper production | 200 PDF；19 pages、5,714,137 bytes |

## Whitepaper environment divergence

同一 source route/key 在本地 production server 回 18-page、255,272-byte PDF（SHA-256 `85d4be51...`），正式站回 19-page、5,714,137-byte PDF（SHA-256 `2cd774f0...`）。這表示本機 WebDev Forge/storage scope 或 object resolution 與 production 不一致。交接包以正式站 19-page PDF 為資產基準，並保留目前 Typst source；接手方在部署前必須釐清 storage key、project scope 與 PDF source-of-truth。

## Overall result

原始碼可以安裝、typecheck、test、呼叫 Groq integration、build 並啟動 production server。主要 route 與 Phase 66 正式站功能可用。交接驗收的阻斷風險不是 build，而是 Supabase Airdrop RLS、外部 TIE source 缺失、GitHub CreateRepository 權限，以及 Whitepaper 本地／production storage divergence。
