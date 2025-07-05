import { useContext } from "react";
import { BarbellLogContext } from "../contexts/BarbellLogContext";

export const useBarbellLogContext = () => {
   const context = useContext(BarbellLogContext);

   if (!context) {
      throw new Error("Context must be used within a provider");
   }

   return context;
};
