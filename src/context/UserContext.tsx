import React, { createContext, useContext, useState } from "react";
import { users } from "../mockData/MockData";
import { User } from "../type/types";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: users[0],
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(users[0]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
