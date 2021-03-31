import {getDataset as getDatasetA, getFeatures as getFeaturesA} from "./datasetA"
import {getDataset as getDatasetB, getFeatures as getFeaturesB} from "./datasetB"

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
export function getDatasets() {
    let dropDownOptions = ["Gurken und Tomaten", "Katzen und Hunde", "Test"];
    return dropDownOptions;
}

