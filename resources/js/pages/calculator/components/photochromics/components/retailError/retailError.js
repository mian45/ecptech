import React from "react";
import classes from "./retailError.module.scss";

const RetailError = ({ error }) => {
    return <> {error && <div className={classes["error"]}>{error}</div>}</>;
};

export default RetailError;
