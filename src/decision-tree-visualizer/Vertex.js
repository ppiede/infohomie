import React from "react";
import PropTypes from "prop-types";

function Vertex({ features, values }) {

  const valLeftTree = 0;
  const valRightTree = 1;

  return (
    <div style={{ width: 200, border: "1px solid black" }}>
      <p>{features}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <p>{values[valLeftTree]}</p>
        <p>{values[valRightTree]}</p>
      </div>
    </div>
  );
}

Vertex.propTypes = {
  features: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default Vertex;