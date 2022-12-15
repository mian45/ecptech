import React from "react";
import { connect } from "react-redux";
import { AllPlans } from "../../data/plansList";
import PlanTitles from "../../data/plansTitles/planTitles";
import QuestionIcon from "../questionIcon";
import classes from "./blueLightFiltering.module.scss";
import icon from "../../../../../images/calculator/additional-lens.svg";
import { Col, Radio, Row } from "antd";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";

const BlueLightFiltering = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange } = formProps;
    const allPlans = AllPlans[language];
    const { blueLightTitle, blueLightYes, blueLightNo } = PlanTitles(
        language,
        values?.visionPlan
    );
    const blueLightVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Blue Light Filtering"
        )?.visibility;
    const renderBlueLight = () => {
        return (
            <Row className={classes["container"]}>
                <Col sx={0} sm={0} md={5}>
                    <QuestionIcon icon={icon} active={values?.blueLight} />
                </Col>
                <Col sx={24} sm={24} md={19}>
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title={blueLightTitle}
                            active={values?.blueLight}
                        />
                        <Radio.Group
                            onChange={handleChange}
                            value={values?.blueLight}
                            id="blueLight"
                            name="blueLight"
                            className={classes["custom-radio"]}
                        >
                            <CustomRadio
                                label={blueLightYes}
                                value={blueLightYes}
                                active={values?.blueLight === blueLightYes}
                            />

                            {values?.lensType !== "NVF" && (
                                <CustomRadio
                                    label={blueLightNo}
                                    value={blueLightNo}
                                    active={values?.blueLight === blueLightNo}
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"blueLight"} />
                    </div>
                </Col>
            </Row>
        );
    };
    return (
        <>
            {values?.visionPlan === allPlans?.davis && blueLightVisibility ? (
                renderBlueLight()
            ) : (
                <></>
            )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(BlueLightFiltering);
