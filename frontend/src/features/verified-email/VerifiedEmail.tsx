import { useNavigate, useParams } from "react-router-dom";
import Seperator from "../shared/Seperator";
import styles from "./VerifiedEmail.module.css";
import { useEffect } from "react";
import { fetchValidateEmailToken } from "../../services/userServices";
import toastify from "../../utils/toastify";

export default function VerifiedEmail() {
   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const validateToken = async () => {
         try {
            const res = await fetchValidateEmailToken({
               verificationToken: params["verification-token"],
            });

            if (res.error) {
               console.log(res.message);

               return toastify({
                  message:
                     "Something went wrong verifying email token. Please try again later.",
                  type: "error",
               });
            }

            navigate("/auth/login");
         } catch (error: any) {
            console.log(error.message);

            return toastify({
               message:
                  "Something went wrong verifying email token. Please try again later.",
               type: "error",
            });
         }
      };
      if (params["verification-token"]) {
         validateToken();
      }
   }, [params]);
   
   return (
      <div className={styles.container}>
         <h1 className={`pageTitle`}>Barbell Log</h1>
         <Seperator />
         <h3 className={`sectionTitle`}>Email Verified!!</h3>
         <p className={`regularText`}>You are being redirected.</p>
      </div>
   );
}
