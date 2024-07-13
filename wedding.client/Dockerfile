# Step 1: Build the app in image 'builder'
FROM node:lts-alpine AS builder
LABEL webAplication=builder

WORKDIR /usr/src/app
COPY . .

EXPOSE 5173

RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl
RUN npm run build
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
CMD ["npm", "run", "dev"]

## Step 2: Copy the built app to a new image 'production'
#FROM node:lts-alpine AS production
#
#WORKDIR /usr/src/app
#COPY --from=builder /usr/src/app/dist ./dist
#COPY --from=builder /usr/src/app/package.json ./package.json
#
#RUN npm install
#CMD [ "npm", "run", "build"]
#CMD [ "npm", "run", "preview"]