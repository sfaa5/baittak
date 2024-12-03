import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import arCommon from "../public/locales/ar/common.json";

const resources = {
  en: { common: enCommon },
  ar: { common: arCommon },
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

