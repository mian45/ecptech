import React from "react";
import CalculatorScreen from "./components/calculatorPage";
import classes from "./styles.module.scss";

const Calculator = () => {
    return (
        <div className={classes["root-container"]}>
            <div className={classes["container"]}>
                <div className={classes["page-title"]}>Create Invoice</div>
                <CalculatorScreen />
            </div>
        </div>
    );
};

export default Calculator;
