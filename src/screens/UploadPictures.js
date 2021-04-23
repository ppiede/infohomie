import { React, useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DataEntry from "../components/DataEntry";
import { getRandomValues, getDefaultValues } from "./NewDataset";
import { initDB } from "react-indexed-db";
import { useIndexedDB } from "react-indexed-db";
import ls from "local-storage";
import { EditValues, AddImgs } from "../mock";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { Button } from "react-bootstrap";

// Get id parameter from URL
const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

// Initialize correct Database according to id from URL
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
 * Resturns all Pictures from the database in the URL as a html DataEntry Object
 * @returns all Pictures from the database
 */
function ShowAll() {
  const { getAll } = useIndexedDB(datasetID);
  const [pictures, setPictures] = useState();

  var personsFromDB;

  useEffect(() => {
    getAll().then((picturesFromDB) => {
      var tmp = [];
      for (var i = 0; i < picturesFromDB.length; i++) {
        var picture = picturesFromDB[i]["binarydata"];
        tmp.push(
          <DataEntry
            key={picture.name}
            url={"data:image/jpeg;base64," + btoa(picture)}
            size={150}
            name={picture.name}
          />
        );
      }
      setPictures(tmp);
    });
  }, []);
  return <div>{pictures}</div>;
}

/**
 * Clears all images from the database in the URL
 * @returns A html Button element to clear all elements
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
 * The main body of the page, containing upload area and upload button
 * @returns A html for the body of the page
 */
const Edit = () => {
  const [files, setFiles] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const [features, setFeatures] = useState([]);

  // Handle drop in Dropzone
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

  // Create html Elements from files
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

  // Styling
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

  const activeStyle = {
    borderColor: "blue",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

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


  // This gets called when Upload button is pressed
  const handleUploadClick = (event) => {
    for (var i = 0; i < files.length; i++) {
      console.log(files);
      AddImgs(
        datasetID,
        files[i],
        getDefaultValues(),
        0
      );
    }
    alert("Daten wurden hochgeladen.");
    setTimeout(function(){
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
          <p>Lade deine Bilder für den neuen Datensatz hoch. <br /> 
          Der Dateiname eines Bildes, welches ein Objekt der ersten Kategorie abbildet, muss
            mit "_0" enden, <br /> ein Bild der zweiten Kategorie mit "_1". 
            <br /> Beispiel:
            <br />GurkeA_0.png
            <br />TomateA_1.jpg
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

/**
 * Builds the page from the diffenent html elements the methods return
 */
const UploadPictures = () => {
  let page = [];

  const body = Edit();

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
