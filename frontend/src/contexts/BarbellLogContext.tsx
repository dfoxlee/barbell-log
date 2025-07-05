import { createContext, useReducer } from "react";
import {
   initialBarbellLog,
   barbellLogReducer,
} from "../reducers/barbellLogReducer";

const BarbellLogContext = createContext();

const BarbellLogContextProvider = ({ children }) => {
   const [barbellLogState, barbellLogDispatch] = useReducer(
      barbellLogReducer,
      initialBarbellLog
   );
   
   return (
      <BarbellLogContext.Provider
         value={{ barbellLogState, barbellLogDispatch }}
      >
         {children}
      </BarbellLogContext.Provider>
   );
};

export { BarbellLogContext, BarbellLogContextProvider };
