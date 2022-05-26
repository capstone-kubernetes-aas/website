# website


### Overview

This is the UI for the pipeline, implemented as a website with Node.js and Express backend and ReactJS frontend.


## Setup
Make sure Node.js is installed, along with `npm` (should be included with Node.js).

After pulling the repo, run `npm install` in order to install the necessary dependencies. If you are planning on running the server but not developing it, run `npm install --production` instead.


## Running locally

To run the application locally, run `npm start`. This will start the application on port 28070 on all hosts. For more control over where the application is exposed, you can run `node server.js [--host=<ip>] [--port=<port>]`.


## Building ReactJS

When developing in the `src/` directory, the `.jsx` files will need to be compiled into standard JavaScript in the `public/` directory. To do this, simply run `npm build` in the main directory. For this command to work, you must have installed the developer dependencies with `npm install`.


## Accessing it on the Pi

When running on the Pi, the deployment website can be accessed at http://deploy.capstone.detjens.dev/.


## Using the deployment interface

Documentation will be added soon.
