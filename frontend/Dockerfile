FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY ./next.config.ts .
COPY package.json package-lock.json ./
COPY ./public ./public
COPY --chown=node:node ./.next/standalone ./
COPY --chown=node:node ./.next/static ./.next/static

USER node

EXPOSE 4242
ENV PORT=4242
ENV NODE_ENV=production

CMD ["node", "server.js"]