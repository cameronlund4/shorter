FROM node:lts AS dev-deps

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quiet

FROM dev-deps AS builder

COPY tsconfig*.json ./
COPY ./src ./src
RUN npm run build

FROM node:lts

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build

# CMD ["node", "/app/build/index.js"]