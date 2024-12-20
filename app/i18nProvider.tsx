"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import your i18n instance (adjust path as needed)

const I18nProvider = ({ children }: { children: React.ReactNode }) => {

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    
};

export default I18nProvider;