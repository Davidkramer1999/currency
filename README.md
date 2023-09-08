# currency

### Project Description

This is a back-end service built with Node.js, MySQL, and Docker that provides API endpoints for currency exchange rates.

### Getting Started BE!!!!

Clone the repository
git clone https://github.com/yourusername/your-backend-repo.git
Navigate to the directory

### Rename .env.example to .env

Fill in the values for database credentials and other configurations.

### Start the Server

npm run start

### API Endpoints

1. GET /updateExchangeRates: Get xml data from http://www.bsi.si/_data/tecajnice/dtecbs-l.xml - HIT WITH POSTMAN
2. GET /getExchangeRates Get rates between two currencies
3. GET /getAllCurrencies: Get all unique currencies.
4. GET /calculateOpportunity: Calculate exchange rate opportunities between two currencies.

Note cors.config check whiteliste if you get cors error on fe. Don't forget to save xml file to db to hit /updateExchangeRates with postman

### Getting Started Front-End/curreny !!!

1. cd to currency
2. npm install
3. crete .env add be route
