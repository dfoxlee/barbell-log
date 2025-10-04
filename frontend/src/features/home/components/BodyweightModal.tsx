import { FaPlusCircle, FaTimes, FaTrash } from "react-icons/fa";
import StandardIconBtn from "../../shared/StandardIconBtn";
import WholeValueInput from "../../shared/WholeValueInput";
import WeightUnitSelector from "../../shared/WeightUnitSelector";
import { useEffect, useState, type ChangeEvent } from "react";
import {
   fetchAddBodyweightReading,
   fetchDeleteAllBodyweightReadings,
   fetchDeleteBodyweightReading,
   fetchGetBodyweightReadings,
   fetchUpdateBodyweightReading,
} from "../../../services/reading.services";
import { useUserStore } from "../../../stores/user.store";
import toastify from "../../../utils/toastify";
import { useReadingsStore } from "../../../stores/reading.store";
import { useUnitStore } from "../../../stores/units.store";
import { fetchGetWeightUnits } from "../../../services/common.services";
import Seperator from "../../shared/Seperator";

import styles from "./BodyweightModal.module.css";
import StandardBtn from "../../shared/StandardBtn";

interface BodyweightModalPropsType {
   toggleBodyweightModalOpen: () => void;
}

export default function BodyweightModal({
   toggleBodyweightModalOpen,
}: BodyweightModalPropsType) {
   const [bodyweightReading, setNewBodyweightInput] = useState(0);
   const bodyweightReadings = useReadingsStore(
      (state) => state.bodyweightReadings
   );
   const weightUnits = useUnitStore((state) => state.weightUnits);
   const setWeightUnits = useUnitStore((state) => state.setWeightUnits);
   const setBodyweightReadings = useReadingsStore(
      (state) => state.setBodyweightReadings
   );
   const token = useUserStore((state) => state.token);
   const weightUnitPreference = useUserStore(
      (state) => state.weightUnitPreference
   );
   const [bodyweightUnit, setBodyweightUnit] = useState(
      weightUnitPreference?.unitId ?? 1
   );

   const getBodyweightReadings = async () => {
      try {
         const bodyweightReadingsRequest = await fetchGetBodyweightReadings({
            token,
         });

         setBodyweightReadings(bodyweightReadingsRequest.bodyweightReadings);
      } catch (error) {
         console.error("An error occurred getting bodyweight readings.", error);

         toastify({
            message:
               "An error occurred getting bodyweight readings. Please try again later.",
            type: "error",
         });
      }
   };

   const getWeightUnits = async () => {
      try {
         const weightUnitsRequest = await fetchGetWeightUnits({ token });

         setWeightUnits(weightUnitsRequest.weightUnits);
      } catch (error) {
         console.error("An error occurred getting weight units.", error);

         toastify({
            message:
               "An error occurred getting weight units. Please try again later.",
            type: "error",
         });
      }
   };

   useEffect(() => {
      if (!bodyweightReadings) {
         getBodyweightReadings();
      }

      if (!weightUnits) {
         getWeightUnits();
      }
   }, [bodyweightReadings, weightUnits]);

   const updateBodyweightInput = (updatedBodyweight: number) => {
      setNewBodyweightInput(updatedBodyweight);
   };

   const handleAddBodyweightReading = async () => {
      if (bodyweightReading < 1) {
         return toastify({
            message: "Bodyweight must be greater than 0",
            type: "warning",
         });
      }
      try {
         await fetchAddBodyweightReading({
            token: token!,
            bodyweightReading,
            unitId: bodyweightUnit ?? 1,
         });

         getBodyweightReadings();
         setNewBodyweightInput(0);
      } catch (error) {
         console.error("An error occurred adding bodyweight reading", error);

         toastify({
            message:
               "An error occurred adding bodyweight. Please try again later.",
            type: "error",
         });
      }
   };

   const handleBodyweightUnitChange = (
      event: ChangeEvent<HTMLSelectElement>
   ) => {
      setBodyweightUnit(parseInt(event.target.value));
   };

   const handleBodyweightUpdate = async ({
      bodyweightReading,
      updatedBodyweight,
   }) => {
      const updatedBodyweightReading = {
         ...bodyweightReading,
         bodyweight: updatedBodyweight,
      };

      try {
         await fetchUpdateBodyweightReading({
            token,
            ...updatedBodyweightReading,
         });

         getBodyweightReadings();
      } catch (error) {
         console.error(
            "An error occurred updating bodyweight unit. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred updating bodyweight unit. Please try again later.",
            type: "error",
         });
      }
   };

   const handleBodyweightUnitUpdate = async ({
      bodyweightReading,
      updatedBodyweightUnit,
   }) => {
      const updatedBodyweightReading = {
         ...bodyweightReading,
         weightUnit: updatedBodyweightUnit,
      };

      try {
         await fetchUpdateBodyweightReading({
            token,
            ...updatedBodyweightReading,
         });

         getBodyweightReadings();
      } catch (error) {
         console.error(
            "An error occurred updating bodyweight unit. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred updating bodyweight unit. Please try again later.",
            type: "error",
         });
      }
   };

   const handleDeleteBodyweightReading = async (bodyweightReadingId) => {
      try {
         await fetchDeleteBodyweightReading({
            token,
            bodyweightReadingId,
         });

         getBodyweightReadings();
      } catch (error) {
         console.error(
            "An error occurred deleting the reading. Please try again later.",
            error
         );

         toastify({
            message:
               "An error occurred deleting the reading. Please try again later.",
            type: "error",
         });
      }
   };

   const handleDeleteAllBodyweightReadings = async () => {
      try {
         await fetchDeleteAllBodyweightReadings({ token });

         getBodyweightReadings();
      } catch (error) {
         console.error("An error occurred getting bodyweight readings.", error);

         toastify({
            message:
               "An error occurred deleting bodyweight readings. Please try again later.",
            type: "error",
         });
      }
   };
   console.log(bodyweightReadings);

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn
               Icon={FaTimes}
               onClick={toggleBodyweightModalOpen}
               disabled={false}
            />
            <h2 className={`modalTitle`}>Bodyweight Readings</h2>
            <Seperator />
            <div className={styles.tableWrapper}>
               <table className={styles.table}>
                  <thead>
                     <tr>
                        <th className={styles.tableHeader}>date</th>
                        <th className={styles.tableHeader}>measurement</th>
                        <th className={styles.tableHeader}>unit</th>
                        <th className={styles.tableHeader}>options</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className={styles.tableData}>New</td>
                        <td className={styles.tableData}>
                           <WholeValueInput
                              value={bodyweightReading}
                              onBlur={updateBodyweightInput}
                           />
                        </td>
                        <td className={styles.tableData}>
                           <WeightUnitSelector
                              value={bodyweightUnit ?? 1}
                              onChange={handleBodyweightUnitChange}
                           />
                        </td>
                        <td className={styles.tableData}>
                           <StandardIconBtn
                              Icon={FaPlusCircle}
                              onClick={handleAddBodyweightReading}
                           />
                        </td>
                     </tr>
                     {bodyweightReadings &&
                        bodyweightReadings.map((reading) => (
                           <tr key={reading.bodyweightReadingId}>
                              <td className={styles.tableData}>
                                 {new Date(
                                    reading.dateRecorded
                                 ).toLocaleDateString()}
                              </td>
                              <td className={styles.tableData}>
                                 <WholeValueInput
                                    value={Math.round(reading.bodyweight)}
                                    onBlur={(updatedBodyweight: number) =>
                                       handleBodyweightUpdate({
                                          bodyweightReading: reading,
                                          updatedBodyweight,
                                       })
                                    }
                                 />
                              </td>
                              <td>
                                 <WeightUnitSelector
                                    value={reading.weightUnit ?? 1}
                                    onChange={(
                                       event: ChangeEvent<HTMLSelectElement>
                                    ) =>
                                       handleBodyweightUnitUpdate({
                                          bodyweightReading: reading,
                                          updatedBodyweightUnit:
                                             event.target.value,
                                       })
                                    }
                                 />
                              </td>
                              <td className={styles.tableData}>
                                 <StandardIconBtn
                                    Icon={FaTrash}
                                    onClick={() =>
                                       handleDeleteBodyweightReading(
                                          reading.bodyweightReadingId
                                       )
                                    }
                                 />
                              </td>
                           </tr>
                        ))}
                  </tbody>
               </table>
            </div>
            <div className={styles.deleteBodyweightsBtnWrapper}>
               <StandardBtn
                  text="Delete All Readings"
                  onClick={handleDeleteAllBodyweightReadings}
               />
            </div>
         </div>
      </div>
   );
}
