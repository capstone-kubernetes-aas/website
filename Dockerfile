FROM arm64v8/node:17.3-bullseye
EXPOSE tcp/28070

# copy over the files and install
# the production dependencies
WORKDIR /home/node/website/
ADD --chown=node:node website/ ./
RUN npm install --production

# set the default arguments (this connects
# to the node image's ENTRYPOINT)
CMD ["node", "server.js"]