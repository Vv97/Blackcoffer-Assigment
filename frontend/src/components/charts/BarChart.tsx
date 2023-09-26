import React from "react";
import { Bar } from "react-chartjs-2";
import { DashboardItem, getData } from "../../types/dashboard.types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({
  data = [],
  labels = "",
  dataTitle = "",
  barLabelx = "",
  barLabely = "",
}: {
  data: Array<DashboardItem | getData>;
  labels: string;
  dataTitle: string;
  barLabelx: string;
  barLabely: string;
}) => {
  // Define your data for the chart
  const chartData = {
    labels: data.map((item) => item[labels as keyof typeof item]), // Labels for the x-axis
    datasets: [
      {
        label: "Intensity", // Label for the dataset
        data: data.map((item) => item[dataTitle as keyof typeof item]), // Data for the y-axis
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  // Define chart options (e.g., title, axes, etc.)
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: barLabelx,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: barLabely,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
