# Backend template

A backend template based on:
* Express.js
* MongoDB
* Typescript

## Start prod

1. Set environment variables for docker-compose. You can use .env in local.
```
MONGODB_URL=mongodb://IP_OR_DOMAIN:27017
MONGODB_USER=dbuser
MONGODB_PASSWORD=dbpassword
MONGODB_DBNAME=dbname
```
2. docker compose up --build

## Start dev

Set environment variables.
1. Install node_modules
```
npm i
```
2. Create .env in the root directory
3. Add the following variables:
```
MONGODB_URL=mongodb://localhost:27017
MONGODB_USER=dbuser
MONGODB_PASSWORD=dbpassword
MONGODB_DBNAME=dbname
PORT=4000
```

4. Run
```
npm run start:watch
```

## Run tests

Create .env.test in the root directory with the following variables:
```
MONGODB_URL=mongodb://localhost:27017
MONGODB_USER=dbuser
MONGODB_PASSWORD=dbpassword
MONGODB_DBNAME=dbname
PORT=4000
```

Run once:
```
npm test
```

Run test watcher:
```
npm run test:watch
```
