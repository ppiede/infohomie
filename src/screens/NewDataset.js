import { React, useState } from "react";
import ls from 'local-storage';

export const defaultFeatures = {
    featureOne: { label: "Farbe", values: ["grün", "rot"] },
    featureTwo: { label: "Form", values: ["lang", "rund"] },
    featureThree: { label: "Schnitt", values: ["ganz", "halbiert"] },
    featureFour: { label: "Anzahl", values: ["einzeln", "mehrere"] },
};

export function getDefaultValues(){
    return {
        featureOne: "blau",
        featureTwo: "lang",
        featureThree: "Scheiben",
        featureFour: "einzeln",
    };
}

export function getRandomValues(){
    let randFeatureOne = defaultFeatures['featureOne']['values'][Math.round(Math.random())];
    let randFeatureTwo = defaultFeatures['featureTwo']['values'][Math.round(Math.random())];
    let randFeatureThree = defaultFeatures['featureThree']['values'][Math.round(Math.random())];
    let randFeatureFour = defaultFeatures['featureFour']['values'][Math.round(Math.random())];
    return {
        featureOne: randFeatureOne,
        featureTwo: randFeatureTwo,
        featureThree: randFeatureThree,
        featureFour: randFeatureFour,
    };
}


function ContinueButton() {

    const handleClick = () => {
        var value = document.getElementById('dataset-name').value;
        alert(value);
        let datasetList = ls.get('datasetList');
        var newEntry = {
            name: value,
            features: defaultFeatures
        }

        if(datasetList == null ){

            datasetList = [newEntry];

        } else {
            var index = -1;
            for(var i = 0; i < datasetList.length; i++){
                if(datasetList[i]['name'] === value){
                    index = i;
                }
            }
            if (index == -1){
                datasetList.push(newEntry);
            }
        } 

        ls.set('datasetList', datasetList)

        window.location.href = "/upload-pictures?id=" + value;
    };

    return <button onClick={handleClick}>Datensatz anlegen</button>;
}


const NewDataset = () => {

    let page = [];

    page.push(<input type="text" id="dataset-name"/>)
    page.push(ContinueButton());

    return page;
}

export default NewDataset;