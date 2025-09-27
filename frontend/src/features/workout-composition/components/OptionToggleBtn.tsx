import type { IconType } from "react-icons";
import styles from "./OptionToggleBtn.module.css";

interface OptionToggleBtnPropsType {
   text: string;
   Icon: IconType;
   disabled?: boolean;
   onClick: (() => void) | (() => Promise<void>);
}

export default function OptionToggleBtn({
   Icon,
   text,
   onClick,
}: OptionToggleBtnPropsType) {
   return (
      <button onClick={onClick} className={styles.btn}>
         <Icon size={18} className={styles.icon} />
         <span className={styles.text}>{text}</span>
      </button>
   );
}
