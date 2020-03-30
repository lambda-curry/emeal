from node:latest
WORKDIR /usr/src/app
COPY docker/mongo.crt /usr/local/share/ca-certificates/mongo.crt
RUN update-ca-certificates

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN ["yarn", "install"]

COPY dist dist

EXPOSE 3000
CMD [ "node", "dist/api/src/server.js" ]