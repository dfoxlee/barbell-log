import { Route, Routes } from "react-router-dom";
import Landing from "./features/landing/Landing";
import Auth from "./features/auth/Auth";
import NotFound404 from "./features/not-found-404/NotFound404";
import Layout from "./features/shared/Layout";
import Home from "./features/home/Home";
import Workouts from "./features/workouts/Workouts";
import BarbellLog from "./features/barbell-log/BarbellLog";
import Settings from "./features/settings/Settings";
import WorkoutComposition from "./features/workout-composition/WorkoutComposition";
import WorkoutHistory from "./features/workout-history/WorkoutHistory";
import CompletedWorkout from "./features/completed-workout/CompletedWorkout";
import Measurements from "./features/measurements/Measurements";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/auth/:auth-type?" element={<Auth />} />
         <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="workouts" element={<Workouts />} />
            <Route
               path="workout-composition/:workout-id?"
               element={<WorkoutComposition />}
            />
            <Route
               path="barbell-log/:workout-id/:completed-workout-id?"
               element={<BarbellLog />}
            />
            <Route path="measurements" element={<Measurements />} />
            <Route path="workout-history" element={<WorkoutHistory />} />
            <Route
               path="completed-workout/:completed-workout-id"
               element={<CompletedWorkout />}
            />
            <Route path="settings" element={<Settings />} />
         </Route>
         <Route path="*" element={<NotFound404 />} />
      </Routes>
   );
}

export default App;
