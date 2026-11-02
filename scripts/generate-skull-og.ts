import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = resolve(import.meta.dirname, "..");
const fontRegular = readFileSync(resolve(root, "server/fonts/Inter-Regular.ttf"));
const fontBold = readFileSync(resolve(root, "server/fonts/Inter-Bold.ttf"));
const fonts = [
  { name: "Inter", data: fontRegular, weight: 400 as const, style: "normal" as const },
  { name: "Inter", data: fontBold, weight: 700 as const, style: "normal" as const },
];

type Card = {
  file: string;
  output: string;
  level: string;
  name: string;
  score: string;
  color: string;
  softColor: string;
  oneLiner: string;
  rangeStart: number;
  rangeEnd: number;
};

const cards: Card[] = [
  {
    file: "level1_tofu_skull_qr_final.png",
    output: "og-tofu-skull.png",
    level: "LEVEL 1",
    name: "TOFU SKULL",
    score: "0–2 / 6",
    color: "#ff3345",
    softColor: "#4a1721",
    oneLiner: "Your OpSec runs on vibes.",
    rangeStart: 0,
    rangeEnd: 2,
  },
  {
    file: "level2_plastic_helmet_qr_final.png",
    output: "og-plastic-helmet.png",
    level: "LEVEL 2",
    name: "PLASTIC HELMET",
    score: "3–4 / 6",
    color: "#ffd21f",
    softColor: "#4a3d16",
    oneLiner: "Your OpSec has a return policy.",
    rangeStart: 2,
    rangeEnd: 4,
  },
  {
    file: "level3_titanium_skull_qr_final.png",
    output: "og-titanium-skull.png",
    level: "LEVEL 3",
    name: "TITANIUM SKULL",
    score: "5–6 / 6",
    color: "#25d39a",
    softColor: "#124737",
    oneLiner: "Hard to fool. Still human.",
    rangeStart: 4,
    rangeEnd: 6,
  },
];

function text(children: string, style: Record<string, unknown>) {
  return { type: "div", props: { style, children } };
}

for (const card of cards) {
  const art = readFileSync(resolve(root, "public", card.file)).toString("base64");
  const element = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "row",
        background: "#080b10",
        color: "#f8fafc",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "8px",
              background: card.color,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              width: "430px",
              height: "630px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#020407",
              padding: "24px 24px 24px 32px",
            },
            children: {
              type: "img",
              props: {
                src: `data:image/png;base64,${art}`,
                width: 374,
                height: 582,
                style: { objectFit: "contain" },
              },
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              width: "770px",
              height: "630px",
              display: "flex",
              flexDirection: "column",
              padding: "42px 54px 34px 50px",
              background: "linear-gradient(135deg, #0b111d 0%, #080b10 72%)",
              position: "relative",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", justifyContent: "space-between", alignItems: "center" },
                  children: [
                    text("$5WA SECURITY INSTITUTE", { color: "#ffd700", fontSize: "22px", fontWeight: 700, letterSpacing: "2px" }),
                    text("PROOF OF HELMET", { color: "#9aa8bc", fontSize: "13px", fontWeight: 700, letterSpacing: "2px" }),
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { height: "1px", background: "#263244", marginTop: "20px", marginBottom: "30px" },
                },
              },
              text("SKULL CHECK / YOUR HELMET CLASS", { color: "#8b9ab0", fontSize: "15px", fontWeight: 700, letterSpacing: "3px" }),
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "12px" },
                  children: [
                    text(card.level, { color: card.color, fontSize: "30px", fontWeight: 700, letterSpacing: "2px" }),
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
                        children: [
                          text("LEVEL RANGE", { color: "#8b9ab0", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", marginBottom: "4px" }),
                          text(card.score, { color: "#f8fafc", fontSize: "29px", fontWeight: 700 }),
                        ],
                      },
                    },
                  ],
                },
              },
              text(card.name, { color: "#f8fafc", fontSize: "55px", fontWeight: 700, letterSpacing: "1px", lineHeight: 1, marginTop: "7px" }),
              {
                type: "div",
                props: {
                  style: { display: "flex", gap: "8px", marginTop: "23px" },
                  children: Array.from({ length: 6 }, (_, index) => ({
                    type: "div",
                    props: { style: { width: "74px", height: "8px", borderRadius: "4px", background: index >= card.rangeStart && index < card.rangeEnd ? card.color : "#273142" } },
                  })),
                },
              },
              text('"' + card.oneLiner + '"', { color: "#d6deea", fontSize: "26px", fontWeight: 400, marginTop: "32px" }),
              text("How thick is your skull?", { color: "#8b9ab0", fontSize: "19px", fontWeight: 400, marginTop: "10px" }),
              {
                type: "div",
                props: {
                  style: { marginTop: "46px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", flexDirection: "column" },
                        children: [
                          text("THE $5WA VERDICT", { color: card.color, fontSize: "15px", fontWeight: 700, letterSpacing: "2px" }),
                          text("Proof of Build. Proof of Helmet.", { color: "#f8fafc", fontSize: "18px", fontWeight: 700, marginTop: "7px" }),
                          text("5wa.io/defense-hub", { color: "#8b9ab0", fontSize: "16px", fontWeight: 400, marginTop: "8px" }),
                        ],
                      },
                    },
                    text("TAKE THE TEST >", { color: "#080b10", background: card.color, padding: "13px 17px", fontSize: "15px", fontWeight: 700, letterSpacing: "1px" }),
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  writeFileSync(resolve(root, "public", card.output), png);
  writeFileSync(resolve(root, "client/public", card.output), png);
}
