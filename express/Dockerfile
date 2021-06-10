FROM node:16.3.0-stretch
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

COPY ./package*.json $APP_ROOT
RUN npm install

COPY ./ $APP_ROOT