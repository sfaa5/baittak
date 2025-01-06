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
  property:any;
  setProperty:any;
  favorite:any;
  seFavorite:any;
  setDataRequest:any;
  dataRequest:any;
  starRequest:any;
  setStarRequest:any;
  allRequest:any;
  setAllRequest:any;
  activeButton:any;
  setActiveButton:any;
  user:any;
  setUser:any;
  projects:any;
  setProjects:any;
  properties:any;
  setProperties:any;
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
  const [property, setProperty] = useState([]);
  const [favorite,seFavorite]=useState([]);
  const [dataRequest,setDataRequest]=useState([]);
  const [starRequest,setStarRequest]=useState([]);
  const [allRequest,setAllRequest]=useState([]);
  const [activeButton, setActiveButton] = useState<string | null>("inbox");
  const [user,setUser]=useState([]);
  const [projects,setProjects]=useState([]);
  const [properties,setProperties]=useState([]);




  return (
    <stateContext.Provider
      value={{
        dataRequest,
        setDataRequest,
        favorite,
        seFavorite,
        showDelte,
        setShowDelte,
        req,
        setReq,
        property,
        setProperty,
        starRequest,
        setStarRequest, 
        allRequest,
        setAllRequest,
        activeButton,
        setActiveButton,
        user,
        setUser,
        projects,
        setProjects,
        properties,
        setProperties

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
