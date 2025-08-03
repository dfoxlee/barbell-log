import { useState } from "react";
import styles from "./Body.module.css";
import {
   FaGlasses,
   FaPencilAlt,
   FaToggleOff,
   FaToggleOn,
} from "react-icons/fa";
import EditBody from "./EditBody";

export default function Body() {
   const [isEditingBody, setIsEditingBody] = useState(false);

   const toggleIsEditingBody = () => {
      setIsEditingBody((prev) => !prev);
   };

   return (
      <div>
         <button
            className={`standardIconBtn ${styles.toggleEditBodyBtn}`}
            onClick={toggleIsEditingBody}
         >
            <FaGlasses />
            {isEditingBody ? <FaToggleOn /> : <FaToggleOff />}
            <FaPencilAlt />
         </button>
         {isEditingBody ? <EditBody /> : null}
      </div>
   );
}
