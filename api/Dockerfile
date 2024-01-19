# stage one
FROM node:lts-alpine as builder

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# stage two
FROM mcr.microsoft.com/playwright:v1.21.0-focal

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /api/dist /app/dist

CMD [ "npm", "start" ]