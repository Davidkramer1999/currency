import { executeQuery } from "../exchangeRateRoutes";

export async function getExchangeRates(req: any, res: any, next: any) {
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
        res.status(500).json({ error: "Internal Server Error" });
      }
  }

