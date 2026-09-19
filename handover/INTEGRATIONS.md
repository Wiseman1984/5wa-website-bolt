# Integrations

本文件只記錄整合名稱、用途、程式位置與權限邊界，不記錄任何 secret 值。判定分為「本 repo 已實作」、「外部／未納入本 repo」與「靜態連結／產品主張」。

## 整合總覽

| 服務 | 狀態 | 本 repo 的實際用途 | 接手要求 |
|---|---|---|---|
| Supabase | 已實作 | Threat Map/Guardian anon SELECT；Airdrop anon INSERT | 取得 Dashboard 權限、schema/RLS export 與 audit 權限；立即修正 Airdrop 公開 SELECT |
| Groq | 已實作 | Guardian server-side chat completions | 只在 server secret store 提供 `GROQ_API_KEY` |
| Mapbox | 已實作 | Flat Map，public browser token | `VITE_MAPBOX_TOKEN` 必須 URL-restricted、最小 scope |
| jsDelivr / world-atlas | 已實作 | 3D Globe 國界 TopoJSON | 增加失敗 fallback 或自有靜態副本 |
| Manus Forge / Storage | 已實作 | 背景資產 proxy、PDF 下載、平台 helpers | Server-only Forge key；確認 proxy allowlist 與物件權限 |
| X | 僅 web intent／外連 | 分享預填貼文與 profile link | 無 X API、OAuth 或貼文驗證 |
| BNB Smart Chain / BscScan | 現役外連；舊讀取程式未掛載 | 合約、burn、PinkLock、multisig 參考 | 無 server indexer；需鏈上人工／獨立程式驗證 |
| Gnosis Safe | 文件／靜態主張 | Whitepaper 宣稱 2/2 multi-sig | 本 repo 無 Safe SDK、threshold 查詢或交易流程 |
| GitHub Actions | 本 repo 無 workflow | Whitepaper 宣稱 TIE 每日執行 | 必須取得外部 workflow/repo，否則無法接管 |

## Supabase

Project ref 為 `fpcztzngjapxgxvvpeds`。`client/src/lib/supabase.ts` 目前硬編 public project URL 與 legacy anon JWT。anon key 會進入 browser，本質上不能當 secret；真正安全邊界是 RLS、grants、constraints 與受信任 server-side validation。任何 `service_role` 或 secret key 都不得進入 `client/`、Git、ZIP 或聊天。

正式使用路徑如下：

| 呼叫 | Table | 權限 |
|---|---|---|
| Home、Guardian | `threat_incidents` SELECT | public anon |
| Airdrop submit | `airdrop_submissions` INSERT | public anon |

2026-09-19 的只讀驗證確認 `threat_incidents` 可用 anon 讀取，2024+ 且非 Unknown 的符合記錄共 881 筆。更重要的是，anon 對 `airdrop_submissions` 的 `username`、`wallet_address`、`tweet_url`、`score`、`token_reward` SELECT 也回 206，`content-range: */2`。檢查使用 HEAD/limit=0，未下載資料值。這表示目前 policy/grant 至少暴露這些欄位，需視為 P0。

## Guardian AI / Groq

API 是 public tRPC mutation：

```http
POST /api/trpc/guardianAi.ask?batch=1
Content-Type: application/json
```

單一 batch input 的 `json` 內容包含 `question`、`regionId`、`scenarioId`、`language`、`conversation` 與 `incidents`。Server input contract 為：question 3–800 字元、conversation 最多 6 則且每則 1–1200、incidents 最多 12；region/scenario/language 都是 enum。

Groq endpoint 使用 OpenAI-compatible chat completions；固定模型 `openai/gpt-oss-20b`，temperature 0.2，`stream: false`，Guardian completion budget 900，timeout 30 秒。payload 沒有 `tools` 或 `tool_choice`。成功模型回應為 `{ answer, model, provider: "groq", readOnly: true }`；緊急與隱私 fast path 則回 `safety-protocol` 或 `privacy-protocol`。

安全邊界是：只能提供 defensive physical/operational security guidance；不得要求精確地址、即時位置、錢包／助記詞／私鑰；不得聲稱能轉帳、監控、追蹤、報警、聯絡第三方或執行行動。已知缺口見 [KNOWN_ISSUES.md](./KNOWN_ISSUES.md)。

## Threat Intelligence Engine（TIE）

Whitepaper 將下列能力標為 Live：8 個 RSS（CoinDesk、The Block、Cointelegraph、Decrypt、Bitcoin Magazine、Crypto Briefing、Blockworks Research、Unchained Podcast）、Google News、Reddit、Lopp Physical Attacks database、雙組關鍵字比對、三層去重、城市 geo-parsing、每日 GitHub Actions、Llama 3.1 8B severity/summary/confidence/type classification，以及 heuristic fallback。

**上述 ingestion/classification pipeline 不在本 repository。** 沒有 feed manifest、crawler、Reddit client、Lopp importer、cron、queue、GitHub workflow、Llama prompt、embedding job、寫回 worker 或相關 dependencies。接手方需要另一個 repository、workflow URL、secret 名稱清單、最近成功執行紀錄、資料寫回 identity、失敗重試與告警；如果不存在，應調整 Whitepaper/Platform 的 Live 文案。

目前網站只有讀取 TIE 已寫入 Supabase 的前端視覺化；Guardian 的 Groq 不是事件分類模型，也不寫回 `threat_incidents`。

## Mapbox 與 Globe

Mapbox 使用 `VITE_MAPBOX_TOKEN`（public client token）、`mapbox://styles/mapbox/dark-v11`、Mercator、`renderWorldCopies: false`、minZoom 1.5、maxZoom 12。Globe 動態 import `globe.gl` 並從 jsDelivr 取得 `world-atlas@2/countries-110m.json`。Mapbox token 未設定時 Flat Map 可能空白；正式接手需檢查 allowed origins 包含三個正式網域與 preview domain。

Mapbox popup 現以 `setHTML` 拼接 Supabase 事件欄位。任何可由外部 ingestion 寫入的 title/summary 都必須 escape；建議改用 `setDOMContent` 與 `textContent`。

## X、鏈上與 Safe

X 只有 `twitter.com/intent/tweet` 與 `x.com/5wa_io` 外連。Airdrop 不會使用 X API 驗證貼文；網站也不會自動發布。任何貼文驗證都需新建 server-side integration。

BNB Smart Chain、BscScan、PinkLock 與 Gnosis Safe 在現役頁面主要是靜態外連。未掛載的舊 Dashboard 有 browser-side BSC RPC/BscScan 讀取，但不屬於正式功能。本 repo 沒有錢包連線、簽名、轉帳、Safe transaction 或自動派獎；接手時不得把靜態連結當作程式化證明。

## Storage 與外部資產

Server 透過 `BUILT_IN_FORGE_API_URL` / `BUILT_IN_FORGE_API_KEY` 取得 presigned URL。現行程式引用四個 `/manus-storage/` 資產：全站背景、首頁 5WA 圖、Tokenomics allocation pie 與 unlock curve。Whitepaper download proxy 使用 managed key `5WA-Whitepaper-V5_c93926d0.pdf`，對使用者輸出 `5WA-Whitepaper-V5.pdf`。

交接 ZIP 另附一份正式站資產備份，但程式仍使用原 `/manus-storage/` URL；它是 disaster-recovery copy，不會自動改寫 runtime。Server 的公開 storage proxy 可對任意 key 取 presigned redirect，接手後應改成 allowlist 或確認 Forge 權限只覆蓋公共物件。
