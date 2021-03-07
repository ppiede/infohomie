import { React, useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import DataEntry from "../components/DataEntry";

const Edit = () => {
  const query = new URLSearchParams(useLocation().search);
  const mode = query.get("mode");
  const [files, setFiles] = useState([]);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const acceptedFileImages = files.map((file) => {
    return (
      <DataEntry
        key={file.name}
        url={file.preview}
        size={150}
        name={file.name}
      />
    );
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const baseStyle = {
    flex: 1,
    width: 800,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "white",
    color: "grey",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "blue",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {mode === "3" ? (
        <div>
          <p>Lade deine Bilder für den neuen Datensatz hoch</p>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Platziere die Fotos hierTest ...</p>
            ) : (
              <p>
                Platziere deine Fotos hier, oder klicke und wähle die Fotos aus
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>
          Hier ist Platz, um einen bestehenden Datensatz zu bearbeiten oder
          einen neuen Datensatz zu erstellen
        </p>
      )}
      {files.length !== 0 ? (
        <div style={{ marginTop: 32 }}>
          <p>Diese Fotos wurden von dir hochgeladen</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {acceptedFileImages}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: 32 }}>
          <p>Bisher wurden keine Fotos hochgeladen</p>
        </div>
      )}
    </div>
  );
};

export default Edit;
