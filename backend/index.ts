import express from "express";
import cors from "cors";
import { corsOptions } from "./corsConfig";
import { exchangeRateRouter } from "./exchangeRateRoutes"; // here are all API routes

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(exchangeRateRouter); // here are all API routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
