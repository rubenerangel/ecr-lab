import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const version = process.env.APP_VERSION ?? 'dev'; // 👈 NUEVO
const server = createApp();

server.listen(port, () => console.log(`listening on ${port}, version ${version}`)); // 👈 CAMBIO

function shutdown(signal) {
  console.log(`${signal} received, closing server (version ${version})`); // 👈 CAMBIO
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);