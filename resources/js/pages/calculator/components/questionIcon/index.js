import React from "react";
import classes from "./styles.module.scss";
import tickIcon from "../../../../../images/tick-green.svg";

const QuestionIcon = ({ icon, active, iconClass }) => {
    return (
        <div className={classes["container"]}>
            <div
                className={classes["icon-container"]}
                style={{ backgroundColor: active ? "#6FA5CB" : "#CBCBCB" }}
            >
                <img
                    src={icon || tickIcon}
                    alt="icon"
                    className={`${classes["icon"]} ${iconClass}`}
                />
            </div>
            <div
                className={classes["divider"]}
                style={{ backgroundColor: active ? "#6FA5CB" : "#CBCBCB" }}
            />
        </div>
    );
};

export default QuestionIcon;
