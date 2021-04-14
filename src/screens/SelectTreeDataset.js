import React, { Component, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getDatasets } from "../mock";
import DecisionTree from "./DecisionTree";
import DecisionTreeVisualizer from "../decision-tree-visualizer";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { useIndexedDB } from 'react-indexed-db';
import ls from 'local-storage';
import Logo from '../img/YouChooseLogo.png';
import Footer from "../components/Footer.js";
import { DropdownButton, Dropdown } from 'react-bootstrap';




const SelectTreeDataset = () => {
    let html = [];
    let datasetList = ls.get('datasetList');
    if(datasetList == null ){
        datasetList = ["Hunde und Katzen", "Tomaten und Gurken"];
    }
    ls.set('datasetList', datasetList)
    let dropDownOptions = ls.get('datasetList');




    class dropDownMenu extends Component {
        handleChange = (event) => {
            this.props.history.push("/decision-tree?id=" + dropDownOptions[event.target.value]);
        };
       render() {
           return(
               <div>
                   <img
                    src={Logo}
                    height="150"
                    className="d-inline-block align-top"
                    alt="You choose Logo"
                    />
                <div style={{
                    margin: "0",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }} >
                    <p>
                        Hier können Sie einen schon existierenden Datensatz auswählen:
                    </p>
                    <DropdownButton id="dropdown-basic-button" title="Datensatz auswählen" value={dropDownOptions} id={0} onSelect={this.handleChange}>
                        {Object.keys(dropDownOptions).map((key, index) => {
                            return <Dropdown.Item>{dropDownOptions[key]}</Dropdown.Item>;
                        })}
                    </DropdownButton>
                    
                    <select value={dropDownOptions} id={0} onChange={this.handleChange}>
                        <option value="">{"Datensatz auswählen"}</option>
                        {Object.keys(dropDownOptions).map((key, index) => {
                            return <option value={key}>{dropDownOptions[key]}</option>;
                        })}
                    </select>
                    <br />
                    
                </div>
                <div style={{position: "absolute", bottom: "0", width: "100%"}}>
                        <Footer />
                </div>
                </div>
            );
        }
    }

    const Menu = withRouter(dropDownMenu);

    html.push(<Menu />)
    return html;
};

export default SelectTreeDataset;
