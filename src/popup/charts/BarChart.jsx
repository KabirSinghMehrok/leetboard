import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import "../../style/style.css";
import data from "../../data/overview";

function BarChart() {
	const options = {
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false, // Remove the x-axis grid lines
				},
				display: true,
			},
			y: {
				grid: {
					display: false, // Remove the x-axis grid lines
				},
				display: true,
			},
		},
		plugins: {
			tooltip: {
				enabled: true,
				mode: 'index',
				intersect: false,
			},
			legend: {
				display: false,
			},
		},
		indexAxis: 'y',
		elements: {
			bar: {
				borderRadius: 10,
				borderWidth: 1,
			},
		},
	};	

	return (
		<Bar data={data} options={options}/>
	)
}

export default BarChart;