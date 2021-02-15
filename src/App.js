import "./App.css";
import { React, useState, useMemo } from "react";
import { getData, getCriteria } from "./mock";
import DataEntry from "./components/DataEntry";
import DecisionTree from "./decision-tree-visualizer";

function App() {
  const data = useMemo(() => getData(), []);
  const criteria = useMemo(() => getCriteria(), []);
  const [selectedCriteria, setSelectedCriteria] = useState([]);

  const handleChange = (event) => {
    let copy = [...selectedCriteria];
    copy[event.target.id] = event.target.value;
    setSelectedCriteria(copy);
  };

  const renderData = () => {
    return data.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  console.log("t", selectedCriteria);

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
      <select value={selectedCriteria[0]} id={0} onChange={handleChange}>
        <option value="">{"Kriterium1 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>
      <select value={selectedCriteria[1]} id={1} onChange={handleChange}>
        <option value="">{"Kriterium2 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>

      <DecisionTree
        data={data}
        criteria={criteria}
        usedCriteria={selectedCriteria}
      />
    </div>
  );
}

export default App;
