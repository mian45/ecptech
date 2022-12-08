import { Col, Radio, Row } from "antd";
import React from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import classes from "./tracingFee.module.scss";
import CustomRadio from "../../../../components/customRadio";
import { PLANS } from "../../data/plansJson";
import { AllPlans } from "../../data/plansList";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import icon from "../../../../../images/calculator/tracing.svg";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";

const TracingFee = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange } = formProps;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const tracingTitle =
        PLANS[language][values?.visionPlan]?.tracingFee?.question;
    const tracingTypeYes =
        PLANS[language][values?.visionPlan]?.tracingFee?.options?.yes;
    const tracingTypeNo =
        PLANS[language][values?.visionPlan]?.tracingFee?.options?.no;

    const handleActiveFields = () => {
        if (values?.tracingFee) return true;
        return false;
    };
    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };
    const handleTracingChange = (e) => {
        handleChange(e);
        if (
            values?.visionPlan === eyemedPlan &&
            e?.target?.value === tracingTypeYes
        ) {
            const validationObject = {};
            validationObject.tracingPrice =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.tracingPrice;
            setCalValidations({
                ...validations,
            });
        }
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
                                onChange={handleTracingChange}
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
                            {values?.visionPlan === eyemedPlan &&
                                values?.tracingFee === tracingTypeYes && (
                                    <CalculatorInput
                                        onChange={handleInputChange}
                                        value={values?.tracingPrice}
                                        name={"tracingPrice"}
                                    />
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
