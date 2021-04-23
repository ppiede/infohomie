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
const features = getFeatures(datasetID); // die schon existierenden Features

/**
 * Ermöglicht den User die Erstellung neuer Features und deren Optionen
 * @returns die fertige Seite
 */
const CreateLabels = () => {

  // Alle Features die wir besitzen
  const dataset = GetDataset(datasetID);
  const [newFeatures, setFeatures] = useState([]); // neuen features(titel) die hinzugefügt werden
  const [featureOptions, setFeatureOptions] = useState([
    { id: v4(), option1: "", option2: "" },
  ]); // Optionen der Features
  const [featureName, setFeatureName] = useState(""); // input

  /**
   * Überprüft die Eingabe in das Textfeld und Updatet die Daten
   * @param {*} id die ID des jeweiligen Optionsatzes
   * @param {*} event das getriggerte Event
   */
  const handleChangeInput = (id, event) => {
    const newFeatureOptions = featureOptions.map((i) => {
      // Updatet nur, wenn die ID übereinstimmt
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setFeatureOptions(newFeatureOptions);
  };

  /**
   * Bei Klick auf dem Button wird das neue Feature mitsamt den zwei Optionen erstellt
   * @returns wenn kein Name gesetzt wurde
   */
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

  /**
   * Rendert alle Bilder
   * @returns 
   */
  const renderData = () => {
    return dataset.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  /**
   * Rendert alle schon bestehenden Features
   * @returns 
   */
  const renderFeatures = () => {
    if (Object.keys(features).length == 0) {
      return <a>Bisher existieren keine Kriterien</a>;
    }

    // Nehme alle Features und zeige sie an
    return Object.keys(features).map((key) => {
      return (
        <a>
          {key}. {features[key].label} &nbsp; &nbsp;
        </a>
      );
    });
  };

  /**
   * Rendert alle neu gesetzten Features
   * @returns 
   */
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

  /**
   * Um ID-Setzprobleme vorzubeugen
   * Macs setzen die ID zum Teil nicht bei 1 
   * @returns die niedrigste ID im Datensatz
   */
  const getLowestID = () => {

    let theLowestID = dataset[0].id;

    for (let i = 1; i < dataset.length; i++) {
      if (dataset[i].id < theLowestID) {
        theLowestID = dataset[i].id;
      }
    }
    return theLowestID;
  }

  /**
   * Setzt alle neue Features in den Datensatz
   * @returns 
   */
  const handleUploadClick = () => {

    // Hilfsvariable zur Prüfung, ob irgendeine Option noch nicht gesetzt wurde
    var somethingEmpty = false;

    for (let i = 0; i < featureOptions.length - 1; i++) {
      if (featureOptions[i].option1 == "" || featureOptions[i].option2 == "") {
        somethingEmpty = true;
      }
    }

    if (somethingEmpty) {
      return;
    }

    const allFeatures = { ...features };

    // Übersetze alle Inputs in das richtige JSON-Format, 
    // um die Informationen in der Datenbank zu updaten
    for (let i = 0; i < newFeatures.length; i++) {
      let element = {};
      element["label"] = newFeatures[i];
      element["values"] = [
        featureOptions[i].option1,
        featureOptions[i].option2,
      ];
      allFeatures[`${Object.keys(features).length + i + 1}`] = element;
    }
    setFeaturesInDB(datasetID, allFeatures);

    for (let i = 0; i < dataset.length; i++) {
      let element = {};
      for (const [key, value] of Object.entries(features)) {
        if (key < Object.keys(features).length+1) {
          element[`${key}`] = dataset[i].features[key];
        } else {
          element[`${key}`] = value.values[0];
        }
      }
      for (let j = 0; j < newFeatures.length; j++) {
        element[`${Object.entries(features).length + j + 1}`] =
          featureOptions[j].option1;
      }
      let lowestID = getLowestID();

      EditValues(datasetID, dataset[i].name, element);
    }

    alert("Kriterien wurden hinzugefügt");

    // Verzögerung zum richtigen Updaten der Daten
    setTimeout(function () {
      window.location.href = "/label-pictures?id=" + datasetID;
    }, 2000);
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
