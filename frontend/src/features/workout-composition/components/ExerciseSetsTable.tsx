import { useEffect, useRef, useState } from "react";
import {
   fetchGetDistanceUnits,
   fetchGetWeightUnits,
} from "../../../services/common.services";
import { useUserStore } from "../../../stores/user.store";
import type { ExerciseSetType } from "../../../types/exercise-set.types";
import toastify from "../../../utils/toastify";
import { useUnitStore } from "../../../stores/units.store";
import WholeValueInput from "../../shared/WholeValueInput";
import FractionalValueInput from "../../shared/FractionalValueInput";
import WeightUnitSelector from "../../shared/WeightUnitSelector";
import DistanceUnitSelector from "../../shared/DistanceUnitSelector";

import styles from "./ExerciseSetsTable.module.css";
import { useModalsStore } from "../../../stores/modals.store";
import ExerciseSetOptions from "./ExerciseSetOptions";

interface ExerciseSetsGridPropsType {
   exerciseSets: ExerciseSetType[];
   updateExerciseSet: (updatedSet: ExerciseSetType) => void;
   deleteExerciseSet: (exerciseSetOrder: number) => void;
}

export default function ExerciseSetsGrid({
   exerciseSets,
   updateExerciseSet,
   deleteExerciseSet,
}: ExerciseSetsGridPropsType) {
   const weightUnits = useUnitStore((state) => state.weightUnits);
   const distanceUnits = useUnitStore((state) => state.distanceUnits);
   const setWeightUnits = useUnitStore((state) => state.setWeightUnits);
   const setDistanceUnits = useUnitStore((state) => state.setDistanceUnits);
   const token = useUserStore((state) => state.token);
   const setDeleteConfirmationWindowInfo = useModalsStore(
      (state) => state.setDeleteConfirmationWindowInfo
   );
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

   useEffect(() => {
      const getWeightUnits = async () => {
         try {
            const weightUnitsRequest = await fetchGetWeightUnits({
               token: token!,
            });

            setWeightUnits(weightUnitsRequest.weightUnits);
         } catch (error) {
            console.error(
               "An error occurred getting workout types. Please try again later",
               error
            );

            toastify({
               message:
                  "An error occurred getting workout types. Please try again later",
               type: "error",
            });
         }
      };

      const getDistanceUnits = async () => {
         try {
            const distanceunitsRequest = await fetchGetDistanceUnits({
               token: token!,
            });

            setDistanceUnits(distanceunitsRequest.distanceUnits);
         } catch (error) {
            console.error(
               "An error occurred getting workout types. Please try again later",
               error
            );

            toastify({
               message:
                  "An error occurred getting workout types. Please try again later",
               type: "error",
            });
         }
      };

      if (!weightUnits && token) {
         getWeightUnits();
      }

      if (!distanceUnits && token) {
         getDistanceUnits();
      }
   }, [token]);

   const handleRepsChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         reps: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleWeightChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         weight: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleWeightUnitChange = ({
      event,
      exerciseSetOrder,
   }: {
      event: React.ChangeEvent<HTMLSelectElement>;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         weightUnit: parseInt(event.target.value),
      };

      updateExerciseSet(updatedSet);
   };

   const handleHrChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         hr: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleMinChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         min: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleSecChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         sec: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleDistanceChange = ({
      value,
      exerciseSetOrder,
   }: {
      value: number;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         distance: value,
      };

      updateExerciseSet(updatedSet);
   };

   const handleDistanceUnitChange = ({
      event,
      exerciseSetOrder,
   }: {
      event: React.ChangeEvent<HTMLSelectElement>;
      exerciseSetOrder: number;
   }) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         distanceUnit: parseInt(event.target.value),
      };

      updateExerciseSet(updatedSet);
   };

   const handleToggleRepsClick = (exerciseSetOrder: number) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         hasReps: !currentSet.hasReps,
      };

      updateExerciseSet(updatedSet);
   };

   const handleToggleTimedClick = (exerciseSetOrder: number) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         isTimed: !currentSet.isTimed,
      };

      updateExerciseSet(updatedSet);
   };

   const handleToggleDistanceClick = (exerciseSetOrder: number) => {
      const currentSet = exerciseSets.find(
         (set) => set.exerciseSetOrder === exerciseSetOrder
      );

      if (!currentSet) return;

      const updatedSet = {
         ...currentSet,
         isDistance: !currentSet.isDistance,
      };

      updateExerciseSet(updatedSet);
   };

   const handleDeleteSetClick = (exerciseSetOrder: number) => {
      setDeleteConfirmationWindowInfo({
         message: `Are you sure you want to delete set ${exerciseSetOrder}?`,
         onCancel: () => {},
         onConfirm: () => deleteExerciseSet(exerciseSetOrder),
      });
   };

   return (
      <table className={styles.container}>
         {/* header row */}
         <thead>
            <tr>
               <th className={styles.tableHeader}>set</th>
               <th className={styles.tableHeader}>output</th>
               <th className={styles.tableHeader}>options</th>
            </tr>
         </thead>
         {/* body */}
         <tbody>
            {exerciseSets.map((exerciseSet) => (
               <tr
                  className={styles.tableRow}
                  key={exerciseSet.exerciseSetOrder}
               >
                  <td className={styles.tableData}>
                     {exerciseSet.exerciseSetOrder}
                  </td>
                  <td className={styles.inputsTableData}>
                     <div className={styles.inputsWrapper}>
                        {exerciseSet.hasReps ? (
                           <>
                              <div className={styles.inputWrapper}>
                                 <WholeValueInput
                                    value={exerciseSet.reps}
                                    onBlur={(value) =>
                                       handleRepsChange({
                                          value,
                                          exerciseSetOrder:
                                             exerciseSet.exerciseSetOrder,
                                       })
                                    }
                                 />
                                 <span className={styles.inputLabel}>reps</span>
                              </div>
                           </>
                        ) : null}
                        <div className={styles.inputWrapper}>
                           <FractionalValueInput
                              value={exerciseSet.weight}
                              onBlur={(value) =>
                                 handleWeightChange({
                                    value,
                                    exerciseSetOrder:
                                       exerciseSet.exerciseSetOrder,
                                 })
                              }
                           />
                           <span className={styles.inputLabel}>weight</span>
                        </div>
                        <WeightUnitSelector
                           value={exerciseSet.weightUnit}
                           onChange={(event) =>
                              handleWeightUnitChange({
                                 event,
                                 exerciseSetOrder: exerciseSet.exerciseSetOrder,
                              })
                           }
                        />
                     </div>
                     {exerciseSet.isTimed ? (
                        <div className={styles.inputsWrapper}>
                           <div className={styles.inputWrapper}>
                              <WholeValueInput
                                 value={exerciseSet.hr}
                                 onBlur={(value) =>
                                    handleHrChange({
                                       value,
                                       exerciseSetOrder:
                                          exerciseSet.exerciseSetOrder,
                                    })
                                 }
                              />
                              <span className={styles.inputLabel}>hr</span>
                           </div>
                           <div className={styles.inputWrapper}>
                              <WholeValueInput
                                 value={exerciseSet.min}
                                 onBlur={(value) =>
                                    handleMinChange({
                                       value,
                                       exerciseSetOrder:
                                          exerciseSet.exerciseSetOrder,
                                    })
                                 }
                              />
                              <span className={styles.inputLabel}>min</span>
                           </div>
                           <div className={styles.inputWrapper}>
                              <WholeValueInput
                                 value={exerciseSet.sec}
                                 onBlur={(value) =>
                                    handleSecChange({
                                       value,
                                       exerciseSetOrder:
                                          exerciseSet.exerciseSetOrder,
                                    })
                                 }
                              />
                              <span className={styles.inputLabel}>sec</span>
                           </div>
                        </div>
                     ) : null}
                     {exerciseSet.isDistance ? (
                        <div className={styles.inputsWrapper}>
                           <div className={styles.inputWrapper}>
                              <FractionalValueInput
                                 value={exerciseSet.distance}
                                 onBlur={(value) =>
                                    handleDistanceChange({
                                       value,
                                       exerciseSetOrder:
                                          exerciseSet.exerciseSetOrder,
                                    })
                                 }
                              />
                              <span className={styles.inputLabel}>
                                 distance
                              </span>
                           </div>
                           <DistanceUnitSelector
                              value={exerciseSet.distanceUnit}
                              onChange={(event) =>
                                 handleDistanceUnitChange({
                                    event,
                                    exerciseSetOrder:
                                       exerciseSet.exerciseSetOrder,
                                 })
                              }
                           />
                        </div>
                     ) : null}
                  </td>
                  <ExerciseSetOptions
                     exerciseSet={exerciseSet}
                     handleToggleRepsClick={handleToggleRepsClick}
                     handleToggleTimedClick={handleToggleTimedClick}
                     handleToggleDistanceClick={handleToggleDistanceClick}
                     handleDeleteSetClick={handleDeleteSetClick}
                     showDeleteButton={exerciseSets.length > 1}
                  />
               </tr>
            ))}
         </tbody>
      </table>
   );
}
