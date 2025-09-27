import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";

import styles from "./StartWorkoutModal.module.css";

interface StartWorkoutModalPropsType {
   toggleStartWorkoutModalOpen: () => void;
}

export default function StartWorkoutModal({
   toggleStartWorkoutModalOpen,
}: StartWorkoutModalPropsType) {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={toggleStartWorkoutModalOpen}
               disabled={false}
            />
            <h2 className={`modalTitle`}>Start a Workout</h2>
            
            <div className={styles.btnsWrapper}>
               <button onClick={toggleStartWorkoutModalOpen}>Cancel</button>
               <button>Start</button>
            </div>
         </div>
      </div>
   );
}
