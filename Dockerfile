# Multi-stage Dockerfile for NestJS (production)
FROM node:22-slim AS builder

WORKDIR /app

# Install dependencies first (cached)
COPY package*.json ./
RUN npm ci

# Copy sources and build
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src
COPY assets ./assets
COPY README.md ./
RUN npm run build

# Prune dev dependencies to keep production small
RUN npm prune --production

FROM node:22-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy only what we need to run
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/assets ./assets
COPY package*.json ./

# Expose HTTP app and microservice ports
EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main.js"]
