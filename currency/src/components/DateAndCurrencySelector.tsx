import { Button, MenuItem, Select } from "@mui/material";
import { error } from "console";
import React from "react";
import DatePicker from "react-datepicker";
import FormControlWithError from "./FormControlWithError";

interface DateAndCurrencySelectorProps {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  currencies: string[];
  setCurrencies: React.Dispatch<React.SetStateAction<string[]>>;
  currenciesList: { value: string }[];
  checkFields: () => void;
  error: string;
}

const DateAndCurrencySelector: React.FC<DateAndCurrencySelectorProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  currencies,
  setCurrencies,
  currenciesList,
  checkFields,
  error,
}) => {
  return (
    <div>
      <div>
        {`Start date: `}
        <DatePicker dateFormat="dd.MM.yyyy" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
      </div>
      <div style={{ padding: 10 }}>
        {`End date: `}
        <DatePicker
          dateFormat="dd.MM.yyyy"
          minDate={startDate}
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
      <div style={{ padding: 10 }}>
        {` Select currencies: `}
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

      <Button onClick={checkFields}>Get currency data</Button>
    </div>
  );
};

export default DateAndCurrencySelector;
