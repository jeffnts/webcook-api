FROM node:10.14.2-alpine

WORKDIR /usr/api

COPY package*json ./
RUN npm install --quiet

COPY . .

EXPOSE 8000

CMD ["npm", "start"]