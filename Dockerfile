FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app/

RUN npm run build

# for serving static files
RUN npm i -g serve

EXPOSE 5173

CMD ["serve", "-l", "5173", "-s", "dist"]
