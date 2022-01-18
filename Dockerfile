FROM arm64v8/node:17.3-bullseye

EXPOSE 28070/tcp

WORKDIR /home/node/
COPY --chown=node:node website/ .