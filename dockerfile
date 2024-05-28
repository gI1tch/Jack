FROM node:14

WORKDIR /app/West_Site

COPY /West_Site/package*.json /app/West_Site
RUN npm install

COPY . .

CMD ["npm", "start"]