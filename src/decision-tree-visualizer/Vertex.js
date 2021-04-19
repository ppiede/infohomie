import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function Vertex({ features, values, gain }) {
  const valLeftTree = 0;
  const valRightTree = 1;

  return (
    <div style={{ width: 200 }}>
      <Card border="primary">
        <Card.Header>{features}</Card.Header>
        <Card.Body>
          <Card.Text>
            <p>Informationsgewinn:</p>
            <p>{gain.toFixed(4)}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <p>{values[valLeftTree]}</p>
              <p></p>
              <p>{values[valRightTree]}</p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

Vertex.propTypes = {
  features: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default Vertex;
