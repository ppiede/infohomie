import React from "react";
import PropTypes from "prop-types";
import Vertex from "./Vertex";
import DataEntry from "../components/DataEntry";

// Tasked with visualizing the tree
function DecisionTreeVisualizer({ dataset, features, selectedFeatures = [] }) {

  // Splits the Dataset along the currently selected feature into a left and right subtree,
  // depending on the feature value
  const splitDataSet = (dataset, level) => {

    const curFeature = selectedFeatures[level];

    const leftTree = [];
    const rightTree = [];
    const valLeftTree = 0;

    let postSplitDataset = [];

    // If no feature is currently selected, done with splitting
    if (!curFeature) {
      return;
    }

    // Iterate through all entries of the dataset.
    // If the value of the current feature of the entry matches the value of the left subtree,
    // this entry will be sorted into the left subtree.
    // Else, it will be sorted into to right subtree.
    for (let entry of dataset) {

      if (entry.features[curFeature] === features[curFeature].values[valLeftTree]) {
        leftTree.push(entry);
      } else {
        rightTree.push(entry);
      }
    }

    // Split left subtree
    splitDataSet(leftTree, level + 1)
      ? postSplitDataset.push(...splitDataSet(leftTree, level + 1))
      : postSplitDataset.push(leftTree);

    // Split right subtree
    splitDataSet(rightTree, level + 1)
      ? postSplitDataset.push(...splitDataSet(rightTree, level + 1))
      : postSplitDataset.push(rightTree);

    return postSplitDataset;
  };

  // Will only update, if there is a change in dataset, features or selectedFeatures
  const postSplitDataset = React.useMemo(() => {

    // If there are selected features, start splitting at level 0
    if (selectedFeatures.length !== 0) {
      return splitDataSet(dataset, 0);
    } else {
      return [];
    }

  }, [dataset, features, selectedFeatures]);


  const renderVertices = (numVertices, curFeature) => {

    const vertices = [];

    // If the current feature is empty,
    // or has been deselected, done
    if (!curFeature) {
      return vertices;
    }

    for (let i = 0; i < numVertices; i++) {

      vertices.push(
        <Vertex
          features={features[curFeature].label}
          values={features[curFeature].values}
        />
      );
    }
    return vertices;
  };

  const renderTree = () => {
    return selectedFeatures.map((value, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "8px",
            justifyContent: "space-around",
          }}
        >
          {renderVertices(Math.pow(2, index), value)}
        </div>
      );
    });
  };

  const renderData = () => {

    // If the first feature has been deseletced, done
    if (selectedFeatures[0] === "") {
      return;
    }

    return postSplitDataset.map((group, groupIndex) => {
      return (
        <div
          key={groupIndex}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            border: "1px solid black",
          }}
        >
          {group.map((entry, index) => {
            return (
              <DataEntry
                key={entry.id}
                url={entry.url}
                name={entry.name}
                size={150}
              />
            );
          })}
        </div>
      );
    });
  };

  //
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {renderTree()}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {renderData()}
      </div>
    </div>
  );
}

DecisionTreeVisualizer.propTypes = {
  features: PropTypes.object.isRequired,
  dataset: PropTypes.array.isRequired,
  selectedFeatures: PropTypes.array,
};

export default DecisionTreeVisualizer;
