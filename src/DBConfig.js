export const DBConfig = {
    name: 'ImageDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'people',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'binarydata', keypath: 'binarydata', options: { unique: false } }
        ]
      }
    ]
  };