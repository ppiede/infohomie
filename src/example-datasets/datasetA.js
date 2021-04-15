import { shuffle } from "lodash";
import images from "./datasetAindex"


export const getDataset = () => {
    const dataset = [
        {
            id: 1,
            url: images.cucumber1,
            name: "Gurke1",
            features: {
                featureOne: "grün",
                featureTwo: "lang",
                featureThree: "Scheiben",
                featureFour: "einzeln",
            },
        },
        {
            id: 2,
            url: images.cucumber2,
            name: "Gurke2",
            features: {
                featureOne: "grün",
                featureTwo: "lang",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 3,
            url: images.cucumber3,
            name: "Gurke3",
            features: {
                featureOne: "grün",
                featureTwo: "lang",
                featureThree: "Scheiben",
                featureFour: "einzeln",
            },
        },
        {
            id: 4,
            url: images.cucumber4,
            name: "Gurke4",
            features: {
                featureOne: "grün",
                featureTwo: "lang",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 5,
            url: images.cucumber5,
            name: "Gurke5",
            features: {
                featureOne: "grün",
                featureTwo: "lang",
                featureThree: "Scheiben",
                featureFour: "einzeln",
            },
        },
        {
            id: 6,
            url: images.tomato1,
            name: "Tomate1",
            features: {
                featureOne: "rot",
                featureTwo: "rund",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 7,
            url: images.tomato2,
            name: "Tomate2",
            features: {
                featureOne: "grün",
                featureTwo: "rund",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 8,
            url: images.tomato3,
            name: "Tomate3",
            features: {
                featureOne: "gelb",
                featureTwo: "rund",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 9,
            url: images.tomato4,
            name: "Tomate4",
            features: {
                featureOne: "rot",
                featureTwo: "rund",
                featureThree: "ganz",
                featureFour: "mehrere",
            },
        },
        {
            id: 10,
            url: images.tomato5,
            name: "Tomate5",
            features: {
                featureOne: "rot",
                featureTwo: "rund",
                featureThree: "halbiert",
                featureFour: "mehrere",
            },
        },
    ];

    return shuffle(dataset);
};

export const getFeatures = () => {
    const features = {
        featureOne: { label: "Farbe", values: ["grün", "rot", "gelb"] },
        featureTwo: { label: "Form", values: ["lang", "rund"] },
        featureThree: { label: "Schnitt", values: ["ganz", "halbiert", "Scheiben"] },
        featureFour: { label: "Anzahl", values: ["einzeln", "mehrere"] },
    };
    return features;
};
