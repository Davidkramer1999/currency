import { Line } from "react-chartjs-2";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import es from "date-fns/locale/es";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CurrencyChat({ currencyData }: any) {
  registerLocale("es", es);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const randomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const processDataForChart = (rows: any[]) => {
    const labels: string[] = [];
    const datasets: any[] = [];

    // Create a unique list of dates and currency codes
    const uniqueDates = Array.from(new Set(rows.map((row) => row.date)));
    const uniqueCurrencies = Array.from(new Set(rows.map((row) => row.currency_code)));

    // Initialize labels and transform to dd.mm.yyyy format
    labels.push(...uniqueDates.map((date) => format(new Date(date), "dd.MM.yyyy")));

    // Initialize datasets
    uniqueCurrencies.forEach((currency) => {
      const color = randomRGB();
      datasets.push({
        label: currency,
        data: labels.map((label) => {
          const row = rows.find(
            (r: any) => format(new Date(r.date), "dd.MM.yyyy") === label && r.currency_code === currency
          );
          return row ? parseFloat(row.rate) : 0;
        }),
        borderColor: color,
        backgroundColor: `${color}80`,
      });
    });

    return { labels, datasets };
  };

  const chartData1 = processDataForChart(currencyData);

  return (
    <div>
      <Line
        options={options}
        data={{
          labels: chartData1?.labels || [],

          datasets: chartData1?.datasets || [],
        }}
      />
    </div>
  );
}
