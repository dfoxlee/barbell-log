import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { BarbellLogContextProvider } from "./contexts/BarbellLogContext.tsx";
import { WorkoutCompositionProvider } from "./contexts/WorkoutCompositionContext.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <WorkoutCompositionProvider>
         <BarbellLogContextProvider>
            <AuthContextProvider>
               <ToastContainer />
               <App />
            </AuthContextProvider>
         </BarbellLogContextProvider>
      </WorkoutCompositionProvider>
   </BrowserRouter>
);
