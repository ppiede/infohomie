import PropTypes from "prop-types";
import React from "react";
import FittedImage from "react-fitted-image";
import {Image} from 'react-bootstrap';



function DataEntry({ url, name, size }) {
  return (
    <div>
      <Image
        rounded
        src={url}
        fit="cover"
        style={{
          height: size,
          width: size,
          margin: "6px",
          objectFit: "cover"
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
