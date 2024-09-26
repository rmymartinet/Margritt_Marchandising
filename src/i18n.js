import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import texts_en from "./translation/en/en.json";
import texts_fr from "./translation/fr/fr.json";

// Fonction pour détecter la langue
const detectUserLanguage = () => {
  // Par défaut, utilisez la langue par défaut définie si la langue du navigateur n'est pas disponible
  let defaultLanguage = "en";

  // substring(0, 2) pour obtenir les deux premiers caractères de la langue du navigateur
  const userLanguage = (navigator.language || navigator.userLanguage).substring(
    0,
    2
  );

  // Vous pouvez ajouter d'autres logiques de détection de langue ici si nécessaire

  // Retourne la langue détectée ou la langue par défaut si la langue détectée n'est pas prise en charge
  return ["en", "fr"].includes(userLanguage) ? userLanguage : defaultLanguage;
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: texts_en,
    },
    fr: {
      translation: texts_fr,
    },
  },
  lng: detectUserLanguage(),
  fallbackLng: "en", // Langue de secours si la langue détectée n'est pas prise en charge
  interpolation: {
    escapeValue: false, // Ne pas échapper les valeurs interprétées
  },
});
