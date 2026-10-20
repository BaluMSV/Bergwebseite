(() => {
  "use strict";

  const slideshowImages = {
    alpine: ["images/gipfel.svg", "images/wank.svg", "images/watzmann-hocheck.svg"],
    allgaeu: ["images/wank.svg", "images/gipfel.svg", "images/watzmann-hocheck.svg"],
    limestone: ["images/watzmann-hocheck.svg", "images/gipfel.svg", "images/wank.svg"]
  };

  const travelDurationsByRegion = {
    "Estergebirge": "ca. 1 Std. 30 Min.",
    "Berchtesgadener Alpen": "ca. 2 Std. 30 Min.",
    "Allgäuer Alpen": "ca. 2 Std. 15 Min.",
    "Mangfallgebirge": "ca. 1 Std. 30 Min.",
    "Chiemgauer Alpen": "ca. 1 Std. 45 Min.",
    "Karwendel": "ca. 2 Std.",
    "Wettersteingebirge": "ca. 1 Std. 30 Min.",
    "Bayerische Voralpen": "ca. 1 Std. 15 Min.",
    "Kaisergebirge": "ca. 1 Std. 30 Min.",
    "Mieminger Kette": "ca. 2 Std. 30 Min.",
    "Ammergauer Alpen": "ca. 1 Std. 45 Min."
  };

  const summits = {
    wank: {
      name: "Wank",
      elevation: "1.780 m",
      distance: "ca. 6,5 km ab Garmisch-Partenkirchen (einfach)",
      difficulty: "blau",
      station: "Garmisch-Partenkirchen",
      region: "Estergebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen. Von dort zum Ausgangspunkt in Garmisch; eine Bergbahn ist ebenfalls vorhanden.",
      tour: "Beispielroute ab Garmisch-Partenkirchen über den Wankweg zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    "watzmann-hocheck": {
      name: "Watzmann Hocheck",
      elevation: "2.651 m",
      distance: "ca. 21 km ab Wimbachbrücke (Hin- und Rückweg)",
      difficulty: "schwarz",
      station: "Berchtesgaden",
      region: "Berchtesgadener Alpen",
      travel: "Zielbahnhof Berchtesgaden; von dort weiter mit dem Bus zum Ausgangspunkt an der Wimbachbrücke.",
      tour: "Lange, hochalpine Tour über das Watzmannhaus zum Hocheck. Nur für sehr erfahrene, trittsichere Bergsteiger.",
      gallery: slideshowImages.limestone
    },
    nebelhorn: {
      name: "Nebelhorn",
      elevation: "2.224 m",
      distance: "ca. 8 km ab Oberstdorf (einfach)",
      difficulty: "rot",
      station: "Oberstdorf",
      region: "Allgäuer Alpen",
      travel: "Zielbahnhof Oberstdorf; von dort mit dem Ortsbus zur Talstation der Nebelhornbahn.",
      tour: "Beispielroute von Oberstdorf über den Zeigersattel zum Gipfel.",
      gallery: slideshowImages.allgaeu
    },
    wallberg: {
      name: "Wallberg",
      elevation: "1.722 m",
      distance: "ca. 6 km ab Talstation (einfach)",
      difficulty: "blau",
      station: "Tegernsee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Tegernsee; Anschluss mit dem Bus zur Wallbergbahn-Talstation.",
      tour: "Beispielroute von der Talstation über den Wallbergmoos-Almweg zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    kampenwand: {
      name: "Kampenwand",
      elevation: "1.668 m",
      distance: "ca. 5 km ab Aschau (einfach)",
      difficulty: "rot",
      station: "Aschau im Chiemgau",
      region: "Chiemgauer Alpen",
      travel: "Zielbahnhof Aschau im Chiemgau; von dort zu Fuß oder mit dem Bus zur Kampenwandbahn.",
      tour: "Beispielroute ab der Bergstation zur Steinlingalm und weiter zum Gipfelbereich.",
      gallery: slideshowImages.limestone
    },
    "westliche-karwendelspitze": {
      name: "Westliche Karwendelspitze",
      elevation: "2.385 m",
      distance: "ca. 3 km ab Bergstation (einfach)",
      difficulty: "schwarz",
      station: "Mittenwald",
      region: "Karwendel",
      travel: "Zielbahnhof Mittenwald; weiter zur Talstation der Karwendelbahn.",
      tour: "Beispielroute ab der Bergstation über den hochalpinen Steig zum Gipfel.",
      gallery: slideshowImages.limestone
    },
    zugspitze: {
      name: "Zugspitze",
      elevation: "2.962 m",
      distance: "ca. 21 km ab Garmisch (über Reintal, einfach)",
      difficulty: "schwarz",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; von dort zum jeweiligen Ausgangspunkt der gewählten Route.",
      tour: "Beispielroute durch das Reintal und über das Zugspitzplatt. Lange alpine Bergtour.",
      gallery: slideshowImages.alpine
    },
    herzogstand: {
      name: "Herzogstand",
      elevation: "1.731 m",
      distance: "ca. 4,5 km ab Kesselberg (einfach)",
      difficulty: "blau",
      station: "Kochel",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Kochel; von dort mit dem Bus zum Ausgangspunkt am Kesselberg.",
      tour: "Beispielroute vom Kesselberg über den Herzogstand zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    wendelstein: {
      name: "Wendelstein",
      elevation: "1.838 m",
      distance: "ca. 3 km ab Mitteralm (einfach)",
      difficulty: "rot",
      station: "Bayrischzell",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Bayrischzell; für den Zustieg je nach Route mit Bus oder Zahnradbahn weiter.",
      tour: "Beispielroute über die Mitteralm zum Gipfel. Trittsicherheit auf den Gipfelwegen erforderlich.",
      gallery: slideshowImages.alpine
    },
    brecherspitz: {
      name: "Brecherspitz",
      elevation: "1.685 m",
      distance: "ca. 7 km ab Neuhaus (Rundtour)",
      difficulty: "blau",
      station: "Fischhausen-Neuhaus",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Fischhausen-Neuhaus; von dort zum Ausgangspunkt am Spitzingsee.",
      tour: "Beispielrunde ab Spitzingsee über den Gipfelgrat. Der Grat erfordert Trittsicherheit und Schwindelfreiheit.",
      gallery: slideshowImages.alpine
    },
    jochberg: {
      name: "Jochberg",
      elevation: "1.565 m",
      distance: "ca. 7 km ab Kesselberg (Rundtour)",
      difficulty: "blau",
      station: "Kochel am See",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Kochel am See; von dort mit dem Bus zum Ausgangspunkt am Kesselberg.",
      tour: "Beispielroute ab Kesselberg über den Gipfel mit Blick auf Kochel- und Walchensee.",
      gallery: slideshowImages.alpine
    },
    seebensee: {
      name: "Seebensee",
      elevation: "1.657 m",
      distance: "ca. 10 km ab Ehrwald (Rundtour)",
      difficulty: "blau",
      station: "Ehrwald-Zugspitzbahn",
      region: "Mieminger Kette",
      travel: "Zielbahnhof Ehrwald-Zugspitzbahn; von dort zum Ausgangspunkt der Wanderung.",
      tour: "Beispielroute von Ehrwald über die Seebenalm zum Seebensee.",
      gallery: slideshowImages.alpine
    },
    "ehrwalder-alm": {
      name: "Ehrwalder Alm",
      elevation: "1.502 m",
      distance: "Je nach Tour ab Bergstation",
      difficulty: "blau",
      station: "Ehrwald-Zugspitzbahn",
      region: "Mieminger Kette",
      travel: "Zielbahnhof Ehrwald-Zugspitzbahn; von dort zur Talstation der Ehrwalder Almbahn. Die Alm ist auch über Wanderwege erreichbar.",
      tour: "Die Ehrwalder Alm ist Ausgangspunkt für Wanderungen in Richtung Seebensee und in die umliegenden Berge. Weglänge und Schwierigkeit hängen von der gewählten Route ab.",
      gallery: slideshowImages.alpine
    },
    brandnerschrofen: {
      name: "Brandnerschrofen",
      elevation: "1.881 m",
      distance: "ca. 8 km ab Tegelbergbahn (Rundtour)",
      difficulty: "rot",
      station: "Füssen",
      region: "Ammergauer Alpen",
      travel: "Zielbahnhof Füssen; von dort mit dem Bus zur Tegelbergbahn.",
      tour: "Beispielroute ab Tegelberg über den Brandnerschrofen.",
      gallery: slideshowImages.limestone
    },
    laber: {
      name: "Laber",
      elevation: "1.682 m",
      distance: "ca. 6 km ab Oberammergau (einfach)",
      difficulty: "blau",
      station: "Oberammergau",
      region: "Ammergauer Alpen",
      travel: "Zielbahnhof Oberammergau; der Ausgangspunkt liegt nahe am Ort.",
      tour: "Beispielroute über den Soilasee zum Laber.",
      gallery: slideshowImages.alpine
    },
    hoernle: {
      name: "Hörnle",
      elevation: "1.548 m",
      distance: "ca. 8 km ab Bad Kohlgrub (Rundtour)",
      difficulty: "blau",
      station: "Bad Kohlgrub",
      region: "Ammergauer Alpen",
      travel: "Zielbahnhof Bad Kohlgrub; von dort zum Ausgangspunkt der Hörnle-Tour.",
      tour: "Beispielrunde über Vorderes, Mittleres und Hinteres Hörnle.",
      gallery: slideshowImages.alpine
    },
    hochstaufen: {
      name: "Hochstaufen",
      elevation: "1.771 m",
      distance: "ca. 12 km ab Bad Reichenhall (Rundtour)",
      difficulty: "schwarz",
      station: "Bad Reichenhall",
      region: "Chiemgauer Alpen",
      travel: "Zielbahnhof Bad Reichenhall; von dort zum jeweiligen Ausgangspunkt der Tour.",
      tour: "Beispielroute über den Weg der deutschen Alpenstraße zum Gipfel.",
      gallery: slideshowImages.limestone
    },
    hochfelln: {
      name: "Hochfelln",
      elevation: "1.674 m",
      distance: "ca. 12 km ab Bergen (Hin- und Rückweg)",
      difficulty: "rot",
      station: "Ruhpolding",
      region: "Chiemgauer Alpen",
      travel: "Zielbahnhof Ruhpolding; von dort mit dem Bus weiter nach Bergen und zum Ausgangspunkt der Wanderung oder zur Hochfellnbahn.",
      tour: "Wanderung von Bergen über die Bründlingalm zum Gipfel. Der lange Anstieg erfordert gute Kondition; alternativ ist ein Teil der Strecke mit der Hochfellnbahn möglich.",
      gallery: slideshowImages.alpine
    },
    jenner: {
      name: "Jenner",
      elevation: "1.874 m",
      distance: "ca. 8 km ab Königssee (Rundtour)",
      difficulty: "blau",
      station: "Berchtesgaden",
      region: "Berchtesgadener Alpen",
      travel: "Zielbahnhof Berchtesgaden; von dort mit dem Bus zur Jennerbahn am Königssee.",
      tour: "Beispielroute ab der Bergstation über den Jennergipfel.",
      gallery: slideshowImages.alpine
    },
    baumgartenschneid: {
      name: "Baumgartenschneid",
      elevation: "1.448 m",
      distance: "ca. 10 km ab Tegernsee (Rundtour)",
      difficulty: "blau",
      station: "Tegernsee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Tegernsee; von dort zu Fuß zum Ausgangspunkt.",
      tour: "Beispielrunde über die Baumgartenalm und den Gipfel der Baumgartenschneid.",
      gallery: slideshowImages.alpine
    },
    brauneck: {
      name: "Brauneck",
      elevation: "1.555 m",
      distance: "ca. 7 km ab Lenggries (einfach)",
      difficulty: "blau",
      station: "Lenggries",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Lenggries; von dort weiter zur Brauneckbahn oder zum Wanderweg.",
      tour: "Beispielroute ab Lenggries über die Bergstation und den Gipfelbereich.",
      gallery: slideshowImages.alpine
    },
    taubenstein: {
      name: "Taubenstein",
      elevation: "1.693 m",
      distance: "ca. 6 km ab Spitzingsee (Rundtour)",
      difficulty: "rot",
      station: "Fischhausen-Neuhaus",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Fischhausen-Neuhaus; anschließend mit dem Bus zum Spitzingsee.",
      tour: "Beispielrunde vom Spitzingsee über die Taubensteinbahn-Bergstation zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    daniel: {
      name: "Daniel",
      elevation: "2.340 m",
      distance: "ca. 12 km ab Lähn (Rundtour)",
      difficulty: "schwarz",
      station: "Lähn",
      region: "Ammergauer Alpen",
      travel: "Zielbahnhof Lähn; von dort zum Ausgangspunkt der anspruchsvollen Bergtour.",
      tour: "Anspruchsvolle Beispielroute von Lähn über die Upsspitze zum Daniel. Alpine Erfahrung und Trittsicherheit erforderlich.",
      gallery: slideshowImages.limestone
    },
    pyramidenspitze: {
      name: "Pyramidenspitze",
      elevation: "1.997 m",
      distance: "ca. 15 km ab Durchholzen (Rundtour)",
      difficulty: "rot",
      station: "Kufstein",
      region: "Kaisergebirge",
      travel: "Zielbahnhof Kufstein; anschließend mit dem Bus nach Durchholzen.",
      tour: "Anspruchsvolle Beispielroute über die Winkelalm zur Pyramidenspitze. Alpine Erfahrung und Trittsicherheit erforderlich.",
      gallery: slideshowImages.limestone
    },
    "berchtesgadener-hochthron": {
      name: "Berchtesgadener Hochthron",
      elevation: "1.972 m",
      distance: "ca. 11 km ab St. Leonhard (Rundtour)",
      difficulty: "schwarz",
      station: "Salzburg Hbf",
      region: "Berchtesgadener Alpen",
      travel: "Zielbahnhof Salzburg; von dort mit dem Bus nach St. Leonhard zur Untersbergbahn.",
      tour: "Beispielroute über die Untersbergbahn-Bergstation zum Gipfel. Vor der Tour Öffnungszeiten und Betriebsstatus prüfen.",
      gallery: slideshowImages.limestone
    },
    kehlstein: {
      name: "Kehlstein",
      elevation: "1.881 m",
      distance: "ca. 7 km ab Obersalzberg (Rundtour)",
      difficulty: "rot",
      station: "Berchtesgaden",
      region: "Berchtesgadener Alpen",
      travel: "Zielbahnhof Berchtesgaden; von dort mit dem Bus zum Obersalzberg.",
      tour: "Beispielroute über den Wanderweg ab Obersalzberg. Der Kehlsteinbus und das Kehlsteinhaus sind saisonabhängig.",
      gallery: slideshowImages.limestone
    },
    gindelalmschneid: {
      name: "Gindelalmschneid",
      elevation: "1.335 m",
      distance: "ca. 10 km ab Schliersee (Rundtour)",
      difficulty: "blau",
      station: "Schliersee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Schliersee; der Ausgangspunkt ist vom Ort aus erreichbar.",
      tour: "Beispielrunde von Schliersee über die Gindelalm zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    fockenstein: {
      name: "Fockenstein",
      elevation: "1.564 m",
      distance: "ca. 11 km ab Bad Wiessee (Rundtour)",
      difficulty: "blau",
      station: "Gmund",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Gmund; anschließend mit dem Bus nach Bad Wiessee.",
      tour: "Beispielrunde über die Aueralm zum Fockenstein.",
      gallery: slideshowImages.alpine
    },
    benediktenwand: {
      name: "Benediktenwand",
      elevation: "1.800 m",
      distance: "ca. 17 km ab Benediktbeuern (Rundtour)",
      difficulty: "rot",
      station: "Benediktbeuern",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Benediktbeuern; von dort zum Ausgangspunkt der langen Bergtour.",
      tour: "Anspruchsvolle Beispielrunde über die Tutzinger Hütte zum Gipfel. Lange Tour mit ausgesetzten Passagen.",
      gallery: slideshowImages.alpine
    },
    blomberg: {
      name: "Blomberg",
      elevation: "1.248 m",
      distance: "ca. 7 km ab Bad Tölz (Rundtour)",
      difficulty: "blau",
      station: "Bad Tölz",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Bad Tölz; weiter mit dem Bus oder zu Fuß zur Blombergbahn.",
      tour: "Beispielrunde von der Talstation über den Blomberg zum Zwiesel.",
      gallery: slideshowImages.alpine
    },
    heimgarten: {
      name: "Heimgarten",
      elevation: "1.791 m",
      distance: "ca. 10 km ab Ohlstadt (Rundtour)",
      difficulty: "blau",
      station: "Ohlstadt",
      region: "Bayerische Voralpen",
      travel: "Zielbahnhof Ohlstadt; von dort zum Ausgangspunkt der Heimgarten-Tour.",
      tour: "Beispielroute von Ohlstadt über die Heimgartenhütte zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    hirschberg: {
      name: "Hirschberg",
      elevation: "1.670 m",
      distance: "ca. 12 km ab Kreuth (Rundtour)",
      difficulty: "blau",
      station: "Tegernsee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Tegernsee; anschließend mit dem Bus nach Kreuth.",
      tour: "Beispielrunde ab Kreuth über die Rauheckalm zum Hirschberggipfel.",
      gallery: slideshowImages.alpine
    },
    krottenkopf: {
      name: "Krottenkopf",
      elevation: "2.086 m",
      distance: "ca. 18 km ab Eschenlohe (Rundtour)",
      difficulty: "rot",
      station: "Eschenlohe",
      region: "Estergebirge",
      travel: "Zielbahnhof Eschenlohe; von dort zum Ausgangspunkt im Bereich des Wank.",
      tour: "Lange, anspruchsvolle Beispielrunde über die Weilheimer Hütte zum höchsten Gipfel des Estergebirges.",
      gallery: slideshowImages.alpine
    },
    "hoher-fricken": {
      name: "Hoher Fricken",
      elevation: "1.940 m",
      distance: "ca. 12 km ab Farchant (Rundtour)",
      difficulty: "rot",
      station: "Farchant",
      region: "Estergebirge",
      travel: "Zielbahnhof Farchant; der Ausgangspunkt liegt nahe am Ort.",
      tour: "Steile Beispielroute von Farchant über den Gipfel. Trittsicherheit und gute Kondition erforderlich.",
      gallery: slideshowImages.alpine
    },
    kramerspitz: {
      name: "Kramerspitz",
      elevation: "1.985 m",
      distance: "ca. 14 km ab Garmisch-Partenkirchen (Rundtour)",
      difficulty: "rot",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; weiter zum Kramerplateauweg.",
      tour: "Lange, anspruchsvolle Beispielrunde über die Stepbergalm zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    eckbauer: {
      name: "Eckbauer",
      elevation: "1.237 m",
      distance: "ca. 6 km ab Garmisch-Partenkirchen (Rundtour)",
      difficulty: "blau",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; von dort zur Talstation der Eckbauerbahn.",
      tour: "Beispielrunde über die Partnachklamm und den Eckbauer. Für den Klammzugang Öffnungszeiten beachten.",
      gallery: slideshowImages.alpine
    },
    osterfelderkopf: {
      name: "Osterfelderkopf",
      elevation: "2.060 m",
      distance: "ca. 5 km ab Kreuzeckbahn-Bergstation (Rundtour)",
      difficulty: "rot",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; weiter zur Kreuzeckbahn.",
      tour: "Beispielrunde ab der Bergstation über den Osterfelderkopf. Betriebszeiten der Bergbahn beachten.",
      gallery: slideshowImages.limestone
    },
    "hohe-kiste": {
      name: "Hohe Kiste",
      elevation: "1.922 m",
      distance: "ca. 14 km ab Eschenlohe (Rundtour)",
      difficulty: "rot",
      station: "Eschenlohe",
      region: "Estergebirge",
      travel: "Zielbahnhof Eschenlohe; von dort zum Ausgangspunkt im Eschenlainetal.",
      tour: "Anspruchsvolle Beispielroute durch das Eschenlainetal zur Hohen Kiste. Lange Tour, gute Kondition erforderlich.",
      gallery: slideshowImages.alpine
    },
    breitenstein: {
      name: "Breitenstein",
      elevation: "1.622 m",
      distance: "ca. 10 km ab Fischbachau (Rundtour)",
      difficulty: "blau",
      station: "Fischbachau",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Fischbachau; von dort zum Ausgangspunkt der Breitenstein-Tour.",
      tour: "Beispielrunde von Fischbachau über die Kesselalm zum Gipfel.",
      gallery: slideshowImages.alpine
    },
    seebergkopf: {
      name: "Seebergkopf",
      elevation: "1.538 m",
      distance: "ca. 9 km ab Bayrischzell (Rundtour)",
      difficulty: "rot",
      station: "Bayrischzell",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Bayrischzell; der Wanderweg beginnt am Ort und führt in Richtung Seeberg.",
      tour: "Beispielrunde von Bayrischzell über die Seebergalm zum Gipfel. Für den steilen Gipfelanstieg sind Trittsicherheit und gute Kondition erforderlich.",
      gallery: slideshowImages.alpine
    },
    rosskopf: {
      name: "Roßkopf",
      elevation: "1.579 m",
      distance: "ca. 7 km ab Spitzingsee (Rundtour)",
      difficulty: "rot",
      station: "Fischhausen-Neuhaus",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Fischhausen-Neuhaus; anschließend mit dem Bus zum Spitzingsee.",
      tour: "Beispielrunde vom Spitzingsee über den Roßkopf und zurück.",
      gallery: slideshowImages.alpine
    },
    rotwand: {
      name: "Rotwand",
      elevation: "1.884 m",
      distance: "ca. 10 km ab Spitzingsee (Rundtour)",
      difficulty: "rot",
      station: "Fischhausen-Neuhaus",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Fischhausen-Neuhaus; anschließend mit dem Bus zum Spitzingsee.",
      tour: "Beispielrunde vom Spitzingsee über das Rotwandhaus zur Rotwand. Bitte Wegverhältnisse vor Ort prüfen.",
      gallery: slideshowImages.alpine
    },
    leutaschklamm: {
      name: "Leutaschklamm",
      elevation: "1.038 m",
      distance: "ca. 4 km durch die Klamm (Hin- und Rückweg)",
      difficulty: "blau",
      station: "Mittenwald",
      region: "Karwendel",
      travel: "Zielbahnhof Mittenwald; der Zugang zur Klamm ist vom Bahnhof aus erreichbar.",
      tour: "Beispielspaziergang durch die Leutaschklamm. Öffnungszeiten, Eintritt und Wegsperrungen vorab prüfen.",
      gallery: slideshowImages.alpine
    },
    "hoher-kranzberg": {
      name: "Hoher Kranzberg",
      elevation: "1.391 m",
      distance: "ca. 8 km ab Mittenwald (Rundtour)",
      difficulty: "blau",
      station: "Mittenwald",
      region: "Karwendel",
      travel: "Zielbahnhof Mittenwald; der Ausgangspunkt zur Kranzberg-Sesselbahn liegt nahe am Ort.",
      tour: "Beispielrunde ab Mittenwald über den Lautersee zum Hohen Kranzberg.",
      gallery: slideshowImages.alpine
    },
    neureuth: {
      name: "Neureuth",
      elevation: "1.261 m",
      distance: "ca. 7 km ab Tegernsee (Rundtour)",
      difficulty: "blau",
      station: "Tegernsee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Tegernsee; der Wanderweg zur Neureuth beginnt nahe am Ort.",
      tour: "Beispielrunde ab Tegernsee über den Höhenweg zum Berggasthaus Neureuth.",
      gallery: slideshowImages.alpine
    },
    riederstein: {
      name: "Riederstein",
      elevation: "1.207 m",
      distance: "ca. 7 km ab Tegernsee (Rundtour)",
      difficulty: "blau",
      station: "Tegernsee",
      region: "Mangfallgebirge",
      travel: "Zielbahnhof Tegernsee; von dort zu Fuß zum Ausgangspunkt der Wanderung Richtung Galaun.",
      tour: "Beispielrunde ab Tegernsee über das Berggasthaus Galaun zur Riedersteinkapelle. Bitte Wegbedingungen vorab prüfen.",
      gallery: slideshowImages.alpine
    },
    hoellentalangerhuette: {
      name: "Höllentalangerhütte",
      elevation: "1.387 m",
      distance: "ca. 11 km ab Hammersbach (Hin- und Rückweg)",
      difficulty: "blau",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; weiter mit der Zugspitzbahn bis Hammersbach.",
      tour: "Anspruchsvolle Bergwanderung durch die Höllentalklamm zur Höllentalangerhütte. Trittsicherheit erforderlich; Öffnungszeiten und Wegsperrungen vorab prüfen.",
      gallery: slideshowImages.limestone
    },
    blaueishuette: {
      name: "Blaueishütte",
      elevation: "1.680 m",
      distance: "ca. 13 km ab Hintersee (Hin- und Rückweg)",
      difficulty: "blau",
      station: "Berchtesgaden",
      region: "Berchtesgadener Alpen",
      travel: "Zielbahnhof Berchtesgaden; weiter mit dem Bus zum Hintersee in Ramsau.",
      tour: "Anspruchsvoller, steiler Aufstieg vom Hintersee durch das Blaueiskar zur Blaueishütte. Alpine Bedingungen und Hüttenöffnungszeiten vorab prüfen.",
      gallery: slideshowImages.limestone
    },
    kreuzjoch: {
      name: "Kreuzjoch",
      elevation: "1.719 m",
      distance: "ca. 10 km ab Kreuzeckbahn-Bergstation (Rundtour)",
      difficulty: "blau",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; weiter zur Kreuzeckbahn.",
      tour: "Bergwanderung im Gebiet von Kreuzeck und Alpspitze. Je nach gewähltem Zustieg sind Trittsicherheit und gute Kondition erforderlich.",
      gallery: slideshowImages.alpine
    },
    wettersteinalm: {
      name: "Wettersteinalm",
      elevation: "1.464 m",
      distance: "Je nach Tour ab Garmisch-Partenkirchen",
      difficulty: "blau",
      station: "Garmisch-Partenkirchen",
      region: "Wettersteingebirge",
      travel: "Zielbahnhof Garmisch-Partenkirchen; von dort zum Ausgangspunkt der Wanderung Richtung Schachen und Wettersteinalm.",
      tour: "Die Wettersteinalm liegt am Schachentorsteig und ist ein Ziel für eine längere Bergwanderung. Bitte die saisonale Bewirtschaftung und aktuelle Wegbedingungen prüfen.",
      gallery: slideshowImages.alpine
    },
    dammkarhuette: {
      name: "Dammkarhütte",
      elevation: "1.650 m",
      distance: "Je nach Zustieg ab Mittenwald",
      difficulty: "rot",
      station: "Mittenwald",
      region: "Karwendel",
      travel: "Zielbahnhof Mittenwald; von dort zum Einstieg ins Dammkar. Der Zustieg zur Hütte ist eine anspruchsvolle Bergtour.",
      tour: "Anspruchsvolle Bergwanderung zur Dammkarhütte im Karwendel. Trittsicherheit, gute Kondition und eine Prüfung der aktuellen Bedingungen sind erforderlich.",
      gallery: slideshowImages.alpine
    },
    ferchensee: {
      name: "Ferchensee",
      elevation: "1.065 m",
      distance: "ca. 10 km ab Mittenwald (Hin- und Rückweg)",
      difficulty: "blau",
      station: "Mittenwald",
      region: "Karwendel",
      travel: "Zielbahnhof Mittenwald; von dort zu Fuß oder mit dem saisonalen Bus zum Ferchensee.",
      tour: "Leichte Wanderung von Mittenwald über den Lautersee zum Ferchensee. Saisonale Busverbindungen und Wegbedingungen vorab prüfen.",
      gallery: slideshowImages.alpine
    }
  };

  const page = document.querySelector("[data-summit]");
  const summit = summits[page?.dataset.summit];
  if (!summit) {
    const heading = document.querySelector(".summit-title");
    if (heading) heading.textContent = "Gipfel nicht gefunden";
    return;
  }
  const regionalTravelDuration = travelDurationsByRegion[summit.region];
  if (!regionalTravelDuration) {
    throw new Error(`Für die Gebirgsregion „${summit.region}“ fehlt eine Anreisedauer.`);
  }

  document.title = `${summit.name} – Gipfel`;
  document.querySelector(".summit-title").textContent = summit.name;

  const facts = [
    ["Höhenmeter", summit.elevation],
    ["Weglänge", summit.distance],
    ["Schwierigkeit", summit.difficulty],
    ["Zielbahnhof", summit.station],
    ["Gebirgsregion", summit.region]
  ];
  const factsList = document.querySelector("[data-facts]");
  facts.forEach(([label, value]) => {
    const item = document.createElement("li");
    const labelElement = document.createElement("span");
    const valueElement = document.createElement("strong");
    labelElement.textContent = label;
    valueElement.textContent = value;
    if (label === "Schwierigkeit") {
      valueElement.className = `difficulty difficulty-${value}`;
    }
    item.append(labelElement, valueElement);
    factsList.append(item);
  });

  document.querySelector("[data-travel]").textContent = summit.travel;
  const travelDuration = document.createElement("p");
  travelDuration.className = "travel-duration";
  travelDuration.textContent = `Ungefähre Anreisedauer ab München Hauptbahnhof (Orientierungswert): ${regionalTravelDuration}`;
  document.querySelector(".travel-quadrant").insertBefore(
    travelDuration,
    document.querySelector(".travel-quadrant [data-plan='anreise']")
  );
  document.querySelector("[data-tour]").textContent = summit.tour;
  document.querySelectorAll("[data-plan]").forEach(link => {
    const plan = link.dataset.plan;
    link.href = `planung.html?gipfel=${encodeURIComponent(page.dataset.summit)}&art=${encodeURIComponent(plan)}`;
    if (plan === "tour") {
      link.firstChild.textContent = "Details ";
      const outdooractiveUrl = window.outdooractiveLinks?.[page.dataset.summit];
      if (outdooractiveUrl) {
        link.addEventListener("click", () => {
          window.open(outdooractiveUrl, "_blank", "noopener,noreferrer");
        });
      }
    }
  });

  const slideshow = document.querySelector("[data-slideshow]");
  const image = document.createElement("img");
  const previous = document.createElement("button");
  const next = document.createElement("button");
  const counter = document.createElement("span");
  const images = summit.gallery;
  let activeIndex = 0;

  image.className = "slide-image";
  image.alt = `Ansicht ${activeIndex + 1}: ${summit.name}`;
  image.src = images[activeIndex];
  image.addEventListener("error", () => {
    image.alt = `Bild nicht verfügbar: ${summit.name}`;
  });

  previous.className = "slide-arrow slide-previous";
  previous.type = "button";
  previous.setAttribute("aria-label", "Vorheriges Bild");
  previous.textContent = "‹";

  next.className = "slide-arrow slide-next";
  next.type = "button";
  next.setAttribute("aria-label", "Nächstes Bild");
  next.textContent = "›";

  counter.className = "slide-counter";

  function showImage(index) {
    activeIndex = (index + images.length) % images.length;
    image.src = images[activeIndex];
    image.alt = `Ansicht ${activeIndex + 1} von ${images.length}: ${summit.name}`;
    counter.textContent = `${activeIndex + 1} / ${images.length}`;
  }

  previous.addEventListener("click", () => showImage(activeIndex - 1));
  next.addEventListener("click", () => showImage(activeIndex + 1));
  slideshow.append(image, previous, next, counter);
  showImage(0);
})();
