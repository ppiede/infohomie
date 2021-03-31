import { React } from "react";
import { Link } from "react-router-dom";

const ModeSelection = ({ headline, text = [], route }) => {
  return (
    <div
      style={{
        width: 280,
        height: 420,
        border: "2px solid black",
        borderRadius: 20,
      }}
    >
      <div style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
        <p style={{ textAlign: "left", fontSize: 24, fontWeight: "bold" }}>
          {headline}
        </p>
        <div
          style={{
            backgroundColor: "grey",
            height: 110,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Bild?</p>
        </div>
        <div>
          {text.map((text, index) => {
            return <p style={{ textAlign: "left", fontSize: 16 }}>{text}</p>;
          })}
        </div>
        <Link
          style={{ height: 42, width: "100%", borderRadius: 21 }}
          to={route}
        >
          Auswählen
        </Link>
      </div>
    </div>
  );
};

export default ModeSelection;
