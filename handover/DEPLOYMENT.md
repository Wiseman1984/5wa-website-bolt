# Deployment and Recovery

## Current hosting

目前部署屬 Manus WebDev managed project，而不是 Docker、GitHub Actions、Vercel 或自管 VM。非敏感識別如下：

| 項目 | 值 |
|---|---|
| Project ID | `JVKbEsDaSG77ZpSY3BNH4p` |
| Project name | `5wa-token-site` |
| Workspace | `/home/ubuntu/5wa-token-site` |
| Template | `web-db-user` |
| Default port | `3000` |
| Git backend | `GIT_BACKEND_S3` |
| Domains | `5wa.io`、`www.5wa.io`、`5wa-token-jvkbesda.manus.space` |

`.project-config.json` 是 WebDev 本機設定容器，已被 `.gitignore` 排除且含 credential；不得複製進 package。另一個有 project 權限的 Manus Agent 可在相同 Project ID 工作區開啟。若使用新 project，必須重新設定 domains、server secrets、public tokens 與 storage assets。

## Install, check, build and run

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

Development 由 `tsx watch server/_core/index.ts` 啟動 Express，Express 再掛 Vite。Production：

```bash
NODE_ENV=production PORT=3000 pnpm start
```

`pnpm build` 先執行 Vite build 到 `dist/public`，再用 esbuild bundle `server/_core/index.ts` 到 `dist/index.js`，並複製 Inter fonts。`dist/` 是可重建產物，不納入 handover source package。

Repository **沒有 lint script 或 ESLint config**。交接驗證應如實把 lint 標為「not configured」，不可把 typecheck 冒充 lint；可另跑 `pnpm exec prettier --check` 作格式檢查，但它不等於 lint。

## Database migration warning

`pnpm db:push` 執行 `drizzle-kit generate && drizzle-kit migrate`，只針對 Manus MySQL/TiDB 的 `users` 表，具有外部資料庫副作用。Supabase `threat_incidents` 與 `airdrop_submissions` 不受這個命令管理。接手初次驗證不得執行 `db:push`；先比對 migration、備份、目標 `DATABASE_URL` 與變更審查。

## WebDev deployment procedure

1. 在 project `JVKbEsDaSG77ZpSY3BNH4p` 內開啟 `/home/ubuntu/5wa-token-site`。
2. 確認 `git status`、base commit 與 `handover/PROJECT_STATE.md`。
3. 由 WebDev secret store 提供必要設定；不要建立或提交 `.env`。
4. 執行 frozen install、typecheck、test、build，以及必要的本地 browser smoke test。
5. 儲存 WebDev checkpoint；checkpoint 是平台 release trigger，不等於三個網域已同步。
6. 等待發布完成後，逐一驗證三個正式網域的實際渲染內容、`/__manus__/version.json`、靜態資產與 tRPC。只看 HTTP 200 不足以判斷版本，因未知 SPA paths 也回 200。
7. 若沒有明確使用者要求，**不要部署**。本交接任務沒有進行正式站 deployment。

## Production verification baseline

2026-09-19 驗證了下列 paths：`/`、`/platform`、`/guardian?...&lang=zh`、`/tokenomics`、`/airdrop`、`/whitepaper`、`/404`、`/og-default.png` 與 `/__manus__/version.json`。三個網域均回 HTTP 200，正式瀏覽器顯示繁中 Guardian。正式 tRPC 使用無敏感資訊問題「會議手機應如何設定？」成功回 `provider: groq`、`model: openai/gpt-oss-20b`、`readOnly: true` 與完整繁中五段回覆。

所有網域當時的 version endpoint 回：

```json
{"timestamp":1789374062892,"version":"2afaa5bb"}
```

這個 `2afaa5bb` 是部署產物版本，不是本地 Git object；本地產品 checkpoint 為 `21d3a367...`。線上內容與 Phase 66 功能相符，但目前沒有 source-controlled release manifest 把兩者作 cryptographic mapping。

## Git recovery

交接 ZIP 內的 `5wa-platform-site.bundle` 保存全部可達 refs。還原：

```bash
git clone 5wa-platform-site.bundle 5wa-platform-site
cd 5wa-platform-site
git switch main
pnpm install --frozen-lockfile
```

來源快照則可直接解壓，但完整歷史以 bundle 為準。交接提交之後應以 manifest 中的 commit hash 驗證：

```bash
git fsck --full
git status --short --branch
```

## GitHub mirror status

目標 private repo 名稱預定為 `Wiseman1984/5wa-platform-site`。本次目前連線的 GitHub credential 具有帳號讀取權，但 GitHub API 拒絕 `CreateRepository`，因此交接時無法建立／推送 repo。取得 `repo` / `CreateRepository` 權限後執行：

```bash
gh repo create Wiseman1984/5wa-platform-site --private \
  --description "Private source mirror and technical handover for the 5WA public security platform"
git remote add github https://github.com/Wiseman1984/5wa-platform-site.git
git push github main
git push github --tags
```

推送後以 `gh repo view ... --json visibility,viewerPermission` 驗證為 `PRIVATE` 且目前帳號具 `ADMIN`。另一個 Manus Agent 必須在其任務啟用同一 GitHub 帳號的 connector，或被加入為 collaborator；GitHub 不會僅因「是 Manus Agent」自動授權。

## Missing deploy manifests

目前沒有 Dockerfile、Compose、`.github/workflows`、Procfile、Nginx/Caddy、Vercel/Netlify/Render/Fly/Railway 設定。這些不是漏包，而是 repository 本來就不存在。若要從 WebDev 遷移到其他平台，需新增 container/process manifest、health/readiness、secret mapping、persistent DB strategy 與 domain/TLS 設定。
