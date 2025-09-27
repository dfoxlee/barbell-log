import type { ChangeEvent } from "react";

import styles from "./ExerciseNameInput.module.css";

interface ExerciseNameInputPropsType {
   value: string;
   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ExerciseNameInput({
   value,
   onChange,
}: ExerciseNameInputPropsType) {
   return (
      <input
         className={styles.input}
         value={value}
         onChange={onChange}
         placeholder="exercise name..."
      />
   );
}
