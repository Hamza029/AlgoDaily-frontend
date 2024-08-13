FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app/

RUN npm run build

# for serving static files
RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
