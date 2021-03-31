import {Link} from "react-router-dom";
import { React, useState, useMemo } from "react";
import PropTypes from "prop-types";

const HeaderFull = (showComplete) => {

    var header;

    if(showComplete === "show"){

        header = (
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: 70,
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid grey",
                    }}
                >
                    <Link style={{ paddingLeft: "20px" }} to="/">
                        <p>infohomie</p>
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            paddingRight: "20px",
                            height: "100%",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Link style={{ padding: "8px" }} to="/select-edit-mode">
                            Datensatz bearbeiten
                        </Link>

                        <Link style={{ padding: "8px" }} to="/help">
                            Hilfe
                        </Link>
                    </div>
                </div>
            </div>
        );

    } else {
        header = (
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        height: 70,
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid grey",
                    }}
                >
                    <Link style={{ paddingLeft: "20px" }} to="/">
                        <p>infohomie</p>
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            paddingRight: "20px",
                            height: "100%",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >

                        <Link style={{ padding: "8px" }} to="/help">
                            Hilfe
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return header;
}

HeaderFull.propTypes = {
    showComplete: PropTypes.string
};



export default HeaderFull;
