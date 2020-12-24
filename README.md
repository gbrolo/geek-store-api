<div align="center">
  <h1>Geek Store API</h1>
  <p>Handle requests for your simple retail ecommerce store.</p>
</div>

## Production ready
### Docker compose
This REST API comes with an integrated ```docker-compose.yml``` file. To run production server just execute the following command:

```docker-compose up```

This will set up a network and attach a MongoDB image and the server API and it will run on port ```3000```.

#### Alternative docker compose command
You can also run ```docker-compose up -d --build``` to start on detached mode and force Docker to rebuild images, so production image is always up to date.

### Production command
```npm start``` runs production command, which runs tests, cleans up code, and builds a ```dist-server``` directory to start the production server (not necessary to run if using Docker).

## Development
### Pre-requisites
  - MongoDB: to run in development mode, make sure you have MongoDB installed and running in your local machine on port ```27017```. You can change your MongoDB database url by setting up an environment variable ```MONGO_CONNECTION_URL``` with the following structure: ```MONGO_CONNECTION_URL=mongodb://localhost:27017```, in which you can change the port number if running Mongo on another port.
  - Node.js: v.12.13.1 and up
  - npm: v.6.13.6 and up

### Install dependencies
Run ```npm install``` to download and install dependencies.

### Run dev server
To run the development server, execute this command at your terminal: ```npm run watch:dev```.
This will run ```nodemon``` and will listen to changes in your code to auto-restart the development server.

## ES6 support
Supports ES6 code using Babel to transpile code.

## Postman collection
You can import ```geek-store-api.postman_collection``` into Postman to make requests to running API.