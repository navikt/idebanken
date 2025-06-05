FROM node:20-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./next.config.ts .
COPY package.json package-lock.json ./
COPY ./public ./public
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

EXPOSE 4242
ENV PORT 4242

CMD ["node", "server.js"]
