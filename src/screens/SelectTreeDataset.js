import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderFull from "../components/HeaderFull";
import { getDatasets } from "../mock";
import DecisionTree from "./DecisionTree";
import DecisionTreeVisualizer from "../decision-tree-visualizer";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { DBConfig } from '../DBConfig';
import { initDB } from 'react-indexed-db';



const SelectTreeDataset = () => {
    let html = [];
    initDB(DBConfig);

    let dropDownOptions = getDatasets();
    const header = HeaderFull("show");

    class dropDownMenu extends Component {
        handleChange = (event) => {
            console.log(event.target.value)
            this.props.history.push('/decision-tree?id=' + event.target.value)

        };
       render() {
           return(
                <div style={{
                    margin: "0",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }} >
                    <select value={dropDownOptions} id={0} onChange={this.handleChange}>
                        <option value="">{"Datensatz auswählen"}</option>
                        {Object.keys(dropDownOptions).map((key, index) => {
                            return <option value={key}>{dropDownOptions[key]}</option>;
                        })}
                    </select>
                </div>
           )
       }
    }

    const Menu = withRouter(dropDownMenu)

    html.push(header);
    html.push(<Menu />)
    

    return html;
}

export default SelectTreeDataset;