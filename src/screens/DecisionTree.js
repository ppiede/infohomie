import { React, useState, useMemo } from "react";
import { getDataset, getFeatures } from "../mock";
import DataEntry from "../components/DataEntry";
import DecisionTreeVisualizer from "../decision-tree-visualizer";
import {Link, useLocation} from "react-router-dom";
import HeaderFull from "../components/HeaderFull";


const DecisionTree = () => {

    let page = [];
    const query = new URLSearchParams(useLocation().search);
    const datasetID = query.get("id");

    const header = HeaderFull("show");
    page.push(header);

    const dataset = useMemo(() => getDataset(datasetID), []);
    const features = useMemo(() => getFeatures(datasetID), []);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

      const handleChange = (event) => {
        let copy = [...selectedFeatures];
        copy[event.target.id] = event.target.value;
        setSelectedFeatures(copy);
      };

      const renderData = () => {
        return dataset.map((value, index) => {
          return (
            <DataEntry key={index} url={value.url} name={value.name} size={150} />
          );
        });
      };

    const body = (<div>
        <p>Unsere Tierpension behaust aktuell folgende Tiere:</p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {renderData()}
        </div>
        <p>
            Jetzt wollen wir unsere Hunde von unseren Katzen trennen und müssen
            dafür Kriterien festlegen:
        </p>
        <select value={selectedFeatures[0]} id={0} onChange={handleChange}>
            <option value="">{"Kriterium 1 auswählen"}</option>
            {Object.keys(features).map((key, index) => {
                return <option value={key}>{features[key].label}</option>;
            })}
        </select>
        <select value={selectedFeatures[1]} id={1} onChange={handleChange}>
            <option value="">{"Kriterium 2 auswählen"}</option>
            {Object.keys(features).map((key, index) => {
                return <option value={key}>{features[key].label}</option>;
            })}
        </select>
        <select value={selectedFeatures[2]} id={2} onChange={handleChange}>
            <option value="">{"Kriterium 3 auswählen"}</option>
            {Object.keys(features).map((key, index) => {
                return <option value={key}>{features[key].label}</option>;
            })}
        </select>
        <select value={selectedFeatures[3]} id={3} onChange={handleChange}>
            <option value="">{"Kriterium 4 auswählen"}</option>
            {Object.keys(features).map((key, index) => {
                return <option value={key}>{features[key].label}</option>;
            })}
        </select>
        <DecisionTreeVisualizer
            dataset={dataset}
            features={features}
            selectedFeatures={selectedFeatures}
        />
    </div>)


    page.push(body);

    return page;
};

export default DecisionTree;
