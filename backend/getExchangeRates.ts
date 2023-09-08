import { createConnection } from "mysql2";
import { app, connection } from ".";

// Add this line at the beginning of your index.ts to get access to the existing connection

app.get("/getExchangeRates", async (req, res) => {
  console.log("Getting exchange rates");

  const { startDate, endDate, currencies } = req.query;

  if (!startDate || !endDate || !currencies) {
    return res.status(400).send("Missing required parameters.");
  }

  try {
    // Use the existing connection
    const dbConnection = await connection;

    const currencyList = currencies?.split(",");

    const query = `
      SELECT date, currency_code, rate
      FROM exchange_rates
      WHERE date BETWEEN ? AND ? AND currency_code IN (?)
      ORDER BY date ASC, currency_code ASC
    `;

    const [rows] = await dbConnection.execute(query, [startDate, endDate, currencyList]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred: " + error);
  }
});
