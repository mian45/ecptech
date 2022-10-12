import React from "react";
import classes from "./styles.module.scss";
import visaIcon from "../../../../../images/visa-icon.png";
import { useEffect } from "react";

const CreditCard = (props) => {
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
                <div className={classes["card-number"]}>{`XXXX XXXX XXXX ${
                    props?.data?.card_no?.slice(-4) || "XXXX"
                }`}</div>
                <div className={classes["info"]}>
                    <div className={classes["personal-info"]}>
                        <div className={classes["name-label"]}>
                            Card Holder Name
                        </div>
                        <div className={classes["name"]}>
                            {props?.data?.card_name}
                        </div>
                    </div>
                    <div className={classes["personal-info"]}>
                        <div className={classes["name-label"]}>Valid Thru</div>
                        <div className={classes["name"]}>
                            {props?.data?.card_expiry}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCard;
