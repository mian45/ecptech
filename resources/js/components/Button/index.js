import React from "react";
import classes from "./styles.module.scss";

const ButtonComponent = ({ children, className, ...rest }) => {
    return (
        <button
            className={`${classes["custom-button"]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};
export default ButtonComponent;
