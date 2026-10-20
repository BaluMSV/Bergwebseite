(() => {
  "use strict";

  const preferenceKey = "site-language";
  const supportedLanguages = new Set(["de", "en", "es"]);
  let languageSelect = document.getElementById("site-language");

  if (!languageSelect) {
    const header = document.querySelector(".site-header") || document.createElement("header");
    if (!header.classList.contains("site-header")) {
      header.className = "language-site-header";
      document.body.prepend(header);
    }
    const picker = document.createElement("label");
    picker.className = "language-picker";
    picker.htmlFor = "site-language";
    picker.innerHTML = '<span aria-hidden="true">🌐</span><span class="visually-hidden">Sprache wählen</span><select id="site-language" name="language" aria-label="Sprache wählen"><option value="de">🇩🇪 Deutsch</option><option value="en">🇬🇧 English</option><option value="es">🇪🇸 Español</option></select>';
    header.append(picker);
    languageSelect = picker.querySelector("select");
  }

  if (!document.querySelector('link[data-language-styles]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "language.css";
    stylesheet.dataset.languageStyles = "";
    document.head.append(stylesheet);
  }

  let selectedLanguage = "de";
  try {
    const savedLanguage = window.localStorage.getItem(preferenceKey);
    if (savedLanguage && supportedLanguages.has(savedLanguage)) {
      selectedLanguage = savedLanguage;
    }
  } catch (error) {
    console.error("Die gespeicherte Sprachauswahl konnte nicht gelesen werden.", error);
  }

  function setLanguage(language, persist) {
    if (!supportedLanguages.has(language)) {
      throw new RangeError(`Nicht unterstützte Sprache: ${language}`);
    }
    selectedLanguage = language;
    document.documentElement.lang = language;
    languageSelect.value = language;
    if (persist) {
      try {
        window.localStorage.setItem(preferenceKey, language);
      } catch (error) {
        console.error("Die Sprachauswahl konnte nicht gespeichert werden.", error);
      }
    }
    window.dispatchEvent(new CustomEvent("site:languagechange", {
      detail: { language: selectedLanguage }
    }));
  }

  window.siteLanguage = Object.freeze({
    get current() {
      return selectedLanguage;
    },
    set: language => setLanguage(language, true),
    supported: Object.freeze(["de", "en", "es"])
  });

  languageSelect.addEventListener("change", () => {
    setLanguage(languageSelect.value, true);
  });
  setLanguage(selectedLanguage, false);
})();
