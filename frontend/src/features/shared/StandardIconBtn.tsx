import type { IconType } from "react-icons";

import styles from "./StandardIconBtn.module.css";

interface StandardIconBtnPropsType {
   Icon: IconType;
   disabled?: boolean;
   onClick: (() => void) | (() => Promise<void>);
}

export default function StandardIconBtn({
   Icon,
   disabled,
   onClick,
}: StandardIconBtnPropsType) {
   return (
      <button className={disabled ? `${styles.btn} ${styles.btnDisabled}` : styles.btn} onClick={onClick} disabled={disabled}>
         <Icon />
      </button>
   );
}
