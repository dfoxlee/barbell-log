import type { IconType } from "react-icons";

import styles from "./StandardBtn.module.css";

interface StandardBtnPropsType {
   text: string;
   Icon?: IconType;
   disabled?: boolean;
   onClick: (() => void) | (() => Promise<void>);
}

export default function StandardBtn({
   text,
   Icon,
   disabled,
   onClick,
}: StandardBtnPropsType) {
   return (
      <button className={styles.btn} disabled={disabled} onClick={onClick}>
         {Icon ? <Icon /> : null}
         <span className={styles.text}>{text}</span>
      </button>
   );
}
