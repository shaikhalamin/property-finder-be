FROM node:lts

WORKDIR /usr/src/app
     
COPY package*.json yarn.lock ./
RUN yarn cache clean
RUN yarn install

COPY . .

EXPOSE 3000

# CMD [ -d "node_modules" ] && yarn run build

RUN yarn run build