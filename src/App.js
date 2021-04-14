import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { React } from "react";
import Router from "./router";
import Toolbar from "./components/Toolbar.js";
import Footer from "./components/Footer.js";

import { DBConfig } from "./DBConfig";
import { initDB } from "react-indexed-db";

//initDB(DBConfig(["tiere", "gurken", "menschen"]));
function App() {
  return (
    <div className="App">
      <Toolbar />
      <Router />
    </div>
  );
}

export default App;
