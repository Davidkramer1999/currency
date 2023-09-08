# Currency Exchange Application

### Project Description

This project fetches XML data from BSI's exchange rate endpoint and saves it in a MySQL database. It also provides a front-end that allows users to select dates and currencies to display exchange rates in both table and chart formats.

Additionally, the application can calculate whether you would be at a profit or loss when converting from one currency to another within a given date range.

### Technologies Used

1. Back-End: Node.js, MySQL, Docker
2. Front-End: [Technology used, e.g., React]

### Getting Started (Back-End)

#### Prerequisites

1. Node.js 20 (used during development)
2. MySQL - latest (8.0.3)

3. Clone the repository

- git clone https://github.com/yourusername/your-backend-repo.git
  Navigate to the directory

4. Rename .env.example to .env and fill in the required configurations such as database credentials.

### Starting the Server

npm run start

### API Endpoints

1. GET /updateExchangeRates: Fetches XML data from BSI and updates the database.
2. GET /getExchangeRates: Retrieves exchange rates for selected currencies and dates.
3. GET /getAllCurrencies: Lists all unique currencies available in the database.
4. GET /calculateOpportunity: Calculates the profit or loss opportunity between two selected currencies..

### Database Schema

- Execute the following SQL command to create the necessary table:

CREATE TABLE exchange_rates (
id INT AUTO_INCREMENT PRIMARY KEY,
date DATE NOT NULL,
currency_code VARCHAR(10) NOT NULL,
currency_id INT NOT NULL,
rate DECIMAL(10, 4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

##### Note

If you encounter CORS issues, check cors.config to ensure your front-end is whitelisted.

### Getting Started (Front-End)

1. cd currency
2. npm install
3. Create a .env file in the front-end directory and add the back-end route.
