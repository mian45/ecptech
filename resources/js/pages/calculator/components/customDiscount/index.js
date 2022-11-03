import React, { useState } from "react";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/discount-icon.png";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import * as Yup from "yup";

const CustomDiscount = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const [discount, setDiscount] = useState("");
    const { values, handleChange, handleBlur, setFieldValue } = formProps;

    const handleValueChange = (e) => {
        const removeValidations = () => {
            const validations = { ...calValidations };
            delete validations.discountValue;
            delete validations.discountType;
            setCalValidations({
                ...validations,
            });
        };

        if (e === "") {
            setFieldValue("discountType", "");
            setFieldValue("discountValue", "");
            removeValidations();
        } else if (e === "other") {
            setFieldValue("discountType", "");
            setFieldValue("discountValue", "");
            const discountValue = Yup.string().required("Discount is required");
            const discountType = Yup.string().required(
                "Discount value is required"
            );
            setCalValidations({
                ...calValidations,
                discountValue,
                discountType,
            });
        } else {
            removeValidations();
            const currentDiscount = calculatorObj?.discount?.find(
                (item) => item?.id == e
            );
            setFieldValue("discountType", currentDiscount?.name);
            setFieldValue("discountValue", currentDiscount?.value);
        }
    };
    const getActiveDiscounts = () => {
        return (
            calculatorObj?.discount?.filter(
                (item) => item?.status === "active"
            ) || []
        );
    };
    const handleDiscountValueChange = (e) => {
        if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0)
            return;
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };
    return (
        <div className={classes["container"]}>
            <QuestionIcon
                icon={icon}
                active={values?.discountType && values?.discountValue}
            />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Percent Discount"
                    active={values?.discountType && values?.discountValue}
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
                    <option value={""}></option>
                    {getActiveDiscounts()?.map((item, index) => {
                        return (
                            <option key={index} value={item?.id}>
                                {item?.name || ""}
                            </option>
                        );
                    })}
                    <option value={"other"}>other</option>
                </select>
                {discount === "other" && (
                    <div className={classes["discount-input-container"]}>
                        <div className={classes["discount-input-row"]}>
                            <div className={classes["input-label"]}>
                                Discount Type
                            </div>
                            <input
                                className={classes["input"]}
                                type={"text"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.discountType}
                                id="discountType"
                                name="discountType"
                            />

                            <FormikError name={"discountType"} />
                        </div>
                        <div className={classes["discount-input-row"]}>
                            <div className={classes["input-label"]}>
                                Discount Percentage
                            </div>
                            <input
                                className={classes["input"]}
                                type={"text"}
                                onBlur={handleBlur}
                                onChange={handleDiscountValueChange}
                                value={values?.discountValue}
                                id="discountValue"
                                name="discountValue"
                                step={0.01}
                                min={0.0}
                                max={100.0}
                            />

                            <FormikError name={"discountValue"} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default CustomDiscount;
