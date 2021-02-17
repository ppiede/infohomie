import PropTypes from "prop-types";
import React from "react";
import FittedImage from "react-fitted-image";

function DataEntry({ url, name, size }) {
  return (
    <div>
      <FittedImage
        src={url}
        fit="cover"
        style={{
          height: size,
          width: size,
        }}
      />
      <p>{name}</p>
    </div>
  );
}

export default DataEntry;

DataEntry.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.number,
};
