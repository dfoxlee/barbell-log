import { FaPlus } from "react-icons/fa";
import StandardBtn from "../../shared/StandardBtn";
import CompletedExerciseNameInputSelector from "./CompletedExerciseNameInputSelector";

import styles from "./CompletedExerciseNavigation.module.css";

export default function CompletedExerciseNavigation() {
   const handleAddCompletedExercise = () => {
      console.log("add completed exercise");
   };

   return (
      <div className={styles.exerciseNavigationWrapper}>
         <CompletedExerciseNameInputSelector />
         <StandardBtn
            text="Exercise"
            Icon={FaPlus}
            onClick={handleAddCompletedExercise}
         />
      </div>
   );
}
