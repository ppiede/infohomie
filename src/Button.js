import { React, useState } from "react";

function Button(props) {
  const [zahl, setZahl] = useState(props.default);

  const data = [
    { name: "Marc", age: 21 },
    { name: "Pascal", age: 24 },
    { name: "Lukas", age: 23 },
  ];

  return (
    <div style={{ display: "flex", backgroundColor: "green" }}>
      <button
        onClick={() => {
          setZahl(zahl + 1);
          props.test();
          console.log(zahl);
        }}
      >
        Test
      </button>
      <p>{zahl}</p>
    </div>
  );
}

export default Button;
