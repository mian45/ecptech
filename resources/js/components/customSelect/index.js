import React from "react";
import classes from "./style.module.scss";

const CustomSelect = ({ options, ...rest }) => {
    return (
        <select className={classes["select"]} {...rest}>
            {Object.keys(options).map((option, index) => {
                return (
                    <option key={index} value={option}>
                        {options[option]}
                    </option>
                );
            })}
        </select>
    );
};

export default CustomSelect;
