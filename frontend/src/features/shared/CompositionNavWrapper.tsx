import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useWorkoutCompositionStore } from "../../stores/workoutCompositionStore";
import { fetchCreateWorkout, fetchUpdateWorkout } from "../../services/workoutServices";

import styles from "./Navbar.module.css";

export default function CompositionNavWrapper() {
   const navigate = useNavigate();
   const user = useUserStore((state) => state.user);
   const params = useParams();
   const workoutId = params["workout-id"];
   const workoutComposition = useWorkoutCompositionStore(
      (state) => state.workoutComposition
   );
   const resetWorkoutComposition = useWorkoutCompositionStore(
      (state) => state.resetWorkoutComposition
   );

   const handleCancelClick = () => {
      resetWorkoutComposition();
      navigate(-1);
   };

   const handleSaveClick = async () => {
      if (!user?.token) {
         navigate("/auth/login");
      }

      navigate(-1);
      try {
         if (!workoutId) {
            const createWorkoutRequest = await fetchCreateWorkout({
               workoutComposition,
               token: user!.token,
            });

            if (createWorkoutRequest.error) {
               console.error(createWorkoutRequest);

               return alert("Something went wrong. Try again later.");
            }
         } else {
            const updateWorkoutRequest = await fetchUpdateWorkout({
               workoutComposition,
               token: user!.token,
            });

            if (updateWorkoutRequest.error) {
               console.error(updateWorkoutRequest);

               return alert("Something went wrong. Try again later.");
            }
         }

         resetWorkoutComposition();

         return navigate(-1);
      } catch (error) {
         console.error(error);

         return alert("Something went wrong. Try again later.");
      }
   };

   return (
      <nav className={styles.wrapper}>
         <button onClick={handleCancelClick} className={styles.cancelBtn}>
            Cancel
         </button>
         <button className={styles.saveBtn} onClick={handleSaveClick}>
            {!workoutId ? "Save" : "Update"}
         </button>
      </nav>
   );
}
