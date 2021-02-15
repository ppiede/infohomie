import { shuffle } from "lodash";

export const getData = () => {
  const data = [
    {
      id: 1,
      url: "https://cdn2.thedogapi.com/images/rkZRggqVX_1280.jpg",
      name: "Boston Terrier",
      criteria: { ears: "Nein", hair: "Kurz" },
    },
    {
      id: 2,
      url: "https://cdn2.thedogapi.com/images/BkrJjgcV7_1280.jpg",
      name: "Shih Tzu",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 3,
      url: "https://cdn2.thedogapi.com/images/hdERN5n5z.jpg",
      name: "American Bulldog",
      criteria: { ears: "Nein", hair: "Lang" },
    },
    {
      id: 4,
      url: "https://cdn2.thedogapi.com/images/MUGiNcu_Z.jpg",
      name: "Akita",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 5,
      url: "https://cdn2.thedogapi.com/images/aBlkZ0fo0.jpg",
      name: "Australian Cattle Dog",
      criteria: { ears: "Ja", hair: "Lang" },
    },
    {
      id: 6,
      url: "https://cdn2.thedogapi.com/images/e4Y3H4WI3.jpg",
      name: "Border Collie",
      criteria: { ears: "Nein", hair: "Lang" },
    },
    {
      id: 7,
      url: "https://cdn2.thedogapi.com/images/cdvvEvgY1.png",
      name: "Finnish Spitz",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 8,
      url: "https://cdn2.thedogapi.com/images/jtrRacj_g.jpg",
      name: "Saint Bernard",
      criteria: { ears: "Ja", hair: "Lang" },
    },
    {
      id: 9,
      url: "https://cdn2.thecatapi.com/images/4lXnnfxac.jpg",
      name: "Burmese",
      criteria: { ears: "Nein", hair: "Kurz" },
    },
    {
      id: 10,
      url: "https://cdn2.thecatapi.com/images/lOl0J96On.jpg",
      name: "Colorpoint Shorthair",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 11,
      url: "https://cdn2.thecatapi.com/images/0iSghgPeZ.jpg",
      name: "Oriental",
      criteria: { ears: "Nein", hair: "Lang" },
    },
    {
      id: 12,
      url: "https://cdn2.thecatapi.com/images/qBqs3R_w4.jpg",
      name: "Ragdoll",
      criteria: { ears: "Nein", hair: "Kurz" },
    },
    {
      id: 13,
      url: "https://cdn2.thecatapi.com/images/6xLEBwiUS.png",
      name: "Scottish Fold",
      criteria: { ears: "Nein", hair: "Kurz" },
    },
    {
      id: 14,
      url: "https://cdn2.thecatapi.com/images/4d4V586nt.jpg",
      name: "Snowshoe",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 15,
      url: "https://cdn2.thecatapi.com/images/h19-vtIeX.jpg",
      name: "Aegean",
      criteria: { ears: "Ja", hair: "Kurz" },
    },
    {
      id: 16,
      url: "https://cdn2.thecatapi.com/images/4ndvXwCiI.jpg",
      name: "Balinese",
      criteria: { ears: "Nein", hair: "Lang" },
    },
  ];

  return shuffle(data);
};

export const getCriteria = () => {
  const criteria = {
    ears: { label: "Ohren", options: ["Ja", "Nein"] },
    hair: { label: "Haarlänge", options: ["Kurz", "Lang"] },
  };
  return criteria;
};
