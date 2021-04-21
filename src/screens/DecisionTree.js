import { React, useState, useMemo } from "react";
import { getFeatures, GetDataset } from "../mock";
import DataEntry from "../components/DataEntry";
import DecisionTreeVisualizer from "../decision-tree-visualizer";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer.js";
import { DropdownButton, Dropdown } from "react-bootstrap";

const DecisionTree = () => {
  let page = [];

  const query = new URLSearchParams(useLocation().search);
  const datasetID = query.get("id");

  const dataset = GetDataset(datasetID);

  const features = useMemo(() => getFeatures(datasetID), []);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const button1 = useState("Kriterium 1 auswählen");
  const button2 = useState("Kriterium 2 auswählen");
  const button3 = useState("Kriterium 3 auswählen");

  const handleChange1 = (event) => {
    let copy = [...selectedFeatures];
    copy[0] = event;
    setSelectedFeatures(copy);
    console.log(copy);
  };
  const handleChange2 = (event) => {
    let copy = [...selectedFeatures];
    copy[1] = event;
    setSelectedFeatures(copy);
  };
  const handleChange3 = (event) => {
    let copy = [...selectedFeatures];
    copy[2] = event;
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

      <p>Folgende Bilder existieren im Datensatz:</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {renderData()}
      </div>
      <p>
        Um nun einen Entscheidungsbaum erstellen zu können, müssern zuerst noch
        die Kriterien festgelegt werden (bis zu 3):
      </p>
      <table className="center">
        <td className="center">
          <DropdownButton
            id="dropdown-basic-button"
            title={button1}
            value={selectedFeatures[0]}
            id={0}
            onSelect={handleChange1}
          >
            {Object.keys(features).map((key, index) => {
              return (
                <Dropdown.Item eventKey={key} value={key}>
                  {features[key].label}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </td>
        <td className="center">
          <DropdownButton
            id="dropdown-basic-button"
            title={button2}
            value={selectedFeatures[1]}
            id={1}
            onSelect={handleChange2}
          >
            {Object.keys(features).map((key, index) => {
              return (
                <Dropdown.Item eventKey={key} value={key}>
                  {features[key].label}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </td>
        <td className="center">
          <DropdownButton
            id="dropdown-basic-button"
            title={button3}
            value={selectedFeatures[2]}
            id={2}
            onSelect={handleChange3}
          >
            {Object.keys(features).map((key, index) => {
              return (
                <Dropdown.Item eventKey={key} value={key}>
                  {features[key].label}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </td>
      </table>
      <DecisionTreeVisualizer
        dataset={dataset}
        features={features}
        selectedFeatures={selectedFeatures}
      />
      <div style={{ bottom: "0", width: "100%" }}>
        <br />
        <Footer />
      </div>
    </div>
  );

  page.push(body);
  //page.push(GetAll(datasetID));

  return page;
};

export default DecisionTree;
