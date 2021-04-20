import React, { useState, useMemo } from "react";
import { GetDataset, getFeatures, setFeatures } from '../mock'
import { useTable } from "react-table";
import "./Table.css";
import { v4 } from 'uuid';
import { Button } from "react-bootstrap";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");


const CustomCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  const features = useMemo(() => getFeatures(datasetID), []);
  const [featureOptions, setFeatureOptions] = useState([]);
  const dataset = GetDataset(datasetID);

  const handleChangeInput = (id, event) => {

    const newFeatureOptions = featureOptions.map(i => {
      if (id == i.id) {

        i[event.target.name] = event.target.value
      }
      return i;
    })

    setFeatureOptions(newFeatureOptions);

  }

  const checkState = (theFeatureNumber, place) => {
    console.log(featureOptions);
    for(let i = 0; i < dataset.length; i++) {
      if(index == i) {

        if(features[theFeatureNumber].values[place] == dataset[i].features[theFeatureNumber]) {

          return "success";
        } else {
          return "primary";
        }


      }
    }
  }


  var place;
  var theFeature;
  if (id === "name") {
    return <p>{initialValue}</p>;
  } else {
    for(var i = 1; i <= Object.keys(features).length; i++) {
      if(id == features[i].label) {
        //da 1 als undefined gespeichert wird
        if(Object.keys(features)[i] == undefined) {
          place = 1+(index*4);
          theFeature = 1;
        } else {
          place = Object.keys(features)[i] + (index*4);
          theFeature = Object.keys(features)[i];
        }
        
      }
      
    }
    return (
      //<input type="checkbox" checked={isChecked} onChange={handleInputChange} />
      <div>
        <Button 
        variant={checkState(theFeature, 0)}
        value={featureOptions.option}
        onClick={event => handleChangeInput(featureOptions[place].id, event)}
        > 
        {features[theFeature].values[0]}
        </Button>
        <br />
        <br />
        <Button 
        variant={checkState(theFeature, 1)}
        value={featureOptions.option}
        onClick={event => handleChangeInput(featureOptions[place].id, event)}
        > 
        {features[theFeature].values[1]}
        </Button>
      </div>
    );
  }
};

const Table = ({ columns, data }) => {
  const defaultColumn = {
    Cell: CustomCell,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
