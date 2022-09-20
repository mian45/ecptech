import { ErrorMessage } from "formik";
import React from "react";
import classes from "./styles.module.scss";

const InputField = ({ className, label, ...rest }) => {
    return (
        <div className={classes["input-container"]}>
            {label && <div className={classes["input-label"]}>{label}</div>}

            <input
                className={`${classes["input-file"]} ${className}`}
                {...rest}
            />
            <ErrorMessage
                name={rest?.name}
                component="div"
                className={classes["error"]}
            />
        </div>
    );
};
export default InputField;
