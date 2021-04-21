import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { React } from "react";
import Router from "./router";
import Toolbar from "./components/Toolbar.js";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Router />
    </div>
  );
}

export default App;
