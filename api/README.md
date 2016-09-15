# API

Koa@2 server connected to a RethinkDB database.

Using Thinky for the ORM

# Development
You need to have Docker & Docker-Compose installed on your pc.

### Start
Use ```docker-compose up -d``` to start the development DB & API then open [localhost:3030](http://localhost:3030)

Add ```--build``` to rebuild the image (i.e. when you modify the package.json)

### Attach API logs
Use ```docker-compose logs -f api``` to attach the logs of the API on your terminal

### Stop
Use ```docker-compose stop``` to stop the development DB & API
