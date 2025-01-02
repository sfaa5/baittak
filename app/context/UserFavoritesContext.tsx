// context/UserFavoritesContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type FavoritesContextType = {
  userFavorites: string[];
  setUserFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};

const UserFavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const UserFavoritesProvider: React.FC<{ children: React.ReactNode; initialFavorites: string[] }> = ({
  children,
  initialFavorites,
}) => {
  const [userFavorites, setUserFavorites] = useState(initialFavorites);

  return (
    <UserFavoritesContext.Provider value={{ userFavorites, setUserFavorites }}>
      {children}
    </UserFavoritesContext.Provider>
  );
};

export const useUserFavorites = () => {
  const context = useContext(UserFavoritesContext);
  if (!context) {
    throw new Error("useUserFavorites must be used within a UserFavoritesProvider");
  }
  return context;
};
