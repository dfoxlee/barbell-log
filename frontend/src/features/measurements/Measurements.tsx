import Seperator from "../shared/Seperator";
import UnderConstruction from "../shared/UnderConstruction";

import styles from "./Measurements.module.css";

export default function Measurements() {
   return (
      <div className={styles.container}>
         <h2 className={styles.title}>Measurements</h2>
         <Seperator />
         <UnderConstruction />
      </div>
   );
}
