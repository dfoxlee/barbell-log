import type { IconType } from "react-icons";

import styles from "./StandardIconBtn.module.css";
import { useMemo } from "react";

interface StandardIconBtnPropsType {
   Icon: IconType;
   disabled?: boolean;
   theme?: "SUCCESS" | "INFO" | "WARNING" | "ERROR" | "NOT-SELECTED" | null;
   onClick: (() => void) | (() => Promise<void>);
}

export default function StandardIconBtn({
   Icon,
   disabled,
   theme,
   onClick,
}: StandardIconBtnPropsType) {
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
         case "NOT-SELECTED":
            c += ` ${styles.notSelected}`;
            break;
         default:
            c += "";
      }

      return c;
   }, [theme, disabled]);
   return (
      <button className={className} onClick={onClick} disabled={disabled}>
         <Icon />
      </button>
   );
}
