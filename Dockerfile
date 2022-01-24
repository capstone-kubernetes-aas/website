FROM arm64v8/node:17.3-bullseye
WORKDIR /home/node/website/
ADD --chown=node:node website/ ./
RUN npm install --production
CMD ["node", "server.js"]