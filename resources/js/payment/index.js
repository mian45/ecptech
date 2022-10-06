import React from "react";
import CardPayment from "./cardPayment";
import classes from "./styles.module.scss";

const Payments = () => {
    return (
        <div className={classes["root-container"]}>
            <div className={classes["container"]}>
                <div className={classes["left-container"]}>
                    <CardPayment />
                </div>
                <div className={classes["right-container"]}></div>
            </div>
        </div>
    );
};

export default Payments;
