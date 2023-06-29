import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line no-unused-vars
import "../../style/style.css";

function BarChart({data}) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          color: "rgba(255, 255, 255, 0.5)",
          borderColor: "white",
        },
        ticks: {
          color: "white",
        },
        display: true,
      },
      y: {
        stacked: true,
        grid: {
          display: false,
          color: "rgba(255, 255, 255, 0.5)",
          borderColor: "white",
        },
        ticks: {
          color: "white",
          callback: function (value) {
            if (this.getLabelForValue(value).length > 10) {
              return this.getLabelForValue(value).substring(0, 10) + '...'; 
            }
            return this.getLabelForValue(value);
          },
        },
        display: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
      legend: {
        display: false,
      },
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderRadius: 10,
        borderWidth: 1,
      },
    },
  };

  return (
    <div>
      {data && <Bar data={data} options={options} />}
    </div>
  );
}

export default BarChart;
