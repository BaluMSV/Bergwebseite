window.BahnbergeData = window.BahnbergeData || {};
window.BahnbergeData.mountainRegions = [
    {
      name: "Karwendel",
      travelTimes: { "Hauptbahnhof": 110, "Ostbahnhof": 130, "Pasing": 105, "Donnersbergerbrücke": 120, "Harras": 125 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 0, "Donnersbergerbrücke": 1, "Harras": 1 },
      weatherLocation: {
        name: "Mittenwald",
        latitude: 47.4426,
        longitude: 11.261
      },
      coordinates: [
        [47.294995, 11.189912],
        [47.462943, 11.291455],
        [47.451840, 11.411668],
        [47.372530, 11.423454]
      ],
      railwayPage: "mittenwald.html",
      page: "karwendel.html"
    },
    {
      name: "Wetterstein",
      travelTimes: { "Hauptbahnhof": 85, "Ostbahnhof": 100, "Pasing": 80, "Donnersbergerbrücke": 90, "Harras": 100 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 0, "Donnersbergerbrücke": 1, "Harras": 1 },
      weatherLocation: { name: "Garmisch-Partenkirchen", latitude: 47.4917, longitude: 11.0955 },
      coordinates: [[47.484477, 11.096606], [47.416055, 10.932215], [47.383328, 10.949668], 
      [47.379495, 11.165475], [47.452430, 11.242835]],
      railwayPage: "verbindung.html",
      page: "wetterstein.html"
    },
    {
      name: "Estergebirge",
      travelTimes: { "Hauptbahnhof": 85, "Ostbahnhof": 100, "Pasing": 80, "Donnersbergerbrücke": 90, "Harras": 100 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 0, "Donnersbergerbrücke": 1, "Harras": 1 },
      weatherLocation: { name: "Garmisch-Partenkirchen", latitude: 47.4917, longitude: 11.0955 },
      coordinates: [[47.499435, 11.106494],
      [47.594175, 11.194285],
      [47.572659, 11.252149],
      [47.495818, 11.208174]
    ],
      railwayPage: "verbindung.html",
      page: "estergebirge.html"
    },
    {
      name: "Mieminger Kette",
      travelTimes: { "Hauptbahnhof": 120, "Ostbahnhof": 135, "Pasing": 115, "Donnersbergerbrücke": 125, "Harras": 145 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Ehrwald", latitude: 47.399, longitude: 10.919 },
      coordinates: [[47.395304, 10.922073], [47.339074, 10.899195], [47.332041, 11.103681],
       [47.362723, 11.115238]],
      railwayPage: "reutte-in-tirol.html",
      page: "mieminger-kette.html"
    },
    {
      name: "Ammergauer Alpen",
      travelTimes: { "Hauptbahnhof": 105, "Ostbahnhof": 120, "Pasing": 100, "Donnersbergerbrücke": 110, "Harras": 120 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Oberammergau", latitude: 47.5981, longitude: 11.067 },
      coordinates: [[47.663212, 11.032176], [47.619839, 11.039643],
       [47.600165, 11.078353], [47.574057, 11.074662], [47.563459, 11.130624], [47.595014, 11.162209],
      [47.661585, 11.102601]],
      railwayPage: "oberammergau.html",
      page: "ammergauer-alpen.html"
    },
    {
      name: "Lenggries",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 80, "Pasing": 75, "Donnersbergerbrücke": 65, "Harras": 60 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      weatherLocation: { name: "Lenggries", latitude: 47.6815, longitude: 11.5762 },
      coordinates: [[47.740465, 11.587187], [47.666447, 11.593145], [47.688355, 11.725817],
       [47.748016, 11.706340], [47.757567, 11.645389]],
      railwayPage: "lenggries.html",
      page: "lenggries-region.html"
    },
    {
      name: "Tegernsee",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 80, "Pasing": 75, "Donnersbergerbrücke": 65, "Harras": 60 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      weatherLocation: { name: "Tegernsee", latitude: 47.7117, longitude: 11.7521 },
      coordinates: [[47.738221, 11.746601], [47.702920, 11.763557], [47.693204, 11.832300],
       [47.706004, 11.867358], [47.748699, 11.825196], [47.749315, 11.785784]],
      railwayPage: "tegernsee.html",
      page: "tegernsee-region.html"
    },
    {
      name: "Spitzingseegebiet",
      travelTimes: { "Hauptbahnhof": 80, "Ostbahnhof": 90, "Pasing": 85, "Donnersbergerbrücke": 75, "Harras": 70 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 2, "Donnersbergerbrücke": 1, "Harras": 1 },
      weatherLocation: { name: "Spitzingsee", latitude: 47.663, longitude: 11.886 },
      coordinates: [[47.685699, 11.910751], [47.682801, 11.845794],
       [47.642456, 11.846542], [47.648888, 11.941639]],
      railwayPage: "bayrischzell.html",
      page: "spitzingsee.html"
    },
    {
      name: "Jochbergregion",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 85, "Pasing": 65, "Donnersbergerbrücke": 75, "Harras": 95 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Kochel am See", latitude: 47.659, longitude: 11.368 },
      coordinates: [[47.661972, 11.388181], [47.629812, 11.338574],
       [47.608740, 11.376388], [47.621233, 11.468489], [47.660207, 11.458942],
       [47.670167, 11.392487]],
      railwayPage: "kochel-am-see.html",
      page: "jochberg-region.html"
    },
    {
      name: "Herzogstandregion",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 85, "Pasing": 65, "Donnersbergerbrücke": 75, "Harras": 95 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Kochel am See", latitude: 47.659, longitude: 11.368 },
      coordinates: [[47.635994, 11.346436], [47.587154, 11.307125], [47.593214, 11.189939],
      [47.622873, 11.215585], [47.633597, 11.290090]],
      railwayPage: "kochel-am-see.html",
      page: "herzogstand-region.html"
    },
    {
      name: "Füssener Berge",
      travelTimes: { "Hauptbahnhof": 145, "Ostbahnhof": 150, "Pasing": 140, "Donnersbergerbrücke": 145, "Harras": 165 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Füssen", latitude: 47.569, longitude: 10.700 },
      coordinates: [[47.574018, 10.763055], [47.547598, 10.672487], [47.520527, 10.781452], 
      [47.570517, 10.827208]],
      railwayPage: "fuessen.html",
      page: "fuessener-berge.html"
    },
    {
      name: "Brauneckgebiet",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 80, "Pasing": 75, "Donnersbergerbrücke": 65, "Harras": 60 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      weatherLocation: { name: "Lenggries", latitude: 47.6815, longitude: 11.5762 },
      coordinates: [[47.744809, 11.541247], [47.742731, 11.477046], [47.639892, 11.499362],
       [47.653539, 11.565623]],
      railwayPage: "lenggries.html",
      page: "brauneckgebiet.html"
    },
    {
      name: "Berchtesgadener Land",
      travelTimes: { "Hauptbahnhof": 170, "Ostbahnhof": 160, "Pasing": 190, "Donnersbergerbrücke": 180, "Harras": 195 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Berchtesgaden", latitude: 47.6314, longitude: 13.0013 },
      coordinates: [[47.743537, 13.007607],
      [47.705892, 12.852081],
      [47.668682, 12.908730],
      [47.685788, 13.012756]
      ],
      railwayPage: "berchtesgaden.html",
      page: "berchtesgadener-land.html"
    },
    {
      name: "Kampenwandregion",
      travelTimes: { "Hauptbahnhof": 100, "Ostbahnhof": 90, "Pasing": 120, "Donnersbergerbrücke": 115, "Harras": 125 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Aschau im Chiemgau", latitude: 47.776, longitude: 12.322 },
      coordinates: [[47.778861, 12.333528], [47.755398, 12.321892], [47.747918, 12.367416],
       [47.741, 12.390], [47.774677, 12.375173]],
      railwayPage: "aschau-im-chiemgau.html",
      page: "kampenwand-region.html"
    },
    {
      name: "Allgäuer Hochalpen",
      travelTimes: { "Hauptbahnhof": 180, "Ostbahnhof": 205, "Pasing": 175, "Donnersbergerbrücke": 185, "Harras": 205 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Oberstdorf", latitude: 47.4073, longitude: 10.2784 },
      coordinates: [[47.501075, 10.309145], [47.383831, 10.291456], [47.351083, 10.347589],
       [47.466647, 10.427544], [47.502349, 10.366221]],
      railwayPage: "oberstdorf.html",
      page: "allgaeuer-hochalpen.html"
    },
    {
      name: "Wilder Kaiser",
      travelTimes: { "Hauptbahnhof": 80, "Ostbahnhof": 70, "Pasing": 95, "Donnersbergerbrücke": 85, "Harras": 95 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 0, "Pasing": 1, "Donnersbergerbrücke": 1, "Harras": 1 },
      weatherLocation: { name: "Kufstein", latitude: 47.5833, longitude: 12.169 },
      coordinates: [[47.63, 12.23], [47.61, 12.31], [47.57, 12.39], [47.53, 12.34], [47.52, 12.25], [47.56, 12.19], [47.60, 12.19]],
      railwayPage: "kufstein.html",
      page: "wilder-kaiser.html"
    },
    {
      name: "Nationalpark Berchtesgaden",
      travelTimes: { "Hauptbahnhof": 170, "Ostbahnhof": 160, "Pasing": 190, "Donnersbergerbrücke": 180, "Harras": 195 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Berchtesgaden", latitude: 47.6314, longitude: 13.0013 },
      coordinates: [[47.616695, 12.874097], [47.558792, 12.798859], [47.474049, 13.013487],
       [47.611925, 13.079290], [47.627505, 13.013723], [47.594750, 12.998392], [47.612243, 12.929759]],
      railwayPage: "berchtesgaden.html",
      page: "nationalpark-berchtesgaden.html"
    },
    {
      name: "Chiemgauer Alpen",
      travelTimes: { "Hauptbahnhof": 110, "Ostbahnhof": 100, "Pasing": 130, "Donnersbergerbrücke": 120, "Harras": 135 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Ruhpolding", latitude: 47.766, longitude: 12.65 },
      coordinates: [[47.85, 12.48], [47.83, 12.59], [47.79, 12.72], [47.74, 12.78], [47.70, 12.68], [47.73, 12.54], [47.78, 12.46]],
      railwayPage: "ruhpolding.html",
      page: "chiemgauer-alpen.html"
    },
    {
      name: "Pidinger Gebiet",
      travelTimes: { "Hauptbahnhof": 135, "Ostbahnhof": 125, "Pasing": 155, "Donnersbergerbrücke": 145, "Harras": 160 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Piding", latitude: 47.764, longitude: 12.914 },
      coordinates: [[47.777142, 12.875989], [47.760175, 12.766601], [47.734149, 12.771931],
       [47.733583, 12.855514], [47.749616, 12.897866]],
      railwayPage: "berchtesgaden.html",
      page: "pidinger-gebiet.html"
    },
    {
      name: "Berge um Reutte",
      travelTimes: { "Hauptbahnhof": 150, "Ostbahnhof": 165, "Pasing": 145, "Donnersbergerbrücke": 155, "Harras": 175 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Reutte in Tirol", latitude: 47.4863, longitude: 10.719 },
      coordinates: [[47.535, 10.664], [47.527, 10.749], [47.496, 10.802], [47.458, 10.789], [47.445, 10.720], [47.477, 10.659]],
      railwayPage: "reutte-in-tirol.html",
      page: "berge-um-reutte.html"
    },
    {
      name: "Wendelsteingebiet",
      travelTimes: { "Hauptbahnhof": 85, "Ostbahnhof": 95, "Pasing": 90, "Donnersbergerbrücke": 80, "Harras": 75 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      weatherLocation: { name: "Bayrischzell", latitude: 47.6732, longitude: 12.0139 },
      coordinates: [[47.739, 11.952], [47.738, 12.023], [47.710, 12.075], [47.675, 12.063], [47.665, 12.006], [47.694, 11.949]],
      railwayPage: "bayrischzell.html",
      page: "wendelsteingebiet.html"
    },
    {
      name: "Danielgebiet",
      travelTimes: { "Hauptbahnhof": 120, "Ostbahnhof": 135, "Pasing": 115, "Donnersbergerbrücke": 125, "Harras": 145 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      weatherLocation: { name: "Lermoos", latitude: 47.401, longitude: 10.883 },
      coordinates: [[47.444910, 10.914848], [47.438826, 10.872868], [47.418963, 10.844757],
       [47.404589, 10.884613], [47.407633, 10.912224], [47.428768, 10.913224]],
      railwayPage: "reutte-in-tirol.html",
      page: "danielgebiet.html"
    }
  ];
window.BahnbergeData.summitRegionAssignments = {
  "wank.html": "Estergebirge",
  "watzmann-hocheck.html": "Nationalpark Berchtesgaden",
  "nebelhorn.html": "Allgäuer Hochalpen",
  "wallberg.html": "Tegernsee",
  "kampenwand.html": "Kampenwandregion",
  "westliche-karwendelspitze.html": "Karwendel",
  "zugspitze.html": "Wetterstein",
  "herzogstand.html": "Herzogstandregion",
  "wendelstein.html": "Wendelsteingebiet",
  "brecherspitz.html": "Spitzingseegebiet",
  "jochberg.html": "Jochbergregion",
  "seebensee.html": "Mieminger Kette",
  "ehrwalder-alm.html": "Mieminger Kette",
  "brandnerschrofen.html": "Füssener Berge",
  "laber.html": "Ammergauer Alpen",
  "hoernle.html": "Ammergauer Alpen",
  "hochfelln.html": "Chiemgauer Alpen",
  "hochstaufen.html": "Pidinger Gebiet",
  "jenner.html": "Nationalpark Berchtesgaden",
  "baumgartenschneid.html": "Tegernsee",
  "brauneck.html": "Brauneckgebiet",
  "taubenstein.html": "Spitzingseegebiet",
  "daniel.html": "Danielgebiet",
  "pyramidenspitze.html": "Wilder Kaiser",
  "berchtesgadener-hochthron.html": "Berchtesgadener Land",
  "kehlstein.html": "Berchtesgadener Land",
  "gindelalmschneid.html": "Tegernsee",
  "fockenstein.html": "Lenggries",
  "benediktenwand.html": "Brauneckgebiet",
  "blomberg.html": "Lenggries",
  "heimgarten.html": "Herzogstandregion",
  "hirschberg.html": "Tegernsee",
  "krottenkopf.html": "Estergebirge",
  "hoher-fricken.html": "Estergebirge",
  "kramerspitz.html": "Wetterstein",
  "eckbauer.html": "Wetterstein",
  "osterfelderkopf.html": "Wetterstein",
  "hohe-kiste.html": "Estergebirge",
  "breitenstein.html": "Wendelsteingebiet",
  "seebergkopf.html": "Wendelsteingebiet",
  "rosskopf.html": "Spitzingseegebiet",
  "rotwand.html": "Spitzingseegebiet",
  "leutaschklamm.html": "Karwendel",
  "hoher-kranzberg.html": "Karwendel",
  "neureuth.html": "Tegernsee",
  "riederstein.html": "Tegernsee",
  "hoellentalangerhuette.html": "Wetterstein",
  "blaueishuette.html": "Berchtesgadener Land",
  "kreuzjoch.html": "Wetterstein",
  "wettersteinalm.html": "Wetterstein",
  "dammkarhuette.html": "Karwendel",
  "ferchensee.html": "Karwendel"
};
