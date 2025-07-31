import styles from "./Nutrition.module.css";

export default function Nutrition() {
   return (
      <div>
         <input
            className={`standardInput`}
            type="text"
            placeholder="add item..."
         />
      </div>
   );
}
