import { useEffect, useState } from "react";
import { useUserStore } from "../../../stores/userStore";
import { fetchGetNutritionMetrics } from "../../../services/metricsServices";
import toastify from "../../../utils/toastify";
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
import { Line } from "react-chartjs-2";

import styles from "./NutritionChart.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

export default function NutritionChart() {
   const [nutritionMetrics, setNutritionMetrics] = useState();
   const [chartData, setChartData] = useState({
      labels: [],
      datasets: [],
   });

   const user = useUserStore((state) => state.user);

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: "right",
            labels: {
               font: {
                  size: 14,
                  family: "Inter, sans-serif",
               },
            },
         },
         title: {
            display: true,
            text: "Macro Nutrients",
         },
         tooltip: {
            titleFont: { family: "Inter, sans-serif" },
            bodyFont: { family: "Inter, sans-serif" },
         },
      },
      scales: {
         x: {
            title: {
               display: true,
               text: "Date",
               font: {
                  size: 14,
                  family: "Inter, sans-serif",
               },
            },
            grid: {
               display: false,
            },
         },
         y: {
            title: {
               display: true,
               text: "Value (g)",
               font: {
                  size: 14,
                  family: "Inter, sans-serif",
               },
            },
            beginAtZero: true,
         },
      },
   };

   useEffect(() => {
      const getNutritionMetrics = async () => {
         try {
            const request = await fetchGetNutritionMetrics({
               token: user!.token,
            });

            const data = request.metrics;

            const dates = data.map((item) =>
               new Date(item.dateRecorded).toLocaleDateString()
            );
            const energyData = data.map((item) => item.energy);
            const proteinData = data.map((item) => item.protein);
            const totalFatData = data.map((item) => item.totalFat);
            const sodiumData = data.map((item) => item.sodium);
            const addedSugarData = data.map((item) => item.addedSugar);
            const cholesterolData = data.map((item) => item.cholesterol);
            const totalSugarData = data.map((item) => item.totalSugar);
            const carbData = data.map((item) => item.carbohydrates);
            const fiberData = data.map((item) => item.fiberData);

            setChartData({
               labels: dates,
               datasets: [
                  {
              label: 'Energy (kcal)',
              data: energyData,
              borderColor: '#3ace87',
              backgroundColor: 'rgba(58, 206, 135, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Protein (g)',
              data: proteinData,
              borderColor: '#3ace87',
              backgroundColor: 'rgba(58, 206, 135, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Total Fat (g)',
              data: totalFatData,
              borderColor: '#cc3300',
              backgroundColor: 'rgba(204, 51, 0, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Sodium (g)',
              data: sodiumData,
              borderColor: '#cc3300',
              backgroundColor: 'rgba(204, 51, 0, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Added Sugar (g)',
              data: addedSugarData,
              borderColor: '#cc3300',
              backgroundColor: 'rgba(204, 51, 0, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Cholesterol (g)',
              data: cholesterolData,
              borderColor: '#cc3300',
              backgroundColor: 'rgba(204, 51, 0, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Total Sugar (g)',
              data: totalSugarData,
              borderColor: '#cc3300',
              backgroundColor: 'rgba(204, 51, 0, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Carbohydrates (g)',
              data: carbData,
              borderColor: '#ffc107',
              backgroundColor: 'rgba(255, 193, 7, 0.5)',
              tension: 0.3,
            },
            {
              label: 'Fiber (g)',
              data: fiberData,
              borderColor: '#006239',
              backgroundColor: 'rgba(0, 98, 57, 0.5)',
              tension: 0.3,
            },
               ],
            });

            setNutritionMetrics(request.metrics);
         } catch (error) {
            console.error(error);

            toastify({
               message: "Something went wrong getting nutrition metrics.",
               type: "error",
            });
         }
      };

      getNutritionMetrics();
   }, []);

   return (
      <div className={styles.container}>
         <Line data={chartData} options={options} />
      </div>
   );
}
