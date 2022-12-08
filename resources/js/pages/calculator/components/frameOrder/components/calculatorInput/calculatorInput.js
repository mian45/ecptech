import React from "react";
import { FormikError } from "../../../selectVisionPlan";
import classes from "./calculatorInput.module.scss";

const CalculatorInput = ({ name, headClass, className, ...rest }) => {
    return (
        <>
            <div className={`${classes["input-container"]} ${headClass}`}>
                <div className={classes["input-label"]}>$</div>
                <input
                    className={`${classes["input"]} ${className}`}
                    type={"text"}
                    id={name}
                    name={name}
                    {...rest}
                />
            </div>
            {name && <FormikError name={name} />}
        </>
    );
};
export default CalculatorInput;
