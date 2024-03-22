import { createContext, useEffect, useState } from "react";
import authService from "@/services/authService";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuthentication = async () => {
    const { isAuthenticated, user } = await authService.checkAuthentication();

    if (isAuthenticated) {
      setUser(user ?? null);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
