import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { IAggData } from "../../types/dashboard.types";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PolarAreaChart({
  data = [],
  plabel = "",
}: {
  data: Array<IAggData>;
  plabel: string;
}) {
  const chartData = {
    labels: data.map((res) => res._id),
    datasets: [
      {
        label: `${plabel}`,
        data: data.map((res) => res.sectors.length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <PolarArea data={chartData} />;
}

export default PolarAreaChart;
