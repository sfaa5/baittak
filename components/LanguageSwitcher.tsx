"use client";


import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {

  
  const { i18n } = useTranslation("common");

  const toggleLanguage = () => {
    const newLanguage =i18n.language  === "en" ? "ar" : "en";

    i18n.changeLanguage(newLanguage);


    // Update `html` attributes dynamically
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
  };

  return (
    <button onClick={toggleLanguage}>
      { i18n.language === "en" ? "Arabic" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
