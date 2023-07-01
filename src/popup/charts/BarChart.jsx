import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // eslint-disable-line no-unused-vars
import "../../style/style.css";
import consoleLog from "../../helper/consoleLog";

function BarChart({ data, fetchData }) {

  function deleteUserAndUpdateData(index) {
    chrome.storage.sync.get("friends", (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      const friendsArray = result.friends || [];

      if (index >= 0 && index < friendsArray.length) {
        friendsArray.splice(index, 1);

        chrome.storage.sync.set({ friends: friendsArray }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
          }
          consoleLog("Value removed successfully!");
          fetchData();
          consoleLog("Overview data successfully filled");
        });
      }
    });
  }

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
              return this.getLabelForValue(value).substring(0, 10) + "...";
            }
            return this.getLabelForValue(value);
          },
        },
        display: true,
      },
    },

    onClick: (event, elements) => {
      if (elements && elements.length > 0) {
        const clickedElement = elements[0];
        const index = clickedElement.index;
        consoleLog("index", index);
        deleteUserAndUpdateData(index);
      }
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
    barThickness: 10,
    categorySpacing: 40,
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
  };

  const chartRef = useRef(null);
  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      consoleLog('ChartJS', chart);
      consoleLog('data', chart.data.labels);
    }
  }, []);

  return (
    <div className="w-full h-full">
      {data && <Bar data={data} options={options} ref={chartRef} />}
    </div>
  );
}

export default BarChart;
