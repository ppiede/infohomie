import { React, useState, useMemo } from "react";
import { getFeatures, GetDataset } from "../mock";
import DataEntry from "../components/DataEntry";
import DecisionTreeVisualizer from "../decision-tree-visualizer";
import {Link, useLocation} from "react-router-dom";
import Logo from '../img/YouChooseLogo.png';
import Footer from "../components/Footer.js";
import {DropdownButton, Dropdown} from 'react-bootstrap';



const DecisionTree = () => {


    let page = [];


    const query = new URLSearchParams(useLocation().search);
    const datasetID = query.get("id");


    const dataset = GetDataset(datasetID);
    //console.log("dataset");
    //console.log(dataset);

    
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

    const body = (
    
    <div>

        <br />

        <p>Unsere Tierpension behaust aktuell folgende Tiere:</p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {renderData()}
        </div>
        <p>
            Jetzt wollen wir unsere Hunde von unseren Katzen trennen und müssen
            dafür Kriterien festlegen:
        </p>
        <table class="center">
            <td class="center">
                <DropdownButton id="dropdown-basic-button" title="Kriterium 1 auswählen" value={selectedFeatures[0]} id={0} onSelect={handleChange}>
                    {Object.keys(features).map((key, index) => {
                        return <Dropdown.Item value={key}>{features[key].label}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </td>
            <td class="center">
                <DropdownButton id="dropdown-basic-button" title="Kriterium 2 auswählen" value={selectedFeatures[1]} id={1} onSelect={handleChange}>
                    {Object.keys(features).map((key, index) => {
                        return <Dropdown.Item value={key}>{features[key].label}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </td>
            <td class="center">
                <DropdownButton id="dropdown-basic-button" title="Kriterium 3 auswählen" value={selectedFeatures[2]} id={2} onSelect={handleChange}>
                    {Object.keys(features).map((key, index) => {
                        return <Dropdown.Item value={key}>{features[key].label}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </td>
            <td class="center">
                <DropdownButton id="dropdown-basic-button" title="Kriterium 4 auswählen" value={selectedFeatures[3]} id={3} onSelect={handleChange}>
                    {Object.keys(features).map((key, index) => {
                        return <Dropdown.Item value={key}>{features[key].label}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </td>
        </table>
        
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
        <div style={{bottom: "0", width: "100%"}}>
            <br />
            <Footer />
        </div>
    </div>)


    page.push(body);
    //page.push(GetAll(datasetID));

    return page;
};

export default DecisionTree;
