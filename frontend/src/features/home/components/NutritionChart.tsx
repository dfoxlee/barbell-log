import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define a consistent color scheme
const CHART_COLORS = [
  '#FF6384', // Calories (Red)
  '#36A2EB', // Protein (Blue)
  '#FFCE56', // Carbs (Yellow)
  '#4BC0C0', // Added Sugar (Teal)
  '#9966FF', // Total Fiber (Purple)
  '#FF9F40', // Total Sugar (Orange)
  '#66CC99', // Sodium (Mint)
  '#C9CBCE', // Cholesterol (Gray)
];

// Helper function to format the date string (e.g., '10/04')
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const NutritionChart = ({ nutritionData = [] }) => {
  if (!nutritionData || nutritionData.length === 0) {
    return <p>No nutrition data available for the last 30 days.</p>;
  }

  // 1. Extract the labels (dates)
  // Reversing the array ensures the dates are in chronological order (left to right)
  const labels = nutritionData
    .map((d) => formatDate(d.date_group))
    .reverse();

  // 2. Define the metrics to track and their corresponding object keys
  const metrics = [
    { key: 'totalCalories', label: 'Calories (kcal)', unit: 'kcal' },
    { key: 'totalProtein', label: 'Protein (g)', unit: 'g' },
    { key: 'totalCarbohydrates', label: 'Carbohydrates (g)', unit: 'g' },
    { key: 'totalAddedSugar', label: 'Added Sugar (g)', unit: 'g' },
    { key: 'totalTotalFiber', label: 'Total Fiber (g)', unit: 'g' },
    { key: 'totalTotalSugar', label: 'Total Sugar (g)', unit: 'g' },
    { key: 'totalSodium', label: 'Sodium (mg)', unit: 'mg' },
    { key: 'totalCholesterol', label: 'Cholesterol (mg)', unit: 'mg' },
  ];

  // 3. Create datasets for the chart
  const datasets = metrics.map((metric, index) => {
    // Reversing the data ensures it aligns with the reversed labels
    const dataPoints = nutritionData
      .map((d) => parseFloat(d[metric.key]))
      .reverse();
      
    const color = CHART_COLORS[index % CHART_COLORS.length];

    return {
      label: metric.label,
      data: dataPoints,
      borderColor: color,
      backgroundColor: color + '40', // Added transparency for fill
      tension: 0.3, // Smoother lines
      fill: false, // Don't fill area under the line
      yAxisID: metric.unit === 'kcal' ? 'y_kcal' : 'y_g_mg', // Use different Y-axis for Calories
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows you to set height/width of the container
    plugins: {
      legend: {
        position: 'top', // Place legend at the top
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
      title: {
        display: true,
        text: '30-Day Nutrition Overview',
        font: {
          size: 16
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      // Primary Y-axis for general metrics (grams, milligrams)
      y_g_mg: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Grams / Milligrams',
        },
        grid: {
          drawOnChartArea: true,
        },
      },
      // Secondary Y-axis for Calories (often a much higher value)
      y_kcal: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Calories (kcal)',
        },
        grid: {
          drawOnChartArea: false, // Only draw grid lines for one axis
        },
        // Ensure this axis is separate from the left one
        // and doesn't overlap scale significantly if possible
        min: 0,
        max: 3000, // You might adjust this based on typical max daily intake
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default NutritionChart;