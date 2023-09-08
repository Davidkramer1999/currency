import { useState, useEffect } from "react";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import es from "date-fns/locale/es";

import CurrencyChat from "./components/CurrencyChart";
import Opportunity from "./components/Opportunity";
import FetchXml from "./components/FetchXml";
import TableCurrency from "./components/TableCurrency";
import DateAndCurrencySelector from "./components/DateAndCurrencySelector";

export interface Currency {
  date: Date;
  currency_code: string;
  rate: number;
}

export interface CurrencyList {
  key: number;
  value: string;
}

export default function App() {
  registerLocale("es", es);

  // currency
  const [currencyData, setCurrencyData] = useState<Currency[]>([]);
  const [startDate, setStartDate] = useState(new Date("2007-01-01"));
  const [endDate, setEndDate] = useState<Date>(startDate);
  const [currencies, setCurrencies] = useState<Array<string>>([]);
  const [currenciesList, setCurrenciesList] = useState<CurrencyList[]>([]);

  //error handling
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const checkFields = () => {
    if (!startDate || !endDate || currencies.length === 0) {
      setError("Please fill out all fields");
      return;
    }
    setError("");
    fetchCurrencyData();
  };

  const fetchCurrencyData = async () => {
    try {
      const formattedStartDate = startDate?.toISOString().split("T")[0];
      const formattedEndDate = endDate?.toISOString().split("T")[0];
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getExchangeRates?startDate=${formattedStartDate}&endDate=${formattedEndDate}&currencies=${currencies}`
      );
      setCurrencyData(response.data);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getAllCurrencies`);
      setCurrenciesList(response.data);
    } catch (error) {
      setError("Error fetching Currencies List");
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <div style={{ padding: 10 }}>
        <FetchXml></FetchXml>
      </div>
      <div style={{ padding: 10 }}>
        <DateAndCurrencySelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          currencies={currencies}
          setCurrencies={setCurrencies}
          currenciesList={currenciesList}
          checkFields={checkFields}
          error={error}
        />
      </div>
      <TableCurrency data={currencyData || []} />
      {/* chart */}
      <CurrencyChat currencyData={currencyData} />
      {/* Opportunity */}
      <Opportunity currenciesList={currenciesList}></Opportunity>
    </div>
  );
}
