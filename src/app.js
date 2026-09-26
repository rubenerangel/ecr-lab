import http from 'node:http';

export function createApp() {
  return http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', version: process.env.APP_VERSION ?? 'dev' }));
      return;
    }
    res.writeHead(404);
    res.end();
  });
}