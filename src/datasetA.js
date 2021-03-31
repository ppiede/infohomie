import { shuffle } from "lodash";
import images from "./datasetA/datasetAindex"


export const getDataset = () => {
    const dataset = [
        {
            id: 1,
            url: images.cucumber1,
            name: "Gurke1",
            features: {
                color: "grün",
                shape: "lang",
                cut: "Scheiben",
                number: "einzeln",
            },
        },
        {
            id: 2,
            url: images.cucumber2,
            name: "Gurke2",
            features: {
                color: "grün",
                shape: "lang",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 3,
            url: images.cucumber3,
            name: "Gurke3",
            features: {
                color: "grün",
                shape: "lang",
                cut: "Scheiben",
                number: "einzeln",
            },
        },
        {
            id: 4,
            url: images.cucumber4,
            name: "Gurke4",
            features: {
                color: "grün",
                shape: "lang",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 5,
            url: images.cucumber5,
            name: "Gurke5",
            features: {
                color: "grün",
                shape: "lang",
                cut: "Scheiben",
                number: "einzeln",
            },
        },
        {
            id: 6,
            url: images.tomato1,
            name: "Tomate1",
            features: {
                color: "rot",
                shape: "rund",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 7,
            url: images.tomato2,
            name: "Tomate2",
            features: {
                color: "grün",
                shape: "rund",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 8,
            url: images.tomato3,
            name: "Tomate3",
            features: {
                color: "gelb",
                shape: "rund",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 9,
            url: images.tomato4,
            name: "Tomate4",
            features: {
                color: "rot",
                shape: "rund",
                cut: "ganz",
                number: "mehrere",
            },
        },
        {
            id: 10,
            url: images.tomato5,
            name: "Tomate5",
            features: {
                color: "rot",
                shape: "rund",
                cut: "halbiert",
                number: "mehrere",
            },
        },
    ];

    return shuffle(dataset);
};

export const getFeatures = () => {
    const features = {
        color: { label: "Farbe", values: ["grün", "rot", "gelb"] },
        shape: { label: "Form", values: ["lang", "rund"] },
        cut: { label: "Schnitt", values: ["ganz", "halbiert", "Scheiben"] },
        number: { label: "Anzahl", values: ["einzeln", "mehrere"] },
    };
    return features;
};
