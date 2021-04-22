import { React, useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DataEntry from "../components/DataEntry";
import { getDefaultValues } from "./NewDataset";
import { GetDataset, AddImgs } from "../mock";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { getFeatures, setFeatures } from "../mock";
import Table from "../components/Table";

// Wenn man auf einen Button drückt, dann speichert der nicht
const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

function redirect(event) {
  console.log(event.target.value);
  this.props.history.push("/create-labels?id=" + event.target.value);
}
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



  // Erstellt die Ueberschriften der Tabelle
  const makeColumns = () => {
    const columns = [];
    columns.push({
      Header: "Name",
      accessor: "name",
    });

    for (let i = 1; i <= Object.keys(features).length; i++) {
      columns.push({
        Header: features[i].label,
        accessor: features[i].label,
      });
    }
    return columns;
  };

  const columns = useMemo(() => makeColumns(), [features, files]);

  // Erstellt Array mit allen Bildernamen und Featurenamen
  const makeData = () => {
    const data = [];

    for (let i = 0; i < dataset.length; i++) {
      let obj = { name: dataset[i].name };

      for (var feature in features) {
        obj[feature] = dataset[i]["features"][feature];
      }
      /*
      for (let j = 0; j < features.length; j++) {
        
        obj[features[j]] = false;
      }
      */
     console.log(obj);
      data.push(obj);
    }
    return data;
  };

  const [data] = useState(makeData());

  // Rendert die noetigen Daten
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

  //page.push(AddImgs());
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
      <p>Hier können die Kriterien zugeordnet werden:</p>
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
      <Footer />
    </div>
  );

  return page;
};

export default LabelPictures;
