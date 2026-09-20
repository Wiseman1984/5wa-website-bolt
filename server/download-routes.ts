import type { Express } from "express";
import { storageGet } from "./storage";

export function registerDownloadRoutes(app: Express) {
  app.get("/api/download/whitepaper", async (_req, res) => {
    const storageKey = "5WA-Whitepaper-V5_c93926d0.pdf";
    const cleanFilename = "5WA-Whitepaper-V5.pdf";

    try {
      const { url: downloadUrl } = await storageGet(storageKey);

      const pdfResp = await fetch(downloadUrl);
      if (!pdfResp.ok) {
        console.error(`[DownloadProxy] PDF fetch error: ${pdfResp.status}`);
        res.status(502).send("Failed to fetch PDF");
        return;
      }

      const contentType = pdfResp.headers.get("content-type") ?? "";
      if (!contentType.includes("pdf")) {
        console.error(`[DownloadProxy] unexpected content-type: ${contentType}`);
        res.status(502).send("Storage returned unexpected content");
        return;
      }

      res.set("Content-Type", "application/pdf");
      res.set(
        "Content-Disposition",
        `attachment; filename="${cleanFilename}"; filename*=UTF-8''${encodeURIComponent(cleanFilename)}`,
      );
      res.set("Cache-Control", "public, max-age=86400");

      const contentLength = pdfResp.headers.get("content-length");
      if (contentLength) {
        res.set("Content-Length", contentLength);
      }

      const buffer = await pdfResp.arrayBuffer();
      res.end(Buffer.from(buffer));
    } catch (err) {
      console.error("[DownloadProxy] failed:", err);
      res.status(502).send("Download proxy error");
    }
  });
}
