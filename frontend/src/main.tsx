import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

import "./index.css";

createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <ToastContainer />
      <App />
   </BrowserRouter>
);
