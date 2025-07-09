import { Link } from "react-router-dom";

import styles from "./NotFound404.module.css";

export default function NotFound404() {
   return (
      <div>
         <h1 className={styles.title}>404</h1>
         <h3 className={styles.subTitle}>
            Looks Like This Page Skipped Leg Day.
         </h3>
         <div className={styles.goHomeLinkWrapper}>
            <Link className={styles.goHomeLink} to="/">
               Go Home
            </Link>
         </div>
      </div>
   );
}
