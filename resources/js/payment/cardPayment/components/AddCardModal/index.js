import React from "react";
import classes from "./styles.module.scss";

const AddCardModal = ({ show, onClose }) => {
    return (
        <>
            {show ? (
                <div className={classes["backdrop"]} onClick={onClose}>
                    <div
                        className={classes["container"]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes["label"]}>
                            Enter your card details
                        </div>
                        <div className={classes["sub-label"]}>
                            By adding new card, your old card will be removed.
                        </div>
                        <div className={classes["input-label"]}>
                            Card Number
                        </div>
                        <input
                            placeholder="Enter Card Number"
                            className={classes["input"]}
                        />
                        <div className={classes["input-label"]}>
                            Card Holder Name
                        </div>
                        <input
                            placeholder="Enter Card Holder Name"
                            className={classes["input"]}
                        />
                        <div className={classes["inline-input"]}>
                            <div className={classes["inline-left-input"]}>
                                <div className={classes["input-label"]}>
                                    Card Expiry
                                </div>
                                <input
                                    placeholder="MM/YY"
                                    className={classes["input"]}
                                />
                            </div>
                            <div className={classes["inline-right-input"]}>
                                <div className={classes["input-label"]}>
                                    CCV
                                </div>
                                <input
                                    placeholder="CCV No."
                                    className={classes["input"]}
                                />
                            </div>
                        </div>
                        <div className={classes["terms"]}>
                            <input
                                type={"checkbox"}
                                className={classes["checkbox"]}
                            />
                            <div className={classes["term-line"]}>
                                By adding card you are agreed with us to charge
                                your card for subscription.
                            </div>
                        </div>
                        <button className={classes["button"]}>Add Card</button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default AddCardModal;
