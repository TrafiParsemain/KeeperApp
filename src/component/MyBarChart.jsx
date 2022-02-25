import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';


function MyBarChart (props) {
  const barChartData = {
    labels: ["Notes"],
    datasets: [
      {
        data: [props.compteur.ctOK],
        label: "OK",
        borderColor: "#3333ff",
        backgroundColor: "rgba(0, 150, 75, 0.5)",
        fill: true
      },
      {
        data: [props.compteur.ctWarning],
        label: "Warning",
        borderColor: "#ff3333",
        backgroundColor: "rgba(255,150, 0, 0.5)",
        fill: true
      }
      ,
      {
        data: [props.compteur.ctAlert],
        label: "Alert",
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
      width={50}
      height={20}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 3 Months",
          fontSize: 15
        },
        legend: {
          display: true, //Is the legend shown?
          position: "bottom" //Position of the legend.
        }
      }}
      data={barChartData}
    />
  );
  return barChart;
};

export default MyBarChart;