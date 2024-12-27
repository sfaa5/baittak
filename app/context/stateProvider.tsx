"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


// Define the type for the shared state context
type SharedStateContextType = {
//   amenities: Amenity[]; // Array of amenities
//   setAmenities: Dispatch<SetStateAction<Amenity[]>>; // Setter for amenities
  showDelte:any;
  setShowDelte:any;
  req:any;
  setReq:any;
};

// Create the context with proper type
export const stateContext = createContext<SharedStateContextType | null>(null);

// Props type for StateProvider
type StateProviderProps = {
  children: ReactNode;
};

export default function StateProvider({ children }: StateProviderProps) {
  // States with specific types
  const [showDelte, setShowDelte] = useState(false);
  const [req, setReq] = useState([]);



  return (
    <stateContext.Provider
      value={{
        showDelte,
        setShowDelte,
        req,
        setReq
      }}
    >
      {children}
    </stateContext.Provider>
  );
}

// Custom hook for accessing the shared state
export function useSharedState() {
  const context = useContext(stateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a StateProvider");
  }
  return context;
}
