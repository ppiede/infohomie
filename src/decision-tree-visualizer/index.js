import React from "react";
import PropTypes from "prop-types";
import Vertex from "./Vertex";
import DataEntry from "../components/DataEntry";

// Tasked with visualizing the tree
function DecisionTreeVisualizer({ dataset, features, selectedFeatures = [] }) {
  //const gains = {};
  var calledCounters = {};
  let gains = [];
  let gainIndex = {};
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
      if (
        entry.features[curFeature] === features[curFeature].values[valLeftTree]
      ) {
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

    if (calledCounters[level] == null) {
      calledCounters[level] = 0;
    }
    if (gains[level] == null) {
      gains[level] = [];
    }
    if (gainIndex[level] == null) {
      gainIndex[level] = 0;
    }

    let hasBeenThere = false;

    for (let i = 1; i <= level; i++) {
      if (
        Math.trunc(calledCounters[level] / Math.pow(4, level - i)) % 2 !==
        0
      ) {
        hasBeenThere = true;
      }
    }

    if (!hasBeenThere) {
      gains[level][gainIndex[level]] = calcInfGain(dataset, postSplitDataset);
      gainIndex[level]++;
    }
    calledCounters[level]++;

    //gains[curFeature + level] = calcInfGain(dataset, postSplitDataset);
    //console.log(curFeature, level);
    //console.log(calcInfGain(dataset, postSplitDataset));
    //console.log(gains);

    return postSplitDataset;
  };

  function calcInfGain(dataset, splitDataset) {
    function entropy(entropyDataset) {
      var numPos = 0;
      var numNeg = 0;
      var total = entropyDataset.length;
      for (var i = 0; i < entropyDataset.length; i++) {
        if (entropyDataset[i]["category"] == 0) {
          numNeg++;
        } else {
          numPos++;
        }
      }
      var leftSide = 0;
      var rightSide = 0;
      if (numNeg !== 0) {
        rightSide = (-numNeg / total) * Math.log2(numNeg / total);
      }
      if (numPos !== 0) {
        leftSide = (-numPos / total) * Math.log2(numPos / total);
      }

      return leftSide + rightSide;
    }

    if (splitDataset.length === 2) {
      return (
        entropy(dataset) -
        ((splitDataset[0].length / dataset.length) * entropy(splitDataset[0]) +
          (splitDataset[1].length / dataset.length) * entropy(splitDataset[1]))
      );
    } else if (splitDataset.length === 4) {
      let newLeft = [...splitDataset[0], ...splitDataset[1]];
      let newRight = [...splitDataset[2], ...splitDataset[3]];
      return calcInfGain(dataset, [newLeft, newRight]);
    } else if (splitDataset.length === 8) {
      let newLeftOne = [...splitDataset[0], ...splitDataset[1]];
      let newLeftTwo = [...splitDataset[2], ...splitDataset[3]];
      let newRightOne = [...splitDataset[4], ...splitDataset[5]];
      let newRightTwo = [...splitDataset[6], ...splitDataset[7]];
      return calcInfGain(dataset, [
        newLeftOne,
        newLeftTwo,
        newRightOne,
        newRightTwo,
      ]);
    }
  }

  // Will only update, if there is a change in dataset, features or selectedFeatures
  const postSplitDataset = React.useMemo(() => {
    // If there are selected features, start splitting at level 0
    if (selectedFeatures.length !== 0) {
      return splitDataSet(dataset, 0);
    } else {
      return [];
    }
  }, [dataset, features, selectedFeatures]);

  const renderVertices = (numVertices, curFeature, level) => {
    const vertices = [];
    // If the current feature is empty,
    // or has been deselected, done
    if (!curFeature) {
      return vertices;
    }

    console.log(numVertices);
    console.log(curFeature);
    console.log(level);
    console.log(gains);

    for (let i = 0; i < numVertices; i++) {
      vertices.push(
        <Vertex
          //gain={gains[curFeature + level]}
          gain={gains[level][i]}
          features={features[curFeature].label}
          values={features[curFeature].values}
        />
      );
    }
    //console.log(vertices);
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
          {renderVertices(Math.pow(2, index), value, index)}
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
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {group.map((entry, index) => {
            return (
              <DataEntry
                key={entry.id}
                url={entry.url}
                name={entry.name}
                size={100}
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
