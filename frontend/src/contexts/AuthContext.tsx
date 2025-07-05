import { createContext, useState, type ReactNode } from "react";
import type { UserType } from "../types/types";

interface AuthContextType {
   user: null | UserType;
   updateUser: null | ((user: UserType) => void);
   removeUser: null | (() => void);
}

const AuthContext = createContext<null | AuthContextType>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState(
      localStorage.getItem("barbell-log")
         ? JSON.parse(localStorage.getItem("barbell-log"))
         : null
   );

   const updateUser = (user) => {
      localStorage.setItem("barbell-log", JSON.stringify(user));

      setUser(user);
   };

   const removeUser = () => {
      localStorage.removeItem("barbell-log");

      setUser("");
   };

   return (
      <AuthContext.Provider value={{ user, updateUser, removeUser }}>
         {children}
      </AuthContext.Provider>
   );
};

export { AuthContext, AuthContextProvider };
