# External Asset Manifest

正式網站的四個視覺資產與 Whitepaper PDF 不在 Git tracking source 中，而由 `/manus-storage/` 或下載代理提供。本次交接 ZIP 會把 2026-09-19 從正式站取得的副本放在 `external-assets/`，但不會把大型 media 加進 WebDev project 的 `client/public`。

| Packaged path | Runtime source | Size | SHA-256 |
|---|---|---:|---|
| `external-assets/production-static/bg_option_D_enhanced_750fa344.png` | `/manus-storage/bg_option_D_enhanced_750fa344.png` | 2,070,889 | `038367b55b624889b4c13f3f26e2246ed2d283d95b84c1c0ee1d43055f50a19e` |
| `external-assets/production-static/5wa-web_7427c5e1.png` | `/manus-storage/5wa-web_7427c5e1.png` | 2,089,701 | `d1b4f15d14d9bac857b99b8b2b285b9f6e7a0ca69528fcfd70995ef96e328e24` |
| `external-assets/production-static/5WA_3D_allocation_pie_059dfc43.webp` | `/manus-storage/5WA_3D_allocation_pie_059dfc43.webp` | 60,552 | `2083f48191e66852123fc63c530399cb8e06af84b2f7fe4f5be65c2e03b7fd43` |
| `external-assets/production-static/5WA_3D_unlock_curve_c95f1e4c.webp` | `/manus-storage/5WA_3D_unlock_curve_c95f1e4c.webp` | 80,024 | `7a3f71d8cc0b397fb1fb98aa2ee53157032e0dd85b5fd35d6d47631b5062b3f4` |
| `external-assets/production-static/5WA-Whitepaper-V5.pdf` | `/api/download/whitepaper` on `5wa.io` | 5,714,137 | `2cd774f0dfa2d13c1dc994948ac5996d032dace77afb9215302c0193c4f5d356` |
| `external-assets/whitepaper-source/whitepaper-v5.typ` | `/home/ubuntu/whitepaper-pdf/whitepaper-v5.typ` | 34,654 | `ab8daa961f43f1502ef41c58c5f103c0ae58d91c8a9ff442b68e6c5477d895e5` |

正式站 PDF 為 19 頁 Letter、CreationDate 2026-09-14。相同 download route 在本地 WebDev環境目前解析成 18 頁 A4、255,272 bytes 的不同物件。接手方不得用本地回應覆蓋上表正式副本，除非已確認 storage project scope 與 Whitepaper source-of-truth。
