import type { IconType } from "react-icons";

import styles from "./StandardBtn.module.css";
import { useMemo } from "react";

interface StandardBtnPropsType {
   text: string;
   Icon?: IconType;
   disabled?: boolean;
   theme?: "SUCCESS" | "INFO" | "WARNING" | "ERROR";
   onClick: (() => void) | (() => Promise<void>);
}

export default function StandardBtn({
   text,
   Icon,
   disabled,
   theme,
   onClick,
}: StandardBtnPropsType) {
   const className = useMemo(() => {
      let c = `${styles.btn}`;

      c += disabled ? ` ${styles.btnDisabled}` : "";

      switch (theme) {
         case "INFO":
            c += ` ${styles.info}`;
            break;
         case "SUCCESS":
            c += ` ${styles.success}`;
            break;
         case "WARNING":
            c += ` ${styles.warning}`;
            break;
         case "ERROR":
            c += ` ${styles.error}`;
            break;
         default:
            c += "";
      }

      return c;
   }, [theme, disabled]);

   return (
      <button className={className} disabled={disabled} onClick={onClick}>
         {Icon ? <Icon /> : null}
         <span className={styles.text}>{text}</span>
      </button>
   );
}
