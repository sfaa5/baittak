import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Manually import translation files or use a dynamic loader.
const resources = {
  en: {
    common: require("../public/locales/en/common.json"),
  },
  ar: {
    common: require("../public/locales/ar/common.json"),
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
