import { Component, React } from "react";
import { withRouter } from "react-router-dom";
import { getDatasets } from "../mock";

const SelectEditDataset = () => {
  let page = [];

  let dropDownOptions = getDatasets();

  class dropDownMenu extends Component {
    handleChange = (event) => {
      console.log(event.target.value);
      this.props.history.push("/create-labels?id=" + event.target.value);
    };
    render() {
      return (
        <div
          style={{
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <select value={dropDownOptions} id={0} onChange={this.handleChange}>
            <option value="">{"Datensatz auswählen"}</option>
            {Object.keys(dropDownOptions).map((key, index) => {
              return <option value={key}>{dropDownOptions[key]}</option>;
            })}
          </select>
        </div>
      );
    }
  }

  const Menu = withRouter(dropDownMenu);

  page.push(<Menu />);
  return page;
};

export default SelectEditDataset;
