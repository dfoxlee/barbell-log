import { useEffect } from "react";
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

// Register the necessary components from Chart.js
ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);
import { useReadingsStore } from "../../../stores/reading.store";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import { fetchGetBodyweightReadings } from "../../../services/reading.services";

import styles from "./BodyweightChart.module.css";

export const BodyweightChart = () => {
   const bodyweightReadings = useReadingsStore(
      (state) => state.bodyweightReadings
   );
   const token = useUserStore((state) => state.token);
   const setBodyweightReadings = useReadingsStore(
      (state) => state.setBodyweightReadings
   );

   useEffect(() => {
      const getBodyweightReadings = async () => {
         try {
            const bodyweightReadingsRequest = await fetchGetBodyweightReadings({
               token: token!,
            });

            setBodyweightReadings(bodyweightReadingsRequest.bodyweightReadings);
         } catch (error) {
            console.error(
               "An error occurred getting bodyweight readings. Please try again later.",
               error
            );

            toastify({
               message:
                  "An error occurred getting bodyweight readings. Please try again later.",
               type: "error",
            });
         }
      };

      if (!bodyweightReadings && token) {
         getBodyweightReadings();
      }
   }, [token]);

   const sortedData = bodyweightReadings?.sort(
      (a, b) =>
         new Date(a.dateRecorded).getTime() - new Date(b.dateRecorded).getTime()
   );

   const labels = sortedData?.map((item) => {
      const date = new Date(item.dateRecorded);

      return date.toLocaleDateString();
   });

   const bodyweights = sortedData?.map((item) => item.bodyweight);

   const chartData = {
      labels: labels,
      datasets: [
         {
            label: "Bodyweight",
            data: bodyweights,
            borderColor: "rgb(58, 206, 135)", // --primary
            backgroundColor: "rgba(58, 206, 135, 0.5)", // --primary with opacity
            pointBorderColor: "rgb(137, 137, 137)", // --accent
            pointBackgroundColor: "rgb(137, 137, 137)", // --accent
            tension: 0.4,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            display: false,
         },
         title: {
            display: false,
         },
      },
      scales: {
         x: {
            title: {
               display: false,
               text: "Date",
               color: "rgb(137, 137, 137)", // --accent
            },
            ticks: {
               color: "rgb(137, 137, 137)", // --accent
            },
            grid: {
               color: "rgba(137, 137, 137, 0.2)", // --accent with opacity
            },
         },
         y: {
            title: {
               display: false,
               text: "Bodyweight",
               color: "rgb(137, 137, 137)", // --accent
            },
            ticks: {
               color: "rgb(137, 137, 137)", // --accent
            },
            grid: {
               color: "rgba(137, 137, 137, 0.2)", // --accent with opacity
            },
         },
      },
   };

   return (
      <Line
         data={chartData}
         options={options}
         style={{
            width: "100%",
         }}
      />
   );
};
