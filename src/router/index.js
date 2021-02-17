import { BrowserRouter as Router, Route } from "react-router-dom";
import DecisionTree from "../screens/DecisionTree";
import Help from "../screens/Help";
import Edit from "../screens/Edit";
import New from "../screens/New";

const Routes = (props) => (
  <Router {...props}>
    <Route exact path="/" component={DecisionTree} />
    <Route path="/help" component={Help} />
    <Route path="/data" component={Edit} />
    <Route path="/new" component={New} />
  </Router>
);

export default Routes;
