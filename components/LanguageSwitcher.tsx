"use client";


import { useTranslation } from "react-i18next";
import localFont from "next/font/local";

const droidArabicKufi = localFont({
  src: [
    { path: "../app/fonts/DroidKufi-Regular.ttf", weight: "400", style: "normal" },
    { path: "../app/fonts/DroidKufi-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-droid-kufi",
});

const helvetica = localFont({
  src: [
    { path: "../app/fonts/helvetica-black.otf", weight: "900", style: "normal" },
    { path: "../app/fonts/Helvetica-Bold.ttf", weight: "700", style: "normal" },
    { path: "../app/fonts/helvetica-light.ttf", weight: "200", style: "normal" },
    { path: "../app/fonts/Helvetica.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-droid-kufi",
});


const workSans = localFont({
  src: [
    {
      path: "../app/fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../app/fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});



const LanguageSwitcher = () => {

  
  const { i18n } = useTranslation("common");

  const toggleLanguage = () => {
    const newLanguage =i18n.language  === "en" ? "ar" : "en";
    

    // Determine which font class to use
    let fontClass;
    if (newLanguage === "ar" && droidArabicKufi.variable) {
      fontClass = droidArabicKufi.variable;
    } else if (newLanguage === "en" && helvetica.variable) {
      fontClass = helvetica.variable;
    } else {
      fontClass = workSans.variable; // Default to WorkSans if neither is available
    }
    i18n.changeLanguage(newLanguage);



    // Update `html` attributes dynamically
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";

     // Update the `body`'s class dynamically to apply the font
     document.body.className = fontClass; // Apply the font class to the body
  };

  return (
    <button onClick={toggleLanguage}>
      { i18n.language === "en" ? "Arabic" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
