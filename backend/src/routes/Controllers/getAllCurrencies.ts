import { executeQuery } from "../exchangeRateRoutes";

export async function getAllCurrencies(req: any, res: any, next: any) {
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
        res.status(500).json({ error: "Internal Server Error" });
      }
}

