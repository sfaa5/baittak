// "use client";

// import React, { createContext, useState, useContext } from "react";

// interface LanguageContextType {
//   currentLang: string;
//   changeLanguage: (lang: string) => void;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentLang, setCurrentLang] = useState<string>("en");

//   const changeLanguage = (lang: string) => {
//     setCurrentLang(lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ currentLang, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useLanguage must be used within a LanguageProvider");
//   }
//   return context;
// };
