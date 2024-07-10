# Step 1: Build the app in image 'builder'
FROM node:lts-alpine AS builder
LABEL webAplication=builder

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl
RUN npm run build

# Step 2: Copy the built app to a new image 'production'
FROM node:lts-alpine AS production

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json

RUN npm install

CMD [ "npm", "run", "preview", "--", "--port", "3000" ]