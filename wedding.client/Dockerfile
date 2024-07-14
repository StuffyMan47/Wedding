# Step 1: Build the app in image 'builder'
FROM node:lts-alpine AS builder
LABEL webAplication=builder

WORKDIR /usr/src/app
COPY . .

RUN npm install --silent
#RUN npm install @rollup/rollup-linux-x64-musl
RUN npm run build

EXPOSE 3000
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
CMD ["npm", "run", "dev"]
