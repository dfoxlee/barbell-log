import { useEffect, useState } from "react";
import { fetchGetCompletedWorkouts } from "../../../services/completedWorkoutServices";
import toastify from "../../../utils/toastify";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CompletedWorkout from "./CompletedWorkout";
import Loading from "../../shared/Loading";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { randomShades } from "../utils/randomShades";

import styles from "./Workouts.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
   indexAxis: "y" as const,
   elements: {
      bar: {
         borderWidth: 2,
      },
   },
   responsive: true,
   plugins: {
      legend: {
         display: false,
      },
   },
};

export default function Workouts() {
   const [completedWorkouts, setCompletedWorkouts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuthContext();

   useEffect(() => {
      const getCompletedWorkouts = async ({ token }) => {
         try {
            const completedWorkoutsRequest = await fetchGetCompletedWorkouts({
               token,
            });

            if (completedWorkoutsRequest.error) {
               console.log(completedWorkoutsRequest);
               return toastify({
                  message: "Something went wrong. Please try again later.",
                  type: "error",
               });
            }

            setCompletedWorkouts(completedWorkoutsRequest);
         } catch (error) {
            console.error(error);

            return toastify({
               message: "Something went wrong. Please try again later.",
               type: "error",
            });
         } finally {
            setIsLoading(false);
         }
      };

      setIsLoading(true);
      getCompletedWorkouts({ token: user.token });
   }, [user.token]);

   const sortedWorkouts =
      completedWorkouts.workouts &&
      [...completedWorkouts.workouts].sort(
         (a, b) => b.totalWorkouts - a.totalWorkouts
      );

   const labels =
      sortedWorkouts && sortedWorkouts.map((workout) => workout.workoutName);

   const data = sortedWorkouts && {
      labels,
      datasets: [
         {
            label: "Total Workouts",
            data: sortedWorkouts.map((workout) => workout.totalWorkouts),
            backgroundColor: sortedWorkouts.map(() => randomShades("#3ace87")),
         },
      ],
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Workout Scoreboard</h2>
         {completedWorkouts.workouts && <Bar options={options} data={data} />}
         <h2 className={styles.sectionTitle}>Recent Workouts</h2>
         {isLoading ? (
            <Loading />
         ) : (
            completedWorkouts.recentWorkouts &&
            completedWorkouts.recentWorkouts.map((completedWorkout) => (
               <CompletedWorkout
                  key={completedWorkout.completedDate}
                  completedWorkout={completedWorkout}
               />
            ))
         )}
      </div>
   );
}
