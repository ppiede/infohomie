import "./App.css";
import { React } from "react";
import Router from "./router";
import { DBConfig } from "./DBConfig";
import { initDB } from "react-indexed-db";

initDB(DBConfig(["tiere", "gurken", "menschen"]));
function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
