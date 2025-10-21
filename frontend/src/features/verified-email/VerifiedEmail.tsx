import { useNavigate, useParams } from "react-router-dom";
import Seperator from "../shared/Seperator";
import styles from "./VerifiedEmail.module.css";
import { useEffect } from "react";
import { fetchValidateEmailToken } from "../../services/user.services";
import toastify from "../../utils/toastify";
import { useUserStore } from "../../stores/user.store";

export default function VerifiedEmail() {
   const params = useParams();
   const validationToken = params["validation-token"];
   const navigate = useNavigate();
   const setUser = useUserStore((state) => state.setUser);
   useEffect(() => {
      const validateToken = async () => {
         try {
            if (validationToken) {
               const { token, weightUnitPreference, distanceUnitPreference } =
                  await fetchValidateEmailToken({
                     validationToken,
                  });

               setUser({ token, weightUnitPreference, distanceUnitPreference });

               navigate("/home");
            } else {
               navigate("/auth/sign-up");
            }
         } catch (error) {
            console.error(error);

            return toastify({
               message:
                  "Something went wrong verifying email token. Please try again later.",
               type: "error",
            });
         }
      };

      validateToken();
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
