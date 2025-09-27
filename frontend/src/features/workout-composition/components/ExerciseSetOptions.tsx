import { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import OptionToggleBtn from "./OptionToggleBtn";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import styles from "./ExerciseSetsTable.module.css";

interface ExerciseSetOptionsProps {
   exerciseSet: ExerciseSetType;
   handleToggleRepsClick: (exerciseSetOrder: number) => void;
   handleToggleTimedClick: (exerciseSetOrder: number) => void;
   handleToggleDistanceClick: (exerciseSetOrder: number) => void;
   handleDeleteSetClick: (exerciseSetOrder: number) => void;
   showDeleteButton: boolean;
}

export default function ExerciseSetOptions({
   exerciseSet,
   handleToggleRepsClick,
   handleToggleTimedClick,
   handleToggleDistanceClick,
   handleDeleteSetClick,
   showDeleteButton,
}: ExerciseSetOptionsProps) {
   const [isOptionsWrapperOpen, setIsOptionsWrapperOpen] = useState(false);
   const optionsWrapperRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            isOptionsWrapperOpen &&
            optionsWrapperRef.current &&
            !optionsWrapperRef.current.contains(event.target as Node)
         ) {
            setIsOptionsWrapperOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOptionsWrapperOpen]);

   const handleToggleOptionsWrapper = () => {
      setIsOptionsWrapperOpen(!isOptionsWrapperOpen);
   };

   return (
      <td className={styles.optionsTableData}>
         <div className={styles.optionsContainer} ref={optionsWrapperRef}>
            <StandardIconBtn
               Icon={FaEllipsisV}
               onClick={handleToggleOptionsWrapper}
            />
            {isOptionsWrapperOpen && (
               <div className={styles.optionsWrapper}>
                  <OptionToggleBtn
                     Icon={exerciseSet.hasReps ? FaToggleOn : FaToggleOff}
                     text="Reps?"
                     onClick={() =>
                        handleToggleRepsClick(exerciseSet.exerciseSetOrder)
                     }
                  />
                  <OptionToggleBtn
                     Icon={exerciseSet.isTimed ? FaToggleOn : FaToggleOff}
                     text="Timed?"
                     onClick={() =>
                        handleToggleTimedClick(exerciseSet.exerciseSetOrder)
                     }
                  />
                  <OptionToggleBtn
                     Icon={exerciseSet.isDistance ? FaToggleOn : FaToggleOff}
                     text="Distance?"
                     onClick={() =>
                        handleToggleDistanceClick(exerciseSet.exerciseSetOrder)
                     }
                  />
               </div>
            )}
         </div>
         {showDeleteButton && (
            <StandardIconBtn
               Icon={FaTrash}
               onClick={() =>
                  handleDeleteSetClick(exerciseSet.exerciseSetOrder)
               }
            />
         )}
      </td>
   );
}
