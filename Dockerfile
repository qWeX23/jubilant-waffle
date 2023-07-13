FROM node:20.3.1
COPY . .
RUN npm install
CMD [ "node", "src/server/server.js" ]
