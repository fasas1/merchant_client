import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';


const PieChart = () => {
  const data = {
    labels: [ 'MacBook', 'Gaming', 'Iphones', 'Laptops', 'Accessories'],
    datasets: [
      {
        data: [300, 50, 100, 75,64],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#4CAF70'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#4CAF70'],
  

      },

    ],
  
   options: {
      aspectRatio:1.5,
      
    }

  };

  return (
    <div >
        <h5> Sales by category</h5>
  <Doughnut data={data}  />


    </div>
  );
};

  
export default PieChart;