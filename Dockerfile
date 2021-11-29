# ---------- Base ----------
FROM node:14-alpine AS base

WORKDIR /usr/src/app

# ---------- Develop ----------
FROM base AS development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- Release ----------
FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]
