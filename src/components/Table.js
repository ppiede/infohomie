import React, { useState } from "react";
import { useTable } from "react-table";
import "./Table.css";

const CustomCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  const [isChecked, setIsChecked] = useState(initialValue);
  const handleInputChange = (event) => {
    setIsChecked(event.target.checked);
    // Speichere Wert im Backend
  };

  if (id === "name") {
    return <p>{initialValue}</p>;
  } else {
    return (
      <input type="checkbox" checked={isChecked} onChange={handleInputChange} />
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
  console.log(data);

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
