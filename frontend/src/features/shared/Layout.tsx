import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";

export default function Layout() {
   const { user } = useUserStore();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user?.token) {
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
