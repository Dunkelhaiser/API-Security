FROM node:20.15.0-alpine3.20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS development
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN pnpm i

ENV NODE_ENV=development
ENV NEXT_NODE_ENV=development
ENV NEXT_PUBLIC_NODE_ENV=development

CMD [ "pnpm" , "run", "dev" ]