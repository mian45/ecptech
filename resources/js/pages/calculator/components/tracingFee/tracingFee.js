import { Col, Radio, Row } from "antd";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import classes from "./tracingFee.module.scss";
import CustomRadio from "../../../../components/customRadio";
import { Plans } from "../../data/plansJson";
import { AllPlans } from "../../data/plansList";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import icon from "../../../../../images/calculator/tracing.svg";

const TracingFee = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const tracingTitle =
        Plans[language][values?.visionPlan]?.tracingFee?.question;
    const tracingTypeYes =
        Plans[language][values?.visionPlan]?.tracingFee?.options?.yes;
    const tracingTypeNo =
        Plans[language][values?.visionPlan]?.tracingFee?.options?.no;

    useEffect(() => {
        setFieldValue("tracingPrice", calculatorObj?.tracing_fee);
    }, [calculatorObj]);

    const handleActiveFields = () => {
        if (values?.tracingFee) return true;
        return false;
    };

    return (
        <>
            {values?.frameOrderType === "Patient Own Frame" ? (
                <Row className={classes["container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveFields()}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title={tracingTitle}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleChange}
                                value={values?.tracingFee}
                                id="tracingFee"
                                name="tracingFee"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={tracingTypeYes}
                                    value={tracingTypeYes}
                                    active={
                                        values?.tracingFee === tracingTypeYes
                                    }
                                />

                                <CustomRadio
                                    label={tracingTypeNo}
                                    value={tracingTypeNo}
                                    active={
                                        values?.tracingFee === tracingTypeNo
                                    }
                                />
                            </Radio.Group>
                            <FormikError name={"tracingFee"} />
                            {values?.tracingFee === "Yes" && (
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
                                            {calculatorObj?.tracing_fee}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(TracingFee);
