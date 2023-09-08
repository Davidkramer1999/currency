import { fetchData } from "../../utils/fetchData";
import { executeQuery } from "../exchangeRateRoutes";

export async function getExchangeRates(req: any, res: any) {
    try {
        const xmlData = await fetchData();
        console.log("Data fetched successfully");
    
        const tecajnica = xmlData.DtecBS.tecajnica;
    
        const insertValues: Array<[string, string, string, string]> = [];
    
        for (let tecajnicaData of tecajnica) {
          const date = tecajnicaData.$.datum;
          for (let tecaj of tecajnicaData.tecaj) {
            const currencyCode = tecaj.$.oznaka;
            const currencyId = tecaj.$.sifra;
            const rate = tecaj._;
    
            // Add each set of values as a sub-array
            insertValues.push([date, currencyCode, currencyId, rate]);
          }
        }
    
        const query = `
          INSERT INTO exchange_rates (date, currency_code, currency_id, rate)
          VALUES ?
        `;
    
        await executeQuery(query, insertValues, true);
    
        res.status(200).json({ message: "Data updated successfully." , success: true});
      } catch (error) {
        console.error("An error occurred: ", error);
        res.status(500).json({ message: "An error occurred." });
      }
  }

