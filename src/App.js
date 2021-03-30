import "./App.css";
import { React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import Router from "./router";
import Toolbar from "./screens/Toolbar.js";
import Footer from "./screens/Footer.js";

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
