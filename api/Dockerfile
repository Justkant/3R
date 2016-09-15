FROM node:6
MAINTAINER Quentin Jaccarino <jaccarino.quentin@gmail.com>

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/src/package.json
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/src
RUN npm install

USER root
COPY . $HOME/src
RUN chown -R app:app $HOME/*
USER app

CMD ["node", "index.js"]
