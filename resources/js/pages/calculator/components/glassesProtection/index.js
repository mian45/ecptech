import React, { useEffect } from "react";
import { Col, Radio, Row } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/shipping.svg";

const GlassesProtection = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const shippingVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Add Shipping"
        )?.visibility;

    useEffect(() => {
        setFieldValue("shippingAmount", calculatorObj?.shipping);
    }, []);
    return (
        <>
            {shippingVisibility && (
                <Row className={classes["container"]}>
                    <Col xs={24} sm={24} md={5} lg={5}>
                        <QuestionIcon
                            icon={icon}
                            iconClass={classes["icon-style"]}
                            active={values?.shipping}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={19} lg={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Add Shipping"
                                active={values?.shipping}
                            />
                            <Radio.Group
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
                                    <div className={classes["label"]}>
                                        Amount
                                    </div>
                                    <div className={classes["input-container"]}>
                                        <div className={classes["input-label"]}>
                                            $
                                        </div>
                                        <div
                                            className={
                                                classes["input-shipping"]
                                            }
                                        >
                                            {calculatorObj?.shipping}
                                        </div>
                                    </div>{" "}
                                    {!calculatorObj?.shipping && (
                                        <div className={classes["error"]}>
                                            Please go to settings to add
                                            Shipping.
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default GlassesProtection;
