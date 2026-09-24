import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };
createServer(async (req, res) => {
  const raw = req.url === '/' ? '/index.html' : (req.url || '/index.html').split('?')[0];
  const path = normalize(join(root, 'public', raw));
  if (!path.startsWith(join(root, 'public'))) return res.writeHead(403).end();
  try {
    if ((await stat(path)).isDirectory()) throw new Error('directory');
    res.writeHead(200, { 'content-type': types[extname(path)] || 'application/octet-stream' });
    res.end(await readFile(path));
  } catch { res.writeHead(404).end('Não encontrado'); }
}).listen(4173, () => console.log('http://localhost:4173'));
