import { shuffle } from "lodash";
import images from "./datasetBindex"

export function getDataset() {
    const dataset = [
        {
            id: 1,
            url: images.dog5,
            name: "Boston Terrier",
            category: 0,
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 2,
            url: images.dog8,
            name: "Shih Tzu",
            category: 0,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 3,
            url: images.dog2,
            name: "American Bulldog",
            category: 0,
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 4,
            url: images.dog1,
            name: "Akita",
            category: 0,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 5,
            url: images.dog3,
            name: "Australian Cattle Dog",
            category: 0,
            features: {
                featureOne: "Ja",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 6,
            url: images.dog4,
            name: "Border Collie",
            category: 0,
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 7,
            url: images.dog6,
            name: "Finnish Spitz",
            category: 0,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Sichtbar",
            },
        },
        {
            id: 8,
            url: images.dog7,
            name: "Saint Bernard",
            category: 0,
            features: {
                featureOne: "Ja",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt" },
        },
        {
            id: 9,
            url: images.cat3,
            name: "Burmese",
            category: 1,
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 10,
            url: images.cat4,
            name: "Colorpoint Shortfeature",
            category: 1,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 11,
            url: images.cat5,
            name: "Oriental",
            category: 1,
            features: {
                featureOne: "Nein",
                featureTwo: "Lang",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 12,
            url: images.cat6,
            name: "Ragdoll",
            category: 1,
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 13,
            url: images.cat7,
            name: "Scottish Fold",
            category: 1,
            features: {
                featureOne: "Nein",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Sichtbar" },
        },
        {
            id: 14,
            url: images.cat8,
            name: "Snowshoe",
            category: 1,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Offen",
                featureFour: "Versteckt" },
        },
        {
            id: 15,
            url: images.cat1,
            name: "Aegean",
            category: 1,
            features: {
                featureOne: "Ja",
                featureTwo: "Kurz",
                featureThree: "Geschlossen",
                featureFour: "Versteckt",
            },
        },
        {
            id: 16,
            url: images.cat2,
            name: "Balinese",
            category: 1,
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
