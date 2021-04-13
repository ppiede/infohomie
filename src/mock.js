import {getDataset as getDatasetA, getFeatures as getFeaturesA} from "./datasetA";
import {getDataset as getDatasetB, getFeatures as getFeaturesB} from "./datasetB";

let dropDownOptions = ["Hunde und Katzen", "Gurken und Tomaten"]

export function getDatasets() {
    return dropDownOptions;
}
export function getDataset(datasetID) {
    if (datasetID == 0) {
        return getDatasetA();
    } else {
        return getDatasetB();
    }
}
export function getFeatures(datasetID) {
    if (datasetID == 0) {
        return getFeaturesA();
    } else {
        return getFeaturesB();
    }
}

export function addDataset(NewDataset) {
    if(NewDataset != null){
        //alert("newdataset: " + NewDataset);
        dropDownOptions.push(NewDataset);
        
    } 
}

export function removeDataset(Dataset) {
    if(Dataset != null){
        //alert("removedataset: " + dropDownOptions);
        dropDownOptions.pop(Dataset);
    }
}


