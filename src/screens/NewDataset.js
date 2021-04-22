import { React } from "react";
import ls from "local-storage";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { Button } from "react-bootstrap";

export const defaultFeatures = {};

export function getDefaultValues() {
  return {};
}

export function getRandomValues() {
  return {};
}

function ContinueButton() {
  const handleClick = () => {
    var value = document.getElementById("dataset-name").value;
    let datasetList = ls.get("datasetList");
    var newEntry = {
      name: value,
      features: defaultFeatures,
    };

    if (datasetList == null) {
      datasetList = [newEntry];
    } else {
      var index = -1;
      for (var i = 0; i < datasetList.length; i++) {
        if (datasetList[i]["name"] === value) {
          index = i;
        }
      }
      if (index == -1) {
        datasetList.push(newEntry);
      }
    }

    ls.set("datasetList", datasetList);

    window.location.href = "/upload-pictures?id=" + value;
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Datensatz anlegen
    </Button>
  );
}

const NewDataset = () => {
  let page = [];

  const body = (
    <div>
      <img
        src={Logo}
        height="150"
        className="d-inline-block align-top"
        alt="You choose Logo"
      />
      <br />
      <p>Bitte geben Sie dem neuen Datensatz einen Namen:</p>
    </div>
  );
  page.push(body);

  page.push(<input type="text" id="dataset-name" />);
  page.push(<a>&nbsp;</a>);
  page.push(ContinueButton());
  page.push(
    <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
      <Footer />
    </div>
  );

  return page;
};

export default NewDataset;
