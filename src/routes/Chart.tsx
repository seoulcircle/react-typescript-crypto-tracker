import React from "react";

import { useQuery } from "react-query";
import { fetchCoinHistory, fetchInfoData } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["coinChart", coinId],
    () => fetchInfoData(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Chart is Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              // data: data?.map((item) => Number(item.close)) ?? [],
              data: [1, 4, 5, 12, 4, 5, 7],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              background: "transparent",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
              // categories: data?.map((item) => Number(item.time_close)) ?? [],
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
