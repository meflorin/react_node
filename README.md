- Node.js
- React
- Express
- Mocha, Chai
- Cypress

## Backend:
Express
- JSON storage
- 2 entities (one is child of the other)
Endpoints:
- GET list of entities
- GET child by parent id
- Insert parent
- Insert child
- All tested

## UI:
- Fully use the backend that you built
- All tested

 -------------------------------------------------
 ## Backend:
- cd server
- npm install
- npm start (http://localhost:9000)
- npm test (change .env ENV=DEV -> ENV=TEST to use test json from test/data/)

## UI:
- cd ui
- npm install
- npm start (http://localhost:3000)
- node_modules/.bin/cypress open (on backend -> change .env ENV=DEV -> ENV=TEST to use test json from test/data/)
