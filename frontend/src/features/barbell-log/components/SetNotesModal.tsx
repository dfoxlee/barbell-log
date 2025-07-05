import styles from "./SetsNotesModal.module.css";

export default function SetNotesModal({is}) {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h3>Sets Notes</h3>
            <textarea
               name="notes"
               id="notes"
               placeholder="sets notes..."
            ></textarea>
         </div>
      </div>
   );
}
