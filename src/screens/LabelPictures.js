import { React, useState, useMemo, useEffect } from "react";
import DataEntry from "../components/DataEntry";
import { GetDataset, getFeatures } from "../mock";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import Table from "../components/Table";
import { Button } from "react-bootstrap";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

/**
 * bereitet alle Daten für die Tabelle vor und schickt diese dann an Table 
 * @returns die anzuzeigende Seite
 */
const LabelPictures = () => {
  let page = [];

  const [files] = useState([]);
  const features = useMemo(() => getFeatures(datasetID), []);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const dataset = GetDataset(datasetID);



  /**
   * Erstellt die Ueberschriften der Tabelle
   * @returns columns
   */
  const makeColumns = () => {
    const columns = [];
    columns.push({
      Header: "Name",
      accessor: "name",
    });

    // Setze alle Featurenamen in columns
    for (let i = 1; i <= Object.keys(features).length; i++) {
      columns.push({
        Header: features[i].label,
        accessor: features[i].label,
      });
    }
    return columns;
  };

  const columns = useMemo(() => makeColumns(), [features, files]);

  /**
   * Erstellt Array mit allen Bildernamen und Featurenamen
   * @returns data
   */
  const makeData = () => {
    const data = [];

    // Setze alle Bildernamen in obj
    for (let i = 0; i < dataset.length; i++) {
      let obj = { name: dataset[i].name };

      // Setze die Features in obj
      for (var feature in features) {
        obj[feature] = dataset[i]["features"][feature];
      }

      // packe alle Daten von obj in data
      data.push(obj);
    }
    return data;
  };

  /**
   * Weiterleitung zum Entscheidungsbaum
   */
  const redirect = () => {
    window.location.href = "/decision-tree?id=" + datasetID;
  }

  const data = makeData();

  /**
   * Rendert alle nötigen Daten
   * @returns die fertige Seite
   */
  const renderData = () => {
    return dataset.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  page.push(
    <img
      src={Logo}
      height="150"
      className="d-inline-block align-top"
      alt="You choose Logo"
    />
  );

  page.push(<a>&nbsp;</a>);
  page.push(
    <div
      style={{
        marginTop: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
      <p>Hier können die Kriterien zugeordnet werden (blau = aktuelle Information):</p>
      <div />
      <div />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        <Table columns={columns} data={data} />
      </div>
      <br />
      <Button onClick={redirect}>Zum Entscheidungsbaum</Button>
      <br />
      <Footer />
    </div>
  );

  return page;
};

export default LabelPictures;
