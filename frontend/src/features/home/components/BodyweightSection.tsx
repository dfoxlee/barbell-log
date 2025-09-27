import StandardBtn from "../../shared/StandardBtn";
import { BodyweightChart } from "./BodyweightChart";

import styles from "./BodyweightSection.module.css";

interface BodyweightSectionPropsType {
   toggleBodyweightModalOpen: () => void;
}

export default function BodyweightSection({
   toggleBodyweightModalOpen,
}: BodyweightSectionPropsType) {
   return (
      <div className={styles.container}>
         <h2 className={styles.sectionTitle}>Bodyweight</h2>
         <BodyweightChart />
         <StandardBtn
            text="Add/Edit Bodyweight"
            onClick={toggleBodyweightModalOpen}
         />
      </div>
   );
}
