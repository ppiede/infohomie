import images from "./img";

const dataset = [
  {
    id: 1,
    url: images.dog5,
    name: "Boston Terrier",
    category: 0,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 2,
    url: images.dog8,
    name: "Shih Tzu",
    category: 0,
    features: {
      1: "Nein",
      2: "Kurz",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 3,
    url: images.dog2,
    name: "American Bulldog",
    category: 0,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Geschlossen",
      4: "Sichtbar",
    },
  },
  {
    id: 4,
    url: images.dog1,
    name: "Akita",
    category: 0,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Geschlossen",
      4: "Sichtbar",
    },
  },
  {
    id: 5,
    url: images.dog3,
    name: "Australian Cattle Dog",
    category: 0,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Offen",
      4: "Versteckt",
    },
  },
  {
    id: 6,
    url: images.dog4,
    name: "Border Collie",
    category: 0,
    features: {
      1: "Nein",
      2: "Lang",
      3: "Geschlossen",
      4: "Versteckt",
    },
  },
  {
    id: 7,
    url: images.dog6,
    name: "Finnish Spitz",
    category: 0,
    features: {
      1: "Ja",
      2: "Lang",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 8,
    url: images.dog7,
    name: "Saint Bernard",
    category: 0,
    features: {
      1: "Ja",
      2: "Lang",
      3: "Geschlossen",
      4: "Versteckt",
    },
  },
  {
    id: 9,
    url: images.cat3,
    name: "Burmese",
    category: 1,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 10,
    url: images.cat4,
    name: "Colorpoint Shortfeature",
    category: 1,
    features: {
      1: "Nein",
      2: "Kurz",
      3: "Offen",
      4: "Versteckt",
    },
  },
  {
    id: 11,
    url: images.cat5,
    name: "Oriental",
    category: 1,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Geschlossen",
      4: "Sichtbar",
    },
  },
  {
    id: 12,
    url: images.cat6,
    name: "Ragdoll",
    category: 1,
    features: {
      1: "Ja",
      2: "Lang",
      3: "Offen",
      4: "Versteckt",
    },
  },
  {
    id: 13,
    url: images.cat7,
    name: "Scottish Fold",
    category: 1,
    features: {
      1: "Nein",
      2: "Kurz",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 14,
    url: images.cat8,
    name: "Snowshoe",
    category: 1,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Geschlossen",
      4: "Sichtbar",
    },
  },
  {
    id: 15,
    url: images.cat1,
    name: "Aegean",
    category: 1,
    features: {
      1: "Ja",
      2: "Kurz",
      3: "Offen",
      4: "Sichtbar",
    },
  },
  {
    id: 16,
    url: images.cat2,
    name: "Balinese",
    category: 1,
    features: {
      1: "Ja",
      2: "Lang",
      3: "Offen",
      4: "Sichtbar",
    },
  },
];

const features = {
  1: { label: "Ohren", values: ["Ja", "Nein"] },
  2: { label: "Haarlänge", values: ["Kurz", "Lang"] },
  3: { label: "Augen", values: ["Offen", "Geschlossen"] },
  4: { label: "Schwanz", values: ["Sichtbar", "Versteckt"] },
};

export { dataset, features };
