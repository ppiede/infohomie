import images from "./datasetAindex";

export const getDataset = () => {
  const dataset = [
    {
      id: 1,
      url: images.cucumber1,
      name: "Gurke1",
      category: 0,
      features: {
        1: "grün",
        2: "lang",
        3: "Scheiben",
        4: "einzeln",
      },
    },
    {
      id: 2,
      url: images.cucumber2,
      name: "Gurke2",
      category: 0,
      features: {
        1: "grün",
        2: "lang",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 3,
      url: images.cucumber3,
      name: "Gurke3",
      category: 0,
      features: {
        1: "grün",
        2: "lang",
        3: "Scheiben",
        4: "einzeln",
      },
    },
    {
      id: 4,
      url: images.cucumber4,
      name: "Gurke4",
      category: 0,
      features: {
        1: "grün",
        2: "lang",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 5,
      url: images.cucumber5,
      name: "Gurke5",
      category: 0,
      features: {
        1: "grün",
        2: "lang",
        3: "Scheiben",
        4: "einzeln",
      },
    },
    {
      id: 6,
      url: images.tomato1,
      name: "Tomate1",
      category: 1,
      features: {
        1: "rot",
        2: "rund",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 7,
      url: images.tomato2,
      name: "Tomate2",
      category: 1,
      features: {
        1: "grün",
        2: "rund",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 8,
      url: images.tomato3,
      name: "Tomate3",
      category: 1,
      features: {
        1: "rot",
        2: "rund",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 9,
      url: images.tomato4,
      name: "Tomate4",
      category: 1,
      features: {
        1: "rot",
        2: "rund",
        3: "ganz",
        4: "mehrere",
      },
    },
    {
      id: 10,
      url: images.tomato5,
      name: "Tomate5",
      category: 1,
      features: {
        1: "rot",
        2: "rund",
        3: "Scheiben",
        4: "mehrere",
      },
    },
  ];

  return dataset;
};

export const getFeatures = () => {
  const features = {
    1: { label: "Farbe", values: ["grün", "rot"] },
    2: { label: "Form", values: ["lang", "rund"] },
    3: { label: "Schnitt", values: ["ganz", "Scheiben"] },
    4: { label: "Anzahl", values: ["einzeln", "mehrere"] },
  };
  return features;
};
