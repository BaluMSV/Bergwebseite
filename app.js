(() => {
  "use strict";

  // Kartendaten liegen getrennt in data/, damit Einträge leichter gepflegt werden können.
  const { points, summits, lines, hikes, mountainRegions, summitRegionAssignments } = window.BahnbergeData;

  const intermediateStops = [];
  const seenStopCoordinates = new Set();
  lines.forEach(line => {
    line.coordinates.slice(1, -1).forEach(coordinates => {
      const isStation = points.some(point =>
        Math.abs(point.coordinates[0] - coordinates[0]) < 0.002 &&
        Math.abs(point.coordinates[1] - coordinates[1]) < 0.002
      );
      const coordinateKey = `${coordinates[0].toFixed(3)},${coordinates[1].toFixed(3)}`;
      if (isStation || seenStopCoordinates.has(coordinateKey)) return;
      seenStopCoordinates.add(coordinateKey);
      intermediateStops.push({
        name: `Unterwegshalt ${String(intermediateStops.length + 1).padStart(2, "0")}`,
        coordinates,
        line: line.name
      });
    });
  });

  // Hauptkartenbereich: Lindenberg, Flughafen München und Erweiterungen südlich von Innsbruck und östlich von Salzburg.
  const regionBounds = L.latLngBounds(
    [47.13, 9.88],
    [48.3538, 13.26]
  );
  const regionView = document.body.dataset.mapMode === "region";
  const focusedRegion = regionView
    ? mountainRegions.find(region => region.page === document.body.dataset.regionPage)
    : null;
  if (regionView && !focusedRegion) {
    throw new Error("Für diese Gebirgsseite ist keine Kartenregion konfiguriert.");
  }

  const map = L.map("map", {
    zoomControl: false,
    ...(regionView
      ? {
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          tap: false
        }
      : {
          minZoom: 3,
          maxZoom: 18,
          zoomSnap: 0,
          zoomDelta: 1,
          maxBounds: regionBounds,
          maxBoundsViscosity: 1
        })
  }).setView(regionView ? L.latLngBounds(focusedRegion.coordinates).getCenter() : [47.9, 11.35], 8);

  [
    ["regionPane", 300],
    ["summitPane", 400],
    ["hikePane", 410],
    ["railwayPane", 420],
    ["stationPane", 650]
  ].forEach(([name, zIndex]) => {
    map.createPane(name);
    map.getPane(name).style.zIndex = String(zIndex);
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>-Mitwirkende'
  }).addTo(map);
  map.createPane("weatherPane");
  map.getPane("weatherPane").style.zIndex = "350";
  map.getPane("weatherPane").style.pointerEvents = "none";
  if (!regionView) {
    L.control.zoom({ position: "bottomright" }).addTo(map);
  }

  const arrivalDuration = document.getElementById("arrival-duration");
  const durationValue = document.getElementById("duration-value");
  const departureStation = document.getElementById("departure-station");
  const maximumTransfers = document.getElementById("maximum-transfers");
  const maximumTransfersValue = document.getElementById("maximum-transfers-value");
  const tourSearchForm = document.getElementById("tour-search-form");
  const tourSearchInput = document.getElementById("tour-search");
  const tourSearchFeedback = document.getElementById("tour-search-feedback");
  if (tourSearchForm && tourSearchInput && tourSearchFeedback) {
    let feedbackTimeout;
    const normalizeSearchText = text => text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("de")
      .trim();

    tourSearchForm.addEventListener("submit", event => {
      event.preventDefault();
      window.clearTimeout(feedbackTimeout);
      tourSearchFeedback.hidden = true;

      const query = normalizeSearchText(tourSearchInput.value);
      if (!query) {
        tourSearchInput.focus();
        return;
      }

      const match = summits.find(summit =>
        normalizeSearchText(summit.name).includes(query)
      );
      if (match) {
        window.location.href = match.page;
        return;
      }

      tourSearchFeedback.hidden = false;
      feedbackTimeout = window.setTimeout(() => {
        tourSearchFeedback.hidden = true;
      }, 5000);
    });
  }

  if (departureStation) {
    const preferenceKey = "departure-station";
    const availableStations = new Set(
      Array.from(departureStation.options, option => option.value)
    );
    mountainRegions.forEach(region => {
      availableStations.forEach(station => {
        if (!Number.isFinite(region.travelTimes?.[station])) {
          throw new Error(`Für „${region.name}“ fehlt eine gültige Anreisedauer ab ${station}.`);
        }
        if (!Number.isInteger(region.transferCounts?.[station]) || region.transferCounts[station] < 0) {
          throw new Error(`Für „${region.name}“ fehlt eine gültige Umstiegszahl ab ${station}.`);
        }
      });
    });
    lines.forEach(line => {
      const segmentCount = line.coordinates.length - 1;
      if (
        !Array.isArray(line.segmentTravelTimes) ||
        line.segmentTravelTimes.length !== segmentCount ||
        line.segmentTravelTimes.some(minutes => !Number.isFinite(minutes) || minutes <= 0)
      ) {
        throw new Error(`Für „${line.name}“ muss für jeden Linienabschnitt eine gültige Fahrzeit hinterlegt sein.`);
      }
      availableStations.forEach(station => {
        if (!Number.isFinite(line.travelTimes?.[station]) || line.travelTimes[station] < 0) {
          throw new Error(`Für „${line.name}“ fehlt eine gültige Anreisedauer ab ${station}.`);
        }
        if (!Number.isInteger(line.transferCounts?.[station]) || line.transferCounts[station] < 0) {
          throw new Error(`Für „${line.name}“ fehlt eine gültige Umstiegszahl ab ${station}.`);
        }
      });
    });
    const assignedSummits = new Set(Object.keys(summitRegionAssignments || {}));
    summits.forEach(summit => {
      if (summit.busRequired !== undefined && typeof summit.busRequired !== "boolean") {
        throw new Error(`Für den Gipfel „${summit.name}“ muss „busRequired“ true oder false sein.`);
      }
      const regionName = summitRegionAssignments?.[summit.page];
      if (!regionName || !mountainRegions.some(region => region.name === regionName)) {
        throw new Error(`Für den Gipfel „${summit.name}“ fehlt eine gültige Gebirgsregion.`);
      }
      assignedSummits.delete(summit.page);
    });
    if (assignedSummits.size > 0) {
      throw new Error(`Unbekannte Gipfelzuordnungen: ${Array.from(assignedSummits).join(", ")}.`);
    }

    try {
      const savedStation = window.localStorage.getItem(preferenceKey);
      if (savedStation && availableStations.has(savedStation)) {
        departureStation.value = savedStation;
      }
    } catch (error) {
      console.error("Der gespeicherte Abfahrtsbahnhof konnte nicht gelesen werden.", error);
    }

    departureStation.addEventListener("change", () => {
      try {
        window.localStorage.setItem(preferenceKey, departureStation.value);
      } catch (error) {
        console.error("Der Abfahrtsbahnhof konnte nicht gespeichert werden.", error);
      }
      updateTravelHighlights();
    });
  }

  if (maximumTransfers && maximumTransfersValue) {
    const preferenceKey = "maximum-transfers";
    const minimum = Number(maximumTransfers.min);
    const maximum = Number(maximumTransfers.max);
    try {
      const storedTransfers = window.localStorage.getItem(preferenceKey);
      const savedTransfers = storedTransfers === null ? NaN : Number(storedTransfers);
      if (
        Number.isInteger(savedTransfers) &&
        savedTransfers >= minimum &&
        savedTransfers <= maximum
      ) {
        maximumTransfers.value = String(savedTransfers);
      }
    } catch (error) {
      console.error("Die gespeicherte maximale Umstiegszahl konnte nicht gelesen werden.", error);
    }

    maximumTransfersValue.textContent = maximumTransfers.value;
    maximumTransfers.addEventListener("input", () => {
      maximumTransfersValue.textContent = maximumTransfers.value;
      try {
        window.localStorage.setItem(preferenceKey, maximumTransfers.value);
      } catch (error) {
        console.error("Die maximale Umstiegszahl konnte nicht gespeichert werden.", error);
      }
      updateTravelHighlights();
    });
  }

  if (arrivalDuration && durationValue) {
    const preferenceKey = "arrival-duration";
    const minimum = Number(arrivalDuration.min);
    const maximum = Number(arrivalDuration.max);
    const step = Number(arrivalDuration.step);
    try {
      const storedDuration = window.localStorage.getItem(preferenceKey);
      const savedDuration = storedDuration === null ? NaN : Number(storedDuration);
      if (
        Number.isFinite(savedDuration) &&
        savedDuration >= minimum &&
        savedDuration <= maximum &&
        (savedDuration - minimum) % step === 0
      ) {
        arrivalDuration.value = String(savedDuration);
      }
    } catch (error) {
      console.error("Die gespeicherte Anreisedauer konnte nicht gelesen werden.", error);
    }

    function updateDurationLabel() {
      const minutes = Number(arrivalDuration.value);
      durationValue.textContent = minutes === 220
        ? "3 Std. 40 min"
        : `${minutes} min`;
    }

    updateDurationLabel();
    arrivalDuration.addEventListener("input", () => {
      updateDurationLabel();
      try {
        window.localStorage.setItem(preferenceKey, arrivalDuration.value);
      } catch (error) {
        console.error("Die Anreisedauer konnte nicht gespeichert werden.", error);
      }
      updateTravelHighlights();
    });
  }

  function keepRegionVisible() {
    const minimumZoom = map.getBoundsZoom(regionBounds, true);
    map.setMinZoom(minimumZoom);
    if (map.getZoom() < minimumZoom) {
      map.setView(regionBounds.getCenter(), minimumZoom, { animate: false });
    } else {
      map.panInsideBounds(regionBounds, { animate: false });
    }
  }

  // Die Kartengröße kann sich auch ohne Fenster-Resize ändern (Layout, Schriften, Browserleisten).
  function refreshMapSize() {
    map.invalidateSize({ animate: false });
    keepRegionVisible();
  }

  if (regionView) {
    map.fitBounds(L.latLngBounds(focusedRegion.coordinates).pad(0.12), { animate: false });
  } else {
    map.fitBounds(regionBounds, { animate: false });
    keepRegionVisible();
    map.on("resize", keepRegionVisible);
    window.addEventListener("load", refreshMapSize);
    window.addEventListener("orientationchange", refreshMapSize);
    if ("ResizeObserver" in window) {
      new ResizeObserver(refreshMapSize).observe(map.getContainer());
    }
  }

  const lineLayer = L.layerGroup().addTo(map);
  const railwayFeatures = [];
  const pointLayer = L.layerGroup().addTo(map);

  function addLineLinkBehavior(feature, line) {
    feature.on("click", () => {
      window.location.href = line.page;
    });
    feature.on("add", () => {
      const path = feature.getElement();
      if (!path) return;
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "link");
      path.setAttribute("aria-label", `${line.name} – Seite öffnen`);
      path.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = line.page;
        }
      });
    });
  }

  const linesForRendering = [...lines];
  [
    ["lenggries.html", "tegernsee.html"],
    ["fuessen.html", "oberstdorf.html"],
    ["kufstein.html", "berchtesgaden.html"]
  ].forEach(([lowerPage, upperPage]) => {
    const lowerIndex = linesForRendering.findIndex(line => line.page === lowerPage);
    if (lowerIndex < 0 || !linesForRendering.some(line => line.page === upperPage)) {
      throw new Error(`Die Kartenreihenfolge für „${lowerPage}“ und „${upperPage}“ konnte nicht gesetzt werden.`);
    }
    const [lowerLine] = linesForRendering.splice(lowerIndex, 1);
    const upperIndex = linesForRendering.findIndex(line => line.page === upperPage);
    linesForRendering.splice(upperIndex, 0, lowerLine);
  });

  linesForRendering.forEach(line => {
    const hitArea = L.polyline(line.coordinates, {
      pane: "railwayPane",
      color: line.color,
      weight: 22,
      opacity: 0.01,
      lineCap: "round",
      lineJoin: "round",
      bubblingMouseEvents: false
    });
    addLineLinkBehavior(hitArea, line);
    hitArea.addTo(lineLayer);

    let elapsedMinutes = 0;
    const segmentDuration = line.segmentTravelTimes.reduce((total, minutes) => total + minutes, 0);
    const segments = line.segmentTravelTimes.map((minutes, index) => {
      elapsedMinutes += minutes;
      const feature = L.polyline([line.coordinates[index], line.coordinates[index + 1]], {
        pane: "railwayPane",
        color: line.color,
        weight: 6,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round",
        bubblingMouseEvents: false,
        interactive: false
      }).addTo(lineLayer);
      return { feature, elapsedMinutes: elapsedMinutes - minutes, duration: minutes };
    });
    railwayFeatures.push({ line, segments, segmentDuration });
  });

  const hikeLayer = L.layerGroup().addTo(map);

  hikes.forEach(hike => {
    const hitArea = L.polyline(hike.coordinates, {
      pane: "hikePane",
      color: "#151714",
      weight: 20,
      opacity: 0.01,
      lineCap: "round",
      lineJoin: "round",
      bubblingMouseEvents: false
    });
    const route = L.polyline(hike.coordinates, {
      pane: "hikePane",
      color: "#c89a35",
      weight: 4,
      opacity: 0.95,
      dashArray: "2 8",
      lineCap: "round",
      lineJoin: "round",
      interactive: false
    }).addTo(hikeLayer);
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const details = document.createElement("span");
    const popup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: "hike-popup"
    });
    let closeTimer;

    link.className = "hike-popup-card";
    link.href = hike.page;
    link.setAttribute("aria-label", `${hike.name} – Details ansehen`);
    title.className = "hike-popup-name";
    title.textContent = hike.name;
    description.className = "hike-popup-description";
    description.textContent = hike.description;
    details.className = "hike-popup-details";
    details.textContent = "Wanderung ansehen →";
    link.append(title, description, details);
    popup.setContent(link);
    hitArea.bindPopup(popup);
    hitArea.on("mouseover", () => {
      window.clearTimeout(closeTimer);
      hitArea.openPopup();
    });
    hitArea.on("mouseout", () => {
      closeTimer = window.setTimeout(() => {
        if (!popup.getElement()?.matches(":hover")) hitArea.closePopup();
      }, 140);
    });
    hitArea.on("popupopen", event => {
      const popupElement = event.popup.getElement();
      popupElement?.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
      popupElement?.addEventListener("mouseleave", () => hitArea.closePopup());
    });
    hitArea.on("click", () => hitArea.openPopup());
    hitArea.on("add", () => {
      const path = hitArea.getElement();
      if (!path) return;
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "link");
      path.setAttribute("aria-label", `${hike.name} – Popup öffnen`);
      path.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          hitArea.openPopup();
        }
      });
    });
    hitArea.addTo(hikeLayer);
    route.bringToFront();
  });

  const mountainLayer = L.layerGroup().addTo(map);
  const weatherForecasts = new Map();

  function getWeatherIcon(symbolCode) {
    if (/(?:clearsky|fair)_(?:day|night|polartwilight)|sun/.test(symbolCode)) {
      return {
        description: "Sonnig",
        markup: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="6" fill="#e9a92b"/><g stroke="#e9a92b" stroke-width="2" stroke-linecap="round"><path d="M16 2v4M16 26v4M2 16h4m20 0h4M6.1 6.1 9 9m14 14 2.9 2.9m0-19.8L23 9M9 23l-2.9 2.9"/></g></svg>'
      };
    }

    if (/(?:rain|sleet|snow|showers|thunder|hail)/.test(symbolCode)) {
      return {
        description: "Regen oder Niederschlag",
        markup: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 19h16a5 5 0 0 0 .4-10A8 8 0 0 0 7 11a4 4 0 0 0 1 8Z" fill="#c7d4d2" stroke="#617b78" stroke-width="1.7" stroke-linejoin="round"/><g stroke="#3684a0" stroke-width="2" stroke-linecap="round"><path d="m11 22-2 4m8-4-2 4m8-4-2 4"/></g></svg>'
      };
    }

    if (/(?:partlycloudy|cloudy|overcast|fog|fair)/.test(symbolCode)) {
      return {
        description: "Bewölkt",
        markup: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 24h15a6 6 0 0 0 .4-12A9 9 0 0 0 7 15a4.5 4.5 0 0 0 2 9Z" fill="#c7d4d2" stroke="#617b78" stroke-width="1.7" stroke-linejoin="round"/></svg>'
      };
    }

    return {
      description: "Bewölkt",
      markup: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 24h15a6 6 0 0 0 .4-12A9 9 0 0 0 7 15a4.5 4.5 0 0 0 2 9Z" fill="#c7d4d2" stroke="#617b78" stroke-width="1.7" stroke-linejoin="round"/></svg>'
    };
  }

  function getBerlinDateKey(date) {
    const parts = new Intl.DateTimeFormat("en", {
      timeZone: "Europe/Berlin",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(date);
    return `${parts.find(part => part.type === "year").value}-${parts.find(part => part.type === "month").value}-${parts.find(part => part.type === "day").value}`;
  }

  function getSolarElevation(date, latitude, longitude) {
    const radians = Math.PI / 180;
    const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1);
    const dayOfYear = Math.floor((Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    ) - yearStart) / 86400000) + 1;
    const hour = date.getUTCHours() + date.getUTCMinutes() / 60;
    const yearAngle = 2 * Math.PI / 365 * (dayOfYear - 1 + (hour - 12) / 24);
    const equationOfTime = 229.18 * (
      0.000075 +
      0.001868 * Math.cos(yearAngle) -
      0.032077 * Math.sin(yearAngle) -
      0.014615 * Math.cos(2 * yearAngle) -
      0.040849 * Math.sin(2 * yearAngle)
    );
    const solarDeclination =
      0.006918 -
      0.399912 * Math.cos(yearAngle) +
      0.070257 * Math.sin(yearAngle) -
      0.006758 * Math.cos(2 * yearAngle) +
      0.000907 * Math.sin(2 * yearAngle) -
      0.002697 * Math.cos(3 * yearAngle) +
      0.00148 * Math.sin(3 * yearAngle);
    const solarMinutes = date.getUTCHours() * 60 + date.getUTCMinutes() +
      equationOfTime + 4 * longitude;
    const hourAngle = (solarMinutes / 4 - 180) * radians;
    const latitudeRadians = latitude * radians;
    return Math.asin(
      Math.sin(latitudeRadians) * Math.sin(solarDeclination) +
      Math.cos(latitudeRadians) * Math.cos(solarDeclination) * Math.cos(hourAngle)
    ) / radians;
  }

  function getWeatherForecast(location) {
    const cacheKey = `${location.latitude},${location.longitude}`;
    let cachedForecast = weatherForecasts.get(cacheKey);
    if (cachedForecast && cachedForecast.expiresAt <= Date.now()) {
      weatherForecasts.delete(cacheKey);
      cachedForecast = undefined;
    }

    if (!cachedForecast) {
      const parameters = new URLSearchParams({
        lat: String(location.latitude),
        lon: String(location.longitude)
      });
      const forecast = fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?${parameters}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`MET Norway antwortete mit HTTP ${response.status}.`);
          }
          const expiresAt = Date.parse(response.headers.get("expires") || "");
          return response.json().then(data => ({ data, expiresAt }));
        })
        .then(({ data, expiresAt }) => {
          const timeseries = data.properties?.timeseries;
          if (!Array.isArray(timeseries) || timeseries.length === 0) {
            throw new Error("MET Norway lieferte keine Wettervorhersage.");
          }

          const today = getBerlinDateKey(new Date());
          const samples = timeseries
            .map((entry, index) => {
              const details = entry.data?.instant?.details;
              const symbolCode = entry.data?.next_1_hours?.summary?.symbol_code ||
                entry.data?.next_6_hours?.summary?.symbol_code ||
                entry.data?.next_12_hours?.summary?.symbol_code;
              return {
                time: new Date(entry.time),
                temperature: details?.air_temperature,
                cloudCover: details?.cloud_area_fraction,
                windSpeed: details?.wind_speed,
                symbolCode,
                precipitation: entry.data?.next_1_hours?.details?.precipitation_amount,
                nextTime: timeseries[index + 1] ? new Date(timeseries[index + 1].time) : null
              };
            })
            .filter(sample => Number.isFinite(sample.time.getTime()));
          const availableDateKeys = [...new Set(
            samples
              .map(sample => getBerlinDateKey(sample.time))
          )].sort();
          const upcomingDateKeys = availableDateKeys
            .filter(date => date > today)
            .slice(0, 3);
          if (upcomingDateKeys.length < 3) {
            throw new Error("MET Norway lieferte nicht drei kommende Tage.");
          }

          const berlinHourFormatter = new Intl.DateTimeFormat("en", {
            timeZone: "Europe/Berlin",
            hour: "numeric",
            hourCycle: "h23"
          });

          function summarizeDay(date) {
            const daySamples = samples.filter(sample => getBerlinDateKey(sample.time) === date);
            if (daySamples.length === 0 || daySamples.some(sample =>
              !Number.isFinite(sample.temperature) ||
              !Number.isFinite(sample.cloudCover) ||
              !sample.symbolCode
            )) {
              throw new Error(`MET Norway lieferte unvollständige Wetterdaten für ${date}.`);
            }

            const weatherCounts = new Map();
            let estimatedSunshineHours = 0;
            daySamples.forEach(sample => {
              const icon = getWeatherIcon(sample.symbolCode);
              weatherCounts.set(icon.description, (weatherCounts.get(icon.description) || 0) + 1);
              const intervalHours = sample.nextTime
                ? Math.min(6, Math.max(0, (sample.nextTime - sample.time) / 3600000))
                : 1;
              const intervalCount = Math.max(1, Math.ceil(intervalHours));
              for (let interval = 0; interval < intervalCount; interval += 1) {
                const start = sample.time.getTime() + interval * 3600000;
                const end = Math.min(
                  sample.time.getTime() + (interval + 1) * 3600000,
                  sample.nextTime?.getTime() || sample.time.getTime() + 3600000
                );
                const midpoint = new Date((start + end) / 2);
                if (end > start &&
                    getBerlinDateKey(midpoint) === date &&
                    getSolarElevation(midpoint, location.latitude, location.longitude) > 0) {
                  estimatedSunshineHours += (end - start) / 3600000 *
                    Math.max(0, 1 - sample.cloudCover / 100);
                }
              }
            });
            const condition = [...weatherCounts.entries()]
              .sort((first, second) => second[1] - first[1])[0][0];

            const daytimeSamples = daySamples.filter(sample => {
              const hour = Number(berlinHourFormatter.format(sample.time));
              return hour >= 7 && hour <= 19;
            });
            const scoreSamples = daytimeSamples.length > 0 ? daytimeSamples : daySamples;
            let weightedScore = 0;
            let totalWeight = 0;
            scoreSamples.forEach(sample => {
              const intervalHours = sample.nextTime
                ? Math.min(6, Math.max(1, (sample.nextTime - sample.time) / 3600000))
                : 1;
              const symbol = sample.symbolCode.toLowerCase();
              let score = 100 - sample.cloudCover * 0.4;
              if (/(?:thunder|hail)/.test(symbol)) {
                score -= 75;
              } else if (/(?:rain|showers|sleet|snow)/.test(symbol)) {
                score -= 45;
              }
              if (Number.isFinite(sample.precipitation)) {
                score -= Math.min(35, sample.precipitation * 18);
              }
              if (Number.isFinite(sample.windSpeed)) {
                score -= Math.max(0, sample.windSpeed - 7) * 5;
              }
              weightedScore += Math.max(0, Math.min(100, score)) * intervalHours;
              totalWeight += intervalHours;
            });

            return {
              date,
              condition,
              maximum: Math.max(...daySamples.map(sample => sample.temperature)),
              minimum: Math.min(...daySamples.map(sample => sample.temperature)),
              estimatedSunshineHours,
              suitability: Math.round(weightedScore / totalWeight)
            };
          }

          return {
            days: upcomingDateKeys.map(summarizeDay),
            mapDays: availableDateKeys
              .filter(date => date >= today)
              .slice(0, 4)
              .map(summarizeDay),
            expiresAt: Number.isFinite(expiresAt) && expiresAt > Date.now()
              ? expiresAt
              : Date.now() + 3600000
          };
        });
      cachedForecast = { promise: forecast, expiresAt: Infinity };
      weatherForecasts.set(cacheKey, cachedForecast);
      forecast.then(result => {
        const currentForecast = weatherForecasts.get(cacheKey);
        if (currentForecast?.promise === forecast) {
          currentForecast.expiresAt = result.expiresAt;
        }
      }).catch(() => weatherForecasts.delete(cacheKey));
    }

    return cachedForecast.promise;
  }

  function loadWeatherForecast(weatherContainer, location) {
    const forecast = getWeatherForecast(location);
    weatherContainer.replaceChildren();
    const status = document.createElement("span");
    status.className = "mountain-weather-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.textContent = `Wetter für ${location.name} wird geladen …`;
    weatherContainer.append(status);

    forecast
      .then(({ days }) => {
        const heading = document.createElement("span");
        heading.className = "mountain-weather-heading";
        heading.textContent = `3-Tage-Wetter · ${location.name}`;
        const cards = days.map(day => {
          const icon = getWeatherIcon({
            Sonnig: "clearsky_day",
            Bewölkt: "cloudy",
            "Regen oder Niederschlag": "rain"
          }[day.condition]);
          const card = document.createElement("div");
          const date = document.createElement("strong");
          const condition = document.createElement("span");
          const temperature = document.createElement("span");
          const sunshine = document.createElement("span");
          const dateValue = new Date(`${day.date}T12:00:00`);

          card.className = "mountain-weather-day";
          card.setAttribute("role", "group");
          card.setAttribute("aria-label", `${new Intl.DateTimeFormat("de-DE", {
            timeZone: "Europe/Berlin",
            weekday: "long",
            day: "numeric",
            month: "long"
          }).format(dateValue)}: ${icon.description}`);
          date.className = "mountain-weather-date";
          date.textContent = new Intl.DateTimeFormat("de-DE", {
            timeZone: "Europe/Berlin",
            weekday: "short",
            day: "2-digit",
            month: "2-digit"
          }).format(dateValue);
          condition.className = "mountain-weather-icon";
          condition.setAttribute("aria-label", icon.description);
          condition.innerHTML = icon.markup;
          temperature.className = "mountain-weather-temperature";
          temperature.textContent = `Max ${Math.round(day.maximum)} °C · Min ${Math.round(day.minimum)} °C`;
          temperature.title = `Maximaltemperatur: ${Math.round(day.maximum)} °C; Minimaltemperatur: ${Math.round(day.minimum)} °C`;
          sunshine.className = "mountain-weather-sunshine";
          sunshine.textContent = `ca. ${new Intl.NumberFormat("de-DE", {
            maximumFractionDigits: 1
          }).format(day.estimatedSunshineHours)} Std. Sonne*`;
          card.append(date, condition, temperature, sunshine);
          return card;
        });
        const attribution = document.createElement("span");
        const provider = document.createElement("a");
        const license = document.createElement("a");
        attribution.className = "mountain-weather-attribution";
        provider.href = "https://api.met.no/weatherapi/locationforecast/2.0/documentation";
        provider.target = "_blank";
        provider.rel = "noopener noreferrer";
        provider.textContent = "MET Norway";
        license.href = "https://api.met.no/doc/License";
        license.target = "_blank";
        license.rel = "noopener noreferrer";
        license.textContent = "NLOD 2.0 / CC BY 4.0";
        const estimateNote = document.createElement("span");
        estimateNote.className = "mountain-weather-note";
        estimateNote.textContent = "* Sonnenschätzung aus der Bewölkung.";
        attribution.append("Wetterdaten: ", provider, " · ", license);
        weatherContainer.replaceChildren(heading, ...cards, estimateNote, attribution);
      })
      .catch(error => {
        console.error(`Wettervorhersage von MET Norway für ${location.name} konnte nicht geladen werden.`, error);
        status.textContent = "Wetterdaten derzeit nicht verfügbar.";
      });
  }

  if (!regionView) {
    const weatherLayer = L.layerGroup();
    const weatherControl = L.control({ position: "topleft" });
    let weatherEnabled = false;
    let weatherRequestId = 0;

    weatherControl.onAdd = () => {
      const container = L.DomUtil.create("div", "weather-map-control");
      const toggle = document.createElement("button");
      const panel = document.createElement("div");
      const dateLabel = document.createElement("label");
      const dateSelect = document.createElement("select");
      const legend = document.createElement("div");
      const legendTitle = document.createElement("span");
      const legendScale = document.createElement("div");
      const legendLabels = document.createElement("div");
      const status = document.createElement("span");
      const note = document.createElement("span");
      const attribution = document.createElement("span");
      const provider = document.createElement("a");
      const license = document.createElement("a");

      toggle.className = "weather-map-toggle";
      toggle.type = "button";
      toggle.textContent = "Wanderwetter";
      toggle.setAttribute("aria-pressed", "false");
      panel.className = "weather-map-panel";
      panel.hidden = true;
      dateLabel.className = "weather-map-date-label";
      dateLabel.htmlFor = "weather-map-date";
      dateLabel.textContent = "Prognosetag";
      dateSelect.className = "weather-map-date";
      dateSelect.id = "weather-map-date";
      dateLabel.append(dateSelect);
      legend.className = "weather-map-legend";
      legendTitle.className = "weather-map-legend-title";
      legendTitle.textContent = "Wetter-Eignung am Tag";
      legendScale.className = "weather-map-legend-scale";
      legendLabels.className = "weather-map-legend-labels";
      legendLabels.append(
        Object.assign(document.createElement("span"), { textContent: "ungünstig" }),
        Object.assign(document.createElement("span"), { textContent: "günstig" })
      );
      legend.append(legendTitle, legendScale, legendLabels);
      status.className = "weather-map-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      note.className = "weather-map-note";
      note.textContent = "Modellprognose aus Bewölkung, Niederschlag und Wind; kein Live-Radar.";
      attribution.className = "weather-map-attribution";
      provider.href = "https://api.met.no/weatherapi/locationforecast/2.0/documentation";
      provider.target = "_blank";
      provider.rel = "noopener noreferrer";
      provider.textContent = "MET Norway";
      license.href = "https://api.met.no/doc/License";
      license.target = "_blank";
      license.rel = "noopener noreferrer";
      license.textContent = "NLOD 2.0 / CC BY 4.0";
      attribution.append("Prognose: ", provider, " · ", license);
      panel.append(dateLabel, legend, status, note, attribution);
      container.append(toggle, panel);

      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.disableScrollPropagation(container);

      function getWeatherColor(score) {
        const stops = [
          { score: 0, color: [194, 55, 49] },
          { score: 50, color: [242, 193, 67] },
          { score: 100, color: [48, 139, 78] }
        ];
        const lower = score <= 50 ? stops[0] : stops[1];
        const upper = score <= 50 ? stops[1] : stops[2];
        const ratio = (score - lower.score) / (upper.score - lower.score);
        const channels = lower.color.map((channel, index) =>
          Math.round(channel + (upper.color[index] - channel) * ratio)
        );
        return `rgb(${channels.join(", ")})`;
      }

      function displayDate(date) {
        return new Intl.DateTimeFormat("de-DE", {
          timeZone: "Europe/Berlin",
          weekday: "short",
          day: "2-digit",
          month: "2-digit"
        }).format(new Date(`${date}T12:00:00`));
      }

      async function updateWeatherOverlay() {
        const requestId = ++weatherRequestId;
        status.textContent = "Wettervorhersage wird geladen …";
        try {
          const forecasts = await Promise.all(mountainRegions.map(async region => {
            if (
              !Number.isFinite(region.weatherLocation?.latitude) ||
              !Number.isFinite(region.weatherLocation?.longitude)
            ) {
              throw new Error(`Für „${region.name}“ fehlt ein gültiger Wetterstandort.`);
            }
            return {
              region,
              forecast: await getWeatherForecast(region.weatherLocation)
            };
          }));
          if (!weatherEnabled || requestId !== weatherRequestId) return;

          const commonDates = forecasts[0].forecast.mapDays.map(day => day.date)
            .filter(date => forecasts.every(({ forecast }) =>
              forecast.mapDays.some(day => day.date === date)
            ));
          if (commonDates.length === 0) {
            throw new Error("Für die Gebirgsregionen gibt es keinen gemeinsamen Prognosetag.");
          }

          const selectedDate = commonDates.includes(dateSelect.value)
            ? dateSelect.value
            : commonDates[0];
          dateSelect.replaceChildren(...commonDates.map(date => {
            const option = document.createElement("option");
            option.value = date;
            option.textContent = displayDate(date);
            return option;
          }));
          dateSelect.value = selectedDate;

          weatherLayer.clearLayers();
          forecasts.forEach(({ region, forecast }) => {
            const day = forecast.mapDays.find(entry => entry.date === selectedDate);
            if (!day || !Number.isFinite(day.suitability)) {
              throw new Error(`Für „${region.name}“ fehlt die Wetterprognose am ${selectedDate}.`);
            }
            L.polygon(region.coordinates, {
              pane: "weatherPane",
              stroke: false,
              fillColor: getWeatherColor(day.suitability),
              fillOpacity: 0.56,
              interactive: false
            }).addTo(weatherLayer);
          });
          weatherLayer.addTo(map);
          status.textContent = `Grün = günstiger · Rot = ungünstiger · ${displayDate(selectedDate)}`;
        } catch (error) {
          console.error("Das Wanderwetter-Overlay konnte nicht geladen werden.", error);
          if (requestId === weatherRequestId) {
            weatherLayer.clearLayers();
            map.removeLayer(weatherLayer);
            status.textContent = "Wetterdaten derzeit nicht verfügbar.";
          }
        }
      }

      toggle.addEventListener("click", () => {
        weatherEnabled = !weatherEnabled;
        toggle.setAttribute("aria-pressed", String(weatherEnabled));
        toggle.textContent = weatherEnabled ? "Wanderwetter ausblenden" : "Wanderwetter";
        panel.hidden = !weatherEnabled;
        if (weatherEnabled) {
          updateWeatherOverlay();
        } else {
          weatherRequestId += 1;
          weatherLayer.clearLayers();
          map.removeLayer(weatherLayer);
        }
      });
      dateSelect.addEventListener("change", () => {
        if (weatherEnabled) updateWeatherOverlay();
      });

      return container;
    };

    weatherControl.addTo(map);
  }

  function addMountainHatching(coordinates, color, layer) {
    const offsets = coordinates.map(([lat, lng]) => lat + lng);
    const minOffset = Math.min(...offsets);
    const maxOffset = Math.max(...offsets);

    for (let offset = minOffset; offset <= maxOffset; offset += 0.016) {
      const intersections = [];
      coordinates.forEach((point, index) => {
        const next = coordinates[(index + 1) % coordinates.length];
        const startValue = point[0] + point[1] - offset;
        const endValue = next[0] + next[1] - offset;
        if ((startValue < 0 && endValue > 0) || (startValue > 0 && endValue < 0) || startValue === 0) {
          const ratio = startValue / (startValue - endValue);
          const intersection = [
            point[0] + (next[0] - point[0]) * ratio,
            point[1] + (next[1] - point[1]) * ratio
          ];
          if (!intersections.some(existing =>
            Math.abs(existing[0] - intersection[0]) < 0.00001 &&
            Math.abs(existing[1] - intersection[1]) < 0.00001
          )) {
            intersections.push(intersection);
          }
        }
      });

      for (let index = 0; index + 1 < intersections.length; index += 2) {
        L.polyline([intersections[index], intersections[index + 1]], {
          color,
          weight: 1.4,
          opacity: 0.56,
          pane: "regionPane",
          interactive: false,
          bubblingMouseEvents: false
        }).addTo(layer);
      }
    }
  }

  const regionLayers = [];
  const summitMarkers = [];
  const regionFillColor = "#fffefa";

  function formatTravelDuration(minutes, station) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const duration = [
      hours ? `${hours} Std.` : "",
      remainingMinutes ? `${remainingMinutes} Min.` : ""
    ].filter(Boolean).join(" ");
    return `ca. ${duration} ab ${station}`;
  }

  function formatTransferCount(count, station) {
    return `${count} ${count === 1 ? "Umstieg" : "Umstiege"} ab ${station}`;
  }

  function updateTravelHighlights() {
    if (!arrivalDuration || !departureStation || !maximumTransfers) return;
    const limit = Number(arrivalDuration.value);
    const transferLimit = Number(maximumTransfers.value);
    const station = departureStation.value;

    regionLayers.forEach(({ region, area, name, duration, transfers }) => {
      const travelTime = region.travelTimes[station];
      const transferCount = region.transferCounts[station];
      const highlighted = travelTime <= limit && transferCount <= transferLimit;
      area.setStyle({
        weight: highlighted ? 3 : 1.5,
        opacity: highlighted ? 1 : 0.85,
        fillOpacity: highlighted ? 0.12 : 0.08
      });
      name.classList.toggle("mountain-popup-name-highlighted", highlighted);
      duration.textContent = formatTravelDuration(travelTime, station);
      transfers.textContent = formatTransferCount(transferCount, station);
    });

    summitMarkers.forEach(entry => {
      const { marker, summit, muted } = entry;
      const regionName = summitRegionAssignments[summit.page];
      const region = mountainRegions.find(candidate => candidate.name === regionName);
      const travelTime = region.travelTimes[station] + (summit.busRequired ? 30 : 0);
      const transferCount = region.transferCounts[station] + (summit.busRequired ? 1 : 0);
      const shouldMute =
        travelTime > limit ||
        transferCount > transferLimit;
      if (shouldMute !== muted) {
        marker.setIcon(createSummitIcon(summit, shouldMute));
        entry.muted = shouldMute;
      }
    });

    railwayFeatures.forEach(({ line, segments, segmentDuration }) => {
      const stationOffset = line.travelTimes[station] - segmentDuration;
      const exceedsTransferLimit = line.transferCounts[station] > transferLimit;
      segments.forEach(({ feature, elapsedMinutes, duration }) => {
        const exceedsTimeLimit = stationOffset + elapsedMinutes + duration > limit;
        const muted = exceedsTimeLimit || exceedsTransferLimit;
        feature.setStyle({
          color: muted ? "#929a95" : line.color,
          weight: muted ? 3 : 6,
          opacity: muted ? 0.7 : 0.9
        });
      });
    });
  }

  mountainRegions.forEach(region => {
    const railwayLine = lines.find(line => line.page === region.railwayPage);
    if (!railwayLine) {
      throw new Error(`Für die Gebirgsregion „${region.name}“ ist keine Bahnlinie konfiguriert.`);
    }
    const area = L.polygon(region.coordinates, {
      pane: "regionPane",
      color: railwayLine.color,
      weight: 1.5,
      opacity: 0.85,
      dashArray: "5 6",
      fillColor: regionFillColor,
      fillOpacity: 0.08,
      interactive: !regionView,
      bubblingMouseEvents: false
    });
    addMountainHatching(region.coordinates, "#73786e", mountainLayer);
    if (regionView) {
      area.addTo(mountainLayer);
      return;
    }

    const card = document.createElement("div");
    const name = document.createElement("strong");
    const duration = document.createElement("span");
    const transfers = document.createElement("span");
    const weather = document.createElement("div");
    const details = document.createElement("span");
    const detailsLink = document.createElement("a");
    const popup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      maxWidth: 360,
      className: "mountain-popup"
    });
    let closeTimer;

    card.className = "mountain-popup-card";
    name.className = "mountain-popup-name";
    name.textContent = region.name;
    duration.className = "mountain-popup-duration";
    const initialStation = departureStation?.value || "Hauptbahnhof";
    duration.textContent = formatTravelDuration(region.travelTimes[initialStation], initialStation);
    transfers.className = "mountain-popup-duration";
    transfers.textContent = formatTransferCount(region.transferCounts[initialStation], initialStation);
    weather.className = "mountain-weather";
    details.className = "mountain-popup-details";
    details.textContent = "Details ansehen →";
    detailsLink.href = region.page;
    detailsLink.append(details);
    card.append(name, duration, transfers, weather, detailsLink);
    popup.setContent(card);
    area.bindPopup(popup);
    regionLayers.push({ region, area, name, duration, transfers });
    area.on("mouseover", () => {
      window.clearTimeout(closeTimer);
      area.openPopup();
    });
    area.on("mouseout", () => {
      closeTimer = window.setTimeout(() => {
        if (!popup.getElement()?.matches(":hover")) area.closePopup();
      }, 140);
    });
    area.on("popupopen", event => {
      const popupElement = event.popup.getElement();
      loadWeatherForecast(weather, region.weatherLocation);
      popupElement?.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
      popupElement?.addEventListener("mouseleave", () => area.closePopup());
    });
    area.on("click", () => {
      window.location.href = region.page;
    });
    area.on("add", () => {
      const path = area.getElement();
      if (!path) return;
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "link");
      path.setAttribute("aria-label", `${region.name} – Details öffnen`);
      path.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = region.page;
        }
      });
    });
    area.addTo(mountainLayer);
  });

  function createSummitIcon(summit, muted = false) {
    const width = muted ? 17 : 24;
    const height = muted ? 20 : 28;
    return L.divIcon({
      className: muted ? "summit-marker-icon summit-marker-muted" : "summit-marker-icon",
      html: `<svg viewBox="0 0 36 42" aria-hidden="true"><path class="summit-marker-shadow" style="fill:${summit.color}" d="M18 41C14 34 3 23 3 15a15 15 0 1 1 30 0c0 8-11 19-15 26Z"/><path class="summit-marker-mountain" d="m8 24 8-12 4 6 3-4 7 10H8Z"/><path class="summit-marker-snow" d="m16 12 4 6-3-2-2 2-2-1 3-5Z"/></svg>`,
      iconSize: [width, height],
      iconAnchor: [width / 2, height - 2],
      popupAnchor: [0, -height + 4]
    });
  }

  const trainIcon = L.icon({
    iconUrl: "images/Piktogramm.svg",
    iconSize: [22, 18],
    iconAnchor: [11, 17],
    popupAnchor: [0, -16],
    className: "train-marker-icon"
  });

  points.forEach(point => {
    const marker = L.marker(point.coordinates, {
      pane: "stationPane",
      title: `${point.name} – Seite öffnen`,
      alt: point.name,
      keyboard: true,
      riseOnHover: true,
      icon: trainIcon
    });

    marker.on("click", () => {
      window.location.href = point.page;
    });
    marker.addTo(pointLayer);
  });

  intermediateStops.forEach(stop => {
    const destination = new URL("zwischenhalt.html", window.location.href);
    destination.searchParams.set("halt", stop.name);
    destination.searchParams.set("linie", stop.line);
    destination.searchParams.set("breite", String(stop.coordinates[0]));
    destination.searchParams.set("laenge", String(stop.coordinates[1]));
    const marker = L.circleMarker(stop.coordinates, {
      pane: "stationPane",
      radius: 3.5,
      color: "#fffefa",
      weight: 1,
      fillColor: "#171a16",
      fillOpacity: 1,
      bubblingMouseEvents: false
    });

    marker.on("add", () => {
      const path = marker.getElement();
      if (!path) return;
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "link");
      path.setAttribute("aria-label", `${stop.name} auf ${stop.line} – Unterseite öffnen`);
      path.setAttribute("title", `${stop.name} – Unterseite öffnen`);
      path.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = destination.href;
        }
      });
    });
    marker.on("click", () => {
      window.location.href = destination.href;
    });
    marker.addTo(pointLayer);
  });

  function createSummitPopup(summit) {
    const link = document.createElement("a");
    const image = document.createElement("img");
    const name = document.createElement("strong");
    const elevation = document.createElement("span");
    const details = document.createElement("span");

    link.className = "summit-popup-card";
    link.href = summit.page;
    link.setAttribute("aria-label", `${summit.name}, ${summit.elevation} – Details ansehen`);
    image.className = "summit-popup-image";
    image.src = summit.image || "images/gipfel.svg";
    image.alt = `Bergansicht: ${summit.name}`;
    image.loading = "lazy";
    name.className = "summit-popup-name";
    name.textContent = summit.name;
    elevation.className = "summit-popup-elevation";
    elevation.textContent = summit.elevation;
    details.className = "summit-popup-details";
    details.textContent = "Details ansehen →";
    link.append(image, name, elevation, details);
    return link;
  }

  summits.forEach(summit => {
    const marker = L.marker(summit.coordinates, {
      pane: "summitPane",
      title: `${summit.name}, ${summit.elevation}`,
      alt: `${summit.name}, ${summit.elevation}`,
      keyboard: true,
      riseOnHover: true,
      icon: createSummitIcon(summit)
    }).addTo(pointLayer);
    summitMarkers.push({ marker, summit, muted: false });
    const popup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: "summit-popup",
      offset: [0, -26]
    }).setContent(createSummitPopup(summit));
    let closeTimer;

    function schedulePopupClose() {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        const icon = marker.getElement();
        const popupElement = popup.getElement();
        if (!icon?.matches(":hover") && !popupElement?.matches(":hover")) {
          marker.closePopup();
        }
      }, 140);
    }

    marker.bindPopup(popup);
    marker.on("mouseover focus", () => {
      window.clearTimeout(closeTimer);
      marker.openPopup();
    });
    marker.on("mouseout blur", schedulePopupClose);
    marker.on("popupopen", event => {
      event.popup.getElement()?.addEventListener("mouseenter", () => {
        window.clearTimeout(closeTimer);
      });
      event.popup.getElement()?.addEventListener("mouseleave", schedulePopupClose);
    });
    marker.on("click", () => {
      window.location.href = summit.page;
    });
  });

  updateTravelHighlights();
})();
