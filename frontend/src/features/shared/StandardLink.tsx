import { Link } from "react-router-dom";

import styles from "./StandardLink.module.css";
import type { IconType } from "react-icons";

interface StandardLinkPropsType {
   toPath: string;
   Icon?: IconType;
   text: string;
}

export default function StandardLink({
   toPath,
   text,
   Icon,
}: StandardLinkPropsType) {
   return (
      <Link className={styles.link} to={toPath}>
         {Icon ? <Icon /> : null}
         <span className={styles.text}>{text}</span>
      </Link>
   );
}
