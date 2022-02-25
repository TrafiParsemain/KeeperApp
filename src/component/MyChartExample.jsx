import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';


const MyChartExample = () => {
  const barChartData = {
    labels: ["October", "November", "December"],
    datasets: [
      {
        data: [4, 3, 5],
        label: "Infected People",
        borderColor: "#3333ff",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        fill: true
      },
      {
        data: [1, 2, 3],
        label: "Deaths People",
        borderColor: "#ff3333",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true
      }
    ]
  };

  Chart.register(...registerables);
  const barChart = (
    <Bar
      type="bar"
      width={130}
      height={50}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 3 Months",
          fontSize: 15
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={barChartData}
    />
  );
  return barChart;
};

export default MyChartExample;