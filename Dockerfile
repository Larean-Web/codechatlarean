FROM node:16.19.0

RUN apt-get update -y
RUN apt-get upgrade -y

WORKDIR /codechat

COPY ./package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
