import { FaTimes } from "react-icons/fa";
import StandardIconBtn from "./StandardIconBtn";

import styles from "./DeleteConfirmationWindow.module.css";
import StandardBtn from "./StandardBtn";
import { useModalsStore } from "../../stores/modals.store";

export default function DeleteConfirmationWindow() {
   const deleteConfirmationWindowInfo = useModalsStore(
      (state) => state.deleteConfirmationWindowInfo
   );
   const setDeleteConfirmationWindowInfo = useModalsStore(
      (state) => state.setDeleteConfirmationWindowInfo
   );
   const handleCloseClick = () => {
      deleteConfirmationWindowInfo?.onCancel();
      setDeleteConfirmationWindowInfo(null);
   };

   const handleCancelClick = () => {
      deleteConfirmationWindowInfo?.onCancel();
      setDeleteConfirmationWindowInfo(null);
   };

   const handleConfirmClick = () => {
      deleteConfirmationWindowInfo?.onConfirm();
      setDeleteConfirmationWindowInfo(null);
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <StandardIconBtn Icon={FaTimes} onClick={handleCloseClick} />
            <h3 className={styles.confirmationMessage}>
               {deleteConfirmationWindowInfo?.message ?? ""}
            </h3>
            <div className={styles.optionBtnsWrapper}>
               <StandardBtn text="Cancel" onClick={handleCancelClick} />
               <StandardBtn text="Confirm" onClick={handleConfirmClick} />
            </div>
         </div>
      </div>
   );
}
