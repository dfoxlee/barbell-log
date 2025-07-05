import { useNavigate, useParams } from "react-router-dom";
import { useWorkoutCompositionContext } from "../../hooks/useWorkoutCompositionContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
   fetchCreateWorkout,
   fetchUpdateWorkout,
} from "../../services/workoutServices";

import styles from "./Navbar.module.css";

export default function CompositionNavWrapper() {
   const navigate = useNavigate();
   const { workoutCompositionState, workoutCompositionDispatch } =
      useWorkoutCompositionContext();
   const { user } = useAuthContext();
   const params = useParams();
   const compositionType = params["composition-type"];

   const handleCancelClick = () => {
      workoutCompositionDispatch({
         type: "RESET-WORKOUT",
      });

      navigate(-1);
   };

   const handleSaveClick = async () => {
      try {
         const workout = workoutCompositionState;
         if (compositionType === "create") {
            const createWorkoutRequest = await fetchCreateWorkout({
               workout,
               token: user.token,
            });

            if (createWorkoutRequest.error) {
               console.error(createWorkoutRequest);
               return alert("Something went wrong. Try again later.");
            }
         }

         if (compositionType === "edit") {
            const updateWorkoutRequest = await fetchUpdateWorkout({
               workout,
               token: user.token,
            });

            if (updateWorkoutRequest.error) {
               console.error(updateWorkoutRequest);
               return alert("Something went wrong. Try again later.");
            }
         }

         workoutCompositionDispatch({
            type: "RESET-WORKOUT",
         });

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
            {compositionType === "create" ? "Save" : "Update"}
         </button>
      </nav>
   );
}
