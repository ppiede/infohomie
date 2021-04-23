import { React } from "react";
import { Card, CardGroup } from "react-bootstrap";
import Logo from "../img/YouChooseLogo.png";
import Pencil from "../img/pencil.png";
import Tree from "../img/tree.png";
import Upload from "../img/upload.png";
import Footer from "../components/Footer.js";
import "./SelectEditMode.css";

const SelectEditMode = () => {
  let page = [];

  const body = (
    <div>
      <img
        src={Logo}
        height="150"
        className="d-inline-block align-top"
        alt="You choose Logo"
      />
      <div
        style={{
          display: "flex",
          height: "90vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="row-md-4">
          Willkommen auf unserer Seite.
        <br />
        Wählen Sie bitte die Option, mit welcher Sie einen Entscheidungsbaum
        erstellen wollen.
        <br />
        &nbsp;
      </div>
        <div className="row-md-4">
          <CardGroup>
            <div className="col-md-4">
              <a
                href="/select-tree-dataset"
                style={{ color: "#000", textDecoration: "none" }}
              >
                <Card
                  border="primary"
                  style={{ width: "18rem", minHeight: "350px" }}
                >
                  <Card.Body>
                    <Card.Title style={{ textDecorationLine: "underline" }}>
                      Entscheidungsbaum erstellen
                  </Card.Title>
                    <img
                      src={Tree}
                      height="100"
                      className="d-inline-block align-top"
                      alt="Tree icon"
                    />
                    <br />
                    <Card.Text>
                      Einen Entscheidungsbaum aus einem gelabelten Bildersatz
                      erstellen
                  </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </div>
            <div className="col-md-4">
              <a
                href="/select-edit-dataset"
                style={{ color: "#000", textDecoration: "none" }}
              >
                <Card
                  border="primary"
                  style={{ width: "18rem", minHeight: "350px" }}
                >
                  <Card.Body>
                    <Card.Title style={{ textDecorationLine: "underline" }}>
                      Bestehenden Bildersatz labeln
                  </Card.Title>
                    <img
                      src={Pencil}
                      height="80"
                      className="d-inline-block align-top"
                      alt="Pencil icon"
                    />
                    <br />
                    <br />
                    <Card.Text>Einen vorhandenen Bildersatz nutzen</Card.Text>
                    <Card.Text>
                      Kritierien editieren und Bilder klassifizieren
                  </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </div>
            <div className="col-md-4">
              <a
                href="/new-dataset"
                style={{ color: "#000", textDecoration: "none" }}
              >
                <Card
                  border="primary"
                  style={{ width: "18rem", minHeight: "350px" }}
                  route={"/new-dataset"}
                >
                  <Card.Body>
                    <Card.Title style={{ textDecorationLine: "underline" }}>
                      Eigenen Bildersatz hochladen und labeln
                  </Card.Title>
                    <img
                      src={Upload}
                      height="80"
                      className="d-inline-block align-top"
                      alt="Upload icon"
                    />
                    <br />
                    <br />
                    <Card.Text>Bilder selber hochladen</Card.Text>
                    <Card.Text>
                      Kritierien aussuchen und Bilder klassifizieren
                  </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </div>
          </CardGroup>
        </div>
        <br />
        <Footer />
      </div>
    </div>
  );

  page.push(body);

  return page;
};

export default SelectEditMode;
