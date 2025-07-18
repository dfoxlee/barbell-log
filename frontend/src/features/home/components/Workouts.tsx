import { useWorkoutsStore } from "../../../stores/workoutsStore";
import Workout from "./Workout";

export default function Workouts() {
   const workouts = useWorkoutsStore((state) => state.workouts);

   return (
      <div>
         <h3 className={`standardTitle`}>Workouts</h3>
         {workouts.length &&
            workouts.map((workout) => (
               <Workout key={workout.workoutId} workout={workout} />
            ))}
      </div>
   );
}
