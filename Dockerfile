FROM node:20-slim

WORKDIR /app

COPY back-end/package*.json ./

RUN npm install

COPY back-end ./

EXPOSE 3000

CMD ["npm", "start"] 