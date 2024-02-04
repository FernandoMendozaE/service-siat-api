# stage one
FROM node:lts-alpine as builder

WORKDIR /api

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# stage two
FROM node:lts-alpine

EXPOSE 3000

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# Asegúrate de que el módulo 'express' esté instalado globalmente
RUN npm install -g express

COPY --from=builder /api/dist /app/dist

CMD [ "npm", "start" ]
