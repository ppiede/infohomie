import { BrowserRouter as Router, Route } from "react-router-dom";
import DecisionTree from "../screens/DecisionTree";
import Main from "../screens/Main";
import CreateLabels from "../screens/CreateLabels";
import LabelPictures from "../screens/LabelPictures";
import SelectEditDataset from "../screens/SelectEditDataset";
import SelectEditMode from "../screens/SelectEditMode";
import UploadPictures from "../screens/UploadPictures";
import Help from "../screens/Help";
import Edit from "../screens/Edit";

const Routes = (props) => (
  <Router {...props}>
    <Route exact path="/" component={Main} />
    <Route path="/help" component={Help} />
    <Route path="/create-labels" component={CreateLabels} />
    <Route path="/label-pictures" component={LabelPictures} />
    <Route path="/select-edit-dataset" component={SelectEditDataset} />
    <Route path="/select-edit-mode" component={SelectEditMode} />
    <Route path="/upload-pictures" component={UploadPictures} />
    <Route path="/decision-tree" component={DecisionTree} />
    <Route path="/edit" component={Edit} />
  </Router>
);

export default Routes;
