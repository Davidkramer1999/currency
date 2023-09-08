interface Row {
  date: Date;
  currency_code: string;
  rate: string;
}

export function calculateOpportunityGainsOrLosses(rows: Row[], firstCurrency: string, secondCurrency: string) {
  console.log(rows, "rows");

  let firstCurrencyRates: number[] = [];
  let secondCurrencyRates: number[] = [];

  rows.forEach((row) => {
    if (row.currency_code === firstCurrency) {
      firstCurrencyRates.push(parseFloat(row.rate));
    } else if (row.currency_code === secondCurrency) {
      secondCurrencyRates.push(parseFloat(row.rate));
    }
  });

  if (firstCurrencyRates.length === 0 || secondCurrencyRates.length === 0) {
    return {
      error: "No data available for the selected date range or currencies.",
    };
  }

  const avgFirstCurrency = firstCurrencyRates.reduce((acc, val) => acc + val, 0) / firstCurrencyRates.length;
  const avgSecondCurrency = secondCurrencyRates.reduce((acc, val) => acc + val, 0) / secondCurrencyRates.length;

  const opportunityGainOrLoss = avgFirstCurrency - avgSecondCurrency;

  return {
    opportunityGainOrLoss,
  };
}
