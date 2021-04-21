import { React } from "react";
import ModeSelection from "../components/ModeSelection";

const New = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: 24, fontWeight: "900", marginBottom: 64 }}>
        Welche Modus der Website möchtest du nutzen?
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <ModeSelection
          headline={"Alles vorgegeben"}
          text={[
            "Vollständiger Datensatz vorgegeben",
            "Kritierien zur Klassifikation bereits eingetragen",
            "Sofort einen Entscheidungsbaum erstellen",
          ]}
          route={"/?mode=1"}
        />
        <ModeSelection
          headline={"Daten vorgegeben"}
          text={[
            "Vollständiger Datensatz vorgegeben",
            "Kritierien selber aussuchen und klassifizieren",
            "Sofort einen Entscheidungsbaum erstellen",
          ]}
          route={"/?mode=2"}
        />
        <ModeSelection
          headline={"Ganz von vorne"}
          text={[
            "Datensatz komplett selber erstellen",
            "Kritierien selber aussuchen und klassifizieren",
            "Sofort einen Entscheidungsbaum erstellen",
          ]}
          route={"/data/?mode=3"}
        />
      </div>
    </div>
  );
};

export default New;
