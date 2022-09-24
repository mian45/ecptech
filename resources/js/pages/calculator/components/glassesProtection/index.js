import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/shipping.svg";

const GlassesProtection = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;
    return (
        <div className={classes["container"]}>
            <QuestionIcon
                icon={icon}
                iconClass={classes["icon-style"]}
                active={values?.shipping}
            />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Add Shipping"
                    active={values?.shipping}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.shipping}
                    id="shipping"
                    name="shipping"
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Yes"}
                        value={"Yes"}
                        active={values?.shipping === "Yes"}
                    />

                    <CustomRadio
                        label={"No"}
                        value={"No"}
                        active={values?.shipping === "No"}
                    />
                </Radio.Group>
                <FormikError name={"shipping"} />
                {values?.shipping === "Yes" && (
                    <>
                        <div className={classes["label"]}>Amount</div>

                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <div className={classes["input-shipping"]}>
                                {values.shippingAmount}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GlassesProtection;
