(() => {
  "use strict";

  const preferenceKey = "site-language";
  const supportedLanguages = new Set(["de", "en", "es"]);
  const flagMarkup = {
    de: '<svg viewBox="0 0 24 16" focusable="false"><path fill="#000" d="M0 0h24v5.34H0z"/><path fill="#dd0000" d="M0 5.33h24v5.34H0z"/><path fill="#ffce00" d="M0 10.66h24V16H0z"/></svg>',
    en: '<svg viewBox="0 0 24 16" focusable="false"><path fill="#b22234" d="M0 0h24v16H0z"/><path stroke="#fff" stroke-width="1.23" d="M0 .62h24M0 3.08h24M0 5.54h24M0 8h24M0 10.46h24M0 12.92h24M0 15.38h24"/><path fill="#3c3b6e" d="M0 0h10.4v8H0z"/><g fill="#fff"><circle cx="1.5" cy="1.2" r=".38"/><circle cx="3.5" cy="1.2" r=".38"/><circle cx="5.5" cy="1.2" r=".38"/><circle cx="7.5" cy="1.2" r=".38"/><circle cx="9.5" cy="1.2" r=".38"/><circle cx="2.5" cy="2.7" r=".38"/><circle cx="4.5" cy="2.7" r=".38"/><circle cx="6.5" cy="2.7" r=".38"/><circle cx="8.5" cy="2.7" r=".38"/><circle cx="1.5" cy="4.2" r=".38"/><circle cx="3.5" cy="4.2" r=".38"/><circle cx="5.5" cy="4.2" r=".38"/><circle cx="7.5" cy="4.2" r=".38"/><circle cx="9.5" cy="4.2" r=".38"/><circle cx="2.5" cy="5.7" r=".38"/><circle cx="4.5" cy="5.7" r=".38"/><circle cx="6.5" cy="5.7" r=".38"/><circle cx="8.5" cy="5.7" r=".38"/><circle cx="1.5" cy="7.2" r=".38"/><circle cx="3.5" cy="7.2" r=".38"/><circle cx="5.5" cy="7.2" r=".38"/><circle cx="7.5" cy="7.2" r=".38"/><circle cx="9.5" cy="7.2" r=".38"/></g></svg>',
    es: '<svg viewBox="0 0 24 16" focusable="false"><path fill="#aa151b" d="M0 0h24v16H0z"/><path fill="#f1bf00" d="M0 4h24v8H0z"/><path fill="#aa151b" d="M0 0h24v4H0zM0 12h24v4H0z"/><path fill="#aa151b" d="M6.5 5.1h2.2v4.8H6.5z"/><path fill="#f1bf00" d="M6.9 5.5h1.4v1.2H6.9z"/></svg>'
  };
  const languageNames = { de: "Deutsch", en: "English", es: "Español" };
  const translations = {
    "Bahnberge.de – Wandern mit dem Zug ab München": {
      en: "Bahnberge.de – Hiking by train from Munich",
      es: "Bahnberge.de – Senderismo en tren desde Múnich"
    },
    "Zum Wandern mit dem Zug ab München in die Berge": {
      en: "Take the train from Munich to the mountains for a hike",
      es: "Viaja en tren desde Múnich a la montaña para hacer senderismo"
    },
    "Themen": { en: "Topics", es: "Temas" },
    "Tour der Woche": { en: "Hike of the week", es: "Ruta de la semana" },
    "Wanderregionen": { en: "Hiking regions", es: "Regiones de senderismo" },
    "Tipps zum Wandern mit der Bahn": {
      en: "Tips for hiking by train",
      es: "Consejos para hacer senderismo en tren"
    },
    "Bahnlinien": { en: "Railway lines", es: "Líneas de tren" },
    "Interaktive Übersicht": { en: "Interactive overview", es: "Vista interactiva" },
    "Bahnverbindungen von München in die Berge": {
      en: "Train connections from Munich to the mountains",
      es: "Conexiones en tren desde Múnich a la montaña"
    },
    "Plane deine nächste Bahnfahrt in die Berge.": {
      en: "Plan your next train trip to the mountains.",
      es: "Planifica tu próximo viaje en tren a la montaña."
    },
    "Karte verschieben und zoomen": {
      en: "Pan and zoom the map",
      es: "Desplaza y amplía el mapa"
    },
    "Einstellungen für die Tourensuche": {
      en: "Hike search settings",
      es: "Opciones de búsqueda de rutas"
    },
    "Abfahrtsbahnhof": { en: "Departure station", es: "Estación de salida" },
    "Maximale Umstiege": { en: "Maximum transfers", es: "Máximo de transbordos" },
    "Tourart": { en: "Hike type", es: "Tipo de ruta" },
    "Rundtour": { en: "Circular hike", es: "Ruta circular" },
    "A nach B": { en: "One way", es: "Solo ida" },
    "Maximale Anreisedauer": { en: "Maximum travel time", es: "Duración máxima del viaje" },
    "Tourensuche": { en: "Hike search", es: "Buscar rutas" },
    "Gipfel suchen …": { en: "Search peaks …", es: "Buscar cumbres …" },
    "Suchen": { en: "Search", es: "Buscar" },
    "Kein Treffer.": { en: "No results.", es: "Sin resultados." },
    "Über diese Karte": { en: "About this map", es: "Acerca de este mapa" },
    "Orte und Wege entdecken": { en: "Discover places and trails", es: "Descubre lugares y senderos" },
    "Die Karte zeigt Bahnverbindungen, Wanderwege und Gipfel im südlichen Bayern. Klicke auf ein Lokomotivsymbol oder eine Bahnlinie, um das Ziel zu öffnen. Fahre über ein Gipfelsymbol oder eine gepunktete Wanderlinie, um die Details aufzurufen. Ziele, Verläufe und Bilddateien lassen sich im Hintergrund anpassen.": {
      en: "The map shows train connections, hiking trails and peaks in southern Bavaria. Click a train icon or railway line to open its destination. Hover over a peak icon or dotted hiking trail to view details. Destinations, routes and image files can be updated in the background.",
      es: "El mapa muestra conexiones ferroviarias, senderos y cumbres en el sur de Baviera. Haz clic en un icono de tren o una línea ferroviaria para abrir el destino. Pasa el cursor sobre una cumbre o un sendero de puntos para ver los detalles. Los destinos, recorridos e imágenes se pueden actualizar."
    },
    "Impressum": { en: "Legal notice", es: "Aviso legal" },
    "Datenschutz": { en: "Privacy", es: "Privacidad" },
    "Kontakt": { en: "Contact", es: "Contacto" },
    "Besucher:": { en: "Visitors:", es: "Visitantes:" },
    "← Zurück zur Karte": { en: "← Back to map", es: "← Volver al mapa" },
    "Auf einen Blick": { en: "At a glance", es: "De un vistazo" },
    "Impressionen": { en: "Gallery", es: "Imágenes" },
    "Anreise": { en: "Getting there", es: "Cómo llegar" },
    "Tour": { en: "Hike", es: "Ruta" },
    "Anreise planen": { en: "Plan your journey", es: "Planifica el viaje" },
    "Tour planen": { en: "Plan your hike", es: "Planifica la ruta" },
    "Entfernungen und Tourangaben sind beispielhafte Orientierungswerte. Bitte Route, Bedingungen und aktuelle Hinweise vor einer Tour selbst prüfen.": {
      en: "Distances and hike details are examples for guidance only. Please check the route, conditions and latest information before setting out.",
      es: "Las distancias y los datos de las rutas son orientativos. Comprueba el recorrido, las condiciones y la información actual antes de salir."
    },
    "Details ansehen →": { en: "View details →", es: "Ver detalles →" },
    "Wanderung ansehen →": { en: "View hike →", es: "Ver ruta →" },
    "Gipfel nicht gefunden": { en: "Peak not found", es: "Cumbre no encontrada" },
    "Vorheriges Bild": { en: "Previous image", es: "Imagen anterior" },
    "Nächstes Bild": { en: "Next image", es: "Imagen siguiente" },
    "Entdecke die Wanderregionen im südlichen Bayern und in den angrenzenden Alpen. Die Übersicht ist nach der Anreisezeit ab München Hauptbahnhof sortiert.": {
      en: "Explore the hiking regions in southern Bavaria and the nearby Alps. The list is sorted by travel time from Munich Central Station.",
      es: "Explora las regiones de senderismo del sur de Baviera y los Alpes cercanos. La lista está ordenada por el tiempo de viaje desde la estación central de Múnich."
    },
    "Entdecke die Bahnlinien zu den Wandergebieten im südlichen Bayern und in den angrenzenden Alpen. Die Übersicht ist nach der Anreisezeit ab München Hauptbahnhof sortiert.": {
      en: "Explore the railway lines serving hiking areas in southern Bavaria and the nearby Alps. The list is sorted by travel time from Munich Central Station.",
      es: "Explora las líneas de tren que llegan a las zonas de senderismo del sur de Baviera y los Alpes cercanos. La lista está ordenada por el tiempo de viaje desde la estación central de Múnich."
    },
    "Planung": { en: "Planning", es: "Planificación" },
    "Feedback": { en: "Feedback", es: "Comentarios" },
    "Wetter für": { en: "Weather for", es: "El tiempo en" },
    "Wanderwetter": { en: "Hiking weather", es: "Tiempo para senderismo" },
    "Wanderwetter ausblenden": { en: "Hide hiking weather", es: "Ocultar el tiempo" },
    "Prognosetag": { en: "Forecast day", es: "Día del pronóstico" },
    "Wetter-Eignung am Tag": { en: "Hiking conditions for the day", es: "Condiciones para la ruta" },
    "Wetterdaten derzeit nicht verfügbar.": {
      en: "Weather data is currently unavailable.",
      es: "Los datos meteorológicos no están disponibles."
    },
    "Wettervorhersage wird geladen …": {
      en: "Loading weather forecast …",
      es: "Cargando el pronóstico del tiempo …"
    },
    "Modellprognose aus Bewölkung, Niederschlag und Wind; kein Live-Radar.": {
      en: "Model forecast based on cloud cover, precipitation and wind; not live radar.",
      es: "Pronóstico basado en nubosidad, precipitación y viento; no es un radar en directo."
    },
    "* Sonnenschätzung aus der Bewölkung.": {
      en: "* Sunshine estimate based on cloud cover.",
      es: "* Estimación de sol basada en la nubosidad."
    },
    "Bahnberge.de": { en: "Bahnberge.de", es: "Bahnberge.de" },
    "Kontaktformular": { en: "Contact form", es: "Formulario de contacto" },
    "Wenn du das Kontaktformular nutzt, werden dein Name, deine E-Mail-Adresse und dein Kommentar an den Server dieser Website übertragen und von dort per E-Mail an info@bahnberge.de gesendet. Der Versand erfolgt über das PHP-Webhosting bei IONOS. Deine E-Mail-Adresse wird dabei als Antwortadresse verwendet, damit auf deine Nachricht geantwortet werden kann. Bitte sende über das Formular keine vertraulichen Informationen.": {
      en: "When you use the contact form, your name, email address and comment are sent to this website's server and then emailed to info@bahnberge.de. The email is sent through IONOS PHP web hosting. Your email address is used as the reply address so we can respond. Please do not send confidential information through the form.",
      es: "Al utilizar el formulario de contacto, tu nombre, correo electrónico y comentario se envían al servidor de este sitio web y, desde allí, a info@bahnberge.de. El envío se realiza mediante el alojamiento PHP de IONOS. Tu correo se utiliza como dirección de respuesta. No envíes información confidencial a través del formulario."
    }
  };

  const dynamicTranslations = {
    en: [
      [/^Anreise ab München Hbf: (.+) Minuten$/, "Travel from Munich Central Station: $1 minutes"],
      [/^Anreise ab München Hbf: (.+)$/, "Travel from Munich Central Station: $1"],
      [/^Ungefähre Anreisedauer ab München Hauptbahnhof \(Orientierungswert\): (.+)$/, "Approximate travel time from Munich Central Station (guide): $1"],
      [/^(.+) – Gipfel$/, "$1 – Peak"],
      [/^3-Tage-Wetter · (.+)$/, "3-day forecast · $1"],
      [/^Wetter für (.+) wird geladen …$/, "Loading weather for $1 …"],
      [/^Maximaltemperatur: (.+) °C; Minimaltemperatur: (.+) °C$/, "Maximum temperature: $1 °C; minimum temperature: $2 °C"],
      [/^Max (.+) °C · Min (.+) °C$/, "Max $1 °C · Min $2 °C"]
    ],
    es: [
      [/^Anreise ab München Hbf: (.+) Minuten$/, "Viaje desde la estación central de Múnich: $1 minutos"],
      [/^Anreise ab München Hbf: (.+)$/, "Viaje desde la estación central de Múnich: $1"],
      [/^Ungefähre Anreisedauer ab München Hauptbahnhof \(Orientierungswert\): (.+)$/, "Duración aproximada desde la estación central de Múnich (orientativa): $1"],
      [/^(.+) – Gipfel$/, "$1 – Cumbre"],
      [/^3-Tage-Wetter · (.+)$/, "Pronóstico de 3 días · $1"],
      [/^Wetter für (.+) wird geladen …$/, "Cargando el tiempo en $1 …"],
      [/^Maximaltemperatur: (.+) °C; Minimaltemperatur: (.+) °C$/, "Temperatura máxima: $1 °C; mínima: $2 °C"],
      [/^Max (.+) °C · Min (.+) °C$/, "Máx. $1 °C · Mín. $2 °C"]
    ]
  };

  const originalText = new WeakMap();
  const renderedText = new WeakMap();
  const originalAttributes = new WeakMap();
  const renderedAttributes = new WeakMap();
  let languageSelect = document.getElementById("site-language");

  if (!languageSelect) {
    const header = document.querySelector(".site-header") || document.createElement("header");
    if (!header.classList.contains("site-header")) {
      header.className = "language-site-header";
      document.body.prepend(header);
    }
    const picker = document.createElement("div");
    picker.className = "language-picker";
    picker.innerHTML = '<span aria-hidden="true">🌐</span><span class="visually-hidden">Sprache wählen</span><span class="language-flag" data-language-flag aria-hidden="true"></span><button class="language-picker-trigger" type="button" aria-label="Sprache wählen" aria-haspopup="listbox" aria-expanded="false"></button><div class="language-picker-options" role="listbox" aria-label="Sprache wählen" hidden></div><select id="site-language" name="language" aria-label="Sprache wählen" hidden><option value="de">Deutsch</option><option value="en">English</option><option value="es">Español</option></select>';
    header.append(picker);
    languageSelect = picker.querySelector("select");
  }

  const languagePicker = languageSelect.closest(".language-picker");
  let languageFlag = languagePicker.querySelector("[data-language-flag]");
  if (!languageFlag) {
    languageFlag = document.createElement("span");
    languageFlag.className = "language-flag";
    languageFlag.dataset.languageFlag = "";
    languageFlag.setAttribute("aria-hidden", "true");
    languageSelect.before(languageFlag);
  }

  let languageTrigger = languagePicker.querySelector(".language-picker-trigger");
  if (!languageTrigger) {
    languageTrigger = document.createElement("button");
    languageTrigger.className = "language-picker-trigger";
    languageTrigger.type = "button";
    languageTrigger.setAttribute("aria-label", "Sprache wählen");
    languageTrigger.setAttribute("aria-haspopup", "listbox");
    languageTrigger.setAttribute("aria-expanded", "false");
    languageSelect.before(languageTrigger);
  }

  let languageOptions = languagePicker.querySelector(".language-picker-options");
  if (!languageOptions) {
    languageOptions = document.createElement("div");
    languageOptions.className = "language-picker-options";
    languageOptions.setAttribute("role", "listbox");
    languageOptions.setAttribute("aria-label", "Sprache wählen");
    languageOptions.hidden = true;
    languageSelect.before(languageOptions);
  }

  Object.entries(languageNames).forEach(([language, name]) => {
    const option = document.createElement("button");
    option.className = "language-picker-option";
    option.type = "button";
    option.setAttribute("role", "option");
    option.dataset.languageOption = language;
    option.setAttribute("aria-selected", "false");
    option.innerHTML = `<span class="language-flag" aria-hidden="true">${flagMarkup[language]}</span><span>${name}</span>`;
    option.addEventListener("click", () => {
      setLanguage(language, true);
      closeLanguageOptions(true);
    });
    languageOptions.append(option);
  });

  function closeLanguageOptions(returnFocus) {
    languageOptions.hidden = true;
    languageTrigger.setAttribute("aria-expanded", "false");
    if (returnFocus) languageTrigger.focus();
  }

  function openLanguageOptions(focusSelected) {
    languageOptions.hidden = false;
    languageTrigger.setAttribute("aria-expanded", "true");
    if (focusSelected) {
      languageOptions.querySelector(`[data-language-option="${selectedLanguage}"]`).focus();
    }
  }

  languageTrigger.addEventListener("click", () => {
    if (languageOptions.hidden) {
      openLanguageOptions(false);
    } else {
      closeLanguageOptions(false);
    }
  });
  languageTrigger.addEventListener("keydown", event => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLanguageOptions(true);
    }
  });
  languageOptions.addEventListener("keydown", event => {
    const options = Array.from(languageOptions.querySelectorAll("[data-language-option]"));
    const currentIndex = options.indexOf(document.activeElement);
    let nextIndex;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % options.length;
    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + options.length) % options.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = options.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      options[nextIndex].focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeLanguageOptions(true);
    }
  });
  document.addEventListener("click", event => {
    if (!languagePicker.contains(event.target) && !languageOptions.hidden) {
      closeLanguageOptions(false);
    }
  });

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

  function translateValue(value, language) {
    if (language === "de") return value;
    const exactTranslation = translations[value]?.[language];
    if (exactTranslation !== undefined) return exactTranslation;
    const sitePageTitle = /^(.+) – Bahnberge\.de$/.exec(value);
    if (sitePageTitle) {
      const translatedPageName = translateValue(sitePageTitle[1], language);
      if (translatedPageName !== sitePageTitle[1]) {
        return `${translatedPageName} – Bahnberge.de`;
      }
    }
    for (const [pattern, replacement] of dynamicTranslations[language] || []) {
      if (pattern.test(value)) return value.replace(pattern, replacement);
    }
    return value;
  }

  function translateTextNode(node) {
    if (node.parentElement?.closest(".language-picker")) return;
    if (!originalText.has(node)) {
      originalText.set(node, node.data);
    } else if (renderedText.has(node) && node.data !== renderedText.get(node)) {
      originalText.set(node, node.data);
    }

    const source = originalText.get(node);
    const text = source.trim();
    if (!text || node.parentElement?.closest("script, style, noscript, template")) return;
    if (node.parentElement?.tagName === "OPTION" && node.parentElement.parentElement?.id !== "site-language") return;

    const leadingWhitespace = source.match(/^\s*/u)[0];
    const trailingWhitespace = source.match(/\s*$/u)[0];
    const translated = `${leadingWhitespace}${translateValue(text, selectedLanguage)}${trailingWhitespace}`;
    renderedText.set(node, translated);
    if (node.data !== translated) node.data = translated;
  }

  function translateAttribute(element, name) {
    if (element.closest(".language-picker")) return;
    if (!originalAttributes.has(element)) originalAttributes.set(element, new Map());
    if (!renderedAttributes.has(element)) renderedAttributes.set(element, new Map());

    const sourceByName = originalAttributes.get(element);
    const renderedByName = renderedAttributes.get(element);
    const current = element.getAttribute(name);
    if (!sourceByName.has(name) || (renderedByName.has(name) && current !== renderedByName.get(name))) {
      sourceByName.set(name, current);
    }

    const translated = translateValue(sourceByName.get(name), selectedLanguage);
    renderedByName.set(name, translated);
    if (current !== translated) element.setAttribute(name, translated);
  }

  function translateElementAttributes(element) {
    ["aria-label", "alt", "placeholder", "title"].forEach(name => {
      if (element.hasAttribute(name)) translateAttribute(element, name);
    });
  }

  function translateSubtree(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) translateElementAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        translateTextNode(node);
      } else {
        translateElementAttributes(node);
      }
    }
  }

  function setLanguage(language, persist) {
    if (!supportedLanguages.has(language)) {
      throw new RangeError(`Nicht unterstützte Sprache: ${language}`);
    }
    selectedLanguage = language;
    document.documentElement.lang = language;
    languageSelect.value = language;
    languageFlag.innerHTML = flagMarkup[language];
    languageTrigger.innerHTML = `<span>${languageNames[language]}</span><span class="language-picker-chevron" aria-hidden="true">⌄</span>`;
    languageOptions.querySelectorAll("[data-language-option]").forEach(option => {
      option.setAttribute("aria-selected", String(option.dataset.languageOption === language));
    });
    translateSubtree(document.documentElement);
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

  const translationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(translateSubtree);
      } else if (mutation.type === "characterData") {
        translateTextNode(mutation.target);
      } else if (mutation.type === "attributes") {
        translateAttribute(mutation.target, mutation.attributeName);
      }
    });
  });
  translationObserver.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-label", "alt", "placeholder", "title"]
  });
})();
