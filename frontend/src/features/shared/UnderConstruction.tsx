import Seperator from "./Seperator";
import styles from "./UnderConstruction.module.css";

export default function UnderConstruction() {
   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Under Construction</h2>
         <Seperator />
         <p className={styles.subText}>
            This feature is currently being built. Please check back soon for
            updates! We appreciate your patience as we work to improve your
            experience.
         </p>
      </div>
   );
}
