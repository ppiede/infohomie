import "./App.css";
import { React, useState, useMemo } from "react";
import { getData, getCriteria } from "./mock";
import DataEntry from "./components/DataEntry";
import DecisionTree from "./decision-tree-visualizer";

function App() {
  const data = useMemo(() => getData(), []);
  const criteria = useMemo(() => getCriteria(), []);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const usedCriteria = ["ears", "hair"];

  const renderLeftSide = (key) => {
    if (!key) {
      return null;
    }
    const renderedData = data
      .filter((data) => data.criteria[key] === criteria[key].options[0])
      .map((value, index) => {
        return (
          <DataEntry key={index} url={value.url} name={value.name} size={150} />
        );
      });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid grey",
        }}
      >
        <p>{criteria[key].options[0]}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: 400,
          }}
        >
          {renderedData}
        </div>
      </div>
    );
  };

  const renderRightSide = (key) => {
    if (!key) {
      return null;
    }
    const renderedData = data
      .filter((data) => data.criteria[key] === criteria[key].options[1])
      .map((value) => {
        return (
          <DataEntry
            key={value.id}
            url={value.url}
            name={value.name}
            size={150}
          />
        );
      });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid grey",
        }}
      >
        <p>{criteria[key].options[1]}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: 400,
          }}
        >
          {renderedData}
        </div>
      </div>
    );
  };

  const renderData = () => {
    return data.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  return (
    <div className="App">
      <p>Unsere Tierpension behaust aktuell folgende Tiere:</p>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {renderData()}
      </div>
      <p>
        Jetzt wollen wir unsere Hunde von unseren Katzen trennen und müssen
        dafür Kriterien festlegen:
      </p>
      <select
        value={value1}
        onChange={(event) => setValue1(event.target.value)}
      >
        <option value="">{"Kriterium1 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>
      <select
        value={value2}
        onChange={(event) => setValue2(event.target.value)}
      >
        <option value="">{"Kriterium2 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>

      <DecisionTree
        data={data}
        criteria={criteria}
        usedCriteria={usedCriteria}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }} />
        <div
          style={{
            flex: 1,
          }}
        >
          {renderLeftSide(value1)}
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            flex: 1,
          }}
        >
          {renderRightSide(value1)}
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}

export default App;
