import { useState } from "react";
import { FaCog } from "react-icons/fa";
import StartWorkoutModal from "./components/StartWorkoutModal";
import BodyweightModal from "./components/BodyweightModal";
import BodyweightSection from "./components/BodyweightSection";
import SettingsModal from "./components/SettingsModal";
import StandardBtn from "../shared/StandardBtn";
import StandardLink from "../shared/StandardLink";
import StandardIconBtn from "../shared/StandardIconBtn";
import Seperator from "../shared/Seperator";

import styles from "./Home.module.css";
import NutritionSection from "./components/NutritionSection";
import NutritionModal from "./components/NutritionModal";

export default function Home() {
   const [startWorkoutModalOpen, setStartWorkoutModalOpen] = useState(false);
   const [bodyweightModalOpen, setBodyweightModalOpen] = useState(false);
   const [settingsModalOpen, setSettingsModalOpen] = useState(false);
   const [nutritionModalOpen, setNutritionModalOpen] = useState(false);

   const toggleStartWorkoutModalOpen = () => {
      setStartWorkoutModalOpen((prev) => !prev);
   };

   const toggleBodyweightModalOpen = () => {
      setBodyweightModalOpen((prev) => !prev);
   };

   const toggleSettingsModalOpen = () => {
      setSettingsModalOpen((prev) => !prev);
   };

   const toggleNutritionModal = () => {
      setNutritionModalOpen((prev) => !prev);
   };

   return (
      <div className={styles.container}>
         <div className={styles.settingsBtnWrapper}>
            <StandardIconBtn Icon={FaCog} onClick={toggleSettingsModalOpen} />
         </div>
         {startWorkoutModalOpen ? (
            <StartWorkoutModal
               toggleStartWorkoutModalOpen={toggleStartWorkoutModalOpen}
            />
         ) : null}
         {bodyweightModalOpen ? (
            <BodyweightModal
               toggleBodyweightModalOpen={toggleBodyweightModalOpen}
            />
         ) : null}
         {settingsModalOpen ? (
            <SettingsModal toggleSettingsModalOpen={toggleSettingsModalOpen} />
         ) : null}
         {nutritionModalOpen ? (
            <NutritionModal toggleNutritionModal={toggleNutritionModal} />
         ) : null}
         <h1 className={`pageTitle`}>Barbell Log</h1>
         <Seperator />
         <div className={styles.btnsWrapper}>
            <StandardLink
               toPath="/home/create-workout"
               text="Create a Workout"
            />
            <StandardBtn
               text="Start a Workout"
               onClick={toggleStartWorkoutModalOpen}
            />
         </div>
         <BodyweightSection
            toggleBodyweightModalOpen={toggleBodyweightModalOpen}
         />
         <NutritionSection toggleNutritionModal={toggleNutritionModal} />
      </div>
   );
}
