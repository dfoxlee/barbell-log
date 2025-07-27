import CompletedWorkout from "./CompletedWorkout";
import Loading from "../../shared/Loading";
import { useCompletedWorkoutsStore } from "../../../stores/completedWorkoutsStore";

import styles from "./Workouts.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useUserStore } from "../../../stores/userStore";

export default function Workouts() {
   const completedWorkouts = useCompletedWorkoutsStore(
      (state) => state.completedWorkouts
   );
   const completedWorkoutsLoading = useCompletedWorkoutsStore(
      (state) => state.completedWorkoutsLoading
   );
   const totalCompletedWorkouts = useCompletedWorkoutsStore(
      (state) => state.totalCompletedWorkouts
   );
   const completedWorkoutsDataState = useCompletedWorkoutsStore(
      (state) => state.completedWorkoutsDataState
   );
   const updateCompletedWorkoutsDataState = useCompletedWorkoutsStore(
      (state) => state.updateCompletedWorkoutsDataState
   );
   const user = useUserStore((state) => state.user);

   const handleIncrementPageClick = () => {
      if (
         totalCompletedWorkouts &&
         user?.token &&
         completedWorkoutsDataState.skip + completedWorkoutsDataState.take <
            totalCompletedWorkouts
      ) {
         updateCompletedWorkoutsDataState({
            token: user?.token,
            skip:
               completedWorkoutsDataState.skip +
               completedWorkoutsDataState.take,
            take: completedWorkoutsDataState.take,
         });
      }
   };

   const handleDecrementPageClick = () => {
      if (completedWorkoutsDataState.skip > 0 && user?.token) {
         updateCompletedWorkoutsDataState({
            token: user?.token,
            skip:
               completedWorkoutsDataState.skip -
               completedWorkoutsDataState.take,
            take: completedWorkoutsDataState.take,
         });
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Recent Workouts</h2>
         {completedWorkoutsLoading ? (
            <Loading />
         ) : (
            completedWorkouts &&
            completedWorkouts.map((completedWorkout) => (
               <CompletedWorkout
                  key={completedWorkout.completedDate}
                  completedWorkout={completedWorkout}
               />
            ))
         )}
         {totalCompletedWorkouts && totalCompletedWorkouts > 10 ? (
            <div className={styles.paginationWrapper}>
               <button
                  className={`standardIconBtn ${
                     completedWorkoutsDataState.skip === 0
                        ? styles.paginationPageDisabled
                        : styles.paginationBtn
                  }`}
                  disabled={completedWorkoutsDataState.skip === 0}
                  onClick={handleDecrementPageClick}
               >
                  <FaChevronLeft />
               </button>
               <span className={styles.paginationInfo}>{`${
                  Math.floor(
                     completedWorkoutsDataState.skip /
                        completedWorkoutsDataState.take
                  ) + 1
               } / ${Math.ceil(
                  totalCompletedWorkouts / completedWorkoutsDataState.take
               )}`}</span>
               <button
                  className={`standardIconBtn ${
                     completedWorkoutsDataState.skip +
                        completedWorkoutsDataState.take >=
                     totalCompletedWorkouts
                        ? styles.paginationPageDisabled
                        : styles.paginationBtn
                  }`}
                  disabled={
                     completedWorkoutsDataState.skip +
                        completedWorkoutsDataState.take >=
                     totalCompletedWorkouts
                  }
                  onClick={handleIncrementPageClick}
               >
                  <FaChevronRight />
               </button>
            </div>
         ) : null}
      </div>
   );
}
