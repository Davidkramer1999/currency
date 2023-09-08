import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";

import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import CurrencyDropdown from "./CurrencyDropdown";
import { CurrencyList } from "../App";
import FormControlWithError from "./FormControlWithError";

interface OpportunityProps {
  currenciesList: CurrencyList[];
}

export default function Opportunity({ currenciesList }: OpportunityProps) {
  registerLocale("es", es);

  const [opportunityStartDate, setOpportunityStartDate] = useState(new Date("2007-01-01"));
  const [opportunityEndDate, setOpportunityEndDate] = useState<Date | null>(opportunityStartDate);

  const [opportunityFirstCurrencies, setOpportunitySetFirstCurrencies] = useState([]);
  const [opportunitySecondCurrencies, setOpportunitySecondCurrencies] = useState([]);

  const [opportunityData, setOpportunityData] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const checkFields = () => {
    if (!opportunityFirstCurrencies.length || !opportunitySecondCurrencies.length) {
      setError("Please fill out all fields");
      return;
    }
    setError(null);
    fetchOpportunityData();
  };

  const fetchOpportunityData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/calculateOpportunity`, {
        params: {
          startDate: opportunityStartDate,
          endDate: opportunityEndDate,
          firstCurrency: opportunityFirstCurrencies,
          secondCurrency: opportunitySecondCurrencies,
        },
      });

      if (response.status === 200) {
        setOpportunityData(response.data.opportunity?.opportunityGainOrLoss);
      } else {
        setError("Failed to fetch opportunity data");
      }
    } catch (error) {
      setError("Error fetching opportunity data");
    }
  };

  const resultType = parseFloat(opportunityData) > 0 ? "gain" : "loss";

  return (
    <div>
      {`Start date: `}
      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={opportunityStartDate}
        onChange={(date: Date) => setOpportunityStartDate(date)}
      />
      {`End date: `}
      <DatePicker
        dateFormat="dd.MM.yyyy"
        minDate={opportunityStartDate}
        selected={opportunityEndDate}
        onChange={(date: Date) => setOpportunityEndDate(date)}
      />
      <div style={{ padding: 20 }}>
        <CurrencyDropdown
          label="Select first currency"
          value={opportunityFirstCurrencies}
          onChange={setOpportunitySetFirstCurrencies}
          options={currenciesList}
        />
        <CurrencyDropdown
          label="Select second currency"
          value={opportunitySecondCurrencies}
          onChange={setOpportunitySecondCurrencies}
          options={currenciesList}
          disabled={opportunityFirstCurrencies.length === 0}
        />
      </div>
      <Button onClick={checkFields}> Get opportunity data</Button>
      <FormControlWithError error={error}></FormControlWithError>
      <div>
        {`Opportunity is ${resultType}: `}
        {opportunityData ? Math.round(parseFloat(opportunityData)) : ""}
      </div>
    </div>
  );
}
