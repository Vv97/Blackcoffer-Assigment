import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchData } from "./api";
import { getData } from "../../types/dashboard.types";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [data, setData] = useState<Array<getData>>([]);

  const chartData = {
    labels: data.map((res) => res._id),
    datasets: [
      {
        label: "sector",
        data: data.map((res) => res.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  useEffect(() => {
    fetchData("sector", "$sum", setData);
  }, []);

  return (
    <>
      <Doughnut data={chartData} options={options} />
    </>
  );
};

export default DoughnutChart;
