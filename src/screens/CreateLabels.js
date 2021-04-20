// Imports
import { React, useState, useMemo } from "react";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { GetDataset, getFeatures, setFeatures, EditValues } from '../mock'
import DataEntry from "../components/DataEntry";
import { Badge, Button } from "react-bootstrap";
import { v4 } from 'uuid';

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

const CreateLabels = () => {

  const dataset = GetDataset(datasetID);

  const features = useMemo(() => getFeatures(datasetID), []);
  const [newFeatures, setFeatures] = useState([]);
  const [featureOptions, setFeatureOptions] = useState([{ id: v4(), option1: '', option2: '' },]);
  const [featureName, setFeatureName] = useState("");

  const renderData = () => {
    return dataset.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  const renderFeatures = () => {
    var tmp = [];
    if (Object.keys(features).length == 0) {
      tmp.push(
        <a>Bisher existieren keine Kriterien</a>
      )
    } else {
      for (var i = 1; i <= Object.keys(features).length; i++) {
        tmp.push(
          <a>{i}. {features[i].label} &nbsp; &nbsp;</a>
        )
      }
    }
    return <div>{tmp}</div>;
  };

  const handleChangeInput = (id, event) => {

    const newFeatureOptions = featureOptions.map(i => {
      if (id == i.id) {

        i[event.target.name] = event.target.value
      }
      return i;
    })

    setFeatureOptions(newFeatureOptions);
  }

  const handleAddOptions = () => {
    setFeatureOptions([...featureOptions, { id: v4(), option1: '', option2: '' }])
  }

  const renderNewFeatures = () => {
    var tmp = [];
    if (Object.keys(newFeatures).length == 0) {
      tmp.push(
        <a>Bisher existieren keine Kriterien</a>
      )
    } else {
      for (var i = 0; i < Object.keys(newFeatures).length; i++) {
        tmp.push(
          <div>
            <a style={{ textDecoration: "underline", fontWeight: "bold" }}>{newFeatures[i]}:</a>
            <br />
            <a>Option 1: </a>
            <input
              name="option1"
              style={{ border: "1px solid #ccc" }}
              type="text"
              value={featureOptions.option1}
              onChange={event => handleChangeInput(featureOptions[i].id, event)}
            />
            <a> </a>
            <a>Option 2: </a>
            <input
              name="option2"
              style={{ border: "1px solid #ccc" }}
              type="text"
              value={featureOptions.option2}
              onChange={event => handleChangeInput(featureOptions[i].id, event)}
            />
            <br />
            <br />
          </div>

        )
      }
    }
    return <div>{tmp}</div>;
  };

  const handleUploadClick = (event) => {
    
    const jsonObj = {};
    const allFeatures = {};
    var oneElement = {};
    var somethingEmpty = false;
    for(var i = 1; i < Object.keys(featureOptions).length; i++) {
      if(featureOptions[i].option1 == '' || featureOptions[i].option2 == '') {
        somethingEmpty = true;
      }
    }
    if(somethingEmpty == false) {

      //Erstelle die Features
      for(var i = 0; i < Object.keys(newFeatures).length; i++) {
        var oneUp = i+1;
        oneElement["label"] = newFeatures[i];
        oneElement["values"] = [featureOptions[i+1].option1, featureOptions[i+1].option2];
        allFeatures[{oneUp}] = oneElement;
        jsonObj[i] = allFeatures;
      }
      console.log(jsonObj);
      setFeatures(datasetID, jsonObj);

      //Setze initial alle Features auf die erste Option
      var theElement = {};
      for(var i = 0; i < dataset.length; i++) {
        for(var j = 0; i < Object.keys(newFeatures).length; j++) {
          var oneUp = j+1;
          theElement[{oneUp}] = featureOptions[i+1].option1;
        }
        EditValues(datasetID, i+1, theElement);
      }
      window.location.href = "/label-pictures?id=" + datasetID;
    }
    

    

  };

  const handleClick = () => {
    if (featureName != "") {
      let copy = [...newFeatures];
      copy.push(featureName);
      setFeatures(copy);
      setFeatureName("");
      //if (Object.keys(newFeatures).length != 0) {
      handleAddOptions();
      //}
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

      <p>Folgende Kriterien existieren bereits:</p>

      {renderFeatures()}

      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ border: "none", align: "center" }}>
          <th style={{ border: "none" }}>
            <input
              style={{ border: "1px solid #ccc" }}
              type="text"
              value={featureName}
              onChange={(event) => setFeatureName(event.target.value)}
            />
          </th>
          <th style={{ border: "none" }}>
            <Button onClick={handleClick}>Neues Kriterium hinzufügen</Button>
          </th>
        </table>
        <br />
      </div>
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