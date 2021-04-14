import { React, useState, useMemo, useEffect } from "react";
import {getDataset as getDatasetA, getFeatures as getFeaturesA} from "./datasetA";
import {getDataset as getDatasetB, getFeatures as getFeaturesB} from "./datasetB";
import { shuffle } from "lodash";
import images from "./datasetA/datasetAindex"


import { IndexedDB  } from "react-indexed-db";
import { useIndexedDB  } from "react-indexed-db";


let dropDownOptions = ["Hunde und Katzen", "Gurken und Tomaten"]

export function getDatasets() {
    return dropDownOptions;
}
/*
export function getDataset(datasetID) {
    if (datasetID == 0) {
        return getDatasetA();
    } else {
        return getDatasetB();
    }
}
*/

export function GetAll(datasetID){
    InitDB(datasetID);
    
    const { getAll } = useIndexedDB(datasetID);
    const [persons, setPersons] = useState();


    useEffect(() => {
        getAll().then(personsFromDB => {      
            var tmp = []
            for(var i = 0; i < personsFromDB.length; i++ ){
                var test = personsFromDB[i]['binarydata']
                //tmp.push(<img width="500" src={'data:image/jpeg;base64,' + btoa(test)}></img>)
                var name = "Gurke"+i;
                var url = 'data:image/jpeg;base64,' + btoa(test)
                tmp.push(        
                    {
                        id: i + 1,
                        url: url,
                        name: name,
                        features: {
                            color: "grün",
                            shape: "lang",
                            cut: "Scheiben",
                            number: "einzeln",
                        },
                    },
                );
            }
            setPersons(tmp)
            console.log("tmp: " + tmp);

        });
    }, []);
    console.log("persons: "+ persons);
    return persons;

}

function InitDB(datasetID) {
    return (
      <IndexedDB
        name={datasetID}
        version={1}
        objectStoresMeta={[
          {
            store: {datasetID},
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { name: 'name', keypath: 'name', options: { unique: false } },
              { name: 'binarydata', keypath: 'binarydata', options: { unique: false } }
            ]
          }
        ]}>
      </IndexedDB>
    );
  }

export function getDataset(datasetID) {
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
}

export function getFeatures(datasetID) {
    if (datasetID == 0) {
        return getFeaturesA();
    } else {
        return getFeaturesB();
    }
}