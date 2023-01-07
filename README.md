# Backend template

A backend template based on:
* Express.js
* MongoDB
* Typescript

## Before use

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

## Start dev

Run
```
npm run start:watch
```
