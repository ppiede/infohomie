import { React, useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DataEntry from "../components/DataEntry";
import { getDefaultValues } from "./NewDataset";
import { initDB } from "react-indexed-db";
import { useIndexedDB } from "react-indexed-db";
import ls from "local-storage";
import { AddImgs } from "../mock";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { Button } from "react-bootstrap";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

// Legt eine neue Datenbank an, falls noch keine vorhanden ist
if (datasetID !== null) {
  initDB({
    name: datasetID,
    version: 1,
    objectStoresMeta: [
      {
        store: datasetID,
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "category", keypath: "category", options: { unique: false } },
          {
            name: "binarydata",
            keypath: "binarydata",
            options: { unique: false },
          },
          { name: "values", keypath: "values", options: { unique: false } },
        ],
      },
    ],
  });
}

/**
 * Zeigt alle Dateneinträge an
 * @return gerendete Einträge
 */
function ShowAll() {
  const { getAll } = useIndexedDB(datasetID);
  const [persons, setPersons] = useState();

  useEffect(() => {
    getAll().then((personsFromDB) => {
      var tmp = [];
      for (var i = 0; i < personsFromDB.length; i++) {
        var test = personsFromDB[i]["binarydata"];
        tmp.push(
          <DataEntry
            key={test.name}
            url={"data:image/jpeg;base64," + btoa(test)}
            size={150}
            name={test.name}
          />
        );
      }
      setPersons(tmp);
    });
  }, []);
  return <div>{persons}</div>;
}

/**
 * Löscht alle Daten des aktuellen Datensatzes
 */
function ClearAll() {
  const { clear } = useIndexedDB(datasetID);

  const handleClick = () => {
    clear().then(() => {
      alert("Alle Daten wurden gelöscht!");
    });
    let datasetList = ls.get("datasetList");
    var index;
    for (var i = 0; i < datasetList.length; i++) {
      if (datasetList[i]["name"] === datasetID) {
        index = i;
      }
    }

    if (index > -1) {
      datasetList.splice(index, 1);
      ls.set("datasetList", datasetList);
    }

    setTimeout(function () {
      window.location.href = "/new-dataset";
    }, 2000);
  };

  return <Button onClick={handleClick}>Alle Daten löschen</Button>;
}

/**
 * Alle Dateneinträge
 */
const Edit = () => {
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const acceptedFileImages = files.map((file) => {
    return (
      <DataEntry
        key={file.name}
        url={file.preview}
        size={150}
        name={file.name}
      />
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  // Basisstyle für Dropzone
  const baseStyle = {
    flex: 1,
    width: 800,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "white",
    color: "grey",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  // Aktiver Style für die Dropzone
  const activeStyle = {
    borderColor: "blue",
  };

  // Setzt den Style für die Dropzone, je nachdem was gerade aktiv ist
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  /**
   * Alle Spalten für die Tabelle
   */
  const makeColumns = () => {
    const columns = [];
    columns.push({
      Header: "Name",
      accessor: "name",
    });

    for (let i = 0; i < features.length; i++) {
      columns.push({
        Header: features[i],
        accessor: features[i],
      });
    }

    return columns;
  };

  const columns = useMemo(() => makeColumns(), [features, files]);

  /**
   * Alle Daten für die Tabelle
   */
  const makeData = () => {
    const data = [];

    for (let i = 0; i < files.length; i++) {
      let obj = { name: files[i].name };
      for (let j = 0; j < features.length; j++) {
        obj[features[j]] = false;
      }

      data.push(obj);
    }
    console.log("objdata " + JSON.stringify(data[0]));
    console.log("objcolumn " + JSON.stringify(columns));
    return data;
  };

  const [data, setData] = useState(makeData());

  useEffect(() => {
    setData(makeData);
  }, [files, features]);

  /**
   * Lädt alle Bilder in die Datenbank
   */
  const handleUploadClick = (event) => {
    for (var i = 0; i < files.length; i++) {
      console.log(files);
      AddImgs(datasetID, files[i], getDefaultValues(), 0);
    }
    alert("Daten wurden hochgeladen.");
    setTimeout(function () {
      window.location.href = "/create-labels?id=" + datasetID;
    }, 2000);
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {
        <div>
          <p>
            Lade deine Bilder für den neuen Datensatz hoch. <br />
            Der Dateiname eines Bildes, welches ein Objekt der ersten Kategorie
            abbildet, muss mit "_0" enden, <br /> ein Bild der zweiten Kategorie
            mit "_1".
            <br /> Beispiel:
            <br />
            GurkeA_0.png
            <br />
            TomateA_1.jpg
          </p>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Platziere die Fotos hier ...</p>
            ) : (
              <p>
                Platziere deine Fotos hier, oder klicke und wähle die Fotos aus
              </p>
            )}
          </div>
        </div>
      }

      {files.length !== 0 ? (
        <div
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Diese Fotos wurden von dir hochgeladen</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {acceptedFileImages}
          </div>

          <br />
          <Button onClick={handleUploadClick}>Bilder hochladen</Button>
          <br />
          <Footer />
        </div>
      ) : (
        <div>
          <div style={{ marginTop: 32 }}>
            <p>Bisher wurden keine Fotos hochgeladen</p>
          </div>
          <div style={{ bottom: "0" }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

const UploadPictures = () => {
  let page = [];

  const body = Edit();

  //page.push(AddImgs());
  page.push(
    <img
      src={Logo}
      height="150"
      className="d-inline-block align-top"
      alt="You choose Logo"
    />
  );
  page.push(ShowAll());
  page.push(ClearAll());
  page.push(<a>&nbsp;</a>);
  page.push(body);

  return page;
};

export default UploadPictures;
