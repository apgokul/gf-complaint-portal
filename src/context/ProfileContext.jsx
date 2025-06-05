// src/context/ProfileContext.js
import { createContext, useContext } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const clearProfile = () => {
    localStorage.clear();
  };

  return (
    <ProfileContext.Provider value={{ clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
