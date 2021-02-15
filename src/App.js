import "./App.css";
import { React, useState } from "react";
import DataEntry from "./components/DataEntry";

function App() {
  const data = [
    {
      id: 1,
      url: "https://cdn2.thedogapi.com/images/rkZRggqVX_1280.jpg",
      name: "Boston Terrier",
      criteria: { ears: "no", hair: "short" },
    },
    {
      id: 2,
      url: "https://cdn2.thedogapi.com/images/BkrJjgcV7_1280.jpg",
      name: "Shih Tzu",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 3,
      url: "https://cdn2.thedogapi.com/images/hdERN5n5z.jpg",
      name: "American Bulldog",
      criteria: { ears: "no", hair: "long" },
    },
    {
      id: 4,
      url: "https://cdn2.thedogapi.com/images/MUGiNcu_Z.jpg",
      name: "Akita",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 5,
      url: "https://cdn2.thedogapi.com/images/aBlkZ0fo0.jpg",
      name: "Australian Cattle Dog",
      criteria: { ears: "yes", hair: "long" },
    },
    {
      id: 6,
      url: "https://cdn2.thedogapi.com/images/e4Y3H4WI3.jpg",
      name: "Border Collie",
      criteria: { ears: "no", hair: "long" },
    },
    {
      id: 7,
      url: "https://cdn2.thedogapi.com/images/cdvvEvgY1.png",
      name: "Finnish Spitz",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 8,
      url: "https://cdn2.thedogapi.com/images/jtrRacj_g.jpg",
      name: "Saint Bernard",
      criteria: { ears: "yes", hair: "long" },
    },
    {
      id: 9,
      url: "https://cdn2.thecatapi.com/images/4lXnnfxac.jpg",
      name: "Burmese",
      criteria: { ears: "no", hair: "short" },
    },
    {
      id: 10,
      url: "https://cdn2.thecatapi.com/images/lOl0J96On.jpg",
      name: "Colorpoint Shorthair",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 11,
      url: "https://cdn2.thecatapi.com/images/0iSghgPeZ.jpg",
      name: "Oriental",
      criteria: { ears: "no", hair: "long" },
    },
    {
      id: 12,
      url: "https://cdn2.thecatapi.com/images/qBqs3R_w4.jpg",
      name: "Ragdoll",
      criteria: { ears: "no", hair: "short" },
    },
    {
      id: 13,
      url: "https://cdn2.thecatapi.com/images/6xLEBwiUS.png",
      name: "Scottish Fold",
      criteria: { ears: "no", hair: "short" },
    },
    {
      id: 14,
      url: "https://cdn2.thecatapi.com/images/4d4V586nt.jpg",
      name: "Snowshoe",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 15,
      url: "https://cdn2.thecatapi.com/images/h19-vtIeX.jpg",
      name: "Aegean",
      criteria: { ears: "yes", hair: "short" },
    },
    {
      id: 16,
      url: "https://cdn2.thecatapi.com/images/4ndvXwCiI.jpg",
      name: "Balinese",
      criteria: { ears: "no", hair: "long" },
    },
  ];

  const criteria = {
    ears: { label: "Ohren", options: ["yes", "no"] },
    hair: { label: "Haarlänge", options: ["short", "long"] },
  };

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const usedCriteria = ["ears", "hair"];

  const sortData1 = (data, level) => {
    const key = usedCriteria[level];
    const group1 = [];
    const group2 = [];

    if (!key) {
      return;
    }

    for (let entry of data) {
      if (entry.criteria[key] === criteria[key].options[0]) {
        group1.push(entry);
      } else {
        group2.push(entry);
      }
    }
    let result = [];

    sortData1(group1, level + 1)
      ? result.push(...sortData1(group1, level + 1))
      : result.push(group1);
    sortData1(group2, level + 1)
      ? result.push(...sortData1(group2, level + 1))
      : result.push(group2);

    return result;
  };

  const sortData2 = (data, level) => {
    const key = usedCriteria[level];
    const group1 = [];
    const group2 = [];

    if (!key) {
      return;
    }

    for (let entry of data) {
      if (entry.criteria[key] === criteria[key].options[0]) {
        group1.push(entry);
      } else {
        group2.push(entry);
      }
    }

    let sort1 = sortData2(group1, level + 1);
    let sort2 = sortData2(group2, level + 1);

    return [sort1 ? sort1 : group1, sort2 ? sort2 : group2];
  };

  console.log(sortData1(data, 0));
  console.log(sortData2(data, 0));

  const renderLeftSide = (key) => {
    if (!key) {
      return null;
    }
    const renderedData = data
      .filter((data) => data.criteria[key] === criteria[key].options[0])
      .map((value, index) => {
        return (
          <DataEntry key={index} url={value.url} name={value.name} size={150} />
        );
      });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid grey",
        }}
      >
        <p>{criteria[key].options[0]}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: 400,
          }}
        >
          {renderedData}
        </div>
      </div>
    );
  };

  const renderRightSide = (key) => {
    if (!key) {
      return null;
    }
    const renderedData = data
      .filter((data) => data.criteria[key] === criteria[key].options[1])
      .map((value) => {
        return (
          <DataEntry
            key={value.id}
            url={value.url}
            name={value.name}
            size={150}
          />
        );
      });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid grey",
        }}
      >
        <p>{criteria[key].options[1]}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: 400,
          }}
        >
          {renderedData}
        </div>
      </div>
    );
  };

  const renderData = () => {
    return data.map((value, index) => {
      return (
        <DataEntry key={index} url={value.url} name={value.name} size={150} />
      );
    });
  };

  return (
    <div className="App">
      <p>Unsere Tierpension behaust aktuell folgende Tiere:</p>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {renderData()}
      </div>
      <p>
        Jetzt wollen wir unsere Hunde von unseren Katzen trennen und müssen
        dafür Kriterien festlegen:
      </p>
      <select
        value={value1}
        onChange={(event) => setValue1(event.target.value)}
      >
        <option value="">{"Kriterium1 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>
      <select
        value={value2}
        onChange={(event) => setValue2(event.target.value)}
      >
        <option value="">{"Kriterium2 auswählen"}</option>
        {Object.keys(criteria).map((key, index) => {
          return <option value={key}>{criteria[key].label}</option>;
        })}
      </select>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }} />
        <div
          style={{
            flex: 1,
          }}
        >
          {renderLeftSide(value1)}
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            flex: 1,
          }}
        >
          {renderRightSide(value1)}
        </div>
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}

export default App;
