# Known Issues and Risks

## Priority matrix

| Priority | Issue | Impact | Recommended action |
|---|---|---|---|
| P0 | Supabase anon 可 SELECT `airdrop_submissions` 個資欄位 | wallet、social URL、username 與 score 可被公開枚舉 | 立即撤銷 anon SELECT，審查 RLS/grants/audit log；評估通知與 key rotation |
| P0 | Airdrop score/reward/elite 由 client 計算並直接 INSERT | 可偽造資格與 reward，不能安全派獎 | 改 server-side session/scoring、wallet signature、X/人工驗證、rate limit |
| P0 | Development debug collector 記錄 Guardian request/response | 開發問題與模型回覆會落到 `.manus-logs`，與「不儲存」文案不一致 | 對 Guardian endpoint 禁止 body capture、清理 logs、定義 retention |
| P0 | Guardian 敏感資料 regex 覆蓋不足 | UI 禁止的 seed/private key/password/phone/ID/balance 仍可能送 Groq | Provider 前完整 block/redact，加入多語測試與不可逆 secret patterns |
| P1 | Mapbox popup 用 `setHTML` 插入 DB 字串 | 外部 ingestion 內容可形成 DOM XSS | 改 `setDOMContent`/`textContent` 或可信 sanitizer |
| P1 | Guardian rate limit 信任 XFF、只在 process memory、entries 無主動清理 | 可繞過、跨 instance 不一致、可造成成本／memory 壓力 | 由可信 proxy/CDN/Redis 實作分散式 rate limit 與 `Retry-After` |
| P1 | Guardian incidents 與 assistant history 由 client 提供 | 可偽造 context 或 prompt injection | Server 依 canonical IDs 查 Supabase，或簽署/驗證 context |
| P1 | TIE ingestion/classification 不在 repo | 無法重建 RSS/Google News/Reddit/Lopp、daily job、Llama 寫回 | 取得外部 repo/workflow；否則降低網站 Live 主張 |
| P1 | Storage proxy 可對任意 key 產 presigned redirect | 若 Forge key 權限過大，可能公開其他物件 | 路徑 allowlist、最小權限、rate limit 與 audit |
| P1 | Whitepaper PDF 先全量 buffer | 高併發或異常大檔造成 Node memory 壓力 | stream + timeout + content-length cap + CDN |
| P1 | Mapbox/Globe/Supabase 外部失敗缺少 UI fallback | 空白 map 或只有 console error | 明確 loading/error/empty state、static fallback |
| P2 | Unknown SPA route 也回 HTTP 200 | uptime checker 可能誤判 route 健康 | 對 hydrated content 做 smoke test；必要時 server-side 404 strategy |
| P2 | 無 source-controlled deploy manifest/CI | 線上 artifact 無法精確映射 commit | 建 release manifest、artifact hash、CI workflow 或 WebDev release record |
| P2 | 同一 Whitepaper key 在本地回 18 頁／255 KB，正式站回 19 頁／5.7 MB | storage scope 或 object resolution 不一致，可能回歸舊 PDF | 以 production PDF hash 為基準，釐清 Forge project scope、storage key 與 Typst source-of-truth |
| P2 | Production build 有多個 1.8–2.36 MB client chunks | 首次載入與低速裝置成本偏高 | 移除未使用 Streamdown/語言包、手動 code splitting、量測實際 route bundle |
| P2 | Footer Privacy/Terms 都指向 Whitepaper | 法律頁面與資料處理說明不足 | 建立獨立 privacy/terms，說明 Supabase/Groq 與 retention |
| P2 | `maximum-scale=1` | 阻止 browser zoom，降低可近用性 | 移除 viewport 限制並測試 responsive layout |
| P2 | Airdrop 賽季日期與 elite OG cap 不一致 | UI/分享卡可能顯示不同 reward 或時程 | 統一單一 season config；OG score 支援 1500 或明確 cap |
| P2 | Airdrop 頁沒有 Footer | 共用法律／CTA chrome 不一致 | 視產品要求補 Footer |
| P2 | 部分 Navigation 使用 pushState、其他 anchor reload | 導航行為不一致 | 統一 Wouter Link 或明確 full reload |
| P3 | 多個未掛載舊頁與元件 | 誤維護、依賴膨脹、死連結 | 移除或在新 feature 前重新審核 |

## Guardian boundary clarifications

「Read-only」代表 server 沒有工具、wallet、交易、追蹤、監控、第三方聯絡或 emergency dispatch 實作；它不代表模型輸出一定不會產生錯誤聲稱，也不代表資料從不離開 browser。正常問題、最近對話與公開事件摘要會送到 Groq，provider 的 logging/retention 需由帳戶合約另行確認。

Production code 沒有把 chat 寫到 MySQL/Supabase；language/region/scenario 會出現在 URL，language 也存 localStorage。IP rate-limit metadata 暫存在 server process。Development mode 的 Manus debug collector 是目前明確的本機持久化例外。

## Security scan status

交接前的 Git history/working-tree 靜態掃描未發現 Groq API key、GitHub token、Mapbox secret token、Supabase service-role、PEM、wallet private key 或 seed phrase。`client/src/lib/supabase.ts` 有 public anon credential；`.project-config.json` 未追蹤且含資料庫、JWT、Forge 與 AWS temporary credential 類欄位，已明確排除 package。唯一追蹤的 `.manus/db/db-query-error-*.json` 不含 password，但記錄了舊 TiDB host/user metadata；建議後續自 Git 歷史移除或至少停止追蹤這類診斷檔。

## GitHub permission gap

GitHub CLI 目前能以 `Wiseman1984` 讀取帳號，但 API 拒絕 `CreateRepository`。因此本次只能提供可驗證 Git bundle，不能保證 private GitHub URL 已建立。補齊 `repo` / `CreateRepository` scope 或由 owner 先建立空的 private repo 後，即可推送。
