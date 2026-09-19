import type { Express } from "express";
import { ENV } from "./_core/env";

/**
 * Registers download routes that stream files from S3 storage with proper
 * Content-Disposition headers so browsers use the clean filename (no hash suffix).
 */
export function registerDownloadRoutes(app: Express) {
  // GET /api/download/whitepaper → streams the Whitepaper V5 PDF with clean filename
  app.get("/api/download/whitepaper", async (_req, res) => {
    const storageKey = "5WA-Whitepaper-V5_c93926d0.pdf";
    const cleanFilename = "5WA-Whitepaper-V5.pdf";

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage not configured");
      return;
    }

    try {
      // Step 1: Get a presigned URL from the storage backend
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", storageKey);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[DownloadProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const data = await forgeResp.json() as { url?: string };
      const signedUrl = data.url;
      if (!signedUrl) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      // Step 2: Fetch the actual PDF bytes from the signed URL
      const pdfResp = await fetch(signedUrl);
      if (!pdfResp.ok) {
        console.error(`[DownloadProxy] PDF fetch error: ${pdfResp.status}`);
        res.status(502).send("Failed to fetch PDF");
        return;
      }

      // Step 3: Stream back with proper headers for clean filename download
      res.set("Content-Type", "application/pdf");
      res.set(
        "Content-Disposition",
        `attachment; filename="${cleanFilename}"; filename*=UTF-8''${encodeURIComponent(cleanFilename)}`,
      );
      res.set("Cache-Control", "public, max-age=86400"); // Cache for 1 day

      const contentLength = pdfResp.headers.get("content-length");
      if (contentLength) {
        res.set("Content-Length", contentLength);
      }

      // Pipe the response body to the client
      const buffer = await pdfResp.arrayBuffer();
      res.end(Buffer.from(buffer));
    } catch (err) {
      console.error("[DownloadProxy] failed:", err);
      res.status(502).send("Download proxy error");
    }
  });
}
