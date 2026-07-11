
import React, { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {

  // User State
  const [user, setUser] = useState(null);

  // Update User
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Clear User
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;