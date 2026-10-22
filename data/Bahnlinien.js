window.BahnbergeData = window.BahnbergeData || {};
window.BahnbergeData.lines = [
    {
      name: "Verbindung München – Garmisch-Partenkirchen",
      travelTimes: { "Hauptbahnhof": 85, "Ostbahnhof": 100, "Pasing": 80, "Donnersbergerbrücke": 90, "Harras": 100 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 0, "Donnersbergerbrücke": 1, "Harras": 1 },
      segmentTravelTimes: [6, 23, 11, 6, 5, 4, 6, 10, 6, 4],
      // Beliebig viele [Breitengrad, Längengrad]-Zwischenpunkte formen den Linienverlauf.
      coordinates: [
        [48.140778, 11.554272],
        [48.150491, 11.460715],
        [47.907235, 11.273158],
        [47.845743, 11.143302],
        [47.776931, 11.140416],
        [47.721010, 11.158590],
        [47.682591, 11.192956],
        [47.601823, 11.188172],
        [47.559448, 11.139452],
        [47.530353, 11.114939],
        [47.491037, 11.097511]
      ],
      color: "#bb5545",
      page: "verbindung.html"
    },
    {
      name: "Bahnverbindung München – Oberstdorf",
      travelTimes: { "Hauptbahnhof": 160, "Ostbahnhof": 185, "Pasing": 155, "Donnersbergerbrücke": 165, "Harras": 185 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [7, 23, 8, 9, 14, 5, 12, 12, 14, 21, 5, 8, 13, 9],
      coordinates: [
        [48.140778, 11.554272],
        [48.150491, 11.460715],
        [48.105778, 11.038561],
        [48.081311, 10.855919],
        [48.034999, 10.716974],
        [47.875595, 10.629684],
        [47.830001, 10.640421],
        [47.819548, 10.440190],
        [47.709978, 10.316597],
        [47.559214, 10.213528],
        [47.543265, 10.259012],
        [47.514440, 10.271985],
        [47.488006, 10.280786],
        [47.456687, 10.271818],
        [47.411516, 10.278722]
      ],
      color: "#397c66",
      page: "oberstdorf.html"
    },
    {
      name: "Bahnverbindung München – Berchtesgaden",
      travelTimes: { "Hauptbahnhof": 170, "Ostbahnhof": 160, "Pasing": 190, "Donnersbergerbrücke": 180, "Harras": 195 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [9, 31, 11, 6, 5, 6, 7, 5, 6, 10, 10, 8, 16, 10, 7, 18, 8],
      coordinates: [
        [48.140778, 11.554272], 
        [48.127283, 11.605590],
        [47.849596, 12.120205],
        [47.904699, 12.301916],
        [47.854697, 12.347171],
        [47.816207, 12.381509],
        [47.822121, 12.488261],
        [47.825359, 12.593209],
        [47.869814, 12.638693],
        [47.849142, 12.834916],
        [47.836977, 12.976630],
        [47.814754, 12.964037],
        [47.795921, 12.946190],
        [47.759307, 12.911272],
        [47.731317, 12.881951],
        [47.720368, 12.895675],
        [47.651457, 12.960444],
        [47.626722, 12.999840]
      ],
      color: "#6272ad",
      page: "berchtesgaden.html"
    },
    {
      name: "Bahnverbindung München – Tegernsee",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 80, "Pasing": 75, "Donnersbergerbrücke": 65, "Harras": 60 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      segmentTravelTimes: [3, 5, 3, 21, 11, 8, 6, 8, 7],
      coordinates: [
        [48.140778, 11.554272],
        [48.142684, 11.536426],
        [48.118057, 11.536274],
        [48.095067, 11.533087],
        [47.884347, 11.697457],
        [47.833447, 11.709530],
        [47.795490, 11.684140],
        [47.767669, 11.720351],
        [47.749514, 11.734949],
        [47.714377, 11.756878]
      ],
      color: "#d08c38",
      page: "tegernsee.html"
    },
    {
      name: "Bahnverbindung Holzkirchen – Bayrischzell",
      travelTimes: { "Hauptbahnhof": 85, "Ostbahnhof": 95, "Pasing": 90, "Donnersbergerbrücke": 80, "Harras": 75 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      segmentTravelTimes: [5, 11, 6, 8, 12, 5, 3, 3],
      coordinates: [
        [47.884347, 11.697457],
        [47.870830, 11.777442],
        [47.790673, 11.830755],
        [47.750241, 11.840383],
        [47.735551, 11.859838],
        [47.706296, 11.873319],
        [47.693946, 11.966048],
        [47.687766, 11.986826],
        [47.675532, 12.011274]
      ],
      color: "#d08c38",
      page: "bayrischzell.html"
    },
    {
      name: "Bahnverbindung Holzkirchen – Lenggries",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 80, "Pasing": 75, "Donnersbergerbrücke": 65, "Harras": 60 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 1, "Donnersbergerbrücke": 0, "Harras": 0 },
      segmentTravelTimes: [13, 5, 7, 4, 4, 3],
      coordinates: [
        [47.884347, 11.697457],
        [47.833447, 11.709530],
        [47.795490, 11.684140],
        [47.760585, 11.573904],
        [47.737415, 11.575487],
        [47.707764, 11.563609],
        [47.680471, 11.573557]
      ],
      color: "#d08c38",
      page: "lenggries.html"
    },
    {
      name: "Bahnverbindung Tutzing – Kochel am See",
      travelTimes: { "Hauptbahnhof": 70, "Ostbahnhof": 85, "Pasing": 65, "Donnersbergerbrücke": 75, "Harras": 95 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [13, 5, 4, 5, 5, 3, 8],
      coordinates: [
        [47.906330, 11.272567], 
        [47.861132, 11.283882], 
        [47.822625, 11.287381],
        [47.782208, 11.329077], 
        [47.749251, 11.372046], 
        [47.724002, 11.408996],
        [47.709608, 11.403400], 
        [47.660661, 11.371142]
      ],
      color: "#bb5545",
      page: "kochel-am-see.html"
    },
    {
      name: "Bahnverbindung München – Kufstein",
      travelTimes: { "Hauptbahnhof": 80, "Ostbahnhof": 70, "Pasing": 95, "Donnersbergerbrücke": 85, "Harras": 95 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 0, "Pasing": 1, "Donnersbergerbrücke": 1, "Harras": 1 },
      segmentTravelTimes: [11, 46, 5, 4, 3, 6, 5, 4],
      coordinates: [
        [48.140778, 11.554272], 
        [48.127283, 11.605590],
        [47.849596, 12.120205],
        [47.788525, 12.110218],
        [47.740858, 12.107448],
        [47.724426, 12.128067],
        [47.652436, 12.175203],
        [47.610002, 12.190948],
        [47.583680, 12.165610]
      ],
      color: "#9a6280",
      page: "kufstein.html"
    },
    {
      name: "Bahnverbindung Prien am Chiemsee – Aschau im Chiemgau",
      travelTimes: { "Hauptbahnhof": 100, "Ostbahnhof": 90, "Pasing": 120, "Donnersbergerbrücke": 115, "Harras": 125 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [7, 4, 4],
      coordinates: [
        [47.854697, 12.347171], 
        [47.827068, 12.322176], 
        [47.805644, 12.326960],
        [47.779058, 12.325614]
      ],
      color: "#b58d35",
      page: "aschau-im-chiemgau.html"
    },
    {
      name: "Bahnverbindung Murnau – Oberammergau",
      travelTimes: { "Hauptbahnhof": 105, "Ostbahnhof": 120, "Pasing": 100, "Donnersbergerbrücke": 110, "Harras": 120 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [25, 12, 12, 6, 5, 5],
      coordinates: [
        [47.681885, 11.192828], 
        [47.666798, 11.138054], 
        [47.668182, 11.055836],
        [47.665846, 11.025358], 
        [47.648426, 11.017929], 
        [47.617252, 11.030791],
        [47.5981, 11.067]
      ],
      color: "#65769a",
      page: "oberammergau.html"
    },
    {
      name: "Bahnverbindung Garmisch – Reutte in Tirol",
      travelTimes: { "Hauptbahnhof": 150, "Ostbahnhof": 165, "Pasing": 145, "Donnersbergerbrücke": 155, "Harras": 175 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [15, 9, 11, 5, 4, 4, 14, 3],
      coordinates: [
        [47.490743, 11.097927], 
        [47.483303, 11.092508], 
        [47.481024, 11.043120],
        [47.478252, 10.946625], 
        [47.410274, 10.913989], 
        [47.405565, 10.878854],
        [47.421219, 10.794141], 
        [47.442224, 10.748314], 
        [47.492940, 10.721937]
      ],
      color: "#bb5545",
      page: "reutte-in-tirol.html"
    },
    {
      name: "Bahnverbindung Kaufbeuren – Füssen",
      travelTimes: { "Hauptbahnhof": 145, "Ostbahnhof": 150, "Pasing": 140, "Donnersbergerbrücke": 145, "Harras": 165 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 2, "Pasing": 1, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [22, 3, 8, 6, 9, 6, 9, 11],
      coordinates: [
        [47.875595, 10.629684],
        [47.830001, 10.640421],
        [47.814528, 10.618399],
        [47.779682, 10.614292],
        [47.745628, 10.581187], 
        [47.697674, 10.600525],
        [47.655584, 10.613868],
        [47.614586, 10.620538],
        [47.570778, 10.696693]
      ],
      color: "#88724d",
      page: "fuessen.html"
    },
    {
      name: "Bahnverbindung Garmisch – Mittenwald",
      travelTimes: { "Hauptbahnhof": 110, "Ostbahnhof": 130, "Pasing": 105, "Donnersbergerbrücke": 120, "Harras": 125 },
      transferCounts: { "Hauptbahnhof": 0, "Ostbahnhof": 1, "Pasing": 0, "Donnersbergerbrücke": 1, "Harras": 1 },
      segmentTravelTimes: [15, 8],
      coordinates: [
        [47.490743, 11.097927], 
        [47.482850, 11.238760],
        [47.439512, 11.265611]
      ],
      color: "#bb5545",
      page: "mittenwald.html"
    },
    {
      name: "Bahnverbindung Traunstein – Ruhpolding",
      travelTimes: { "Hauptbahnhof": 110, "Ostbahnhof": 100, "Pasing": 130, "Donnersbergerbrücke": 120, "Harras": 135 },
      transferCounts: { "Hauptbahnhof": 1, "Ostbahnhof": 1, "Pasing": 2, "Donnersbergerbrücke": 2, "Harras": 2 },
      segmentTravelTimes: [15, 6, 4, 4, 4, 3],
      coordinates: [
        [47.870325, 12.639263],
        [47.838613, 12.639788],
        [47.821682, 12.646105],
        [47.811175, 12.651231],
        [47.796094, 12.638222],
        [47.771662, 12.646653],
        [47.762350, 12.648912]
      ],
      color: "#6a8b70",
      page: "ruhpolding.html"
    }
  ];
