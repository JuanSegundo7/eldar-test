import { IUser, IUserContextType } from "@/types/types";
import { ReactNode, createContext, useContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

const defaultUserContextValue: IUserContextType = {
  user: { id: null, email: "", password: "", role: "" },
  login: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultUserContextValue);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser>({
    id: null,
    email: "",
    password: "",
    role: "",
  });

  const login = (userData: IUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({ id: null, email: "", password: "", role: "" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
