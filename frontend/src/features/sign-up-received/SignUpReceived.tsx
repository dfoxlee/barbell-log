import { Link } from "react-router-dom";
import Seperator from "../shared/Seperator";
import styles from "./SignUpReceived.module.css";
import { FaEnvelope } from "react-icons/fa";

export default function SignUpReceived() {
   return (
      <div className={styles.container}>
         <h1 className={`pageTitle`}>Barbell Log</h1>
         <Seperator />
         <FaEnvelope className={styles.envelopeIcon} />
         <h2 className={`sectionTitle ${styles.subTitle}`}>
            One More Step
         </h2>
         <p className={`regularText ${styles.subText}`}>
            Check your email to verify your account to start your workout
            journey.
         </p>
         <div className={styles.linkWrapper}>
            <Link className={`standardLink`} to="/">
               Return Home
            </Link>
         </div>
      </div>
   );
}
