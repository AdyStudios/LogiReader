/**
 * @author Felix Waßmuth
 * @license MIT
 *
 * @version 1.0.0
 * @since 0.2.0
 * @function App
 * @returns {JSX.Element} The main page of the application.
 */

import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

/* Language files */
import en from "./locales/en/translation.json";
import hu from "./locales/hu/translation.json";
import de from "./locales/de/translation.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      hu: {
        translation: hu,
      },
      de: {
        translation: de,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
