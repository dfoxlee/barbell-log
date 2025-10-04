import { useFetchWorkouts } from "../../../hooks/useFetchWorkouts";
import { useWorkoutStore } from "../../../stores/workout.store";
import styles from "./ExploreWorkouts.module.css";

export default function ExploreWorkouts() {
   const workouts = useWorkoutStore((state) => state.workouts);

   const { getWorkouts } = useFetchWorkouts();

   return <div>
      <h3>Explore Workouts</h3>
      <select name="workout-types" id="workout-types"></select>
      
   </div>;
}
