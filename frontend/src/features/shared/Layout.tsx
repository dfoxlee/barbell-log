import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";

export default function Layout() {
   const { user } = useAuthContext();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         navigate("/auth/login");
      }
   }, [user, navigate]);

   return (
      <>
         <Outlet />
         <Navbar />
      </>
   );
}
