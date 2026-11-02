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
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png?v=6`;
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
  ogImageWidth?: number;
  ogImageHeight?: number;
  url: string;
}

const PAGE_META: Record<string, PageMeta> = {
  "/": {
    title: "$5 Wrench Attack | Proof of Build, Proof of Helmet",
    description:
      "The hardest-working meme in crypto. Real-time threat globe, Wrenchy AI, and a skull hardness quiz. Don't get hit by a $5 wrench.",
    ogImage: `${BASE_URL}/og-default.png?v=6`,
    url: `${BASE_URL}/`,
  },
  "/defense-hub": {
    title: "$5WA Defense Hub | Skull Check & Wrenchy AI",
    description: "Take the $5WA Skull Check, see your helmet level, and learn practical physical security habits.",
    url: `${BASE_URL}/defense-hub`,
  },
  "/platform": {
    title: "$5WA Platform | Wrenchy AI, Threat Globe & Helmet Toolkit",
    description:
      "Live tools, not JPEGs: 3D threat globe, read-only Wrenchy AI, and checklists to harden your skull. Proof of Build.",
    url: `${BASE_URL}/platform`,
  },
  "/guardian": {
    title: "Wrenchy AI | Real OpSec, Self-Aware About Wrenches",
    description:
      "Ask Wrenchy AI for real physical-security guidance — it knows a $5 wrench beats any multi-sig. Powered by Groq.",
    url: `${BASE_URL}/guardian`,
  },
  "/tokenomics": {
    title: "$5WA Tokenomics | 87.5% Burned, 75% Locked, 100% Meme",
    description:
      "From 8B genesis to 1B final. 7B burned, 750M locked on PinkLock. The supply shrinks faster than your attack surface.",
    url: `${BASE_URL}/tokenomics`,
  },
  "/airdrop": {
    title: "$5WA Airdrop | Season 1: Skull Hardness Test",
    description:
      "6 questions. Black humor. Real OpSec. Test your skull thickness, earn a certificate, share on X, get $5WA. Proof of Helmet.",
    url: `${BASE_URL}/airdrop`,
  },
  "/whitepaper": {
    title: "$5WA Meme Manifesto | Proof of Build, Proof of Helmet",
    description:
      "The shortest, funniest, hardest-core whitepaper in crypto. 4 chapters. Zero fluff. 100% meme. 100% real.",
    url: `${BASE_URL}/whitepaper`,
  },
  "/risk-assessment": {
    title: "Skull Check | $5WA — How Thick Is Your Skull?",
    description:
      "How thick is your skull? Answer a few questions about your crypto habits, get your personal wrench-risk score, and find out if you're tofu or titanium.",
    url: `${BASE_URL}/risk-assessment`,
  },
  "/privacy-toolkit": {
    title: "Helmet Toolkit | Hardening Your Skull Against Wrenches",
    description:
      "Actionable checklists to upgrade your skull from tofu to titanium. Identity, travel, and wallet hardening.",
    url: `${BASE_URL}/privacy-toolkit`,
  },
};

function buildBotHtml(meta: PageMeta): string {
  const image = meta.ogImage ?? DEFAULT_OG_IMAGE;
  const imageWidth = meta.ogImageWidth ?? 1200;
  const imageHeight = meta.ogImageHeight ?? 630;
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
  <meta property="og:image:width" content="${imageWidth}" />
  <meta property="og:image:height" content="${imageHeight}" />
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
function getRequestMeta(req: Request): PageMeta | undefined {
  const meta = PAGE_META[req.path];
  if (!meta || req.path !== "/defense-hub") return meta;

  const tier = typeof req.query.tier === "string" ? req.query.tier : "";
  const score = typeof req.query.score === "string" ? Number(req.query.score) : NaN;
  const tierMeta: Record<string, { name: string; image: string }> = {
    "tofu-skull": { name: "Tofu Skull", image: "/og-tofu-skull.png?v=1" },
    "plastic-helmet": { name: "Plastic Helmet", image: "/og-plastic-helmet.png?v=1" },
    "titanium-skull": { name: "Titanium Skull", image: "/og-titanium-skull.png?v=1" },
  };
  const result = tierMeta[tier];
  if (!result || !Number.isInteger(score) || score < 0 || score > 6) return meta;

  const query = new URLSearchParams({ tier, score: String(score) }).toString();
  return {
    title: `$5WA Skull Check — ${result.name} (${score}/6)`,
    description: `I took the $5WA Skull Check and got ${result.name}: ${score}/6. Check your physical security habits and see how thick your skull is.`,
    ogImage: `${BASE_URL}${result.image}`,
    url: `${BASE_URL}/defense-hub?${query}`,
  };
}

function botMetaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const meta = getRequestMeta(req);

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
