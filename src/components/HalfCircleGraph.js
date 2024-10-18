import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register necessary elements
Chart.register(ArcElement, Tooltip, Legend);

const HalfCircleGraph = ({ score }) => {
  const data = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score], // Example data
        backgroundColor: ['#0177FB', '#f0f0f0'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default HalfCircleGraph;
