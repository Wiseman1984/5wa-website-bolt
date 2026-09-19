# Database and Data Governance

5WA 同時使用兩個彼此獨立的資料層：Manus 提供的 MySQL/TiDB（Drizzle 管理）只保存 OAuth user；Supabase PostgreSQL 保存威脅事件與 Airdrop 提交。不要把 Drizzle migration 誤套到 Supabase。

## Drizzle / MySQL

`drizzle/schema.ts` 只定義 `users`。唯一 SQL migration `drizzle/0000_magenta_garia.sql` 建立該表；`server/db.ts` 只提供 `getDb`、`upsertUser` 與 `getUserByOpenId`。

| Column | Purpose |
|---|---|
| `id` | auto increment primary key |
| `openId` | OAuth user unique identifier |
| `name`、`email`、`loginMethod` | profile fields |
| `role` | `user` / `admin` |
| `createdAt`、`updatedAt`、`lastSignedIn` | timestamps |

`DATABASE_URL` 必須是 server-only secret。正常 public Guardian 不依賴 MySQL，也不寫入對話。

## Supabase project

Project ref：`fpcztzngjapxgxvvpeds`。本 repo 沒有 Supabase migration、DDL、schema dump、RLS policy、grant、retention 或 seed export。以下只是 client 程式期待的 contract，必須從 Supabase Dashboard/CLI 另行匯出並版本化。

### `threat_incidents`

| Field | Client expectation |
|---|---|
| `id` | incident identifier |
| `title` | display title |
| `country` | country label; `Unknown` 被排除 |
| `published_at` | date/timestamp;只讀 2024-01-01 以後 |
| `attack_type` | kidnapping / robbery / extortion / assault / home invasion 等 |
| `source_url` | public source URL；目前 Globe 未顯示可點來源 |
| `latitude`、`longitude` | map coordinates；缺值事件不繪製 |
| `severity` | nullable integer 1–10 |
| `ai_summary` | nullable concise summary |

正式只讀檢查顯示符合網站篩選的事件共 881 筆。這只證明 anon SELECT 可用，不證明欄位約束、來源品質、RLS 最小化或 TIE 寫入 identity。

### `airdrop_submissions`

Client insert contract：

| Field | Source |
|---|---|
| `username` | user input |
| `wallet_address` | user input，轉小寫 |
| `tweet_url` | user pasted X/Twitter status URL |
| `score` | browser-calculated |
| `token_reward` | browser-calculated |
| `question_ids` | browser-selected quiz IDs |
| `is_elite` | browser-calculated boolean |

程式捕捉 PostgreSQL `23505` 來顯示重複錢包訊息，但 repo 沒有 unique index 證據。UI 的格式檢查、score、reward 與 elite 都可被直接 API caller 偽造，不能作派獎依據。

## Confirmed RLS/grant risk

2026-09-19 使用 repository 中的 public anon 設定，以 HEAD/`limit=0` 查詢下列欄位：`username,wallet_address,tweet_url,score,token_reward`。Supabase 回 HTTP 206 與 `content-range: */2`，未下載任何記錄內容。這表示 public anon 目前可以 SELECT Airdrop submission rows/fields，包含可識別 wallet 與 social URL。

建議立即採取下列 SQL/policy 審查，但不要在未確認 production schema 前盲目執行：

1. 匯出 `pg_dump --schema-only`、RLS policies、grants、indexes 與 functions。
2. 對 `airdrop_submissions` 啟用 RLS，撤銷 anon SELECT/UPDATE/DELETE；若保留 anon INSERT，限制可寫欄位且最好改用 Edge Function/server endpoint。
3. 將 server-side score/reward recomputation、wallet signature、rate limit/captcha、X/人工驗證與審核狀態移入可信後端。
4. 對 `wallet_address` 建立適當 unique/case-normalized constraint，並定義 retention、刪除與資料主體請求流程。
5. `threat_incidents` 只公開地圖所需欄位；分類內部欄位與 ingestion metadata 不應由 anon 可見。

## Supabase credential separation

| Credential | 可否進 browser | RLS 行為 | 要求 |
|---|---|---|---|
| anon / publishable | 可以 | 受 RLS/grants 限制 | 視為公開；最小 policy、URL/project 管理、可輪替 |
| service_role / secret | **不可以** | 可繞過 RLS | 只放 server/CI secret store，絕不進 Git、ZIP、`VITE_` 或 chat |

目前 anon 設定硬編在 `client/src/lib/supabase.ts`。這不等於 service-role 洩漏，但應改為建置環境的 public variables，方便 staging/production 分離與 key rotation。即使移到 env，值仍會進 bundle，RLS 仍是必要防線。

## Migration ownership gap

TIE ingestion 若在外部 repository，該 repository 必須負責 Supabase schema migration、writer role、dedup/index、classification columns、source provenance 與 backfill。沒有這份外部 migration，就無法從本交接包完整重建 production data plane。
