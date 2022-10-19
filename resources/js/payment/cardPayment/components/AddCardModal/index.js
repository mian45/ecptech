import dayjs from "dayjs";
import React, { useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import { DatePicker, Space,Checkbox } from "antd";
const AddCardModal = ({ show, onClose }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [validNumber, setValidNumber] = useState(false);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [validCvc, setValidCvc] = useState(false);
    const [checked, setChecked] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [dateValidation, setDateValidation] = useState(false);

    function stripeCardNumberValidation(number) {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
            DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
            JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
        };
        for (const card in regexPattern) {
            if (number.replace(/[^\d]/g, "").match(regexPattern[card])) {
                if (number) {
                    return number &&
                        /^[1-6]{1}[0-9]{14,15}$/i.test(
                            number.replace(/[^\d]/g, "").trim()
                        )
                        ? setValidNumber(false)
                        : setValidNumber(true);
                }
            }
        }
        setValidNumber(true);
    }

    const postCard = async () => {
        try {
            if (
                cardNumber === "" ||
                cardNumber.replace(/ /g, "").length !== 16
            ) {
                setValidNumber(true);
                return;
            }
            if (name === "") {
                setNameValidation(true);
                setValidNumber(false);
                return;
            }
            if (date === "") {
                setDateValidation(true);
                setNameValidation(false);
                setValidNumber(false);
                return;
            }
            if (cvc === "") {
                setValidCvc(true);
                return;
            }
            if (nameValidation) {
                return;
            } else if (dateValidation) {
                return;
            } else if (validCvc) {
                return;
            } else if (validNumber) {
                return;
            }
            setValidCvc(false);
            setDateValidation(false);
            setNameValidation(false);
            setValidNumber(false);
            const data = new FormData();
            data.append("card_no", new Number(cardNumber.replace(/ /g, "")));
            data.append("card_name", name);
            data.append("card_expiry", date);
            const res = await Axios.post(
                `${process.env.MIX_REACT_APP_URL}/api/add-card`,
                data
            );
            onClose();
        } catch (err) {
            console.log("Error while delete Staff", err);
        }
    };
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
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                                if (e.target.value.length < 20) {
                                    setCardNumber(
                                        e.target.value
                                            .replace(/[^\dA-Z]/g, "")
                                            .replace(/(.{4})/g, "$1 ")
                                            .trim()
                                    );
                                }
                            }}
                            onBlur={(e) => {
                                stripeCardNumberValidation(
                                    e.target.value.replace(" ", "")
                                );
                            }}
                        />
                        {validNumber ? (
                            <label className={classes["validation-error"]}>
                                Please enter valid card number
                            </label>
                        ) : (
                            ""
                        )}
                        <div className={classes["input-label"]}>
                            Card Holder Name
                        </div>
                        <input
                            value={name}
                            placeholder="Enter Card Holder Name"
                            className={classes["input"]}
                            onChange={(e) => {
                                var letters = /^[A-Za-z ]+$/;
                                if (e.target.value.match(letters)) {
                                    setName(e.target.value);
                                } else if (e.target.value == "") {
                                    setName("");
                                }
                            }}
                            onBlur={(e) => {
                                if (name == "") {
                                    setNameValidation(true);
                                } else {
                                    setNameValidation(false);
                                }
                            }}
                        />
                        {nameValidation ? (
                            <label className={classes["validation-error"]}>
                                Name is required
                            </label>
                        ) : (
                            ""
                        )}
                        <div className={classes["inline-input"]}>
                            <div className={classes["inline-left-input"]}>
                                <div className={classes["input-label"]}>
                                    Card Expiry
                                </div>
                                <Space direction="vertical">
                                    <DatePicker
                                        picker="month"
                                        className={classes["input"]}
                                        format="MM/YY"
                                        getPopupContainer={(triggerNode) => {
                                            return triggerNode.parentNode;
                                        }}
                                        onChange={(e, dateString) => {
                                            setDate(dateString);
                                        }}
                                        onBlur={(e) => {
                                            if (date == "") {
                                                setDateValidation(true);
                                            } else {
                                                setDateValidation(false);
                                            }
                                        }}
                                    />
                                </Space>

                                {dateValidation ? (
                                    <label
                                        className={classes["validation-error"]}
                                    >
                                        {" "}
                                        Date is required
                                    </label>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className={classes["inline-right-input"]}>
                                <div className={classes["input-label"]}>
                                    CVV
                                </div>
                                <input
                                    placeholder="CVV No."
                                    type={"text"}
                                    className={classes["input"]}
                                    value={cvc}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 4) {
                                            const regix = new RegExp(
                                                "^[0-9]*$"
                                            );

                                            if (regix.test(e.target.value)) {
                                                setCvc(e.target.value);
                                            }
                                        } else if (e.target.value == "") {
                                            setCvc("");
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (cvc.length < 3) {
                                            setValidCvc(true);
                                        } else {
                                            setValidCvc(false);
                                        }
                                    }}
                                />
                                {validCvc ? (
                                    <label
                                        className={classes["validation-error"]}
                                    >
                                        Please enter valid CVV
                                    </label>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className={classes["terms"]}>
                            <Checkbox value={checked}
                                className={classes["checkbox"]}
                                onChange={(e) => {
                                    setChecked(!checked);
                                }}/>
                           

                            <div className={classes["term-line"]}>
                                By adding card you are agreed with us to charge
                                your card for subscription.
                            </div>
                        </div>
                        <button
                            className={classes["button"]}
                            onClick={(e) => {
                                e.stopPropagation();
                                postCard();
                            }}
                        >
                            Add Card
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default AddCardModal;
