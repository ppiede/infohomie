import React, { Component } from "react";
import { getDatasets } from "../mock";
import { withRouter } from "react-router-dom";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";
import { DropdownButton, Dropdown } from "react-bootstrap";

const SelectTreeDataset = () => {
  let html = [];

  let dropDownOptions = getDatasets();

  class dropDownMenu extends Component {
    handleChange = (event) => {
      console.log(event);
      this.props.history.push("/decision-tree?id=" + dropDownOptions[event]);
    };
    render() {
      console.log(dropDownOptions);
      return (
        <div>
          <img
            src={Logo}
            height="150"
            className="d-inline-block align-top"
            alt="You choose Logo"
          />
          <div
            style={{
              margin: "0",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p>
              Hier können Sie einen schon existierenden Datensatz auswählen:
            </p>
            <DropdownButton
              id="dropdown-basic-button"
              title="Datensatz auswählen"
              value={dropDownOptions}
              id={0}
            >
              {Object.keys(dropDownOptions).map((key, index) => {
                return (
                  <Dropdown.Item eventKey={key} onSelect={this.handleChange}>
                    {dropDownOptions[key]}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <br />
          </div>
          <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
            <Footer />
          </div>
        </div>
      );
    }
  }

  const Menu = withRouter(dropDownMenu);

  html.push(<Menu />);
  return html;
};

export default SelectTreeDataset;
