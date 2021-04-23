import { BrowserRouter as Router, Route } from "react-router-dom";
import DecisionTree from "../screens/DecisionTree";
import SelectTreeDataset from "../screens/SelectTreeDataset";
import CreateLabels from "../screens/CreateLabels";
import LabelPictures from "../screens/LabelPictures";
import SelectEditDataset from "../screens/SelectEditDataset";
import SelectEditMode from "../screens/SelectEditMode";
import UploadPictures from "../screens/UploadPictures";
import Help from "../screens/Help";
import NewDataset from "../screens/NewDataset";

// Verlinkungen aller Seiten für React Router
const Routes = (props) => (
  <Router {...props}>
    <Route exact path="/" component={SelectEditMode} />
    <Route path="/help" component={Help} />
    <Route path="/create-labels" component={CreateLabels} />
    <Route path="/label-pictures" component={LabelPictures} />
    <Route path="/select-edit-dataset" component={SelectEditDataset} />
    <Route path="/select-edit-mode" component={SelectEditMode} />
    <Route path="/select-tree-dataset" component={SelectTreeDataset} />
    <Route path="/upload-pictures" component={UploadPictures} />
    <Route path="/decision-tree" component={DecisionTree} />
    <Route path="/new-dataset" component={NewDataset} />
  </Router>
);

export default Routes;
