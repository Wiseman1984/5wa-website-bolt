/**
 * Server-side OG meta tag injection for main pages.
 *
 * Twitter/X bots (Twitterbot) do NOT execute JavaScript, so client-side
 * React head management is invisible to them. This module intercepts
 * bot requests to each main page and serves an HTML response with the
 * correct OG/Twitter meta tags, then redirects real users to the SPA.
 *
 * For real users the SPA handles everything normally.
 */
import { type Express, type Request, type Response, type NextFunction } from "express";

const BASE_URL = "https://5wa.io";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`;
const SITE_NAME = "$5 Wrench Attack";
const TWITTER_SITE = "@5wa_io";

// Bot user agents that need server-rendered meta tags
const BOT_USER_AGENTS = [
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "TelegramBot",
  "WhatsApp",
  "Googlebot",
  "bingbot",
  "Applebot",
  "ia_archiver",
];

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot.toLowerCase()));
}

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  url: string;
}

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "$5 Wrench Attack | Decentralized AI-Powered Physical Security",
    description:
      "Real-time global threat intelligence for Web3 participants. AI-powered physical security platform tracking crypto-targeted attacks worldwide.",
    ogImage: `${BASE_URL}/og-default.png`,
    url: `${BASE_URL}/`,
  },
  "/platform": {
    title: "$5WA Platform | Threat Intelligence & Location OpSec",
    description:
      "Live physical-security tools: public threat intelligence, deterministic Location OpSec guidance, and read-only Guardian AI.",
    url: `${BASE_URL}/platform`,
  },
  "/guardian": {
    title: "$5WA Guardian AI | Read-Only Physical Security Guidance",
    description:
      "Read-only Groq-powered physical-security guidance grounded in the 5WA Location OpSec Guide and bounded public threat intelligence.",
    url: `${BASE_URL}/guardian`,
  },
  "/tokenomics": {
    title: "$5WA Tokenomics | Supply, Allocation & Lock-Up",
    description:
      "Verifiable $5WA supply lifecycle, post-burn allocation, PinkLock schedule, utility, and on-chain references.",
    url: `${BASE_URL}/tokenomics`,
  },
  "/airdrop": {
    title: "$5WA Airdrop | Season 1 Physical Security Quiz",
    description:
      "Test your crypto physical security knowledge. Complete the quiz, share on X, and earn $5WA tokens. Season 1: Physical Security Basics.",
    url: `${BASE_URL}/airdrop`,
  },
  "/whitepaper": {
    title: "$5WA Whitepaper V5 | Decentralized AI-Powered Physical Security Platform",
    description:
      "Living Document — TIE, 3D/flat Threat Map, Location OpSec Guide MVP, and read-only Groq Guardian AI beta are live.",
    url: `${BASE_URL}/whitepaper`,
  },
};

function buildBotHtml(meta: PageMeta): string {
  const image = meta.ogImage ?? DEFAULT_OG_IMAGE;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}" />
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:title" content="${escapeHtml(meta.title)}" />
  <meta property="og:description" content="${escapeHtml(meta.description)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${escapeHtml(meta.url)}" />
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${escapeHtml(TWITTER_SITE)}" />
  <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
  <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
  <meta name="twitter:image" content="${escapeHtml(image)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(SITE_NAME)}" />
</head>
<body>
  <p>Loading <a href="${escapeHtml(meta.url)}">${escapeHtml(meta.title)}</a>...</p>
  <script>window.location.href = "${escapeHtml(meta.url)}";</script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Middleware that intercepts bot requests to main pages and serves
 * proper OG meta tags. Real users pass through to the SPA.
 */
function botMetaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const pathname = req.path;
  const meta = PAGE_META[pathname];

  // Only intercept known pages for bots
  if (!meta || !isBot(req.get("user-agent"))) {
    next();
    return;
  }

  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(buildBotHtml(meta));
}

export function registerPageMetaRoutes(app: Express): void {
  // Register middleware before the SPA catch-all
  app.use(botMetaMiddleware);
}
