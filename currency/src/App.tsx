import { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import es from "date-fns/locale/es";

import CurrencyChat from "./components/CurrencyChart";
import Opportunity from "./components/Opportunity";
import FormControlWithError from "./components/FormControlWithError";

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
  const [data, setData] = useState<Currency[]>([]);
  const [startDate, setStartDate] = useState(new Date("2007-01-01"));
  const [endDate, setEndDate] = useState<Date | null>(startDate);
  const [currencies, setCurrencies] = useState([]);
  const [currenciesList, setCurrenciesList] = useState<CurrencyList[]>([]);

  //error handling
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const checkFields = () => {
    if (!startDate || !endDate || currencies.length === 0) {
      setError("Please fill out all fields");
      return;
    }
    setError(null);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const formattedStartDate = startDate?.toISOString().split("T")[0];
      const formattedEndDate = endDate?.toISOString().split("T")[0];
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getExchangeRates?startDate=${formattedStartDate}&endDate=${formattedEndDate}&currencies=${currencies}`
      );
      setData(response.data);
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
        {`Start date: `}
        <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
        {`End date: `}
        <DatePicker dateFormat="dd.MM.yyyy" selected={endDate} onChange={(date: Date) => setEndDate(date)} />
        <div style={{ padding: 10 }}>
          <Select
            style={{ width: "200px", height: "50px" }}
            labelId="label"
            id="demo-simple-select"
            value={currencies}
            onChange={(e: any) => {
              setCurrencies(e.target.value);
            }}
            multiple
          >
            {currenciesList.map((currency, index) => (
              <MenuItem key={index} value={currency.value}>
                {currency.value}
              </MenuItem>
            ))}
          </Select>
        </div>

        <FormControlWithError error={error}></FormControlWithError>

        <Button onClick={checkFields}>Get data</Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length !== 0
              ? data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(new Date(row?.date), "dd.MM.yyyy")}</TableCell>
                    <TableCell align="right">{row?.currency_code || ""}</TableCell>
                    <TableCell align="right">{row?.rate || ""}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {/* chart */}
      <CurrencyChat currencyData={data} />
      {/* Opportunity */}
      <Opportunity currenciesList={currenciesList}></Opportunity>
    </div>
  );
}
