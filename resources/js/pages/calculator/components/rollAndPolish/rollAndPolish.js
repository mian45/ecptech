import { Col, Radio, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import CustomRadio from "../../../../components/customRadio";
import { CompareStrings } from "../../../../utils/utils";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./rollAndPolish.module.scss";
import icon from "../../../../../images/calculator/additional-lens.svg";
import * as Yup from "yup";
import RollAndPolishTypes from "./components/rollAndPolishTypes/rollAndPolishTypes";

const RollAndPolish = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const polishVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Roll & Polish"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isRollAndPolish, "No") ||
            (CompareStrings(values?.isRollAndPolish, "Yes") &&
                values?.rollAndPolishTypes)
            ? true
            : false;
    };

    const handleRollAndPolishChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.rollAndPolishTypes = Yup.string().required(
                "Roll & Polish Type is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("rollAndPolishTypes", "");
            const validations = { ...calValidations };
            delete validations.rollAndPolishTypes;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {polishVisibility && values?.visionPlan === "VBA" ? (
                <Row className={classes["container"]}>
                    <Col xs={24} sm={24} md={5} lg={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveFields()}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={19} lg={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title={"Roll & Polish"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleRollAndPolishChange}
                                value={values?.isRollAndPolish}
                                id="isRollAndPolish"
                                name="isRollAndPolish"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isRollAndPolish === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isRollAndPolish === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isRollAndPolish"} />
                            <RollAndPolishTypes
                                formProps={formProps}
                                calculatorObj={calculatorObj && calculatorObj}
                                setCalValidations={setCalValidations}
                                calValidations={calValidations}
                            />
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(RollAndPolish);
