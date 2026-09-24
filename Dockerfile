FROM node:24-bookworm-slim AS api-build
WORKDIR /app/api
COPY api/package.json api/package-lock.json ./
RUN npm ci
COPY api/ ./
RUN npm run build

FROM node:24-bookworm-slim AS web-build
WORKDIR /app/web
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
ARG VITE_API=/api
RUN npm run build

FROM node:24-bookworm-slim AS api-dependencies
WORKDIR /app/api
COPY api/package.json api/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM node:24-bookworm-slim AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app/api
COPY --from=api-dependencies /app/api/package.json ./package.json
COPY --from=api-dependencies /app/api/node_modules ./node_modules
COPY --from=api-build /app/api/dist ./dist
COPY --from=api-build /app/api/public ./public
COPY --from=web-build /app/web/dist /app/web/dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
