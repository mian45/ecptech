import React from "react";
import Profile from "../components/profile/Profile";
import CardPayment from "./cardPayment";
import classes from "./styles.module.scss";

const Payments = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left-container"]}>
                <CardPayment />
            </div>
            <div className={classes["right-container"]}>
                <Profile />
            </div>
        </div>
    );
};

export default Payments;
