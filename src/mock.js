import {getDataset as getDatasetA, getFeatures as getFeaturesA} from "./datasetA"
import {getDatasetB, getFeaturesB} from "./datasetB"

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