import React, { useMemo } from "react";
import { GetDataset, getFeatures, EditValues } from "../mock";
import { useTable } from "react-table";
import "./Table.css";
import { Button } from "react-bootstrap";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

// Erstellung der Zeilen und Spalten
const CustomCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  const features = useMemo(() => getFeatures(datasetID), []);
  const dataset = GetDataset(datasetID);

  // Update das ausgewaehlte Kriterium
  const handleChangeInput = (theFeatureNumber, place, event) => {
    for (let i = 0; i < dataset.length; i++) {
      if (index == i) {
        // Falls der Button geklickt wurde, der die Option besitzt, die schon im Datensatz gespeichert ist, sonst update
        if (
          features[theFeatureNumber].values[place] ==
          dataset[i].features[theFeatureNumber]
        ) {
          console.log("Nothing happened");
        } else {
          let updatedOptions = {};
          // Setze alle Optionen des Bildes in ein JSON Format
          for(let j = 1; j <= Object.keys(features).length; j++) {
            // Setze alle alten Optionen, die nicht geupdatet ein, sonst die neue Option
            if(theFeatureNumber != j) {
              updatedOptions[`${j}`] = [dataset[i].features[j]];
            } else {
              updatedOptions[`${j}`] = [features[j].values[place]];
            }
          }
          console.log("Die neue Liste", updatedOptions);
          // TODO Hier ist die Methode, die nicht aufgerufen werden kann !!!!!!

          EditValues(
            datasetID,
            theFeatureNumber,
            updatedOptions
          );
        }
      }
    }
  };

  // Ueberprueft, ob die jeweilige Option des Buttons fuer das Bild ausgewaehlt sind
  // Wenn ja: zeige Button gruen an, sonst blau
  const checkState = (theFeatureNumber, place) => {
    for (let i = 0; i < dataset.length; i++) {
      if (index == i) {
        if (
          features[theFeatureNumber].values[place] ==
          dataset[i].features[theFeatureNumber]
        ) {
          return "success";
        } else {
          return "primary";
        }
      }
    }
  };

  // Setzt alle Daten in die Tabelle
  var place;
  var theFeature;
  console.log(id);
  if (id === "name") {
    console.log("Hallo");
    return <p>{initialValue}</p>;
  } else {
    for (var i = 1; i <= Object.keys(features).length; i++) {
      if (id == features[i].label) {
        //da 1 als undefined gespeichert wird
        if (Object.keys(features)[i] == undefined) {
          place = 1 + index * Object.keys(features).length; // 4 steht für die anzahl an features
          theFeature = 1;
        } else {
          place = Object.keys(features)[i] + index * Object.keys(features).length;
          theFeature = Object.keys(features)[i];
        }
      }
    }
    console.log(place, theFeature);
    // Erstelle die Buttons mit allen noetigen Informationen
    return (
      //<input type="checkbox" checked={isChecked} onChange={handleInputChange} />
      <div>
        <Button
          variant={checkState(theFeature, 0)}
          onClick={(event) => handleChangeInput(theFeature, 0, event)}
        >
          {features[theFeature].values[0]}
        </Button>
        <br />
        <br />
        <Button
          variant={checkState(theFeature, 1)}
          onClick={(event) => handleChangeInput(theFeature, 1, event)}
        >
          {features[theFeature].values[1]}
        </Button>
      </div>
    );
  }
};

// Erstellt die Tabelle endgueltig
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
