import express from "express";
import { connection } from "./db";
import { fetchData } from "./fetchData";
import { calculateOpportunityGainsOrLosses } from "./utils";

async function executeQuery(query: string, params: Array<any>) {
  const dbConnection = await connection;
  return await dbConnection.execute(query, params);
}

export const exchangeRateRouter = express.Router();

exchangeRateRouter.post("/updateExchangeRates", async (req, res) => {
  console.log("Updating exchange rates");
  try {
    const dbConnection = await connection;
    const xmlData = await fetchData();
    console.log("Data fetched successfully");
    const tecajnica = xmlData.DtecBS.tecajnica;
    for (let tecajnicaData of tecajnica) {
      const date = tecajnicaData.$.datum;
      for (let tecaj of tecajnicaData.tecaj) {
        const currencyCode = tecaj.$.oznaka;
        const currencyId = tecaj.$.sifra;
        const rate = tecaj._;
        const query = `
            INSERT INTO exchange_rates (date, currency_code, currency_id, rate)
            VALUES (?, ?, ?, ?)
          `;
        await dbConnection.execute(query, [date, currencyCode, currencyId, rate]);
      }
    }
    res.status(200).send("Data updated successfully.");
  } catch (error) {
    res.status(500).send("An error occurred: " + error);
  }
});

exchangeRateRouter.get("/getExchangeRates", async (req, res, next) => {
  try {
    const { startDate, endDate, currencies } = req.query as { startDate: string; endDate: string; currencies: string };

    if (!startDate || !endDate || !currencies) {
      return res.status(400).send("Missing required parameters.");
    }

    const currencyList = currencies.split(",");
    const placeholders = currencyList.map(() => "?").join(",");

    const query = `
      SELECT date, currency_code, rate
      FROM exchange_rates
      WHERE date BETWEEN ? AND ? AND currency_code IN (${placeholders})
      ORDER BY date ASC, currency_code ASC
    `;

    const [rows] = await executeQuery(query, [startDate, endDate, ...currencyList]);
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
});

exchangeRateRouter.get("/getAllCurrencies", async (req, res, next) => {
  try {
    const query = "SELECT DISTINCT currency_code FROM exchange_rates";
    const [rows]: Array<any> = await executeQuery(query, []);

    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }

    const dropdownData = rows.map((row: any, i: number) => ({
      key: i,
      value: row.currency_code,
    }));
    res.status(200).json(dropdownData);
  } catch (error) {
    next(error);
  }
});

exchangeRateRouter.get("/calculateOpportunity", async (req, res, next) => {
  try {
    const { startDate, endDate, firstCurrency, secondCurrency } = req.query as {
      startDate: string;
      endDate: string;
      firstCurrency: string;
      secondCurrency: string;
    };

    if (!startDate || !endDate || !firstCurrency || !secondCurrency) {
      return res.status(400).send("Missing required parameters.");
    }

    const query = `
      SELECT date, currency_code, rate
      FROM exchange_rates
      WHERE date BETWEEN ? AND ? AND (currency_code = ? OR currency_code = ?)
      ORDER BY date ASC, currency_code ASC
    `;

    const [rows]: any = await executeQuery(query, [startDate, endDate, firstCurrency, secondCurrency]);

    const opportunityGainsOrLosses = calculateOpportunityGainsOrLosses(rows, firstCurrency, secondCurrency);

    res.status(200).json({ opportunity: opportunityGainsOrLosses });
  } catch (error) {
    next(error);
  }
});
