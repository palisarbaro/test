FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY dist dist
CMD [ "node", "./dist/index.js" ]