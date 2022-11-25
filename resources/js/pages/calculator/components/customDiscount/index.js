import React, { useEffect, useState } from "react";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/discount-icon.png";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { Col, Row } from "antd";

const CustomDiscount = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    calculatorState,
}) => {
    const history = useHistory();
    const [discount, setDiscount] = useState("");
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const editInvoiceState = history?.location?.state?.invoice;

    const discountVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Discount"
        )?.visibility;
    useEffect(() => {
        if (discount === "") {
            const validations = { ...calValidations };
            delete validations.discountValue;
            delete validations.discountType;
            setCalValidations({
                ...validations,
            });
        } else {
            const discountValue = Yup.string().required("Discount is required");
            const discountType = Yup.string().required(
                "Discount name is required"
            );
            setCalValidations({
                ...calValidations,
                discountValue,
                discountType,
            });
        }
    }, [discount]);

    const getActiveDiscounts = () => {
        return (
            calculatorObj?.discount?.filter(
                (item) => item?.status === "active"
            ) || []
        );
    };
    const isSelected = getActiveDiscounts()?.filter(
        (item) => item?.id === values?.discountId
    );
    useEffect(() => {
        if (editInvoiceState?.id) {
            if (values?.discountType === "" && discount === "") {
                setDiscount("");
            } else if (
                isSelected?.length === 0 &&
                values?.discountId === "other"
            ) {
                setDiscount("other");
            } else {
                setDiscount(isSelected[0]?.id);
            }
        }
    }, [history?.location?.state, isSelected, calculatorObj]);

    const handleValueChange = async (e) => {
        const removeValidations = () => {
            const validations = { ...calValidations };
            delete validations.discountValue;
            delete validations.discountType;
            setCalValidations({
                ...validations,
            });
        };

        if (e === "") {
            await setFieldValue("discountType", "");
            await setFieldValue("discountValue", "");
            await setFieldValue("discountAmountType", "percentage");
            await setFieldValue("discountId", "");
            removeValidations();
        } else if (e === "other") {
            await setFieldValue("discountType", "");
            await setFieldValue("discountValue", "");
            await setFieldValue("discountAmountType", "percentage");
            await setFieldValue("discountId", "other");
        } else {
            const currentDiscount = calculatorObj?.discount?.find(
                (item) => item?.id == e
            );
            await setFieldValue("discountType", currentDiscount?.name);
            await setFieldValue("discountValue", currentDiscount?.value);
            await setFieldValue("discountAmountType", currentDiscount?.type);
            await setFieldValue("discountId", currentDiscount?.id);
        }
    };

    const handleDiscountValueChange = (e) => {
        if (values?.discountAmountType === "percentage") {
            if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0)
                return;
            const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
            if (regix.test(e.target.value)) {
                handleChange(e);
            } else if (e.target.value == "") {
                handleChange(e);
            }
        } else {
            const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
            if (regix.test(e.target.value)) {
                handleChange(e);
            } else if (e.target.value == "") {
                handleChange(e);
            }
        }
    };
    return (
        <>
            {discountVisibility ? (
                <Row className={classes["container"]}>
                    {" "}
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={icon}
                            active={
                                values?.discountType && values?.discountValue
                            }
                        />{" "}
                    </Col>
                    <Col
                        sx={24}
                        sm={24}
                        md={19}
                        className={classes["vision-container-col"]}
                    >
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Discount"
                                active={
                                    values?.discountType &&
                                    values?.discountValue
                                }
                            />
                            <select
                                placeholder="Select Discount"
                                value={discount || ""}
                                onChange={(value) => {
                                    setDiscount(value.target.value);
                                    handleValueChange(value.target.value);
                                }}
                                id="discountTypeDropdown"
                                name="discountTypeDropdown"
                                className={classes["discount-select"]}
                            >
                                <option value={""}>None</option>
                                {getActiveDiscounts()?.map((item, index) => {
                                    return (
                                        <option key={index} value={item?.id}>
                                            {item?.name || ""}
                                        </option>
                                    );
                                })}
                                <option value={"other"}>Other</option>
                            </select>
                            {discount !== "other" && (
                                <FormikError name={"discountValue"} />
                            )}
                            {discount === "other" && (
                                <div
                                    className={
                                        classes["discount-input-container"]
                                    }
                                >
                                    <div
                                        className={
                                            classes["discount-input-row"]
                                        }
                                    >
                                        <div className={classes["input-label"]}>
                                            Discount Name
                                        </div>
                                        <input
                                            className={classes["input"]}
                                            type={"text"}
                                            onChange={handleChange}
                                            value={values?.discountType}
                                            id="discountType"
                                            name="discountType"
                                        />

                                        <FormikError name={"discountType"} />
                                    </div>
                                    <div
                                        className={
                                            classes["discount-input-row"]
                                        }
                                    >
                                        <div className={classes["input-label"]}>
                                            Discount Percentage
                                        </div>
                                        <div
                                            className={
                                                classes[
                                                    "discount-amount-container"
                                                ]
                                            }
                                        >
                                            <input
                                                className={`${classes["input"]} ${classes["margin-discount"]}`}
                                                type={"text"}
                                                onChange={
                                                    handleDiscountValueChange
                                                }
                                                value={values?.discountValue}
                                                id="discountValue"
                                                name="discountValue"
                                                step={0.01}
                                                min={0.0}
                                                max={100.0}
                                            />
                                            <select
                                                value={
                                                    values?.discountAmountType ||
                                                    ""
                                                }
                                                onChange={handleChange}
                                                id="discountAmountType"
                                                name="discountAmountType"
                                                className={`${classes["discount-select"]} ${classes["center-select"]}`}
                                            >
                                                <option value={"percentage"}>
                                                    %
                                                </option>
                                                <option value={"amount"}>
                                                    $
                                                </option>
                                            </select>
                                        </div>

                                        <FormikError name={"discountValue"} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};
export default CustomDiscount;
