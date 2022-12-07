import dayjs from "dayjs";
import React, { useState } from "react";
import classes from "./styles.module.scss";
import Axios from "../../../../Http";
import {
    Button,
    Checkbox,
    Form,
    Input,
    DatePicker,
    Space,
    Row,
    Col,
    message,
} from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import { CloseOutlined } from "@ant-design/icons";
const AddCardModal = ({ show, onClose, getPaymentMethod }) => {
    const [messageApi, contextHolder] = message.useMessage();
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
            messageApi.open({
                type: "success",
                content: res.data.message,
                duration: 5,
                className: 'custom-postion',
            });
            getPaymentMethod(true);
            onClose();
        } catch (err) {
            console.log("Error while delete Staff", err);
            messageApi.open({
                type: "error",
                content: err.response.data.message,
                duration: 5,
                className: 'custom-postion-error',
            });
        }
    };
    return (
        <>
            {show ? (
                <Form className={classes["backdrop"]} onClick={onClose}>
                    {contextHolder}
                   
                    <Row
                        className={classes["container"]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Col xs={24}>
                        <Row justify="end" className={classes['cross']}>
                        <CloseOutlined onClick={onClose}/>
                        </Row>
                        <Row className={classes["label"]}>
                            Enter your card details
                        </Row>
                       
                        </Col>
                        <Row className={classes["sub-label"]}>
                            By adding new card, your old card will be removed.
                        </Row>
                        <Row className={classes["col-width"]}>
                            <Col className={classes["input-label"]}>
                                Card Number
                            </Col>
                            <Col xs={24}>
                                <Input
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
                                />
                            </Col>
                        </Row>
                        {validNumber ? (
                            <label className={classes["validation-error"]}>
                                Please enter valid card number
                            </label>
                        ) : (
                            ""
                        )}
                        <Row className={classes["col-width"]}>
                            <Col className={classes["input-label"]}>
                                Card Holder Name
                            </Col>
                            <Col xs={24}>
                                <Input
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
                                />
                            </Col>
                        </Row>
                        {nameValidation ? (
                            <label className={classes["validation-error"]}>
                                Name is required
                            </label>
                        ) : (
                            ""
                        )}
                        <Row className={classes["inline-input"]}>
                            <Col
                                xs={24}
                                sm={12}
                                md={11}
                                lg={11}
                                className={classes["inline-left-input"]}
                            >
                                <Col className={classes["input-label"]}>
                                    Card Expiry
                                </Col>
                                <Space
                                    className={classes["space-styling"]}
                                    direction="vertical"
                                >
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
                            </Col>
                            <Col
                                xs={24}
                                sm={12}
                                md={11}
                                lg={11}
                                className={classes["inline-right-input"]}
                            >
                                <Col className={classes["input-label"]}>
                                    CVV
                                </Col>
                                <Form.Item className={classes["form-margin"]}>
                                    <Input
                                        placeholder="CVV No."
                                        type={"text"}
                                        className={classes["input"]}
                                        value={cvc}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 4) {
                                                const regix = new RegExp(
                                                    "^[0-9]*$"
                                                );

                                                if (
                                                    regix.test(e.target.value)
                                                ) {
                                                    setCvc(e.target.value);
                                                }
                                            } else if (e.target.value == "") {
                                                setCvc("");
                                            }
                                        }}
                                    />
                                </Form.Item>
                                {validCvc ? (
                                    <label
                                        className={classes["validation-error"]}
                                    >
                                        Please enter valid CVV
                                    </label>
                                ) : (
                                    ""
                                )}
                            </Col>
                        </Row>
                        <div className={classes["terms"]}>
                            <CustomCheckbox
                                label={""}
                                defaultChecked={checked || false}
                                onValueChange={(value) => {
                                    setChecked(value);
                                }}
                                containerClass={classes["payment-checkbox"]}
                            />

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
                    </Row>
                </Form>
            ) : (
                <></>
            )}
        </>
    );
};

export default AddCardModal;
