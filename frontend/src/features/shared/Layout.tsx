import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../../stores/user.store";

import styles from "./Layout.module.css";
import { useModalsStore } from "../../stores/modals.store";
import DeleteConfirmationWindow from "./DeleteConfirmationWindow";

export default function Layout() {
   const token = useUserStore((state) => state.token);
   const setUser = useUserStore((state) => state.setUser);
   const deleteConfirmationWindowInfo = useModalsStore(
      (state) => state.deleteConfirmationWindowInfo
   );

   const navigate = useNavigate();

   useEffect(() => {
      if (!token) {
         const localUserString = localStorage.getItem("barbell-log");

         if (!localUserString) {
            navigate("/auth/login");
         } else {
            const localUser = JSON.parse(localUserString);

            if (!localUser.token) {
               navigate("/auth/login");
            } else {
               setUser(localUser);
            }
         }
      }
   }, []);

   return (
      <div className={styles.container}>
         {deleteConfirmationWindowInfo ? <DeleteConfirmationWindow /> : null}
         <Outlet />
      </div>
   );
}
