import { useNavigate, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import toastify from "../../utils/toastify";
import { useBarbellLogStore } from "../../stores/barbellLogStore";
import { useUserStore } from "../../stores/userStore";
import { fetchBarbellLogComposition } from "../../services/barbellLogServices";
import { useTimerStore } from "../../stores/timerStore";

export default function BarbellLogNavWrapper() {
   const navigate = useNavigate();
   const params = useParams();
   const completedWorkoutId = params["completed-workout-id"];
   const barbellLog = useBarbellLogStore((state) => state.barbellLog);
   const user = useUserStore((state) => state.user);
   const resetTimer = useTimerStore((state) => state.resetTimer);
   const updateTimerMessage = useTimerStore(
      (state) => state.updateTimerMessage
   );

   const handleCompleteClick = async () => {
      try {
         if (barbellLog && user?.token) {
            await fetchBarbellLogComposition({
               token: user?.token,
               barbellLog,
            });
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
      resetTimer();
      updateTimerMessage("");

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
