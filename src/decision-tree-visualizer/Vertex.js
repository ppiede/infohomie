import React from "react";
import PropTypes from "prop-types";

function Vertex({ criteria, options }) {
  return (
    <div style={{ width: 200, border: "1px solid black" }}>
      <p>{criteria}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <p>{options[0]}</p>
        <p>{options[1]}</p>
      </div>
    </div>
  );
}

Vertex.propTypes = {
  criteria: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Vertex;
