import React from "react";
import classes from "./styles.module.scss";
import visaIcon from "../../../../../images/visa-icon.png";

const CreditCard = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["sub-container"]}>
                <div className={classes["image-wrapper"]}>
                    <img
                        src={visaIcon}
                        alt={"visa-icon"}
                        className={classes["visa-icon"]}
                    />
                </div>
                <div className={classes["card-number-label"]}>Card Number</div>
                <div
                    className={classes["card-number"]}
                >{`XXXX XXXX XXXX ${"5324"}`}</div>
                <div className={classes["info"]}>
                    <div className={classes["personal-info"]}>
                        <div className={classes["name-label"]}>
                            Card Holder Name
                        </div>
                        <div className={classes["name"]}>John Smith</div>
                    </div>
                    <div className={classes["personal-info"]}>
                        <div className={classes["name-label"]}>Valid Thru</div>
                        <div className={classes["name"]}>09/22</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
