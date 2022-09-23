import React from "react";
import classes from "./styles.module.scss";

const CustomModal = ({ children, onClose }) => {
    return (
        <div className={classes["container"]} onClick={onClose}>
            {children}
        </div>
    );
};

export default CustomModal;
