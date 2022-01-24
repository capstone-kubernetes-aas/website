FROM arm64v8/node:17.3-bullseye
WORKDIR /home/node/
COPY --chown=node:node website/ ./