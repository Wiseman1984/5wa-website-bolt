/**
 * Dynamic OG Image Generation for Airdrop Quiz Results
 * Uses satori (JSX→SVG) + @resvg/resvg-js (SVG→PNG) — pure WASM, no native deps.
 * Generates a 1200x630px PNG image with dark cyberpunk aesthetic
 * for Twitter/X card previews when users share their quiz scores.
 */
import type { Express, Request, Response } from "express";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load fonts at startup (TTF format required by satori)
const fontBold = readFileSync(
  resolve(import.meta.dirname, "./fonts/Inter-Bold.ttf")
);
const fontRegular = readFileSync(
  resolve(import.meta.dirname, "./fonts/Inter-Regular.ttf")
);

const FONTS = [
  { name: "Inter", data: fontBold, weight: 700 as const, style: "normal" as const },
  { name: "Inter", data: fontRegular, weight: 400 as const, style: "normal" as const },
];

// Level definitions matching the quiz scoring
export function getLevel(correct: number): string {
  if (correct === 6) return "Guardian";
  if (correct >= 4) return "Informed";
  if (correct >= 2) return "Aware";
  return "Vulnerable";
}

// Level colors
function getLevelColor(level: string): string {
  switch (level) {
    case "Guardian":
      return "#f59e0b"; // gold
    case "Informed":
      return "#3b82f6"; // blue
    case "Aware":
      return "#06b6d4"; // cyan/teal
    case "Vulnerable":
      return "#ef4444"; // red
    default:
      return "#64748b";
  }
}

function getLevelGlow(level: string): string {
  switch (level) {
    case "Guardian":
      return "rgba(245, 158, 11, 0.3)";
    case "Informed":
      return "rgba(59, 130, 246, 0.3)";
    case "Aware":
      return "rgba(6, 182, 212, 0.3)";
    case "Vulnerable":
      return "rgba(239, 68, 68, 0.3)";
    default:
      return "rgba(100, 116, 139, 0.2)";
  }
}

// Generate shield SVG path for filled/empty states
function ShieldIcon({ filled }: { filled: boolean }) {
  return {
    type: "svg",
    props: {
      width: 36,
      height: 36,
      viewBox: "0 0 24 24",
      fill: filled ? "rgba(6, 182, 212, 0.4)" : "none",
      stroke: filled ? "#06b6d4" : "rgba(100, 116, 139, 0.5)",
      strokeWidth: "1.5",
      children: {
        type: "path",
        props: {
          d: "M12 1L3 5v7c0 5 4 9 9 12 5-3 9-7 9-12V5L12 1z",
        },
      },
    },
  };
}

export async function generateOgImage(
  score: number,
  correct: number,
  level: string,
  _baseUrl: string
): Promise<Buffer> {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const levelColor = getLevelColor(level);
  const levelGlow = getLevelGlow(level);

  // Build the virtual DOM tree for satori — gaming achievement card layout
  const element = {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #060b1a 0%, #0a1628 40%, #060d20 100%)",
        fontFamily: "Inter",
        position: "relative",
        gap: "0px",
      },
      children: [
        // Outer border — level-colored glow
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "16px",
              left: "16px",
              right: "16px",
              bottom: "16px",
              border: `2px solid ${levelColor}`,
              borderRadius: "12px",
              opacity: 0.5,
            },
          },
        },
        // Corner accent top-left
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "16px",
              left: "16px",
              width: "60px",
              height: "60px",
              borderTop: `3px solid ${levelColor}`,
              borderLeft: `3px solid ${levelColor}`,
              borderRadius: "12px 0 0 0",
            },
          },
        },
        // Corner accent top-right
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "60px",
              height: "60px",
              borderTop: `3px solid ${levelColor}`,
              borderRight: `3px solid ${levelColor}`,
              borderRadius: "0 12px 0 0",
            },
          },
        },
        // Corner accent bottom-left
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "16px",
              left: "16px",
              width: "60px",
              height: "60px",
              borderBottom: `3px solid ${levelColor}`,
              borderLeft: `3px solid ${levelColor}`,
              borderRadius: "0 0 0 12px",
            },
          },
        },
        // Corner accent bottom-right
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "60px",
              height: "60px",
              borderBottom: `3px solid ${levelColor}`,
              borderRight: `3px solid ${levelColor}`,
              borderRadius: "0 0 12px 0",
            },
          },
        },
        // Center glow blob behind score
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "300px",
              background: levelGlow,
              borderRadius: "50%",
              filter: "blur(60px)",
            },
          },
        },
        // Brand name — top
        {
          type: "div",
          props: {
            style: {
              color: "rgba(148, 163, 184, 0.8)",
              fontSize: "18px",
              fontWeight: 400,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "16px",
            },
            children: "$5 WRENCH ATTACK",
          },
        },
        // Shields row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            },
            children: Array.from({ length: 6 }, (_, i) => ShieldIcon({ filled: i < correct })),
          },
        },
        // SCORE — dominant element
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              marginBottom: "4px",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    color: "#ffffff",
                    fontSize: "110px",
                    fontWeight: 700,
                    lineHeight: 1,
                  },
                  children: `${score}`,
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    color: "rgba(148, 163, 184, 0.7)",
                    fontSize: "44px",
                    fontWeight: 400,
                    lineHeight: 1,
                  },
                  children: "/ 1000",
                },
              },
            ],
          },
        },
        // "5WA" token label
        {
          type: "div",
          props: {
            style: {
              color: "rgba(148, 163, 184, 0.6)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "4px",
              marginBottom: "24px",
            },
            children: "5WA TOKENS",
          },
        },
        // LEVEL badge — prominent
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 40px",
              borderRadius: "6px",
              background: `${levelGlow}`,
              border: `1.5px solid ${levelColor}`,
              marginBottom: "20px",
            },
            children: {
              type: "span",
              props: {
                style: {
                  color: levelColor,
                  fontSize: "32px",
                  fontWeight: 700,
                  letterSpacing: "4px",
                },
                children: level.toUpperCase(),
              },
            },
          },
        },
        // Season + shields count — small, subtle
        {
          type: "div",
          props: {
            style: {
              color: "rgba(100, 116, 139, 0.9)",
              fontSize: "14px",
              fontWeight: 400,
              marginBottom: "20px",
            },
            children: `Season 1: Physical Security  ·  ${correct}/6 Shields`,
          },
        },
        // URL — bottom
        {
          type: "div",
          props: {
            style: {
              color: "rgba(71, 85, 105, 0.9)",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "1px",
            },
            children: "5wa.io/airdrop",
          },
        },
      ],
    },
  };

  // Generate SVG using satori
  const svg = await satori(element as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: FONTS,
  });

  // Convert SVG to PNG using resvg
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  });
  const pngData = resvg.render();
  return Buffer.from(pngData.asPng());
}

// Express route handler
async function handleOgImage(req: Request, res: Response) {
  try {
    const scoreParam = parseInt(req.query.score as string) || 0;
    const correctParam = parseInt(req.query.correct as string) || 0;
    const levelParam = (req.query.level as string) || getLevel(correctParam);

    // Validate and clamp params
    const score = Math.max(0, Math.min(1000, scoreParam));
    const correct = Math.max(0, Math.min(6, correctParam));
    const level = ["Guardian", "Informed", "Aware", "Vulnerable"].includes(levelParam)
      ? levelParam
      : getLevel(correct);

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const buffer = await generateOgImage(score, correct, level, baseUrl);

    res.set({
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Length": buffer.length.toString(),
    });
    res.end(buffer);
  } catch (err) {
    console.error("[OG Image] Generation failed:", err);
    res.status(500).send("Image generation failed");
  }
}

// Bot detection for Twitter/X crawlers
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
];

function isBot(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
}

// Share page handler - serves OG meta tags for bots, redirects users
function handleSharePage(req: Request, res: Response) {
  const scoreParam = parseInt(req.query.score as string) || 0;
  const correctParam = parseInt(req.query.correct as string) || 0;
  const levelParam = (req.query.level as string) || getLevel(correctParam);

  const score = Math.max(0, Math.min(1000, scoreParam));
  const correct = Math.max(0, Math.min(6, correctParam));
  const level = ["Guardian", "Informed", "Aware", "Vulnerable"].includes(levelParam)
    ? levelParam
    : getLevel(correct);

  const userAgent = req.get("user-agent");

  // If not a bot, redirect to the airdrop page
  if (!isBot(userAgent)) {
    res.redirect(302, "/airdrop");
    return;
  }

  // For bots: serve HTML with OG meta tags
  const baseUrl = `https://5wa.io`;
  const ogImageUrl = `${baseUrl}/api/og-image?score=${score}&correct=${correct}&level=${encodeURIComponent(level)}`;
  const title = `I scored ${score}/1000 on the $5WA Security Quiz!`;
  const description = `Level: ${level} | ${correct}/6 Shields. Season 1: Physical Security Basics. Test your crypto physical security knowledge at 5wa.io/airdrop`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${baseUrl}/airdrop/share?score=${score}&correct=${correct}&level=${encodeURIComponent(level)}" />
  <meta property="og:site_name" content="$5 Wrench Attack" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@5wa_io" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <meta name="twitter:image:alt" content="$5WA Security Quiz Score Card" />
</head>
<body>
  <p>Redirecting to <a href="${baseUrl}/airdrop">5WA Airdrop Quiz</a>...</p>
  <script>window.location.href = "/airdrop";</script>
</body>
</html>`;

  res.set("Content-Type", "text/html; charset=utf-8");
  res.send(html);
}

// Default branded OG image for non-airdrop pages — threat map style
async function handleOgDefault(_req: Request, res: Response) {
  try {
    // Simplified world map path (Natural Earth projection, simplified continents)
    // Americas, Europe/Africa, Asia/Oceania as rough SVG paths
    // Continent paths scaled to fill 1200x630 (x: 60-1140, y: 40-590)
    const continentPaths = [
      // North America
      "M 100 100 L 130 70 L 195 60 L 265 80 L 305 110 L 320 155 L 310 195 L 280 220 L 245 240 L 210 265 L 185 295 L 165 320 L 140 325 L 115 300 L 95 260 L 100 220 L 105 170 Z",
      // Central America / Caribbean
      "M 185 310 L 210 305 L 225 315 L 220 330 L 205 335 L 188 325 Z",
      // South America
      "M 195 345 L 240 335 L 275 350 L 290 390 L 285 440 L 265 490 L 240 520 L 215 515 L 195 490 L 185 450 L 182 400 Z",
      // Europe (detailed)
      "M 540 75 L 590 65 L 640 72 L 670 90 L 665 115 L 645 130 L 615 138 L 585 135 L 558 125 L 535 110 Z",
      // Scandinavia bump
      "M 575 45 L 600 38 L 620 50 L 615 70 L 590 72 L 570 62 Z",
      // Africa
      "M 535 155 L 580 148 L 625 158 L 650 185 L 658 230 L 655 285 L 640 340 L 615 375 L 585 385 L 555 375 L 530 345 L 518 300 L 512 250 L 515 200 Z",
      // Asia (large)
      "M 680 55 L 760 45 L 860 52 L 940 68 L 1000 88 L 1040 115 L 1030 155 L 990 175 L 940 180 L 890 190 L 840 185 L 790 195 L 750 188 L 710 178 L 680 165 L 658 140 L 655 110 Z",
      // Indian subcontinent
      "M 760 195 L 800 190 L 830 205 L 835 240 L 820 270 L 795 280 L 770 268 L 755 240 L 752 210 Z",
      // Southeast Asia peninsula
      "M 870 195 L 900 200 L 910 225 L 900 255 L 878 260 L 862 240 L 858 215 Z",
      // Japan
      "M 985 110 L 1005 105 L 1015 120 L 1005 140 L 988 138 Z",
      // Oceania / Australia
      "M 900 360 L 970 345 L 1040 352 L 1075 380 L 1070 430 L 1040 460 L 995 468 L 950 455 L 915 428 L 900 395 Z",
      // New Zealand
      "M 1065 455 L 1080 448 L 1090 465 L 1082 480 L 1065 475 Z",
    ];

    // Threat dot positions scaled to match new continent paths
    const threatDots = [
      { x: 260, y: 175 }, // USA East
      { x: 165, y: 185 }, // USA West
      { x: 230, y: 420 }, // Brazil
      { x: 215, y: 370 }, // Colombia
      { x: 220, y: 490 }, // Argentina
      { x: 185, y: 330 }, // Mexico
      { x: 580, y: 95 },  // UK
      { x: 600, y: 105 }, // France
      { x: 625, y: 90 },  // Netherlands
      { x: 560, y: 110 }, // Spain
      { x: 560, y: 200 }, // Nigeria
      { x: 575, y: 350 }, // South Africa
      { x: 785, y: 230 }, // India
      { x: 880, y: 130 }, // China
      { x: 920, y: 155 }, // Hong Kong
      { x: 895, y: 220 }, // Vietnam
      { x: 870, y: 210 }, // Thailand
      { x: 940, y: 200 }, // Philippines
      { x: 980, y: 400 }, // Australia
      { x: 710, y: 120 }, // Turkey
      { x: 770, y: 155 }, // UAE
      { x: 750, y: 95 },  // Pakistan
    ];

    const defaultElement = {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          background: "#0a0f1a",
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        },
        children: [

            // Background radial glow (center)
            {
              type: "div",
              props: {
                style: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "700px",
                  height: "420px",
                  background: "radial-gradient(ellipse, rgba(0,100,180,0.18) 0%, transparent 70%)",
                  borderRadius: "50%",
                },
              },
            },

            // World map SVG
            {
              type: "svg",
              props: {
                width: "1200",
                height: "630",
                viewBox: "0 0 1200 630",
                style: { position: "absolute", top: "0", left: "0" },
                children: [
                  // Grid lines (latitude/longitude)
                  ...Array.from({ length: 7 }, (_, i) => ({
                    type: "line",
                    props: {
                      x1: "0", y1: String(80 + i * 70),
                      x2: "1200", y2: String(80 + i * 70),
                      stroke: "rgba(0,212,255,0.06)", strokeWidth: "1",
                    },
                  })),
                  ...Array.from({ length: 13 }, (_, i) => ({
                    type: "line",
                    props: {
                      x1: String(50 + i * 90), y1: "60",
                      x2: String(50 + i * 90), y2: "570",
                      stroke: "rgba(0,212,255,0.06)", strokeWidth: "1",
                    },
                  })),
                  // Continent outlines
                  ...continentPaths.map(d => ({
                    type: "path",
                    props: {
                      d,
                      fill: "rgba(0,212,255,0.07)",
                      stroke: "rgba(0,212,255,0.55)",
                      strokeWidth: "1.5",
                      strokeLinejoin: "round",
                    },
                  })),
                  // Threat dots — outer glow ring
                  ...threatDots.map(dot => ({
                    type: "circle",
                    props: {
                      cx: String(dot.x), cy: String(dot.y), r: "8",
                      fill: "rgba(239,68,68,0.2)",
                      stroke: "rgba(239,68,68,0.5)",
                      strokeWidth: "1",
                    },
                  })),
                  // Threat dots — inner core
                  ...threatDots.map(dot => ({
                    type: "circle",
                    props: {
                      cx: String(dot.x), cy: String(dot.y), r: "4",
                      fill: "#ef4444",
                    },
                  })),
                ],
              },
            },

            // HUD Corner — top-left
            {
              type: "div",
              props: {
                style: {
                  position: "absolute", top: "24px", left: "24px",
                  width: "44px", height: "44px",
                  borderTop: "2px solid rgba(0,212,255,0.8)",
                  borderLeft: "2px solid rgba(0,212,255,0.8)",
                },
              },
            },
            // HUD Corner — top-right
            {
              type: "div",
              props: {
                style: {
                  position: "absolute", top: "24px", right: "24px",
                  width: "44px", height: "44px",
                  borderTop: "2px solid rgba(0,212,255,0.8)",
                  borderRight: "2px solid rgba(0,212,255,0.8)",
                },
              },
            },
            // HUD Corner — bottom-left
            {
              type: "div",
              props: {
                style: {
                  position: "absolute", bottom: "24px", left: "24px",
                  width: "44px", height: "44px",
                  borderBottom: "2px solid rgba(0,212,255,0.8)",
                  borderLeft: "2px solid rgba(0,212,255,0.8)",
                },
              },
            },
            // HUD Corner — bottom-right
            {
              type: "div",
              props: {
                style: {
                  position: "absolute", bottom: "24px", right: "24px",
                  width: "44px", height: "44px",
                  borderBottom: "2px solid rgba(0,212,255,0.8)",
                  borderRight: "2px solid rgba(0,212,255,0.8)",
                },
              },
            },
            // Main title
            {
              type: "div",
              props: {
                style: {
                  color: "#ffffff",
                  fontSize: "80px",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-2px",
                  marginBottom: "18px",
                  textShadow: "0 0 40px rgba(0,212,255,0.3)",
                },
                children: "$5 Wrench Attack",
              },
            },
            // Cyan subtitle
            {
              type: "div",
              props: {
                style: {
                  color: "#00d4ff",
                  fontSize: "22px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  marginBottom: "36px",
                },
                children: "Decentralized AI-Powered Physical Security",
              },
            },
            // Divider line
            {
              type: "div",
              props: {
                style: {
                  width: "320px",
                  height: "1px",
                  background: "rgba(0,212,255,0.4)",
                  marginBottom: "28px",
                },
              },
            },
            // Bottom info row
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.4)",
                        borderRadius: "6px",
                        padding: "6px 14px",
                      },
                      children: [
                        { type: "div", props: { style: { width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" } } },
                        { type: "div", props: { style: { color: "rgba(252,165,165,0.9)", fontSize: "14px", fontWeight: 600 }, children: "LIVE THREAT TRACKING" } },
                      ],
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: { color: "rgba(148,163,184,0.5)", fontSize: "14px" },
                      children: "|",
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: { color: "rgba(148,163,184,0.6)", fontSize: "16px", letterSpacing: "1px" },
                      children: "5wa.io",
                    },
                  },
                ],
              },
            },
          ],
        },
      };

    const svg = await satori(defaultElement as any, {
      width: 1200,
      height: 630,
      fonts: FONTS,
    });
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const buffer = resvg.render().asPng();
    res.set({
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=604800, s-maxage=604800",
      "Content-Length": buffer.length.toString(),
    });
    res.end(buffer);
  } catch (err) {
    console.error("[OG Default] Generation failed:", err);
    res.status(500).send("Image generation failed");
  }
}

// Register routes
export function registerOgRoutes(app: Express) {
  app.get("/api/og-image", handleOgImage);
  app.get("/api/og-default", handleOgDefault);
  app.get("/airdrop/share", handleSharePage);
}
