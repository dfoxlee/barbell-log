import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

import styles from "./Navbar.module.css";

export default function CompositionNavWrapper() {
   const navigate = useNavigate();
   const user = useUserStore((state) => state.user);
   const params = useParams();
   const workoutId = params["workout-id"];

   const handleCancelClick = () => {
      navigate(-1);
   };

   const handleSaveClick = async () => {
      navigate(-1);
      // try {
      //    const workout = workoutCompositionState;

      //    if (workoutId) {
      //       const createWorkoutRequest = await fetchCreateWorkout({
      //          workout,
      //          token: user.token,
      //       });

      //       if (createWorkoutRequest.error) {
      //          console.error(createWorkoutRequest);
      //          return alert("Something went wrong. Try again later.");
      //       }
      //    }

      //    if (workoutId) {
      //       const updateWorkoutRequest = await fetchUpdateWorkout({
      //          workout,
      //          token: user.token,
      //       });

      //       if (updateWorkoutRequest.error) {
      //          console.error(updateWorkoutRequest);
      //          return alert("Something went wrong. Try again later.");
      //       }
      //    }

      //    workoutCompositionDispatch({
      //       type: "RESET-WORKOUT",
      //    });

      //    return navigate(-1);
      // } catch (error) {
      //    console.error(error);
      //    return alert("Something went wrong. Try again later.");
      // }
   };

   console.log(workoutId);

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
