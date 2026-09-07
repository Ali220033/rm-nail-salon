import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { seoPages } from "../src/seoData.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const known = new Set(seoPages.map((page) => page.path));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ttf": "font/ttf", ".mp4": "video/mp4", ".webm": "video/webm", ".xml": "application/xml", ".txt": "text/plain" };

export const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, "http://localhost");
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { response.writeHead(400).end(); return; }
  const canonical = pathname.replace(/\/index(?:\.html)?$/, "").replace(/\.html$/, "").replace(/\/$/, "") || "/";
  if (pathname !== canonical) {
    response.writeHead(308, { Location: canonical + url.search }).end();
    return;
  }
  let target = path.resolve(root, "." + (known.has(pathname) ? pathname === "/" ? "/index.html" : pathname + ".html" : pathname));
  if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(400).end(); return; }
  let status = pathname === "/404" ? 404 : 200;
  try { if (!(await stat(target)).isFile()) throw new Error("not a file"); }
  catch { target = path.join(root, "404.html"); status = 404; }
  try {
    const data = await readFile(target);
    const headers = { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Accept-Ranges": "bytes" };
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range && status === 200) {
      const start = Number(range[1]);
      const end = Math.min(range[2] ? Number(range[2]) : data.length - 1, data.length - 1);
      if (start > end || start >= data.length) { response.writeHead(416, { "Content-Range": `bytes */${data.length}` }).end(); return; }
      response.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${data.length}`, "Content-Length": end - start + 1 });
      response.end(request.method === "HEAD" ? undefined : data.subarray(start, end + 1));
    } else {
      const compress = /gzip/.test(request.headers["accept-encoding"] || "") && /\.(html|css|js|json|svg|xml|txt)$/.test(target);
      const body = compress ? gzipSync(data) : data;
      response.writeHead(status, { ...headers, "Content-Length": body.length, ...(compress ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}) });
      response.end(request.method === "HEAD" ? undefined : body);
    }
  } catch { response.writeHead(500).end("Build the site before starting preview."); }
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const portIndex = process.argv.indexOf("--port");
  const port = Number(process.env.PORT || (portIndex >= 0 ? process.argv[portIndex + 1] : 5188));
  server.listen(port, "127.0.0.1", () => console.log(`RM preview: http://127.0.0.1:${port}`));
}
