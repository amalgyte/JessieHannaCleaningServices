import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4287);
const host = process.env.HOST || "0.0.0.0";

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
};

function resolvePath(url) {
  const requested = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const absolute = join(root, safePath);

  if (!absolute.startsWith(root)) {
    return null;
  }

  if (existsSync(absolute) && statSync(absolute).isDirectory()) {
    return join(absolute, "index.html");
  }

  return absolute;
}

createServer((request, response) => {
  const filePath = resolvePath(request.url);

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": types[extname(filePath)] || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`Jessie Hanna Services listening on http://${host}:${port}`);
});
