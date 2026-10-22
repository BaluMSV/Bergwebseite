(() => {
  "use strict";

  const list = document.getElementById("railway-list");
  const lines = window.BahnbergeData?.lines;
  if (!list || !Array.isArray(lines)) {
    throw new Error("Die Bahnlinienübersicht konnte nicht geladen werden.");
  }

  const fragment = document.createDocumentFragment();
  [...lines]
    .sort((first, second) =>
      first.travelTimes["Hauptbahnhof"] - second.travelTimes["Hauptbahnhof"] ||
      first.name.localeCompare(second.name, "de")
    )
    .forEach(line => {
      const item = document.createElement("li");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const detail = document.createElement("p");

      item.className = "region-item railway-item";
      item.style.setProperty("--railway-color", line.color);
      link.href = line.page;
      link.textContent = line.name.replace(/^Bahnverbindung\s+/, "").replace(/^Verbindung\s+/, "");
      detail.className = "region-travel-time";
      detail.textContent = `Anreise ab München Hbf: ${line.travelTimes["Hauptbahnhof"]} Minuten`;
      heading.append(link);
      item.append(heading, detail);
      fragment.append(item);
    });

  list.append(fragment);
})();
