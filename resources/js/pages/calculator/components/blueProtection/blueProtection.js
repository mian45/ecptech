import React from "react";
import classes from "./blueProtection.module.scss";
import * as Yup from "yup";
import { CompareStrings } from "../../../../utils/utils";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import icon from "../../../../../images/calculator/blueProtection.svg";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { connect } from "react-redux";
import BlueProtectionCategory from "./components/blueProectionCategory/blueProtectionCategory";
import BlueProtectionTypes from "./components/blueProtectionTypes/blueProtectionTypes";

const BlueProtection = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    language,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const blueProtectionVisibility = calculatorObj?.questions
        ?.find((item) => item?.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Blue Protection"
        )?.visibility;

    const handleActiveFields = () => {
        return CompareStrings(values?.isBlueProtection, "No") ||
            (CompareStrings(values?.isBlueProtection, "Yes") &&
                values?.blueProtectionCategory &&
                values?.blueProtectionType)
            ? true
            : false;
    };

    const handleBlueProtectionChange = async (e) => {
        handleChange(e);

        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            validationsObj.blueProtectionCategory = Yup.string().required(
                "Category is required"
            );
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("blueProtectionCategory", "");
            await setFieldValue("blueProtectionType", "");
            const validations = { ...calValidations };
            delete validations.blueProtectionCategory;
            delete validations.blueProtectionType;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {blueProtectionVisibility && values?.visionPlan === "VBA" ? (
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
                                title={"Blue Protection"}
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleBlueProtectionChange}
                                value={values?.isBlueProtection}
                                id="isBlueProtection"
                                name="isBlueProtection"
                                className={classes["custom-radio"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isBlueProtection === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isBlueProtection === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isBlueProtection"} />
                            <BlueProtectionCategory
                                formProps={formProps}
                                calculatorObj={calculatorObj && calculatorObj}
                                setCalValidations={setCalValidations}
                                calValidations={calValidations}
                            />
                            <BlueProtectionTypes
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

export default connect(mapStateToProps)(BlueProtection);
