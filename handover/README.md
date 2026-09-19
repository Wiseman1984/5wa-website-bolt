# 5WA Public Security Platform — Project Handover

本目錄是 **5WA 公開安全平台**的技術交接入口。文件以 2026-09-19 的工作樹、Git 歷史、正式站實測與外部整合稽核為基準；不包含任何 `.env`、私鑰、服務角色金鑰、API secret、部署密碼或本機平台 credential。

## 接手定位

| 項目 | 值 |
|---|---|
| 正式站 | [https://5wa.io/](https://5wa.io/) |
| WebDev project ID | `JVKbEsDaSG77ZpSY3BNH4p` |
| WebDev 專案名稱 | `5wa-token-site` |
| 工作區 | `/home/ubuntu/5wa-token-site` |
| 平台類型 | Manus WebDev `web-db-user` |
| 主要任務 | `https://manus.im/app/vMF8RVtw005JyjToqjQfNt` |
| 協作任務 | `https://manus.im/app/mQsKp4LJKeoakmY8JSEKNU` |
| 正式網域 | `5wa.io`、`www.5wa.io`、`5wa-token-jvkbesda.manus.space` |
| 交接前產品 checkpoint | `21d3a3676bfed0aa8b0d34ec379a3b98d866c9ac`（Phase 66） |
| 分支 | `main` |
| 套件管理器 | pnpm，鎖檔為 `pnpm-lock.yaml` |

WebDev project 可從 Manus 的同一專案工作區重新開啟；在具有該 project 權限的任務中，專案目錄應為 `/home/ubuntu/5wa-token-site`。若改以 ZIP 或 Git bundle 接手，請依 [DEPLOYMENT.md](./DEPLOYMENT.md) 的還原程序建立新工作目錄。

## 文件索引

| 文件 | 用途 |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 前後端架構、路由、資料流與主要程式定位 |
| [ASSETS.md](./ASSETS.md) | 正式站外部資產、Whitepaper PDF/Typst 備份與 SHA-256 |
| [INTEGRATIONS.md](./INTEGRATIONS.md) | Supabase、Groq、Mapbox、X、BNB Chain、Safe、儲存與 TIE 邊界 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 安裝、測試、建置、啟動、WebDev 發佈與還原程序 |
| [DATABASE.md](./DATABASE.md) | Drizzle/MySQL、Supabase table contract、RLS 與 migration 狀態 |
| [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) | 已知安全、資料、部署與產品風險 |
| [PROJECT_STATE.md](./PROJECT_STATE.md) | 正式站、checkpoint、工作樹、功能狀態與下一步 |
| [VALIDATION.md](./VALIDATION.md) | 安裝、型別、測試、build、routes 與外部整合驗證結果 |
| [env.example](./env.example) | 僅列變數名稱與用途的無秘密範例；平台政策禁止 Agent 直接建立 `.env.example` |

## 最短接手流程

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

正式啟動使用 `pnpm start`，預設監聽 `PORT=3000`。`pnpm db:push` 會產生並執行 MySQL migration，具有資料庫副作用；除非已核准 migration 且備份／環境均明確，接手時不要直接執行。

## 目前可直接維護的範圍

本 repository 足以維護 React/Vite 前端、Express/tRPC server、Location OpSec Guide、Guardian AI、Threat Globe/Mapbox、Airdrop UI、Whitepaper 網頁、OG routes、Whitepaper 下載代理及 Drizzle `users` schema。正式站的 Phase 66 英文／繁中 Guardian 已以實際瀏覽器與正式 tRPC 呼叫驗證。

本 repository **不足以重建**白皮書所稱的 TIE ingestion/classification 後台。RSS、Google News、Reddit、Lopp、每日 GitHub Actions、Llama 3.1 8B 分類器與 Supabase 寫回程式均不在本 repo。接手方必須取得另一個 pipeline repository／workflow，或將網站上的「Live」主張調整為可被證明的狀態。

## 安全交接原則

`.project-config.json`、`.env*`、`.manus-logs/`、`node_modules/` 與 `dist/` 不可加入交接 Git commit 或 ZIP。Supabase anon 與 Mapbox public token 是前端可見能力，不是後端 secret；安全性必須靠 RLS、scope 與網域限制。Supabase `service_role`、Groq、Forge、資料庫、JWT、GitHub token、AWS credential、錢包私鑰與助記詞只能由受控 secret store 供應。

> **重要：** 2026-09-19 的唯讀檢查確認公開 anon 可查詢 `airdrop_submissions` 的 `username`、`wallet_address`、`tweet_url`、`score` 與 `token_reward` 欄位，且表中有 2 筆記錄。未下載任何欄位值。這是必須優先修正的 RLS／grant 風險。
