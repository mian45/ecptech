import React from "react";
import AddNewCard from "./components/addCard";
import CreditCard from "./components/creditCard";
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
            <div className={classes["card-wrapper"]}>
                <CreditCard />
                <AddNewCard />
            </div>
        </div>
    );
};

export default CardPayment;
