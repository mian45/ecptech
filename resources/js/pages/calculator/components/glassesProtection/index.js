import React, { useEffect } from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/shipping.svg";

const GlassesProtection = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const shippingVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.shipping?.visibility;

    useEffect(() => {
        setFieldValue("shippingAmount", calculatorObj?.shipping);
    }, []);
    return (
        <>
            {shippingVisibility && (
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
                                    <div className={classes["input-label"]}>
                                        $
                                    </div>
                                    <div className={classes["input-shipping"]}>
                                        {calculatorObj?.shipping}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default GlassesProtection;
