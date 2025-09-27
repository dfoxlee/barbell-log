import { Route, Routes } from "react-router-dom";
import Landing from "./features/landing/Landing";
import Auth from "./features/auth/Auth";
import NotFound404 from "./features/not-found-404/NotFound404";
import Layout from "./features/shared/Layout";
import Home from "./features/home/Home";
import WorkoutComposition from "./features/workout-composition/WorkoutComposition";
import SignUpReceived from "./features/sign-up-received/SignUpReceived";
import VerifiedEmail from "./features/verified-email/VerifiedEmail";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Landing />} />
         <Route path="/auth/:auth-type?" element={<Auth />} />
         <Route
            path="/validate/:validation-token"
            element={<VerifiedEmail />}
         />
         <Route path="/sign-up-received" element={<SignUpReceived />} />
         <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
               path="create-workout/:workout-id?"
               element={<WorkoutComposition />}
            />
         </Route>
         <Route path="*" element={<NotFound404 />} />
      </Routes>
   );
}

export default App;
