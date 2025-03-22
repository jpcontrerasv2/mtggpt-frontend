import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const LanguageSelector = () => {
  const { t } = useTranslation();

  const handleChangeLanguage = (event) => {
    const selectedLang = event.target.value;

    if (i18n && i18n.changeLanguage) {  // Asegurar que i18n está disponible
      i18n.changeLanguage(selectedLang);
      localStorage.setItem("lang", selectedLang);
    }
  };


  return (
    <div className="flex justify-end p-2">
      <select
        onChange={handleChangeLanguage}
        defaultValue={i18n.language}
        className="border rounded p-1 bg-white"
      >
        <option value="es" title="Español">🇪🇸</option>
        <option value="en" title="English">🇬🇧</option>
      </select>

    </div>
  );
};

export default LanguageSelector;
