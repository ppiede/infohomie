import { React } from "react";
import HeaderFull from "../components/HeaderFull";
import ModeSelection from "../components/ModeSelection";

const SelectEditMode = () => {


    let page = [];


    const header = HeaderFull();

    const body = (
        <div
            style={{
                display: "flex",
                height: "90vh",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-evenly",
                }}
            >
                <ModeSelection
                    headline={"Entscheidungsbaum erstellen"}
                    text={[
                        "Einen Entscheidungsbaum aus einem gelabelten Bildersatz erstellen",

                    ]}
                    route={"/select-tree-dataset"}
                />
                <ModeSelection
                    headline={"Bestehenden Bildersatz labeln"}
                    text={[
                        "Einen vorhandenen Bildersatz nutzen",
                        "Kritierien editieren und Bilder klassifizieren",

                    ]}
                    route={"/select-edit-dataset"}
                />
                <ModeSelection
                    headline={"Eigenen Bildersatz hochladen und labeln"}
                    text={[
                        "Bilder selber hochladen",
                        "Kritierien aussuchen und Bilder klassifizieren",
                    ]}
                    route={"/new-dataset"}
                />
            </div>
        </div>
    );

    page.push(header);
    page.push(body);

    return page;
}

export default SelectEditMode;