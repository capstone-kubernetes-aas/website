# website


## Overview

This is the UI for the pipeline, implemented as a website with Node.js and Express backend and ReactJS frontend. It is packaged as a Docker container with the `node` image as its base.


## Building and Running the Docker Image

To build, pull the repository onto a Pi with Docker installed and run the following:

`docker build -t <image>:<tag> .`

To run a container using this image, simply run the following:

`docker run -d -p 28070:28070 --name <name> <image>:<tag>`

If you need to run the application on a different port, simply change the publish flag. For example `-p 28070:80` will connect the container's port 28070 to the host's port 80.


## Running the Node Server Without Docker

### Setup
Make sure Node.js is installed, along with `npm` (should be included with Node.js).

After pulling the repo, move into `website/`. Run `npm install` in order to install the necessary dependencies.

### Running locally

To run the application locally, run `npm start`. This will start the application on port 28070 on all hosts. For more control over where the application is exposed, you can run `node server.js [--host=<ip>] [--port=<port>]`.


## Building ReactJS

When developing in the `src/` directory, the `.jsx` files will need to be compiled into standard JavaScript in the `public/` directory. To do this, simply run `npm build`. For this command to work, you must have installed the developer dependencies with `npm install`.
