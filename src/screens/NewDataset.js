import { React, useState } from "react";
import HeaderFull from "../components/HeaderFull";
import { initDB } from "react-indexed-db";
import { useIndexedDB } from 'react-indexed-db';
import ls from 'local-storage';






function ContinueButton() {

    const handleClick = () => {
        var value = document.getElementById('dataset-name').value;
        alert(value);
        let datasetList = ls.get('datasetList');
        if(datasetList == null ){
            datasetList = [value];
        }else if (datasetList.indexOf(value) === -1){
            datasetList.push(value);
        } 
        ls.set('datasetList', datasetList)

        window.location.href = "/upload-pictures?id=" + value;
    };

    return <button onClick={handleClick}>Datensatz anlegen</button>;
}


const NewDataset = () => {

    const header = HeaderFull();

    let page = [];

    page.push(header);
    page.push(<input type="text" id="dataset-name"/>)
    page.push(ContinueButton());

    return page;
}

export default NewDataset;