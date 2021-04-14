import { React, useState, useMemo, useEffect } from "react";
import {getDataset as getDatasetA, getFeatures as getFeaturesA} from "./datasetA";
import {getDataset as getDatasetB, getFeatures as getFeaturesB} from "./datasetB";
import { shuffle } from "lodash";
import images from "./datasetA/datasetAindex"
import ls from 'local-storage';



import { IndexedDB  } from "react-indexed-db";
import { useIndexedDB  } from "react-indexed-db";


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
              { name: 'binarydata', keypath: 'binarydata', options: { unique: false } },
              { name: 'values', keypath: 'values', options: { unique: false } }
            ]
          }
        ]}>
      </IndexedDB>
    );
}


export function getDatasets() {
    let datasetList = ls.get('datasetList');
    if(datasetList == null ){
       datasetList = [];
    }
    ls.set('datasetList', datasetList)
    datasetList = ls.get('datasetList');
    var dropDownOptions = [];
    for(var i = 0; i < datasetList.length; i++){
        dropDownOptions.push(datasetList[i]['name']);
    }
    return dropDownOptions;
}


export function GetDataset(datasetID){
    InitDB(datasetID);
    
    const { getAll } = useIndexedDB(datasetID);
    const [pictures, setPictures] = useState([]);

    
    getAll().then(picturesFromDB => {      
        var tmp = []
        for(var i = 0; i < picturesFromDB.length; i++ ){
            var binarydata = picturesFromDB[i]['binarydata']
            //tmp.push(<img width="500" src={'data:image/jpeg;base64,' + btoa(test)}></img>)
            var name = picturesFromDB[i]['name'];
            var url = 'data:image/jpeg;base64,' + btoa(binarydata);
            var id = picturesFromDB[i]['id'];
            var label = picturesFromDB[i]['values']
            tmp.push(        
                {
                    id: id,
                    url: url,
                    name: name,
                    features: label,
                },
            );
        }
        setPictures(tmp)
        console.log("tmp: " + tmp);

    });

    console.log("pictures: "+ pictures);
    return pictures;

}

function ById(datasetID, id) {
    const { getByID } = useIndexedDB(datasetID);
    const [picture, setPicture] = useState();
   

    getByID(id).then(pictureFromDB => {
        setPicture(pictureFromDB);
    });

    return picture;
}

export function EditValues(datasetID, id, newValues) {
    const { update } = useIndexedDB(datasetID);

    let oldPicture = ById(datasetID, id);

    let oldName = oldPicture['name'];
    let oldBinary = oldPicture['binarydata'];
   

    update({ id: id, name: oldName, binarydata: oldBinary, values: newValues}).then(event => {
        alert('Edited!');
    });

  }


export function getFeatures(datasetID) {
    let datasetList = ls.get('datasetList');
    if(datasetList == null){return []}
    var index = -1;
    for(var i = 0; i < datasetList.length; i++){
        if(datasetList[i]['name'] === datasetID){
            index = i;
        }
    }
    if (index !== -1){
        return datasetList[index]['features']
    }
    /*
    if (datasetID == 0) {
        return getFeaturesA();
    } else {
        return getFeaturesB();
    }
    */
}

  /*
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
*/
