FROM node:15-alpine

WORKDIR /app 

COPY package*.json ./ 

RUN npm install 

COPY . . 

EXPOSE 30001

CMD ["npm", "start"]