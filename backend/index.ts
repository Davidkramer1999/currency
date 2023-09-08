import express from "express";
import cors from "cors";
import { corsOptions } from "./src/config/corsConfig";
import { exchangeRateRouter } from "./src/routes/exchangeRateRoutes"; // here are all API routes

const app = express();
const port = 3001;

app.use(cors(corsOptions));
app.use(exchangeRateRouter); // here are all API routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
