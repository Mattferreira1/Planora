"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { TypeUser } from "../types";

type UserContextType = {
  userLogged: TypeUser | null;
  setUserLogged: Dispatch<SetStateAction<TypeUser | null>>;
};
export const UserContext = createContext<UserContextType | null>(null);
const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userLogged, setUserLogged] = useState<TypeUser | null>(null);
  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
