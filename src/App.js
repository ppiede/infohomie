import logo from "./logo.svg";
import "./App.css";
import { React, useState } from "react";
import Button from "./Button";

function App() {
  const test = () => {
    console.log("test");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Hallo Leute
        </a>
        <Button default={10} test={test} />
      </header>
    </div>
  );
}

export default App;
