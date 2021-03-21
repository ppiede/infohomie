import { React } from "react";
import Main from "./Main";
import HeaderFull from "../components/HeaderFull";

const CreateLabels = () => {

    const header = HeaderFull();

    let page = [];

    page.push(header);

    return page;
}

export default CreateLabels;