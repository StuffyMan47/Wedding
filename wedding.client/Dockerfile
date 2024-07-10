# Step 1: Build the app in image 'builder'
FROM node:lts-alpine AS builder
LABEL webAplication=builder

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl
RUN npm install @mui/material
RUN npm install @mui/icons-material
RUN npm install @tanstack/react-query
RUN npm install @tanstack/react-query-devtools
RUN npm run build

CMD [ "npm", "run", "dev" ]