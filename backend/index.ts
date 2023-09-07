import axios from "axios";
import { parseString } from "xml2js";
import { createConnection } from "./dbConnection";

async function fetchData() {
  const response = await axios.get("http://www.bsi.si/_data/tecajnice/dtecbs-l.xml");
  return new Promise<any>((resolve, reject) => {
    parseString(response.data, (err, result) => {
      if (err) {
        reject("Failed to parse XML");
      } else {
        resolve(result);
      }
    });
  });
}

async function main() {
  try {
    const connection = await createConnection();
    console.log("Database connected");

    const xmlData = await fetchData();
    console.log("XML Data fetched");

    const tecajnica = xmlData.DtecBS.tecajnica;

    // Loop through each tecajnica to get date and rates
    for (let tecajnicaData of tecajnica) {
      const date = tecajnicaData.$.datum;

      // Loop through each tecaj (rate) inside tecajnica
      for (let tecaj of tecajnicaData.tecaj) {
        const currencyCode = tecaj.$.oznaka;
        const currencyId = tecaj.$.sifra;
        const rate = tecaj._;

        const query = `
          INSERT INTO exchange_rates (date, currency_code, currency_id, rate)
          VALUES (?, ?, ?, ?)
        `;

        const [result] = await connection.execute(query, [date, currencyCode, currencyId, rate]);
        console.log(`Data inserted for ${currencyCode} on ${date}:`, result);
      }
    }

    await connection.end();
  } catch (err) {
    console.error(err);
  }
}

main();
