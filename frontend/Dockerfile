FROM node:20-alpine

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY ./next.config.ts .
COPY package.json package-lock.json ./
COPY ./public ./public
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

RUN mkdir -p .next/cache/images && chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 4242
ENV PORT=4242
ENV NODE_ENV=production

CMD ["node", "server.js"]
