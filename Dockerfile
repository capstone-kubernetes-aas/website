FROM arm64v8/node:17.3-bullseye
WORKDIR /home/node/
COPY --chown=node:node website/ ./
WORKDIR website/
RUN npm install --production
CMD ["node", "server.js"]