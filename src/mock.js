import { React, useState } from "react";
import {
  getDataset as getDatasetA,
  getFeatures as getFeaturesA,
} from "./example-datasets/datasetA";
import {
  getDataset as getDatasetB,
  getFeatures as getFeaturesB,
} from "./example-datasets/datasetB";
import ls from "local-storage";
import { IndexedDB } from "react-indexed-db";
import { useIndexedDB } from "react-indexed-db";

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

export function getDatasets() {
  let datasetList = ls.get("datasetList");

  if (datasetList == null || datasetList == []) {
    datasetList = [];
    var hundeUndKatzen = {
      name: "Hunde und Katzen",
      features: getFeaturesB(),
    };
    var tomatenUndGurken = {
      name: "Tomaten und Gurken",
      features: getFeaturesA(),
    };
    datasetList = [hundeUndKatzen, tomatenUndGurken];
  }
  ls.set("datasetList", datasetList);
  datasetList = ls.get("datasetList");
  var dropDownOptions = [];
  for (var i = 0; i < datasetList.length; i++) {
    dropDownOptions.push(datasetList[i]["name"]);
  }
  return dropDownOptions;
}

export function GetDataset(datasetID) {
  InitDB(datasetID);

  try {
    useIndexedDB(datasetID);
  } catch (Error) {
    window.location.reload();
  }
  const { getAll } = useIndexedDB(datasetID);
  const [pictures, setPictures] = useState([]);

  if (datasetID === "Hunde und Katzen") {
    return getDatasetB();
  } else if (datasetID === "Tomaten und Gurken") {
    return getDatasetA();
  }

  getAll().then((picturesFromDB) => {
    var tmp = [];
    for (var i = 0; i < picturesFromDB.length; i++) {
      var binarydata = picturesFromDB[i]["binarydata"];
      //tmp.push(<img width="500" src={'data:image/jpeg;base64,' + btoa(test)}></img>)
      var name = picturesFromDB[i]["name"];
      var url = "data:image/jpeg;base64," + btoa(binarydata);
      var id = picturesFromDB[i]["id"];
      var category = picturesFromDB[i]["category"];
      var label = picturesFromDB[i]["values"];
      tmp.push({
        id: id,
        url: url,
        category: category,
        name: name,
        features: label,
      });
    }
    setPictures(tmp);
    //console.log("tmp: " + tmp);
  });

  //console.log("pictures: "+ pictures);
  return pictures;
}

export function EditValues(datasetID, id, newValues) {
  const { getByID } = useIndexedDB(datasetID);
  const { update } = useIndexedDB(datasetID);

  getByID(id).then((pictureFromDB) => {
    console.log("id" + id);
    console.log(pictureFromDB);

    let oldName = pictureFromDB["name"];
    let oldBinary = pictureFromDB["binarydata"];
    let oldCategory = pictureFromDB["category"];
    update({
      id: id,
      name: oldName,
      category: oldCategory,
      binarydata: oldBinary,
      values: newValues,
    }).then((event) => {
      alert("Edited!");
    });
  });
}

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

export function setFeatures(datasetID, features) {
  let datasetList = ls.get("datasetList");
  if (datasetList == null) {
    return;
  }
  var index = -1;
  for (var i = 0; i < datasetList.length; i++) {
    if (datasetList[i]["name"] === datasetID) {
      index = i;
    }
  }
  if (index !== -1) {
    datasetList[index]["features"] = features;
  }
}

export function AddImgs(datasetID, file, values, category) {
  InitDB(datasetID);

  let bits;

  const { add } = useIndexedDB(datasetID);

  var reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = function (e) {
    //alert(e.target.result);
    bits = e.target.result;
    //var values = getDefaultValues();
    add({
      name: file.name,
      category: category,
      binarydata: bits,
      values: values,
    });
  };
}
