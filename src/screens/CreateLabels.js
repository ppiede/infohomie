// Imports
import { React, useState } from "react";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { GetDataset, getFeatures, EditValues } from "../mock";
import DataEntry from "../components/DataEntry";
import { Button } from "react-bootstrap";
import { v4 } from "uuid";
import { setFeatures as setFeaturesInDB } from "../mock";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

const CreateLabels = () => {
  const dataset = GetDataset(datasetID);
  const features = getFeatures(datasetID); // Alle Features die wir besitzen

  const [newFeatures, setFeatures] = useState([]); // neuen features(titel) die hinzugefügt werden
  const [featureOptions, setFeatureOptions] = useState([
    { id: v4(), option1: "", option2: "" },
  ]); // Optionen der Features
  const [featureName, setFeatureName] = useState(""); // input

  const handleChangeInput = (id, event) => {
    const newFeatureOptions = featureOptions.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setFeatureOptions(newFeatureOptions);
  };

  const handleClick = () => {
    if (!featureName) {
      return;
    }
    setFeatures([...newFeatures, featureName]);
    setFeatureOptions([
      ...featureOptions,
      { id: v4(), option1: "", option2: "" },
    ]);
    setFeatureName("");
  };

  const renderData = () => {
    return dataset.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  const renderFeatures = () => {
    if (Object.keys(features).length == 0) {
      return <a>Bisher existieren keine Kriterien</a>;
    }

    return Object.keys(features).map((key) => {
      return (
        <a>
          {key}. {features[key].label} &nbsp; &nbsp;
        </a>
      );
    });
  };

  const renderNewFeatures = () => {
    if (newFeatures.length === 0) {
      return <a>Bisher existieren keine Kriterien</a>;
    }

    return newFeatures.map((feature, index) => {
      return (
        <div>
          <a
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            {feature}:
          </a>
          <br />
          <div style={{ marginTop: 16, marginBottom: 32 }}>
            <a>Option 1: </a>
            <input
              name="option1"
              style={{ border: "1px solid #ccc" }}
              type="text"
              value={featureOptions.option1}
              onChange={(event) =>
                handleChangeInput(featureOptions[index].id, event)
              }
            />
            <a style={{ marginLeft: 16 }}>Option 2: </a>
            <input
              name="option2"
              style={{ border: "1px solid #ccc" }}
              type="text"
              value={featureOptions.option2}
              onChange={(event) =>
                handleChangeInput(featureOptions[index].id, event)
              }
            />
          </div>
        </div>
      );
    });
  };

  const handleUploadClick = () => {
    var somethingEmpty = false;

    console.log(featureOptions);
    for (let i = 0; i < featureOptions.length - 1; i++) {
      if (featureOptions[i].option1 == "" || featureOptions[i].option2 == "") {
        somethingEmpty = true;
      }
    }

    if (somethingEmpty) {
      return;
    }

    const allFeatures = { ...features };

    for (let i = 0; i < newFeatures.length; i++) {
      let element = {};
      element["label"] = newFeatures[i];
      element["values"] = [
        featureOptions[i].option1,
        featureOptions[i].option2,
      ];
      allFeatures[`${Object.keys(features).length + i + 1}`] = element;
    }
    setFeaturesInDB(datasetID, allFeatures); // Der Aufruf klappt nicht

    for (let i = 0; i < dataset.length; i++) {
      let element = {};
      for (const [key, value] of Object.entries(features)) {
        element[`${key}`] = value.values[0];
      }
      for (let j = 0; j < newFeatures.length; j++) {
        element[`${Object.entries(features).length + j + 1}`] =
          featureOptions[j].option1;
      }
      console.log(element);
      EditValues(datasetID, i + 1, element); // Geht auch nicht
    }
  };

  return (
    <div>
      <img
        src={Logo}
        height="150"
        className="d-inline-block align-top"
        alt="You choose Logo"
      />
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

      <div>
        <p>Folgende Kriterien existieren bereits:</p>
        {renderFeatures()}
      </div>
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <input
          style={{ border: "1px solid #ccc", marginRight: "16px" }}
          type="text"
          value={featureName}
          onChange={(event) => setFeatureName(event.target.value)}
        />
        <Button onClick={handleClick}>Neues Kriterium hinzufügen</Button>
      </div>
      <br />
      <p>Neue Kriterien:</p>
      {renderNewFeatures()}
      <br />
      <Button onClick={handleUploadClick}>Kriterien hinzufügen</Button>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CreateLabels;
