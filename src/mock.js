import { React, useState } from "react";
import {
  dataset as datasetCucumberTomato,
  features as featuresCucumberTomato,
} from "./example-datasets/cucumber-tomato";
import {
  dataset as datasetDogCat,
  features as featuresDogCat,
} from "./example-datasets/dog-cat";
import ls from "local-storage";
import { IndexedDB } from "react-indexed-db";
import { useIndexedDB } from "react-indexed-db";

/**
 * Initializes a IndexedDB with the given datasetID and an objectStore with the same
 * ID
 * 
 * @param {*} datasetID Id of the DB and the objectStore
 */
export function InitDB(datasetID) {
  return (
    <IndexedDB
      name={datasetID}
      version={1}
      objectStoresMeta={[
        {
          store: { datasetID },
          storeConfig: { keyPath: "id", autoIncrement: true },
          storeSchema: [
            { name: "name", keypath: "name", options: { unique: false } },
            {
              name: "category",
              keypath: "category",
              options: { unique: false },
            },
            {
              name: "binarydata",
              keypath: "binarydata",
              options: { unique: false },
            },
            { name: "values", keypath: "values", options: { unique: false } },
          ],
        },
      ]}
    ></IndexedDB>
  );
}

/**
 * Getter for a List of existing Datasets. Creates the 
 * example Datasets if they don't exist. 
 * @returns An array of the Dataset names.
 */
export function getDatasets() {
  let datasetList = ls.get("datasetList");

  if (datasetList == null || datasetList === []) {
    setFeatures("Hunde und Katzen", featuresDogCat);
    setFeatures("Tomaten und Gurken", featuresCucumberTomato);
  }

  datasetList = ls.get("datasetList");
  var dropDownOptions = [];
  for (var i = 0; i < datasetList.length; i++) {
    dropDownOptions.push(datasetList[i]["name"]);
  }
  return dropDownOptions;
}

/**
 * Getter for a specific dataset. The dataset is returned in JSON format.
 * Part of the dataset (image, name, id) is read from IndexedDB, the values 
 * of the pictures are read from Localstorage. 
 * 
 * @param {} datasetID 
 */
export function GetDataset(datasetID) {
  InitDB(datasetID);

  try {
    useIndexedDB(datasetID);
  } catch (Error) {
    window.location.reload();
  }
  const { getAll } = useIndexedDB(datasetID);
  const [pictures, setPictures] = useState([]);

  // Special treatment of example Datasets, because they
  // are not stored in the IndexedDB.
  if (datasetID === "Hunde und Katzen") {
    copyValuesIntoLS(datasetID);
    let tmp = []
    for(var i = 0; i < datasetDogCat.length; i++){
      let datasetValues = ls.get(datasetID);
      tmp.push({
        id: datasetDogCat[i].id,
        url: datasetDogCat[i].url,
        category: datasetDogCat[i].category,
        name: datasetDogCat[i].name,
        features: datasetValues[datasetDogCat[i].name],
      });
    }
    return tmp;
  } else if (datasetID === "Tomaten und Gurken") {
    copyValuesIntoLS(datasetID);
    let tmp = []
    for(var j = 0; j < datasetCucumberTomato.length; j++){
      let datasetValues = ls.get(datasetID);
      tmp.push({
        id: datasetCucumberTomato[j].id,
        url: datasetCucumberTomato[j].url,
        category: datasetCucumberTomato[j].category,
        name: datasetCucumberTomato[j].name,
        features: datasetValues[datasetCucumberTomato[j].name],
      });
    }
    return tmp;
  }

  // Other Datasets are handeled here
  getAll().then((picturesFromDB) => {
    var tmp = [];
    for (var i = 0; i < picturesFromDB.length; i++) {
      var binarydata = picturesFromDB[i]["binarydata"];
      var name = picturesFromDB[i]["name"];
      let datasetValues = ls.get(datasetID);
      if(datasetValues == null){
        datasetValues = {};
      }
      var label = datasetValues[name];
      var url = "data:image/jpeg;base64," + btoa(binarydata);
      var id = picturesFromDB[i]["id"];
      var category = picturesFromDB[i]["category"];

      tmp.push({
        id: id,
        url: url,
        category: category,
        name: name,
        features: label,
      });
    }
    setPictures(tmp);
  });

  return pictures;
}

/**
 * Edit the values of a picture in a dataset. For example,
 * change a cat from having visible ears to having not 
 * visible ears.
 * 
 * @param {*} datasetID The Name of the Dataset
 * @param {*} name The filename of the image
 * @param {*} newValues The new Values for the Image (JSON)
 */
export function EditValues(datasetID, name, newValues) {
  let datasetValues = ls.get(datasetID);
  if(datasetValues == null){
    datasetValues = {};
  }
  datasetValues[name] = newValues;
  ls.set(datasetID, datasetValues);

}

/**
 * Get the features of a dataset including all possible
 * values for that feature. For example, for cats and dogs 
 * one feature would be "ears" with values "visible" and 
 * "invisible"
 * @param {*} datasetID The name of the dataset.
 */
export function getFeatures(datasetID) {

  let datasetList = ls.get("datasetList");
  if (datasetList == null) {
    return [];
  }
  var index = -1;
  for (var i = 0; i < datasetList.length; i++) {
    if (datasetList[i]["name"] === datasetID) {
      index = i;
    }
  }
  
  if (index !== -1) {
    return datasetList[index]["features"];
  }
}

/**
 * Change the features of a dataset. 
 * @param {*} datasetID The name of the dataset
 * @param {*} features The new features.
 */
export function setFeatures(datasetID, features) {

  let datasetList = ls.get("datasetList");
  var newEntry;

  if (datasetList === null) {
    newEntry = {
      name: datasetID,
      features: features,
    };
    datasetList = [newEntry];
    ls.set("datasetList", datasetList);  

  } else {
    var index = -1;
    for (var i = 0; i < datasetList.length; i++) {
      if (datasetList[i]["name"] === datasetID) {
        index = i;
      }
    }
    if (index !== -1) {
      datasetList[index]["features"] = features;
      ls.set("datasetList", datasetList); 

    } else {
      newEntry = {
        name: datasetID,
        features: features,
      };
      datasetList.push(newEntry);
      ls.set("datasetList", datasetList);  
    }
  }
}

/**
 * Add a picture to the IndexedDB. Also needed are the dataset
 * to store the Image in, the picture file, the values of the picture
 * (no longer used) and the category, so if a picture is a dog (0) or 
 * a cat (1).
 * 
 * @param {*} datasetID The name of the dataset
 * @param {*} file The imagefile
 * @param {*} values The values (no longer used)
 * @param {*} category The category (0 or 1 for example cat or dog)
 */
export function AddImgs(datasetID, file, values, category) {
  InitDB(datasetID);

  let datasetValues = ls.get(datasetID);
  if(datasetValues == null){
    datasetValues = {};
  }
  datasetValues[file.name] = values;
  ls.set(datasetID, datasetValues);

  let bits;

  const { add } = useIndexedDB(datasetID);

  var reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = function (e) {
    bits = e.target.result;
    add({
      name: file.name,
      category: category,
      binarydata: bits,
      values: values,
    });
  };
}

/**
 * Copies the values for the example-datasets from the hardcoded JSON 
 * into the localstorage, so it can be edited by the user.
 * @param {*} datasetID Name of the Example-Dataset
 */
function copyValuesIntoLS(datasetID){
  
  let datasetValues = ls.get(datasetID);
  if(datasetValues !== null && datasetValues !== {}){
    return;
  }

  datasetValues = {};
  
  if(datasetID === "Hunde und Katzen"){
    for(var i = 0; i < datasetDogCat.length; i++){
      datasetValues[datasetDogCat[i].name] = datasetDogCat[i].features;
    }
    ls.set(datasetID, datasetValues);

  } else if (datasetID === "Tomaten und Gurken"){
    for(var i = 0; i < datasetCucumberTomato.length; i++){
      datasetValues[datasetCucumberTomato[i].name] = datasetCucumberTomato[i].features;
    }
    ls.set(datasetID, datasetValues);
  }
  
}
