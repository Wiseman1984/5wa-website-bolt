/**
 * usePageMeta — lightweight hook for per-page OG / Twitter meta tag injection.
 *
 * Since this is a client-side SPA, Twitter/X bots will NOT execute JavaScript
 * and will read the static tags from index.html instead. However, for other
 * platforms (Discord, Slack, Telegram) that DO execute JS, and for the
 * document <title> which updates in the browser tab, this hook is useful.
 *
 * For Twitter/X specifically, the /airdrop/share server-side route handles
 * dynamic OG tags. For all other pages the static tags in index.html are used.
 */
import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  /** Full URL to the OG image (1200x630). Defaults to https://5wa.io/og-default.png */
  ogImage?: string;
  /** Canonical URL for this page */
  url?: string;
}

const DEFAULT_OG_IMAGE = "https://5wa.io/og-default.png";
const SITE_NAME = "$5 Wrench Attack";
const TWITTER_SITE = "@5wa_io";

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, ogImage, url }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const image = ogImage ?? DEFAULT_OG_IMAGE;
    const pageUrl = url ?? window.location.href;

    // Document title (browser tab)
    document.title = fullTitle;

    // Standard meta
    setMeta("description", description, true);

    // Open Graph
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:image", image);
    setMeta("og:image:width", "1200");
    setMeta("og:image:height", "630");
    setMeta("og:url", pageUrl);
    setMeta("og:site_name", SITE_NAME);
    setMeta("og:type", "website");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:site", TWITTER_SITE, true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", image, true);
  }, [title, description, ogImage, url]);
}
