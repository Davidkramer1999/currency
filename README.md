# currency

Back-End README
Project Description
This is a back-end service built with Node.js, MySQL, and Docker that provides API endpoints for currency exchange rates.

Getting Started
Clone the repository

sh
Copy code
git clone https://github.com/yourusername/your-backend-repo.git
Navigate to the directory

sh
Copy code
cd your-backend-repo
Install Dependencies

sh
Copy code
npm install
Setup Environment Variables

Rename .env.example to .env
Fill in the values for database credentials and other configurations.
Run Docker for MySQL

Start the Server
npm run start

sh
API Endpoints
GET /updateExchangeRates: Get xml data from http://www.bsi.si/_data/tecajnice/dtecbs-l.xml - HIT WITH POSTMAN 
GET /getExchangeRates Get rates between two currencies
GET /getAllCurrencies: Get all unique currencies.
GET /calculateOpportunity: Calculate exchange rate opportunities between two currencies.

Note cors.config check whiteliste if you get cors error on fe. Don't forget to save xml file to db to hit /updateExchangeRates with postman

Front-End/curreny README

1. cd to currency
2. npm install
3. crete .env add be route
   

