# Project State — 2026-09-19

## Executive state

Phase 66 已在正式站生效：Location OpSec Guide 與獨立 `/guardian` 支援 English / Traditional Chinese；Guardian URL 只保存 language、broad region 與 scenario；正式 Groq 回覆使用 `openai/gpt-oss-20b`，回應 `readOnly: true`。本次 handover 沒有重新部署網站。

交接前產品基準為 `main` / `21d3a3676bfed0aa8b0d34ec379a3b98d866c9ac`。交接文件會形成一個後續 documentation-only commit；package manifest 應以最終 Git hash 為準。

## Production status

| Check | Result |
|---|---|
| `5wa.io` routes | `/`、Platform、Guardian zh、Tokenomics、Airdrop、Whitepaper、404、OG、version 均 HTTP 200 |
| `www.5wa.io` | 同路徑可達；使用相同部署內容 |
| Manus domain | 同路徑可達 |
| Guardian UI | 繁中 nav/footer、EN/繁中 switch、亞太／會議 context 正常 |
| Guardian actual response | 正式 tRPC 回 Groq GPT-OSS 20B、readOnly true、繁中五段答案 |
| Supabase Threat data | anon 讀取正常；2024+ 非 Unknown 共 881 筆 |
| Airdrop RLS | **不安全：anon 可 SELECT Airdrop submission 欄位** |
| Storage assets | 四個 `/manus-storage/` 圖與 Whitepaper PDF 均 200 |
| Whitepaper source-of-truth | 正式站為 19 頁／5.7 MB；本地同 key 為 18 頁／255 KB，需釐清 storage scope |
| Deployment version | `2afaa5bb` / timestamp `1789374062892`，不是本地 Git object |

## Feature status

| Feature | State | Notes |
|---|---|---|
| Threat Intelligence visualization | Live | 3D Globe + Mapbox；資料由 Supabase 提供 |
| Location OpSec Guide | Live | deterministic，EN/繁中，6 regions × 5 scenarios |
| Guardian AI | Live Beta | Groq server-side，no tools/no persistence in production app path |
| Airdrop quiz | Live UI | submission path exists，但 reward integrity 與 RLS 不足 |
| Tokenomics / Whitepaper V5 | Live | PDF download proxy 與 managed asset 可用 |
| TIE ingestion / Llama classification | External / unverified | repo 無 source、workflow 或 migration |
| Guardian Network、Report-to-Earn、Privacy Score | Planned | 不應對外表示已交付 |
| Full-site bilingual | Not implemented | 雙語範圍只有 Guide/Guardian 與 Guardian chrome |

## Repository state

原始 repository 的 `origin` 是 Manus/WebDev S3 Git backend。沒有 GitHub remote、Dockerfile 或 GitHub Actions。Git 歷史共 145 個可達提交；bundle 將保存所有 refs。交接前工作樹只有新增的 `handover/` 與 `.env.example`；產品 source 未因 handover 改動。

正式站資產有一份 package 外暫存備份：四個 storage 圖、Whitepaper PDF 與 Typst source。它們會放進交接 ZIP 的 `external-assets/`，而不放進 WebDev project 的 public assets。

## Immediate next steps

1. **P0：修正 Supabase `airdrop_submissions` RLS/grants。** 禁止 anon SELECT/UPDATE/DELETE，並調查既有 2 筆記錄的暴露範圍。
2. **P0：將 Airdrop 提交改為可信 server-side 流程。** 不得以 client score/reward 直接派發 token。
3. **P0：修正 Guardian development logging 與敏感輸入攔截。** 讓 UI privacy claims 與實作一致。
4. **P1：取得 TIE 外部 source/workflow。** 若無法取得，修正文案，不再把無法證明的 pipeline 標為 Live。
5. **P1：Mapbox popup XSS、shared/distributed rate limit、storage proxy allowlist。**
6. **P1：建立 private GitHub mirror。** 目前 credential 缺 CreateRepository 權限；bundle 已可直接 clone。
7. **P2：建立 source-controlled CI/release manifest。** 記錄 commit、artifact hash、WebDev checkpoint 與三網域 smoke results。

完整命令與結果見 [VALIDATION.md](./VALIDATION.md)。

## Can another Agent modify and deploy?

**可以修改：** 交接 ZIP/Git bundle、lockfile、文件與資產備份足以讓另一個 Agent在新工作區開發、typecheck、test、build。

**條件式可以部署：** 若另一個 Agent被授予 WebDev project `JVKbEsDaSG77ZpSY3BNH4p`、deployment capability 與必要 secret store access，即可發布現有網站。若只拿到 Git bundle，則只能本地開發，不能操作現有正式網域、Supabase policy、TIE pipeline 或 managed storage。

需要另外補充的權限／secret 如下：WebDev project deploy 權限、`GROQ_API_KEY`、`DATABASE_URL`、`JWT_SECRET`、Forge server credential、Mapbox public token、OAuth/platform settings、Supabase Dashboard 管理權與外部 TIE repository/workflow access。值只能透過各平台 secret manager 提供。
