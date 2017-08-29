FROM node:latest

RUN mkdir /ss
WORKDIR /ss

RUN apt-get update && apt-get install postgresql-client -y

ADD package.json /ss/package.json
RUN npm config set registry "http://registry.npmjs.org/" && npm i

ADD src /ss/src

EXPOSE 3000

RUN mkdir /pg
ADD pg/wait.sh /pg/wait.sh
RUN chmod +x /pg/wait.sh

CMD [ "/pg/wait.sh", "npm", "start" ]
