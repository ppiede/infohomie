import { shuffle } from "lodash";

export const getDataset = () => {
  const dataset = [
    {
      id: 1,
      url: "https://cdn2.thedogapi.com/images/rkZRggqVX_1280.jpg",
      name: "Boston Terrier",
      features: {
        ears: "Nein",
        hair: "Kurz",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
    {
      id: 2,
      url: "https://cdn2.thedogapi.com/images/BkrJjgcV7_1280.jpg",
      name: "Shih Tzu",
      features: {
        ears: "Ja",
        hair: "Kurz",
        eyes: "Geschlossen",
        tail: "Versteckt",
      },
    },
    {
      id: 3,
      url: "https://cdn2.thedogapi.com/images/hdERN5n5z.jpg",
      name: "American Bulldog",
      features: {
        ears: "Nein",
        hair: "Lang",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
    {
      id: 4,
      url: "https://cdn2.thedogapi.com/images/MUGiNcu_Z.jpg",
      name: "Akita",
      features: {
        ears: "Ja",
        hair: "Kurz",
        eyes: "Geschlossen",
        tail: "Versteckt",
      },
    },
    {
      id: 5,
      url: "https://cdn2.thedogapi.com/images/aBlkZ0fo0.jpg",
      name: "Australian Cattle Dog",
      features: { 
        ears: "Ja", 
        hair: "Lang", 
        eyes: "Offen", 
        tail: "Sichtbar" },
    },
    {
      id: 6,
      url: "https://cdn2.thedogapi.com/images/e4Y3H4WI3.jpg",
      name: "Border Collie",
      features: { 
        ears: "Nein", 
        hair: "Lang", 
        eyes: "Offen", 
        tail: "Sichtbar" },
    },
    {
      id: 7,
      url: "https://cdn2.thedogapi.com/images/cdvvEvgY1.png",
      name: "Finnish Spitz",
      features: {
        ears: "Ja",
        hair: "Kurz",
        eyes: "Geschlossen",
        tail: "Sichtbar",
      },
    },
    {
      id: 8,
      url: "https://cdn2.thedogapi.com/images/jtrRacj_g.jpg",
      name: "Saint Bernard",
      features: { 
        ears: "Ja", 
        hair: "Lang", 
        eyes: "Offen", 
        tail: "Versteckt" },
    },
    {
      id: 9,
      url: "https://cdn2.thecatapi.com/images/4lXnnfxac.jpg",
      name: "Burmese",
      features: {
        ears: "Nein",
        hair: "Kurz",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
    {
      id: 10,
      url: "https://cdn2.thecatapi.com/images/lOl0J96On.jpg",
      name: "Colorpoint Shorthair",
      features: { 
        ears: "Ja", 
        hair: "Kurz", 
        eyes: "Offen", 
        tail: "Sichtbar" },
    },
    {
      id: 11,
      url: "https://cdn2.thecatapi.com/images/0iSghgPeZ.jpg",
      name: "Oriental",
      features: {
        ears: "Nein",
        hair: "Lang",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
    {
      id: 12,
      url: "https://cdn2.thecatapi.com/images/qBqs3R_w4.jpg",
      name: "Ragdoll",
      features: {
        ears: "Nein",
        hair: "Kurz",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
    {
      id: 13,
      url: "https://cdn2.thecatapi.com/images/6xLEBwiUS.png",
      name: "Scottish Fold",
      features: { 
        ears: "Nein", 
        hair: "Kurz", 
        eyes: "Offen", 
        tail: "Sichtbar" },
    },
    {
      id: 14,
      url: "https://cdn2.thecatapi.com/images/4d4V586nt.jpg",
      name: "Snowshoe",
      features: { 
        ears: "Ja", 
        hair: "Kurz", 
        eyes: "Offen", 
        tail: "Versteckt" },
    },
    {
      id: 15,
      url: "https://cdn2.thecatapi.com/images/h19-vtIeX.jpg",
      name: "Aegean",
      features: {
        ears: "Ja",
        hair: "Kurz",
        eyes: "Geschlossen",
        tail: "Versteckt",
      },
    },
    {
      id: 16,
      url: "https://cdn2.thecatapi.com/images/4ndvXwCiI.jpg",
      name: "Balinese",
      features: {
        ears: "Nein",
        hair: "Lang",
        eyes: "Offen",
        tail: "Versteckt",
      },
    },
  ];

  return shuffle(dataset);
};

export const getFeatures = () => {
  const features = {
    ears: { label: "Ohren", values: ["Ja", "Nein"] },
    hair: { label: "Haarlänge", values: ["Kurz", "Lang"] },
    eyes: { label: "Augen", values: ["Offen", "Geschlossen"] },
    tail: { label: "Schwanz", values: ["Sichtbar", "Versteckt"] },
  };
  return features;
};
