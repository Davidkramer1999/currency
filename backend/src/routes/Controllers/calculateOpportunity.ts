import { calculateOpportunityGainsOrLosses } from "../../utils/utils";
import { executeQuery } from "../exchangeRateRoutes";

export async function calculateOpportunity(req: any, res: any, next: any) {
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
        res.status(500).json({ error: "Internal Server Error" });
      }
  }

