import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import homeScreenImg from "/public/home-screenshot.png";
import barbellLogScreenImg from "/public/barbell-log-screenshot.png";
import workoutCompositionScreenImg from "/public/workout-composition-screenshot.png";
import workoutHistoryScreenImg from "/public/workout-history-screenshot.png";
import settingsScreenImg from "/public/settings-screenshot.png";
import { FaArrowDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Seperator from "../shared/Seperator";

import styles from "./Landing.module.css";
import { useUserStore } from "../../stores/user.store";

const images = [
   {
      id: 0,
      image: homeScreenImg,
      alt: "Barbell Log Home Page",
      description:
         "The home screen gives you quick actions to get you where you need to go.",
   },
   {
      id: 1,
      image: workoutCompositionScreenImg,
      alt: "Barbell Log Workout Composition Page",
      description: "Create and edit workouts quickly and simply.",
   },
   {
      id: 2,
      image: barbellLogScreenImg,
      alt: "Barbell Log Screen",
      description:
         "The workout page gives you easy options for entering workouts.",
   },
   {
      id: 2,
      image: workoutHistoryScreenImg,
      alt: "Barbell Log Workout History",
      description:
         "Review you workouts on the history page where you can also explore growth with exercises.",
   },
   {
      id: 2,
      image: settingsScreenImg,
      alt: "Barbell Log Settings",
      description:
         "Settings page allows you to manage your account and preferences with ease.",
   },
];

const AUTOPLAY_INTERVAL = 8000;

export default function Landing() {
   const user = useUserStore((state) => state.user);
   const navigate = useNavigate();
   const [currentImageId, setCurrentImageId] = useState(0);
   const intervalRef = useRef<number | null>(null);
   const timerBarRef = useRef(null);

   useEffect(() => {
      if (user?.token) {
         navigate("/home");
      }
   }, [user?.token, navigate]);

   useEffect(() => {
      const resetProgressBar = () => {
         if (timerBarRef.current) {
            timerBarRef.current.style.transition = "none";
            timerBarRef.current.style.width = "0%";
            void timerBarRef.current.offsetWidth;
            timerBarRef.current.style.transition = `width ${AUTOPLAY_INTERVAL}ms linear`;
            timerBarRef.current.style.width = "100%";
         }
      };

      resetProgressBar();

      if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
         setCurrentImageId((prevId) =>
            prevId === images.length - 1 ? 0 : prevId + 1
         );
      }, AUTOPLAY_INTERVAL);

      return () => {
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
         }
      };
   }, [currentImageId]);

   const handleIncrementImage = () => {
      if (currentImageId === images.length - 1) {
         return setCurrentImageId(0);
      }

      setCurrentImageId((prev) => prev + 1);
   };

   const handleDecrementImage = () => {
      if (currentImageId === 0) {
         return setCurrentImageId(images.length - 1);
      }

      setCurrentImageId((prev) => prev - 1);
   };

   return (
      <div className={styles.container}>
         <div className={styles.heroWrapper}>
            <div className={styles.heroTextWrapper}>
               <h1 className={styles.heroTitle}>Barbell Log</h1>
               <h3 className={styles.heroSubTitle}>
                  Ditch the Clutter, Keep the Gains. Simple, Ad-Free Fitness at
                  your fingertips.
               </h3>
               <div className={styles.heroLinkWrapper}>
                  <Link
                     className={`standardLink ${styles.heroLoginLink}`}
                     to="/auth/login"
                  >
                     Login
                  </Link>
                  <Link
                     className={`standardLink ${styles.heroSignUpLink}`}
                     to="/auth/sign-up"
                  >
                     Sign Up
                  </Link>
               </div>
               <div className={styles.learnMoreWrapper}>
                  <p className={styles.learnMoreText}>Learn More</p>
                  <FaArrowDown className={styles.learnMoreIcon} />
               </div>
            </div>
         </div>
         <div className={styles.showcaseWrapper}>
            <div className={styles.navigationWrapper}>
               <button
                  className={styles.navigationBtn}
                  onClick={handleDecrementImage}
               >
                  <FaChevronLeft />
               </button>
               <div className={styles.timerWrapper}>
                  <div ref={timerBarRef} className={styles.timerBar}></div>
               </div>
               <button
                  className={styles.navigationBtn}
                  onClick={handleIncrementImage}
               >
                  <FaChevronRight />
               </button>
            </div>
            <div className={styles.contentWrapper}>
               <img
                  className={styles.screenshotImg}
                  src={images[currentImageId].image}
                  alt={images[currentImageId].alt}
               />
               <p className={styles.screenshotDescription}>
                  {images[currentImageId].description}
               </p>
            </div>
         </div>
         {/* <div className={styles.programPlanOptions}>
            <div className={styles.titleWrapper}>
               <h3 className={styles.plansTitle}>Workout Plans</h3>
               <Seperator />
            </div>
            <div className={styles.plansWrapper}>
               <div className={styles.planWrapper}>
                  <div className={styles.titleWrapper}>
                     <h3 className={styles.planTitle}>Bronze</h3>
                     <h5 className={styles.pricingSubTitle}>FREE</h5>
                     <p className={styles.planDescription}>3 Workouts</p>
                     <p>10 Exercises / Workout</p>
                     <p>5 Sets / Exercise</p>
                  </div>
                  <button className={`standardBtn`}>Try Bronze</button>
               </div>
               <div className={styles.planWrapper}>
                  <div className={styles.titleWrapper}>
                     <h3 className={styles.planTitle}>Silver</h3>
                     <h5 className={styles.pricingSubTitle}>$5 / month</h5>
                     <p className={styles.planDescription}>10 Workouts</p>
                     <p>10 Exercises / Workout</p>
                     <p>10 Sets / Exercise</p>
                  </div>
                  <button className={`standardBtn`}>Try Silver</button>
               </div>
               <div className={styles.planWrapper}>
                  <div className={styles.titleWrapper}>
                     <h3 className={styles.planTitle}>Gold</h3>
                     <h5 className={styles.pricingSubTitle}>$15 / month</h5>
                     <p className={styles.planDescription}>50 Workouts</p>
                     <p>20 Exercises / Workout</p>
                     <p>15 Sets / Exercise</p>
                  </div>
                  <button className={`standardBtn`}>Try Gold</button>
               </div>
            </div>
         </div> */}
      </div>
   );
}
