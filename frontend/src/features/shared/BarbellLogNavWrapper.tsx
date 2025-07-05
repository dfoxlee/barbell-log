import { useNavigate, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import {
   fetchCreateCompletedWorkout,
   fetchUpdateCompletedWorkout,
} from "../../services/completedWorkoutServices";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBarbellLogContext } from "../../hooks/useBarbellLogContext";
import toastify from "../../utils/toastify";

export default function BarbellLogNavWrapper() {
   const navigate = useNavigate();
   const params = useParams();
   const completedWorkoutId = params["completed-workout-id"];
   const { user } = useAuthContext();
   const { barbellLogState } = useBarbellLogContext();

   const handleCompleteClick = async () => {
      try {
         if (completedWorkoutId) {
            const request = await fetchUpdateCompletedWorkout({
               token: user?.token,
               completedWorkout: barbellLogState,
            });

            if (request.error) {
               toastify({
                  message: "Something went wrong. Please try again later",
                  type: "error",
               });

               return console.log(request);
            }
         } else {
            const request = await fetchCreateCompletedWorkout({
               token: user?.token,
               workout: barbellLogState,
            });

            if (request.error) {
               toastify({
                  message: "Something went wrong. Please try again later",
                  type: "error",
               });

               return console.log(request);
            }
         }

         return navigate(-1);
      } catch (error) {
         toastify({
            message: "Something went wrong. Please try again later",
            type: "error",
         });

         return console.log(error);
      }
   };

   const handleCancelClick = () => {
      navigate(-1);
   };

   return (
      <nav className={styles.wrapper}>
         <button className={styles.cancelBtn} onClick={handleCancelClick}>
            Cancel
         </button>
         <button className={styles.saveBtn} onClick={handleCompleteClick}>
            {completedWorkoutId ? "Update" : "Complete"}
         </button>
      </nav>
   );
}
