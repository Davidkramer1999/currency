import express from "express";
import { connection } from "../db/db";
import { calculateOpportunity } from "./Controllers/calculateOpportunity";
import { getAllCurrencies } from "./Controllers/getAllCurrencies";
import { getExchangeRates } from "./Controllers/getExchangeRates";

export async function executeQuery(query: string, params: Array<any>, isBulk: boolean = false) {
  const dbConnection = await connection;
  if (isBulk) {
    return await dbConnection?.query(query, [params]);
  }
  return await dbConnection.execute(query, params);
}


export const exchangeRateRouter = express.Router();

//get xml data and save to db
exchangeRateRouter.get("/updateExchangeRates", getExchangeRates);

// get exchange rates from db
exchangeRateRouter.get("/getExchangeRates", getExchangeRates);

//get all currencies from db
exchangeRateRouter.get("/getAllCurrencies", getAllCurrencies);


exchangeRateRouter.get("/calculateOpportunity", calculateOpportunity);

