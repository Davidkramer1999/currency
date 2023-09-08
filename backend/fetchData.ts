import axios from "axios";
import { parseString } from "xml2js";

export async function fetchData() {
  console.log("Starting fetch...");
  try {
    const response = await axios.get("http://www.bsi.si/_data/tecajnice/dtecbs-l.xml");
    return new Promise<any>((resolve, reject) => {
      parseString(response.data, (err, result) => {
        if (err) {
          console.log("Error in parsing XML", err);
          reject("Failed to parse XML");
        } else {
          console.log("Successfully parsed XML");
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log("Error in fetching data:", error);
  }
}
