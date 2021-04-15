import { shuffle } from "lodash";

export function getDataset() {
    const dataset = [
        {
            id: 1,
            url: "https://cdn2.thedogapi.com/images/rkZRggqVX_1280.jpg",
            name: "Boston Terrier",
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 2,
            url: "https://cdn2.thedogapi.com/images/BkrJjgcV7_1280.jpg",
            name: "Shih Tzu",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 3,
            url: "https://cdn2.thedogapi.com/images/hdERN5n5z.jpg",
            name: "American Bulldog",
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 4,
            url: "https://cdn2.thedogapi.com/images/MUGiNcu_Z.jpg",
            name: "Akita",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 5,
            url: "https://cdn2.thedogapi.com/images/aBlkZ0fo0.jpg",
            name: "Australian Cattle Dog",
            features: {
                featureOne: "Ja",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 6,
            url: "https://cdn2.thedogapi.com/images/e4Y3H4WI3.jpg",
            name: "Border Collie",
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 7,
            url: "https://cdn2.thedogapi.com/images/cdvvEvgY1.png",
            name: "Finnish Spitz",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Sichtbar",
            },
        },
        {
            id: 8,
            url: "https://cdn2.thedogapi.com/images/jtrRacj_g.jpg",
            name: "Saint Bernard",
            features: {
                featureOne: "Ja",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt" },
        },
        {
            id: 9,
            url: "https://cdn2.thecatapi.com/images/4lXnnfxac.jpg",
            name: "Burmese",
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 10,
            url: "https://cdn2.thecatapi.com/images/lOl0J96On.jpg",
            name: "Colorpoint ShortfeatureTwo",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 11,
            url: "https://cdn2.thecatapi.com/images/0iSghgPeZ.jpg",
            name: "Oriental",
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 12,
            url: "https://cdn2.thecatapi.com/images/qBqs3R_w4.jpg",
            name: "Ragdoll",
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 13,
            url: "https://cdn2.thecatapi.com/images/6xLEBwiUS.png",
            name: "Scottish Fold",
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 14,
            url: "https://cdn2.thecatapi.com/images/4d4V586nt.jpg",
            name: "Snowshoe",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt" },
        },
        {
            id: 15,
            url: "https://cdn2.thecatapi.com/images/h19-vtIeX.jpg",
            name: "Aegean",
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 16,
            url: "https://cdn2.thecatapi.com/images/4ndvXwCiI.jpg",
            name: "Balinese",
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
    ];

    return shuffle(dataset);
};

export function getFeatures() {
    const features = {
        featureOne: { label: "Ohren", values: ["Ja", "Nein"] },
        featureTwo: { label: "Haarlänge", values: ["Kurz", "Lang"] },
        featureThree: { label: "Augen", values: ["Offen", "Geschlossen"] },
        featureFour: { label: "Schwanz", values: ["Sichtbar", "Versteckt"] },
    };
    return features;
};
