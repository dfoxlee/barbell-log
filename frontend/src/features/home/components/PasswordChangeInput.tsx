import styles from "./PasswordChangeInput.module.css";

interface PasswordChangeInputPropsType {
   value: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordChangeInput({
   value,
   onChange,
}: PasswordChangeInputPropsType) {
   return (
      <input
         className={styles.input}
         value={value}
         type="password"
         onChange={onChange}
      />
   );
}
