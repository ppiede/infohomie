import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-bootstrap";

/**
 * Datenpunkt mit Bild und Untertitel
 * @param {*} url URL zum Bild
 * @param {*} name Untertitel des Bildes
 * @param {*} size Größe des Bildes
 * @returns Dateneintrag
 */
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
          objectFit: "cover",
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
