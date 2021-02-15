import React from "react";
import PropTypes from "prop-types";
import Vertex from "./Vertex";

function DecisionTree({ data, criteria, usedCriteria }) {
  const sortData = (data, level) => {
    const key = usedCriteria[level];
    const group1 = [];
    const group2 = [];

    if (!key) {
      return;
    }

    for (let entry of data) {
      if (entry.criteria[key] === criteria[key].options[0]) {
        group1.push(entry);
      } else {
        group2.push(entry);
      }
    }

    let sort1 = sortData(group1, level + 1);
    let sort2 = sortData(group2, level + 1);

    return [sort1 ? sort1 : group1, sort2 ? sort2 : group2];
  };

  const sortedData = React.useMemo(() => sortData(data, 0), []);

  const renderVertices = (amount, key) => {
    const result = [];
    for (let i = 0; i < amount; i++) {
      result.push(
        <Vertex
          criteria={criteria[key].label}
          options={criteria[key].options}
        />
      );
    }
    return result;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {usedCriteria.map((value, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: "8px",
              justifyContent: "space-around",
            }}
          >
            {renderVertices(Math.pow(2, index), value)}
          </div>
        );
      })}
    </div>
  );
}

export default DecisionTree;
