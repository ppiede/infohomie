import React from "react";
import PropTypes from "prop-types";
import Vertex from "./Vertex";
import DataEntry from "../components/DataEntry";

function DecisionTreeVisualizer({ data, criteria, usedCriteria = [] }) {
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
    let result = [];

    sortData(group1, level + 1)
      ? result.push(...sortData(group1, level + 1))
      : result.push(group1);
    sortData(group2, level + 1)
      ? result.push(...sortData(group2, level + 1))
      : result.push(group2);

    return result;
  };

  const sortedData = React.useMemo(() => {
    if (usedCriteria.length !== 0) {
      return sortData(data, 0);
    } else {
      return [];
    }
  }, [data, criteria, usedCriteria]);

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

  const renderTree = () => {
    return usedCriteria.map((value, index) => {
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
    });
  };

  const renderData = () => {
    return sortedData.map((group, groupIndex) => {
      return (
        <div
          key={groupIndex}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            border: "1px solid black",
          }}
        >
          {group.map((entry, index) => {
            return (
              <DataEntry
                key={entry.id}
                url={entry.url}
                name={entry.name}
                size={150}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {renderTree()}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {renderData()}
      </div>
    </div>
  );
}

DecisionTreeVisualizer.propTypes = {
  criteria: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  usedCriteria: PropTypes.array,
};

export default DecisionTreeVisualizer;
