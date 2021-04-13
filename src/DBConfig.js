export const DBConfig = (stores) => {
  // Funktioniert nicht, keine Ahnung wieso. Der Output sieht richtig aus
  /*
  const storeList = [];
  for (let i = 0; i < stores.length; i++) {
    storeList.push({
      store: stores[i],
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: false } },
        {
          name: "binarydata",
          keypath: "binarydata",
          options: { unique: false },
        },
      ],
    });
  }
  console.log("list", storeList);

  const config = {
    name: "ImageDB",
    version: 1,
    objectStoresMeta: [storeList],
  };

  console.log("config", config);

  return config;
*/

  // Funktioniert scheinbar laut Google Dev Tools
  return {
    name: "ImageDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "tiere",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          {
            name: "binarydata",
            keypath: "binarydata",
            options: { unique: false },
          },
        ],
      },
      {
        store: "gurken",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          {
            name: "binarydata",
            keypath: "binarydata",
            options: { unique: false },
          },
        ],
      },
    ],
  };
};
