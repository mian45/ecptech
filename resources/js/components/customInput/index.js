import React from "react";
import classes from "./styles.module.scss";

const CustomInput = ({ className, ...rest }) => {
    return (
        <input className={`${classes["input-file"]} ${className}`} {...rest} />
    );
};
export default CustomInput;
