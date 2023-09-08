import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const FetchXml: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const saveXmlToDb = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`${process.env.REACT_APP_API_URL}/updateExchangeRates`);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/updateExchangeRates`);
      // If you needed to process the response, you would do it here
      console.log(response.data?.success);
      if (response.data) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching Currencies List");
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && (
        <Button style={{ border: "1px solid black" }} onClick={saveXmlToDb}>
          Save or update xml to db
        </Button>
      )}
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default FetchXml;
