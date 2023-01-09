FROM node:18.10.0-alpine3.15 AS init

WORKDIR /usr/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tsconfig.json ./tsconfig.json

RUN npm install

COPY ./src ./src
COPY ./test ./test
COPY ./index.ts ./index.ts


FROM init as appbuild

RUN npm run build


FROM node:18.10.0-alpine3.15

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

COPY --from=appbuild /usr/app/dist ./

CMD ["node", "--experimental-specifier-resolution", "node", "index.js"]
