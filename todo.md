# 5WA Token Site - Project TODO

## Phase 1: Infrastructure & Setup
- [x] Initialize web project with React + Node.js + Database
- [x] Configure dark mode theme with Tailwind CSS
- [x] Set up global styling with metal/industrial aesthetic

## Phase 2: Content & Copy
- [x] Write homepage content (project background & mission)
- [x] Write tokenomics page content
- [x] Write monthly burn mechanism explanation
- [x] Write blockchain verification section content
- [x] Write purchase guide content

## Phase 3: Frontend Pages & Components
- [x] Create responsive navigation system (desktop & mobile)
- [x] Design & build homepage with metal/security visual elements
- [x] Build tokenomics visualization page with charts
- [x] Create monthly burn mechanism explanation section
- [x] Build blockchain verification links section
- [x] Create purchase guide page with step-by-step instructions
- [x] Build token allocation chart visualization
- [x] Build burn progress tracker component
- [x] Implement responsive design for all pages
- [x] Integrate token logo in navigation and hero section
- [x] Apply background image to hero section

## Phase 4: Backend API & Data
- [x] Create API endpoints for tokenomics data (N/A - data now in i18n + on-chain)
- [x] Create API endpoints for burn progress data (N/A - data now in Dashboard via BSC RPC)
- [x] Create API endpoints for blockchain verification links (N/A - integrated into Dashboard page)
- [x] Implement mock data for token distribution (N/A - using real on-chain data)
- [x] Implement mock data for burn progress (N/A - using real on-chain data)

## Phase 5: Integration & Optimization
- [x] Integrate frontend with backend APIs (Dashboard uses BSC RPC directly)
- [x] Optimize dark mode styling across all pages
- [x] Add metal/industrial visual effects
- [x] Test responsive design
- [x] Optimize performance

## Phase 6: Testing & Deployment
- [x] Write unit tests for critical components
- [x] Test all blockchain verification links
- [x] Test purchase guide flow
- [x] Implement bilingual support (English & Traditional Chinese)
- [x] Add language switcher in navigation
- [x] Test language switching functionality
- [x] Add Real Cases page with true crime incidents
- [x] Integrate Real Cases into navigation
- [x] Support bilingual content for Real Cases
- [x] Run all tests - 9 tests passed
- [x] Fix nested anchor tag HTML structure error
- [x] Verify all tests pass after fix
- [x] Improve Chinese translations for better clarity and natural language
- [x] Create checkpoint before deployment
- [x] Deploy website (deployed to 5wa.io)
- [x] Verify all features working on production

## Phase 7: Chinese Typography Optimization
- [x] Optimize Chinese text line breaks and sentence structure
- [x] Improve readability of Chinese paragraphs
- [x] Test Chinese typography on all pages

## Phase 8: Bug Fixes
- [x] Add Chinese translations for homepage buttons (Explore Tokenomics, How to Buy)
- [x] Fix Chinese description text line breaks to avoid awkward cuts
- [x] Verify all tests pass after fixes

## Phase 9: Remove Chinese Language Support
- [x] Remove language switcher button from navigation
- [x] Remove LanguageProvider from App.tsx
- [x] Remove useLanguage Hook from all pages
- [x] Update all pages to use ENGLISH_CONTENT directly
- [x] Remove all Chinese translation references
- [x] Verify all tests pass (9 tests passed)
- [x] Confirm website is pure English interface

## Phase 10: Add Security Protection Guide Page
- [x] Research and organize security protection guide content
- [x] Extend i18n.ts with security guide data
- [x] Create SecurityGuide.tsx page component
- [x] Add SecurityGuide route to App.tsx
- [x] Add Security Guide link to Navigation
- [x] Verify all tests pass (9 tests passed)
- [x] Confirm Security Guide page displays correctly

## Phase 11: Add Interactive Airdrop Page
- [x] Extend i18n.ts with airdrop content and checklist items
- [x] Create Airdrop.tsx page component with interactive checklist
- [x] Implement scoring system (1-9 stars) and reward calculation
- [x] Add evaluation feedback messages based on score tiers
- [x] Implement X (Twitter) share functionality with pre-filled tweet
- [x] Add BSC wallet address validation (0x format)
- [x] Implement participation counter (2000 max participants)
- [x] Create wallet submission and success message flow
- [x] Add Airdrop link to Navigation
- [x] Write and run unit tests for Airdrop content (12 tests passed)
- [x] Verify all 21 tests pass

## Phase 12: Fix Brave Browser Compatibility
- [x] Remove unused useMemo import from Airdrop.tsx
- [x] Remove Google Fonts external links (fonts.googleapis.com, fonts.gstatic.com)
- [x] Disable Umami Analytics script to prevent Shields blocking
- [x] Add system font stack for offline rendering
- [x] Verify all 21 tests pass after changes
- [x] Confirm website loads without third-party blocking

## Phase 13: Enhance Airdrop Page with Interactive Flow and Visual Effects
- [x] Modify Airdrop.tsx to hide results until Submit button is clicked
- [x] Add Submit button that appears after all 9 items are checked
- [x] Add narrative section with "Why did we design the $5WA mechanism so cautiously?" content
- [x] Implement progress visualization (progress bar animation)
- [x] Create security card generation (Canvas) with star count and tier display
- [x] Add download and X share functionality for security cards
- [x] Update X share text to include #5WA #SafetyFirst hashtags
- [x] Add privacy statement at page bottom
- [x] Update i18n.ts with narrative content and privacy statement
- [x] Verify all 21 tests pass
- [x] Verify all features work correctly in browser testing

## Phase 14: Fix Airdrop Page Issues
- [x] Fix Submit button logic: allow 1+ items instead of requiring all 9
- [x] Fix star overflow in sidebar: reduce size and adjust spacing
- [x] Hide results until Submit is clicked: show placeholder text before submission
- [x] Update button text to reflect new logic
- [x] Verify all 21 tests pass
- [x] Test all fixes in browser: 1 item submission, star display, results visibility


## Phase 15: Add User Name Input and Upgrade Security Card Design
- [x] Add user name input field before checklist
- [x] Make user name field required (disable Start Assessment until filled)
- [x] Upgrade security card design with dark tech aesthetic
- [x] Add circuit board pattern and tech dots to card background
- [x] Display user name on card with @ prefix
- [x] Include stars, security level, tokens, and hashtags on card
- [x] Add blue glow border effect to card
- [x] Test complete flow with user name input
- [x] Verify card generation with user name and tech aesthetic
- [x] Verify all 21 tests still pass


## Phase 16: Replace Stars with Neon Shield Icons and Circuit Board Background
- [x] Create NeonShield component with glowing shield SVG icon
- [x] Update card generation to use circuit board background image
- [x] Replace all star displays with neon shield icons on web results
- [x] Replace all star displays with neon shield icons on downloaded card
- [x] Verify web results show 9/9 shields with neon glow
- [x] Verify downloaded card has circuit board background and shields
- [x] Test all features work correctly with new design
- [x] Verify all 21 tests pass

## Phase 17: Whitepaper Page
- [x] Create Whitepaper page with all 6 sections from official document
- [x] Add sidebar TOC navigation with smooth scroll and active section highlighting
- [x] Add PDF download button (uploaded to S3)
- [x] Fix useLanguage hook error by using direct ENGLISH_CONTENT import
- [x] Add Whitepaper link to navigation

## Phase 18: Content Alignment with Whitepaper
- [x] Fix "$5 Wrench Attack" quotation marks in How to Buy page
- [x] Align all website data with whitepaper (36-month vesting, 50% genesis burn, 90% target)
- [x] Integrate 3D pie chart into Tokenomics page
- [x] Integrate dual-track vesting flow diagram into Burn Mechanism page
- [x] Integrate timeline roadmap into Whitepaper page

## Phase 19: Comprehensive Audit Fixes
- [x] Fix home page stats (50% Genesis Burn, 46.25% Linear Vesting Reserve, 3.75% Circulating)
- [x] Fix Burn Mechanism text (36-month vesting, quarterly strategic burns)
- [x] Fix Verification page (real contract address, BNB Smart Chain, BscScan links)
- [x] Fix Real Cases dates to past dates
- [x] Add required field markers (*) to Airdrop form
- [x] Apply global circuit board background to all pages

## Phase 20: Supabase Integration for Airdrop
- [x] Install @supabase/supabase-js package
- [x] Create Supabase client with anon key
- [x] Implement form submission to airdrop_submissions table
- [x] Display real-time participant count (XX/2000) from database
- [x] Show success confirmation after submission
- [x] Handle duplicate wallet_address with friendly error message
- [x] Implement complete flow: checklist → download card → post on X → paste tweet URL → submit wallet
- [x] Add "rewards distributed after event ends" notice

## Phase 21: BscScan Audit - Fix Placeholders, Broken Links & Incomplete Content
- [x] Fix BuyGuide fake contract address (0x5WA5WA5WA...) → real address
- [x] Fix BuyGuide i18n step 3 fake contract address
- [x] Fix BuyGuide DEX references (Uniswap/ETH) → PancakeSwap (BSC)
- [x] Fix Verification burn history txHash links (etherscan → bscscan)
- [x] Fix Verification text mentioning "Ethereum" and "Etherscan" → BSC/BscScan
- [x] Fix Verification PinkLock address (same as token contract, needs real PinkLock address)
- [x] Fix Verification burn history fake txHash entries → show real genesis burn tx
- [x] Fix Footer copyright year 2024 → 2025
- [x] Fix Footer Privacy/Terms/Contact href="#" → Privacy→/whitepaper, Contact→mailto:admin@5wa.io
- [x] Add Navigation and Footer to RealCases.tsx
- [x] Add Navigation and Footer to SecurityGuide.tsx
- [x] Fix bitcoinmagazine.com 403 links → alternative accessible sources (NY Post, KuCoin News)
- [x] Add Navigation and Footer to Whitepaper.tsx
- [x] Fix contract address to checksummed format (0x392A6a...)
- [x] Update BscScan link to /token/ format
- [x] Update tokenomics: Initial Circulation 200M→50M (0.625%)
- [x] Update airdrop narrative 24-month→36-month
- [x] Update whitepaper allocation Initial Circulation 200M→50M
- [x] Fix case-5/case-6 source field names (Bitcoin Magazine → NY Post/KuCoin News)

## Phase 22: Major Website Overhaul (New Whitepaper)
- [x] Rewrite Tokenomics page: Total Supply 1B (after burn), 5% Initial Circulation (50M), 75% Trust Lock-up (750M, PinkLock 24-month daily linear from Jan 2027), 20% Ecosystem Reserve (10% Liquidity 100M, 5% Partner 50M, 5% Dev/Audit 50M)
- [x] Create new Dashboard page (/dashboard) with real-time on-chain wallet data for 3 addresses
- [x] Dashboard: Show 5WA token balance for each wallet via BSC RPC/BscScan API
- [x] Dashboard: Show recent transactions for each wallet
- [x] Dashboard: PinkLock unlock progress bar (750M tokens, 24-month daily linear from Jan 1 2027)
- [x] Dashboard: Integrate old Verification page burn proof content (genesis burn 4B, tx hash)
- [x] Dashboard: Link each address to BscScan
- [x] Update Whitepaper page content to match new whitepaper
- [x] Replace Whitepaper PDF download with new file (5WA_Whitepaper_EN_Final.pdf)
- [x] Adjust Burn Mechanism page: 4B burned already (from 8B), 3B additional planned, final target 1B
- [x] Update Navigation: Add "Dashboard", Remove "Verification"
- [x] Update Footer: Add "Dashboard", Remove "Verification"
- [x] Update BuyGuide: Mention DODO crowdfunding mechanism with "Coming Soon" status
- [x] Update i18n.ts type definitions and content for all changes
- [x] Add Dashboard route to App.tsx
- [x] Run all tests and verify no regressions

## Phase 23: Whitepaper V4 Major Update
- [x] Update Homepage hero: tagline → "Decentralized AI-Powered Physical Security Platform", description updated
- [x] Create new /platform page with Threat Model, Product Architecture, System Architecture image
- [x] Update Tokenomics page: add 3D allocation pie image, 3D unlock curve image, Token Utility section (5 use cases)
- [x] Update Roadmap section with expanded 3-phase roadmap (2026 Q2-Q4, 2027 Q1-Q2, 2027 Q3+)
- [x] Update Whitepaper page: replace PDF with V4, update content summary
- [x] Add "Platform" link to Navigation (between Home and Tokenomics)

## Phase 24: Burn Mechanism COMPLETED Tone + Airdrop Season 1 Redesign
- [x] Burn Mechanism: Change "Planned Additional Burn" to "Strategic Burn — Completed"
- [x] Burn Mechanism: Change all future tense to past tense (will be → has been)
- [x] Burn Mechanism: Update progress bar to show 87.5% fully burned
- [x] Burn Mechanism: Add clear "Total Burned: 7B (87.5%) ✅ Complete" status indicator
- [x] Burn Mechanism: Rewrite "How It Works" to past tense
- [x] Airdrop: Redesign as Season 1: Physical Security Basics (Jul-Aug 2026)
- [x] Airdrop: Replace 9-item checklist with 6 multiple-choice quiz questions
- [x] Airdrop: Add season badge and seasonal campaign intro
- [x] Airdrop: Keep same submission flow (Tweet URL + BSC wallet)
- [x] Airdrop: Keep scoring/reward mechanism
- [x] Run tests and save checkpoint

## Phase 25: Dynamic OG Image Generation for Airdrop Share

- [x] Install @napi-rs/canvas for server-side image generation
- [x] Create /api/og-image endpoint (1200x630px, dark cyberpunk aesthetic)
- [x] Create /airdrop/share route with dynamic OG meta tags
- [x] Implement bot detection (Twitter/X crawler vs regular user redirect)
- [x] Update Airdrop share button to use new share URL with score params
- [x] Write vitest tests for OG image endpoint
- [x] Verify meta tags render correctly for Twitter card preview
- [x] Remove Download Card feature from Airdrop page (canvas code, download button, generateSecurityCard function)
- [x] Simplify flow steps indicator from 5 steps to 4 steps (Take Quiz → Share on X → Paste Tweet URL → Submit Wallet)
- [x] Update step numbering in sidebar cards to match new 4-step flow

## Phase 26: Fix OG Image - Replace native canvas with WASM-based satori + resvg

- [x] Remove @napi-rs/canvas dependency (requires native Cairo/Pango, fails in production)
- [x] Install satori + @resvg/resvg-js (pure WASM, no native deps)
- [x] Rewrite /api/og-image endpoint using satori (JSX→SVG) + resvg (SVG→PNG)
- [x] Ensure 1200x630px output with dark cyberpunk aesthetic
- [x] Verify endpoint returns proper Content-Type: image/png header
- [x] Update vitest tests for new implementation
- [x] Test endpoint returns valid PNG in sandbox
- [x] Add cache-busting timestamp parameter to Share on X URL (prevents Twitter cached OG images)
- [x] Verify /airdrop/share route ignores extra &t parameter

## Phase 27: Burn Transactions, PinkLock Links, Live Unlock Progress

- [x] Add Strategic Burn Tx 1 (500M) and Tx 2 (2.5B) with BscScan links to Burn Mechanism page
- [x] Add Multi-sig Governance Wallet address and link
- [x] Add new verification links (Strategic Burn Tx 1, Tx 2, Multi-sig Wallet)
- [x] Fix PinkLock links to correct V2 URLs (record/1653235)
- [x] PinkLock Unlock Progress already dynamic (Dashboard.tsx calculates from current date)
- [x] Verify Dashboard page reflects correct burn totals (7B = 4B genesis + 3B strategic)
- [x] Ensure all pages are consistent with burn data

## Phase 28: Per-Page OG Meta Tags

- [x] Create /api/og-default endpoint (generic 5WA branded 1200x630 image)
- [x] Build usePageMeta hook for dynamic head tag injection
- [x] Update index.html with default OG fallback tags
- [x] Add OG meta to Home page (/)
- [x] Add OG meta to Platform page (/platform)
- [x] Add OG meta to Tokenomics page (/tokenomics)
- [x] Add OG meta to Burn Mechanism page (/burn-mechanism)
- [x] Add OG meta to Dashboard page (/dashboard)
- [x] Verify all pages have correct og:title, og:description, og:image, twitter:card tags

## Phase 30: Supabase question_ids Recording
- [x] Add question_ids column (TEXT/JSON) to Supabase airdrop_submissions table (done in Supabase Dashboard)
- [x] Update AirdropSubmission interface to include question_ids and is_elite fields
- [x] Update Airdrop.tsx to pass sessionQuestions IDs (comma-separated) and isElite flag in submission payload
- [x] Capture Elite Guardian golden card screenshot (see attachment)

## Phase 29: Quiz Expansion (6→18 Questions + Random Shuffle)

- [x] Create shared/quizData.ts with full 18-question pool (correct answers + explanations)
- [x] Rewrite Airdrop.tsx: random session selection (6 from 18), shuffle option order per session
- [x] Reward per question: Basic=100, Intermediate=150, Advanced=200 (shown inline per question)
- [x] Score display shows correct/total from randomized session
- [x] Share text includes score, correct count, and level
- [x] Update airdrop.test.ts for new quiz structure (29 tests: 9 i18n + 11 pool + 9 session)
- [x] Verify quiz session is re-randomized on each page load (useMemo with no deps)
- [x] Implement 1000 5WA reward cap (Math.min(rawReward, 1000))
- [x] Implement hidden Elite Guardian bonus (4 Advanced + 2 Intermediate, all correct = 1500 5WA)
- [x] Add elite celebration UI (gold card, Trophy/Sparkles icons, "Hidden Achievement Unlocked!")
- [x] Update share text for elite vs normal (different tweet format)
- [x] Add 4 new calculateReward tests (cap, elite, non-elite, zero)

## Phase 31: Major Site Restructure (10 pages → 5 pages)
- [x] Update Navigation to 5 items: Home | Platform | Tokenomics | Airdrop | Whitepaper
- [x] Update App.tsx routing to only 5 pages + /airdrop/share + NotFound
- [x] Remove old pages from routing: BurnMechanism, Dashboard, BuyGuide, RealCases, SecurityGuide, Verification
- [x] Home: Keep hero + Add interactive Threat Map (Supabase real-time) + Airdrop CTA section
- [x] Threat Map: Neon cyan wireframe world map, red pulsing dots, 3 stat cards, hover tooltips
- [x] Supabase RLS: Enable anonymous SELECT on threat_incidents table (needs user action)
- [x] Platform: Section 1 - How It Works (Detect → Analyze → Alert)
- [x] Platform: Section 2 - Development Status (Live/In Dev/Planned features with DevLog links)
- [x] Platform: Section 3 - Guardian Network concept overview
- [x] Platform: Section 4 - Token Lifecycle Timeline (circuit board infographic)
- [x] Tokenomics: Reviewed — already has Supply Basis note + distribution table (no major changes needed)
- [x] Whitepaper V4.1: Add "Token is Incentive Layer, Product is Value Layer" framing
- [x] Whitepaper V4.1: Guardian Network verification mechanism (multi-source, staking/slashing)
- [x] Whitepaper V4.1: Cyberpunk terminology (Firewall Meltdown Protocol, Clearance Levels, Integrity Breach Penalty, Threat Confirmation Bounty)
- [x] Whitepaper V4.1: Anti-spam/false-report measures section (5 mechanisms)
- [x] Whitepaper V4.1: Development roadmap with 4 phases (Foundation → Guardian Network → Decentralized Resilience → Global Infrastructure)
- [x] Update OG meta page-meta.ts for new 5-page structure (removed /burn-mechanism, /dashboard; added /whitepaper)
- [x] Update Footer.tsx quick links to match 5-page structure
- [x] Verify all 54 tests pass and TypeScript 0 errors

## Phase 32: Fix Threat Map — Add Proper World Map Outline
- [x] Install D3.js + TopoJSON dependencies for geographic rendering (d3-geo, topojson-client, world-atlas)
- [x] Replace simplified SVG paths with proper world map using D3 geoNaturalEarth1 projection + TopoJSON (land-110m + countries-110m)
- [x] Position threat dots at correct geographic coordinates using D3 projection (lon/lat → SVG xy)
- [x] Remove "Region Boundary" legend item (replaced with "Continent Outline")
- [x] Style: dark navy background (#060b14), thin glowing cyan continent outlines, red pulsing dots with SVG animate
- [x] Ensure map fills section width properly (responsive via ResizeObserver + fitSize)
- [x] Verify all 54 tests pass and TypeScript 0 errors

## Phase 33: Threat Map Zoom/Pan + Insert Real Incidents
- [x] Add zoom/pan to ThreatMap (scroll wheel zoom, drag pan, pinch-to-zoom mobile)
- [x] Add +/- zoom buttons and Reset button (appears when zoomed)
- [x] Smooth zoom transitions (0.2s ease-out CSS transition)
- [x] Keep pulse animations working during zoom (SVG animate inside transform group)
- [x] Insert 24 real 2024-2026 threat incidents into Supabase (20 countries covered)
- [x] Deploy updated site (public, live at 5wa.io)

## Phase 36: Whitepaper V5 Content Update
- [x] Rewrite Whitepaper.tsx with V5 content (10 sections + appendix)
- [x] Update TOC to match V5 sections (What's New, Why, Threat Model, Architecture, Tokenomics, Roadmap, Governance, Business, Competitive, Technical, Disclaimer)
- [x] Roadmap: Phase-based with no dates, ✅/🔄/⏳ status markers
- [x] Section 8: Competitive landscape comparison table (Chainalysis vs CrowdStrike vs Ledger vs $5WA)
- [x] Download PDF button links to # (placeholder)
- [x] Update page meta to V5
- [x] Deploy (public, live at 5wa.io)

## Phase 37: Whitepaper V5 PDF Generation & Hosting
- [x] Generate dark-themed PDF from V5 content using WeasyPrint (23 pages, 135KB)
- [x] Upload PDF as static webdev asset (/manus-storage/5WA-Whitepaper-V5_f37e3220.pdf)
- [x] Update Download PDF button to link to actual PDF with correct filename
- [x] TypeScript 0 errors, 54 tests pass
- [x] Deploy

## Phase 38: Whitepaper V5 PDF Redesign with Typst
- [x] Read Typst PDF maker skill and rebuild Whitepaper V5 PDF in Typst (16 pages, 141KB)
- [x] Apply dark cyberpunk styling: dark #0a0a0f background, cyan #00d4ff headings, zebra-striped tables, colored status badges
- [x] Add professional cover page with $5WA title, V5.0, tagline, date, and website
- [x] Add page numbers in footer (page X + 5wa.io + $5WA Whitepaper V5.0)
- [x] Create AI workflow visual diagram (8-step grid with LIVE/PLANNED status badges)
- [x] Upload the regenerated PDF as static asset (/manus-storage/5WA-Whitepaper-V5_478bfe3d.pdf)
- [x] Update the Download PDF button to link to new Typst-generated PDF
- [x] TypeScript 0 errors, 54 tests pass, deploy

## Phase 39: Fix PDF Download Filename (Server-Side Proxy)
- [x] Create server/download-routes.ts with /api/download/whitepaper endpoint
- [x] Endpoint fetches PDF from CDN via presigned URL and streams with Content-Disposition: attachment; filename="5WA-Whitepaper-V5.pdf"
- [x] Register download routes in server/_core/index.ts
- [x] Update Whitepaper.tsx download button to use /api/download/whitepaper (same-origin, bypasses cross-origin restriction)
- [x] Verified: endpoint returns HTTP 200, Content-Type: application/pdf, Content-Disposition with clean filename
- [x] TypeScript 0 errors, 54 tests pass
- [x] Deploy

## Phase 40: Update OG Image to Threat Map Visual
- [x] Generate new 1200x630 OG image: dark cyberpunk world map with neon cyan wireframe continents, red threat dots, "$5 Wrench Attack" title, subtitle, 5wa.io, HUD corner brackets
- [x] Update DEFAULT_OG_IMAGE in page-meta.ts to CDN URL of new threat map image
- [x] Update homepage "/" ogImage to explicitly use the new threat map image
- [x] Update homepage description to focus on threat intelligence (not token stats)
- [x] TypeScript 0 errors, 54 tests pass
- [x] Deploy

## Phase 41: 7 UX Improvements Batch
- [x] Navigation bar: solid dark background (#0b1120) instead of transparent (fix text overlap on scroll)
- [x] Navigation bar: fix dark theme --background opacity from 0% to 100%
- [x] Threat Map: scroll wheel zooms map instead of scrolling page (e.preventDefault on wheel event)
- [x] Threat Map: "Scroll to zoom · Drag to pan" hint text
- [x] Threat Map: severity color grading (7-10=red, 4-6=amber, 1-3=yellow, null=red default)
- [x] Threat Map: ai_summary shown in tooltip when available (falls back to title)
- [x] Threat Map: updated legend with High/Medium/Low severity indicators
- [x] Airdrop: post-submit modal (Dialog) with score, share button, tweet URL input, wallet input, submit button
- [x] Airdrop: added #Airdrop hashtag to share text
- [x] Home: enhanced Airdrop CTA banner (ACTIVE NOW badge, prominent Start Quiz button, dark card with glow)
- [x] Footer: added Airdrop CTA banner above 3-column grid on all pages
- [x] Supabase query: added severity and ai_summary columns to fetch
- [x] All 54 tests pass, TypeScript 0 errors

## Phase 42: Critical Threat Map Wheel Scroll Interception
- [x] Replace React wheel handler with a non-passive native wheel listener on the Threat Map container
- [x] Prevent default page scroll and stop propagation while the pointer is inside the map
- [x] Preserve map-only zoom behavior and restore normal page scrolling outside the map
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 43: Threat Map Zoom Controls and Dense-Incident Refinements
- [x] Move zoom controls flush to the right edge with a minimal 8px margin
- [x] Make zoom controls compact on mobile (32px; 36px from sm breakpoint)
- [x] Increase maximum zoom from 6x to 20x
- [x] Reduce incident dot and pulse radii by approximately 20-25% to improve dense-area readability
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 44: Fixed-Size Threat Map Incident Dots
- [x] Apply inverse zoom scaling to core dots, glow circles, and pulse rings
- [x] Reduce pulse/glow intensity at high zoom levels
- [x] Preserve incident position separation while keeping visual dot size fixed
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 45: Whitepaper V5 Live AI Classification Update
- [x] Mark Phase 1 AI Classification Layer as ✅ LIVE with Llama 3.1 8B capabilities
- [x] Mark Intelligence Evolution Tier 2 as ✅ LIVE
- [x] Move LLM-Powered Classification Layer into TIE Current Implementation
- [x] Remove completed LLM-Powered Threat Classification from Phase 2 roadmap
- [x] Add Tier 2 AI Classification row to Appendix Key Metrics
- [x] Update Last Updated date to August 15, 2026
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 46: Trust-First Homepage CTA and Platform Live Status
- [x] Remove the View Tokenomics CTA from the homepage hero
- [x] Mark Threat Map Analytics as Live in Platform Development Status with AI severity grading, color-coded dots, and zoom/pan
- [x] Add a Live AI Classification status card with the Brain icon and Llama 3.1 8B capabilities
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 47: Homepage Tokenomics Footnote Cleanup
- [x] Remove the obsolete Final Supply / 87.5% genesis burn footnote from the homepage
- [x] Verify TypeScript 0 errors and all 54 tests pass; checkpoint and deploy

## Phase 48: Cursor-Focused Map Zoom and Navigation Consistency
- [x] Correct wheel zoom focal-point math using normalized SVG cursor coordinates
- [x] Change homepage CTA to View Threat Map with smooth in-page scroll
- [x] Add the shared sticky Navigation bar to the Airdrop page
- [x] Verify TypeScript 0 errors and all 56 tests pass; checkpoint and deploy
- [x] Add a regression test proving cursor-focused zoom preserves the focal map point

## Phase 49: Global Fixed Circuit-Board Background
- [x] Add the provided background image to managed static web assets (/manus-storage/bg_option_D_enhanced_750fa344.png)
- [x] Apply it as a fixed, cover-sized global background across all five pages
- [x] Ensure long pages retain background coverage without blank gaps (fixed attachment)
- [x] Verify Home, Platform, Tokenomics, Airdrop, and Whitepaper via headless Chromium at top and bottom
- [x] Verify TypeScript 0 errors and all 56 tests pass; checkpoint and deploy

## Phase 50: 3D Globe + Mapbox Flat Map Threat Visualization
- [x] Install globe.gl, react-globe.gl, and mapbox-gl dependencies
- [x] Store Mapbox public token as VITE_MAPBOX_TOKEN env variable
- [x] Build 3D Globe component (globe.gl, PCB-style continents, auto-rotate, severity-colored dots, tooltip)
- [x] Build Mapbox flat map component (dark custom style, same dots/tooltip, zoom controls)
- [x] Integrate globe-to-map transition (fade crossfade on zoom or button click)
- [x] Replace the old ThreatMap on Home page with the new ThreatGlobe component
- [x] Keep stats bar and legend, update legend for new views (High/Medium/Low/Borders)
- [x] Mobile responsive (touch rotate globe, button to switch to flat map)
- [x] Verify TypeScript 0 errors, 56 tests pass; checkpoint and deploy

## Phase 51: Critical Mapbox Flat Map Reliability Fixes
- [x] Use Mapbox Dark v11 as the base style and apply brand color overrides
- [x] Validate the configured Mapbox public token against Dark v11 style and vector tile endpoints
- [x] Disable horizontal world copies and enforce a 1.5 minimum zoom
- [x] Return to Globe View automatically at the flat-map minimum zoom
- [x] Preserve window scroll position during Globe ↔ Flat Map transitions
- [x] Reduce flat-map incident core to 4px and glow to 10px
- [x] Verify TypeScript 0 errors and all 57 tests pass; checkpoint and deploy

## Phase 52: Mapbox Border and Road Visual Refinement
- [x] Reduce country/admin border brightness and width for subtle circuit-trace styling (#0c7a8a / #0a6070)
- [x] Make state/admin borders finer than country borders with zoom-aware width and opacity
- [x] Preserve muted motorway, trunk, primary, secondary, and street road layers at city zoom
- [x] Verify TypeScript 0 errors and all 57 tests pass; checkpoint and deploy

## Phase 53: Rectangular Flat Map and City-Level Zoom Limit
- [x] Remove inherited circular clipping by forcing Mapbox's rectangular Mercator projection
- [x] Constrain Mapbox maximum zoom to 12
- [x] Add a regression test for Mercator projection and the 12× zoom cap
- [x] Verify TypeScript 0 errors and all 58 tests pass; checkpoint and deploy

## Phase 54: Global Mapbox Boundary and Coastline Consistency
- [x] Target native admin-0 and admin-1 Mapbox boundaries explicitly across all regions
- [x] Remove any regional custom boundary dependency and standardize global teal border styling
- [x] Add visible coastlines with #050a14 water, #0f172a land, and #0a5060 shoreline trace
- [x] Confirm global road visibility remains enabled at city zoom
- [x] Verify TypeScript 0 errors and all 58 tests pass; checkpoint and deploy

## Phase 55: Globe Size Lock and PCB Continent Texture
- [x] Set the initial 3D globe size to match the approved medium-large reference
- [x] Constrain maximum camera distance so the globe cannot shrink into a tiny dot
- [x] Preserve drag rotation, controlled zoom, auto-rotation, tooltips, and Flat Map transition
- [x] Add geographic PCB/circuit texture plus land-clipped trace paths across continent surfaces
- [x] Verify desktop and mobile sizing and add Globe configuration regression tests (61 tests passing)
- [x] Re-run TypeScript 0 errors and all 61 tests pass on the restored Globe version
- [x] Create release checkpoint, publish publicly, and confirm 5wa.io / platform domain return HTTP 200

## Phase 56: Globe Motion, Zoom Transition, and Ambient PCB Effects
- [x] Diagnose auto-rotation and zoom-to-Flat-Map behavior against the supplied recording
- [x] Restore visible slow Globe auto-rotation with interaction pause and automatic resume
- [x] Trigger Flat Map transition when continuous zoom reaches the configured camera-distance threshold
- [x] Add low-contrast PCB traces, data flows, nodes, and scan rings around the Globe
- [x] Verify desktop/mobile behavior, checkpoint, and deploy

## Phase 57: Globe.gl Path API Compatibility Repair
- [x] Remove unsupported `pathAltitude()` call that prevents Threat Globe initialization
- [x] Use supported `pathPointAlt` to keep PCB traces above the globe surface
- [x] Verify refreshed browser console is free of new Threat Globe initialization errors
- [x] Checkpoint and deploy the repaired Globe

## Phase 58: Globe Vertical Framing and Zoom Behavior Repair
- [x] Analyze the supplied zoom recording and identify the layout/transition defect
- [x] Eliminate excessive empty space below the Globe by aligning canvas and atmosphere geometry
- [x] Keep the full Globe vertically centered in the map container
- [x] Correct the recorded zoom behavior and preserve automatic Flat Map transition
- [x] Verify desktop/mobile layout, checkpoint, and deploy

## Phase 59: Shared Map Viewport and Wheel Isolation
- [x] Place Globe and Flat Map in the same fixed, vertically centered viewport geometry
- [x] Remove mode-specific absolute/relative positioning that creates blank top or bottom space
- [x] Fully prevent page scrolling while wheel gestures occur inside either map mode
- [x] Preserve intentional Globe-to-Flat-Map and Flat-Map-to-Globe thresholds without viewport jumps
- [x] Verify TypeScript 0 errors, all 61 tests pass, and desktop/mobile layout is compact

## Phase 60: Flat Map Controls and Incident Card Refinement
- [x] Move Mapbox zoom controls below the Globe View toggle without overlap
- [x] Restyle Mapbox incident popup container and tip with low-contrast dark cyberpunk borders
- [x] Preserve incident title, date, location, attack type, and severity readability
- [x] Verify TypeScript 0 errors and all 61 tests pass; checkpoint and deploy

## Phase 61: Location OpSec Guide
- [x] Add region and scenario selectors without requesting or storing precise user location
- [x] Provide deterministic risk posture, priority actions, travel/meeting/home/OTC guidance, and emergency checklist
- [x] Add privacy and non-emergency-service notices in the Guide UI
- [x] Integrate the Guide as a prominent interactive Platform section

## Phase 62: Read-Only Guardian AI
- [x] Add a server-side public tRPC procedure using Groq GPT-OSS 20B with strict input limits
- [x] Restrict Guardian AI to read-only advice with no tools, actions, persistence, or precise-location collection
- [x] Ground responses in the selected Guide context and public 2024+ threat incident summaries
- [x] Add prompt-injection resistance, emergency escalation language, and safe refusal boundaries
- [x] Integrate the AI conversation below the Guide with loading, error, empty, and suggested-question states
- [x] Add tests for Guide rules, AI request validation, safety prompt, and response parsing
- [x] Verify desktop/mobile UX, checkpoint, deploy publicly, and confirm production health

## Phase 63: Correct Guardian AI Provider to Groq
- [x] Inspect available Groq connector/credentials and confirm the intended production model
- [x] Replace the incorrect built-in-model invocation path with a server-side Groq client while preserving no-tools and no-persistence boundaries
- [x] Remove incorrect Provider references from Platform and Guardian AI UI copy
- [x] Update provider/model tests and mock all normal test-suite AI calls
- [x] Verify one live Groq response plus privacy and emergency fast paths
- [x] Re-run production build, TypeScript, all tests, desktop/mobile visual checks, checkpoint, deploy, and confirm production health

## Phase 64: Separate Guardian AI Page (Option B)
- [x] Add a dedicated `/guardian` public route using the existing read-only Groq Guardian AI panel
- [x] Remove the full chat panel from `/platform` while keeping Location OpSec Guide focused and readable
- [x] Add a clear Guide-to-Guardian CTA that carries broad region and scenario only through URL parameters
- [x] Add Guardian AI navigation and preserve privacy, emergency, no-tools, and no-persistence notices
- [x] Verify direct `/guardian` visits use safe defaults and reject invalid URL context
- [x] Run TypeScript, all tests, production build, desktop/mobile visual checks, checkpoint, deploy, and verify production health

## Phase 65: Information Architecture Cleanup and Public Progress Update
- [x] Audit Home, Platform, Tokenomics, Whitepaper, and downloadable PDF for duplication and outdated implementation status
- [x] Remove the large repeated Airdrop banner from Home while retaining the compact site-wide footer CTA
- [x] Remove Token Lifecycle and token-focused closing copy from Platform; preserve a concise non-promotional exit path
- [x] Integrate or refine Token Lifecycle on Tokenomics without duplicating existing supply explanations
- [x] Update Whitepaper to mark Location OpSec Guide MVP and read-only Guardian AI live, document Groq GPT-OSS 20B, and align roadmap/status tables
- [x] Synchronize the downloadable Whitepaper with the updated public content and maintain the clean download filename
- [x] Produce an English and Traditional Chinese X DevLog progress article without posting it automatically
- [x] Run TypeScript, all tests, production build, desktop/mobile visual checks, checkpoint, deploy, and verify production health

## Phase 66: Bilingual Location OpSec Guide and Guardian AI
- [x] Audit existing i18n infrastructure, Guide rules, Guardian context URLs, prompts, and safety copy
- [x] Add shared English and Traditional Chinese labels and deterministic OpSec guidance without duplicating rule logic
- [x] Add language controls to Platform Guide and the dedicated Guardian AI page
- [x] Carry only the language, broad region, and scenario between Guide and Guardian AI
- [x] Make Groq Guardian AI answer in the selected interface language while preserving read-only, privacy, emergency, and no-tools boundaries
- [x] Add regression tests for locale parsing, bilingual rule output, prompt language, and safe fallback behavior
- [x] Run TypeScript, all tests, production build, desktop/mobile bilingual visual checks, checkpoint, deploy, and verify production health

## Phase 67: Project Handover Package
- [x] Verify Phase 66 is live on all three production domains and complete a real Traditional Chinese Guardian response
- [x] Audit frontend, backend, database, integrations, Git history, deployment model, assets, and secret boundaries
- [x] Create the complete handover documentation set and a no-secret environment variable template
- [x] Validate frozen dependency install, TypeScript, tests, opt-in Groq integration, production build, and local/production routes
- [x] Record Supabase Airdrop RLS exposure, external TIE source gap, GitHub permission gap, and Whitepaper storage divergence
- [x] Create the final clean documentation commit, Git bundle, source ZIP, checksum manifest, and verify clean-room restoration
