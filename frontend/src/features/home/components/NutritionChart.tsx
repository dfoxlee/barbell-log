import React from "react";
import { Line } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import type { GroupedNutritionInfo } from "../../../types/nutrient.types";

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
   "#FF6384", // Calories (Red)
   "#36A2EB", // Protein (Blue)
   "#FFCE56", // Carbs (Yellow)
   "#4BC0C0", // Added Sugar (Teal)
   "#9966FF", // Total Fiber (Purple)
   "#FF9F40", // Total Sugar (Orange)
   "#66CC99", // Sodium (Mint)
   "#C9CBCE", // Cholesterol (Gray)
];

// Helper function to format the date string (e.g., '10/04')
const formatDate = (dateString: string) => {
   const date = new Date(dateString);
   return `${date.getMonth() + 1}/${date.getDate()}`;
};

const NutritionChart = ({
   nutritionData,
}: {
   nutritionData: GroupedNutritionInfo[];
}) => {
   const labels = nutritionData
      .map((d) => formatDate(d.dateGroup.toString()))
      .reverse();

   const metrics = [
      { key: "totalCalories", label: "Calories (kcal)", unit: "kcal" },
      { key: "totalProtein", label: "Protein (g)", unit: "g" },
      { key: "totalCarbohydrates", label: "Carbohydrates (g)", unit: "g" },
      { key: "totalAddedSugar", label: "Added Sugar (g)", unit: "g" },
      { key: "totalTotalFiber", label: "Total Fiber (g)", unit: "g" },
      { key: "totalTotalSugar", label: "Total Sugar (g)", unit: "g" },
      { key: "totalSodium", label: "Sodium (mg)", unit: "mg" },
      { key: "totalCholesterol", label: "Cholesterol (mg)", unit: "mg" },
   ];

   const datasets = metrics.map((metric, index) => {
      const dataPoints = nutritionData
         .map((d) => parseFloat(d[metric.key]))
         .reverse();

      const color = CHART_COLORS[index % CHART_COLORS.length];

      return {
         label: metric.label,
         data: dataPoints,
         borderColor: color,
         backgroundColor: color + "40",
         tension: 0.3,
         fill: false,
         yAxisID: metric.unit === "kcal" ? "y_kcal" : "y_g_mg",
      };
   });

   const data = {
      labels: labels,
      datasets: datasets,
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: "top",
            labels: {
               boxWidth: 10,
               padding: 10,
            },
         },
         title: {
            display: false,
            text: "30-Day Nutrition Overview",
            font: {
               size: 16,
            },
         },
         tooltip: {
            mode: "index",
            intersect: false,
         },
      },
      scales: {
         x: {
            title: {
               display: true,
               text: "Date",
            },
         },
         y_g_mg: {
            type: "linear",
            display: true,
            position: "left",
            title: {
               display: true,
               text: "Grams / Milligrams",
            },
            grid: {
               drawOnChartArea: true,
            },
         },
         y_kcal: {
            type: "linear",
            display: true,
            position: "right",
            title: {
               display: true,
               text: "Calories (kcal)",
            },
            grid: {
               drawOnChartArea: false,
            },
            min: 0,
            max: 3000,
         },
      },
   };

   return <Line data={data} options={options} />;
};

export default NutritionChart;
