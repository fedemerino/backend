FROM node

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/frontend

RUN npm install

WORKDIR /app

EXPOSE 8080
EXPOSE 3000

CMD ["npm", "start"]
