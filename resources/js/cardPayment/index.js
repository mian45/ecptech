import React from "react";
import classes from "./styles.module.scss";

const CardPayment = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["label"]}>Payment Details</div>
            <div className={classes["subtitle"]}>
                Your card is
                <span className={classes["card-status"]}> Active</span>.
                Subscription amount will be deducted from this card.
            </div>
        </div>
    );
};

export default CardPayment;
