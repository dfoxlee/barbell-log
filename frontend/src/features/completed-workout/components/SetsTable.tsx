import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

import styles from "./SetsTable.module.css";

export default function SetsTable({ completedSets }) {
   return (
      <table className={styles.tableContainer}>
         <thead>
            <tr>
               <th className={styles.tableHeader}>Set</th>
               <th className={styles.tableHeader}>Reps</th>
               <th className={styles.tableHeader}>Weight</th>
               <th className={styles.tableHeader}></th>
            </tr>
         </thead>
         <tbody>
            {completedSets.map((set) => {
               return (
                  <tr key={`${set.completedSetId}-${set.setOrder}`}>
                     <td className={styles.dataCell}>{set.setOrder}</td>
                     <td className={styles.dataCell}>{`${set.completedReps} x ${
                        parseFloat(set.completedWeight)
                           ? parseFloat(set.completedWeight)
                           : set.completedWeight
                     } lb`}</td>
                     <td className={styles.dataCell}>
                        {parseFloat(set.completedWeight)}
                     </td>
                     <td
                        className={`${styles.optionWrapper} ${styles.dataCell}`}
                     >
                        {set.notes.length ? (
                           <div className={styles.infoWrapper}>
                              <button className={styles.completeBtn}>
                                 <FaInfoCircle />
                              </button>
                              <p className={styles.infoText}>{set.notes}</p>
                           </div>
                        ) : (
                           ""
                        )}
                        <FaCheckCircle
                           className={
                              set.isCompleted
                                 ? styles.completedCheck
                                 : styles.incompleteCheck
                           }
                        />
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
}
