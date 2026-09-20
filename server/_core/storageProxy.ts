import type { Express } from "express";
import { ENV } from "./env";

// Storage keys are flat asset names such as "bg_option_D_enhanced_750fa344.png",
// optionally nested one or more folders deep. Anything outside this shape — in
// particular "..", backslashes, leading slashes or percent-decoded traversal —
// must never reach the signing backend.
const SAFE_STORAGE_KEY = /^[A-Za-z0-9](?:[A-Za-z0-9._-]*\/)*[A-Za-z0-9._-]+$/;

function isSafeStorageKey(key: string) {
  if (key.length > 256) return false;
  if (key.includes("..") || key.includes("\\") || key.includes("\0")) return false;
  return SAFE_STORAGE_KEY.test(key);
}

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!isSafeStorageKey(key)) {
      res.status(400).send("Invalid storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const data = await forgeResp.json() as { url?: string };
      const url = data.url;
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
