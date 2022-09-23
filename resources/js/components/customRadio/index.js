import React from "react";
import classes from "./styles.module.scss";
import { Radio } from "antd";

const CustomRadio = ({ label, headClass, active, ...rest }) => {
    return (
        <div className={`${classes["container"]} ${headClass}`}>
            <Radio
                {...rest}
                className={`${classes["radio"]} ${rest.className}`}
            />
            <div
                className={classes["label"]}
                style={{ fontWeight: active ? "bold" : "normal" }}
            >
                {label}
            </div>
        </div>
    );
};

export default CustomRadio;
