import { useEffect, useState } from "react";
import { fetchGetBodyweightReadings } from "../../../services/metricsServices";
import { useUserStore } from "../../../stores/userStore";
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

import styles from "./BodyweightChart.module.css";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

export default function BodyweightChart() {
   const [bodyweightReadings, setBodyweightReadings] = useState<
      {
         bodyweight: number;
         dateRecorded: Date | string;
      }[]
   >([]);

   const user = useUserStore((state) => state.user);

   useEffect(() => {
      const getBodyweightReadings = async () => {
         try {
            const bodyweightReadings = await fetchGetBodyweightReadings({
               token: user!.token,
            });

            setBodyweightReadings(bodyweightReadings.metrics);
         } catch (error) {
            console.error(error);
            toastify({
               message: "Something went wrong getting bodyweight readings.",
               type: "error",
            });
         }
      };

      getBodyweightReadings();
   }, []);

   const data = {
      labels: bodyweightReadings.map((reading) => reading.dateRecorded), // Use date for labels
      datasets: [
         {
            label: "Bodyweight (lbs)",
            data: bodyweightReadings.map((reading) => ({
               x: reading.dateRecorded,
               y: reading.bodyweight,
            })),
            borderColor: "#3ace87",
            backgroundColor: "var(--secondary)",
            tension: 0.3,
            pointStyle: "circle",
            pointRadius: 5,
            pointHoverRadius: 7,
         },
      ],
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: false,
         title: {
            display: true,
            text: "Weight Progress",
         },
         tooltip: {
            callbacks: {
               label: function (context) {
                  const date = context.raw.x;
                  const weight = context.raw.y;
                  return `Date: ${date}, Bodyweight: ${weight} lbs`;
               },
            },
         },
      },
      scales: {
         x: {
            // This is the key part to hide the labels on the X-axis
            ticks: {
               display: false,
            },
            title: {
               display: true,
               text: "Date Recorded",
            },
         },
         y: {
            beginAtZero: false,
            title: {
               display: true,
               text: "Bodyweight (lbs)",
            },
         },
      },
   };

   console.log(bodyweightReadings);
   return (
      <div className={styles.container}>
         <Line data={data} options={options} />
      </div>
   );
}
