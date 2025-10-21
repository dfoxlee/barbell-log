import type { ChangeEvent } from "react";
import styles from "./WorkoutNameInput.module.css";

interface WorkoutNameInputPropsType {
   value: string | undefined;
   onChange:
      | ((event: ChangeEvent<HTMLInputElement>) => void)
      | ((event: ChangeEvent<HTMLInputElement>) => Promise<void>);
}

export default function WorkoutNameInput({
   value,
   onChange,
}: WorkoutNameInputPropsType) {
   return (
      <input
         className={styles.input}
         type="text"
         placeholder="workout name..."
         value={value}
         onChange={onChange}
      />
   );
}
