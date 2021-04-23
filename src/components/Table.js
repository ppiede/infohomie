import React, { useMemo } from "react";
import { GetDataset, getFeatures, EditValues } from "../mock";
import { useTable } from "react-table";
import "./Table.css";
import { Button } from "react-bootstrap";

const query = new URLSearchParams(window.location.search);
const datasetID = query.get("id");

/**
 * Erstellung der Zeilen und Spalten
 * @returns Zeilen und Spalten
 */
const CustomCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  const features = useMemo(() => getFeatures(datasetID), []);
  const dataset = GetDataset(datasetID);

  /**
   * Behandelt das Klicken auf die Buttons
   * @param {*} theFeatureNumber die Nummer des Features
   * @param {*} place die an den Button gebundene Option
   * @param {*} event das getriggerte Event
   */
  const handleChangeInput = (theFeatureNumber, place, event) => {
    for (let i = 0; i < dataset.length; i++) {
      if (index == i) {
        // Falls der Button geklickt wurde, der die Option besitzt, die schon im Datensatz gespeichert ist, sonst update
        if (
          features[theFeatureNumber].values[place] ==
          dataset[i].features[theFeatureNumber]
        ) {
          // Es passiert nichts, da der Wert schon gespeichert ist
        } else {
          let updatedOptions = {};
          // Setze alle Optionen des Bildes in ein JSON Format
          for (let j = 1; j <= Object.keys(features).length; j++) {
            // Setze alle alten Optionen, die nicht geupdatet ein, sonst die neue Option
            if (theFeatureNumber != j) {
              updatedOptions[`${j}`] = dataset[i].features[j];
            } else {
              updatedOptions[`${j}`] = features[j].values[place];
            }
          }
          // Update die Daten in der Datenbank
          EditValues(
            datasetID,
            dataset[i].name,
            updatedOptions
          );
          
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      }
    }
  };

  /**
   * Ueberprueft, ob die jeweilige Option des Buttons fuer das Bild ausgewaehlt sind
   * Wenn Ja: Button Blau, wenn Nein: Button nur umrandet
   * @param {*} theFeatureNumber die Nummer des Features
   * @param {*} place die an den Button gebundene Option
   * @returns die Farbe des Buttons
   */
  const checkState = (theFeatureNumber, place) => {
    for (let i = 0; i < dataset.length; i++) {
      if (index == i) {
        if (
          features[theFeatureNumber].values[place] ==
          dataset[i].features[theFeatureNumber]
        ) {
          return "primary";
        } else {
          return "outline-primary";
        }
      }
    }
  };

  // Setzt alle Namen der Bilder in die Tabelle
  var theFeature;
  if (id === "name") {
    return <p>{initialValue}</p>;
  } else {

    // Kriege die Nummer des Features
    for (var i = 0; i < Object.keys(features).length; i++) {
      if (id == features[i + 1].label) {
        theFeature = Object.keys(features)[i];

      }
    }
    // Erstelle die Buttons mit allen noetigen Informationen
    return (
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

/**
 * Die Erstellung der gesamten Tabelle
 * @returns die fertige Tabelle
 */
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
