FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./

COPY --chown=node:node . /home/node/

RUN npm ci

RUN npm run build \
    && npm prune --production


FROM node:16-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json /home/node/
COPY --from=builder --chown=node:node /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]