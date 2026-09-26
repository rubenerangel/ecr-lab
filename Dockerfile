FROM node:22-alpine AS build
# 👈 CAMBIO: antes node:24-alpine, alineado con tu Node local
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY src ./src
COPY test ./test
RUN pnpm test

FROM node:22-alpine AS runtime
# 👈 CAMBIO: antes node:24-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/src ./src
USER node
EXPOSE 3000
CMD ["node", "src/server.js"]