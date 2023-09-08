# currency

### Project Description

Fetches xml from http://www.bsi.si/_data/tecajnice/dtecbs-l. makes conversion to json
and saves to db. Then showing on fe chart and table of selected dates and currencies.

There is option to select start, end date, currency and second currency which will tell
you if you are in loss or profit.

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

1. GET /updateExchangeRates: Get xml data from http://www.bsi.si/_data/tecajnice/dtecbs-l.xml
2. GET /getExchangeRates Get rates between two currencies
3. GET /getAllCurrencies: Get all unique currencies.
4. GET /calculateOpportunity: Calculate exchange rate opportunities between two currencies.

### Getting Started Front-End/curreny !!!

1. cd to currency
2. npm install
3. crete .env add be route

### Create table for mysql

CREATE TABLE exchange_rates (
id INT AUTO_INCREMENT PRIMARY KEY,
date DATE NOT NULL,
currency_code VARCHAR(10) NOT NULL,
currency_id INT NOT NULL,
rate DECIMAL(10, 4) NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

### Note

cors.config check whiteliste if you get cors error on fe.

I've been using node -v 20!
