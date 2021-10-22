FROM node:14.4

COPY . /app

WORKDIR /app

RUN npm install --only=production

ENTRYPOINT npm start

EXPOSE 3000