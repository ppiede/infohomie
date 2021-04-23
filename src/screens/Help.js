// Imports
import { React } from "react";
import Logo from "../img/YouChooseLogo.png";
import Footer from "../components/Footer.js";

/**
 * Seite in der Hilfe und Anleitungen stehen können
 * @returns Hilfeseite
 */
const Help = () => {
  return (
    <div>
      <img
        src={Logo}
        height="150"
        className="d-inline-block align-top"
        alt="You choose Logo"
      />
      <div />
      <p>
        <h2>Hilfe</h2>
        <br />
        <h5>Entscheidungsbaum erstellen</h5>
        <br />
        <p>
          Um einen Entscheidungsbaum zu erstellen, muss zuerst ein Datensatz ausgewählt werden.
          <br />
          Danach können Sie die existierenden Kriterien auswählen.
          <br />
          Achten Sie darauf, dass Sie die Kriterien nicht doppelt auswählen.
        </p>
        <h5>Bestehenden Bildersatz labeln</h5>
        <p>
          Wählen Sie zuerst den Datensatz aus, dessen Kriterien Sie bearbeiten wollen.
          <br />
          Danach können Sie dem Datensatz neue Kriterien hinzufügen.
          <br />
          Hierbei sollten Sie auf eine sinnvolle Benennung der Optionen achten, sodass Sie die Bilder richtig zuordnen können.
          <br />
          Danach haben Sie die Möglichkeit, für jedes Bild die Kriterien selbst zuzuordnen.
        </p>
        <h5>Eigenen Bildersatz hochladen</h5>
        <p>
          Achten Sie beim Hochladen von Bildern darauf, dass:
          <br />
          1. Sie dem Datensatz nachträglich keine Bilder hinzufügen können, da die Kriterien nicht nachträglich hinzugeordnet werden.
          <br />
          2. Am besten kleine Datengrößen nutzen, da sonst das (Hoch-)laden der Bilder lange dauern könnte.
        </p>
        <h5>Für Lehrer:</h5>
        <p>
          Wenn Sie die Beispieldatensätze bearbeiten oder neue hinzufügen wollen, können Sie dies im Ordner "example-datasets" tun.
          <br />
          Für einen neuen Datensatz kopieren Sie einfach einen Ordner eines Beispieldatensatzes kopieren und editieren.
          <br />
          Achten Sie allgemein auf die vorhandene JSON Struktur.
          <br />
        </p>
      </p>
      <Footer />
    </div>
  );
};

export default Help;
