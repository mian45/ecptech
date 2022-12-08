import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/antireflictive.svg";
import { AntireflectiveTypeEnum } from "../../data/enums";
import * as Yup from "yup";
import { AllPlans } from "../../data/plansList";
import { PLANS } from "../../data/plansJson";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import { connect } from "react-redux";

const AntireFlextive = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const antireflectiveVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Antireflective Properties"
        )?.visibility;
    const [error, setError] = useState("");

    const eyemedPlan = AllPlans[language]?.eyemed;
    const lensBenifitYes =
        PLANS[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const antireflectiveYes =
        PLANS[language][values?.visionPlan]?.antireflective?.options?.yes;

    const getAntireflectiveList = () => {
        return (
            calculatorObj?.addons?.find(
                (item) => item?.title === "Anti Reflective"
            )?.addons || []
        );
    };

    const handleActiveFields = () => {
        return (values?.isAntireflective === "Yes" &&
            values?.antireflectiveType &&
            values?.visionPlan !== eyemedPlan) ||
            values?.isAntireflective === "No" ||
            (values?.isAntireflective === "Yes" &&
                values?.antireflectiveType &&
                values?.visionPlan === eyemedPlan &&
                values?.antireflectiveValue)
            ? true
            : false;
    };

    const handleAntireflectiveChange = async (e) => {
        handleChange(e);
        if (
            (e?.target?.value === "Yes" &&
                !data?.find(
                    (ques) => ques.question === "Antireflective Properties"
                ).optional) ||
            (e?.target?.value === "Yes" && values?.lensType === "NVF")
        ) {
            const antireflectiveType = Yup.string().required(
                "Antireflective type is required"
            );
            setCalValidations({
                ...calValidations,
                antireflectiveType,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("isCopayAntiReflective", null);
            await setFieldValue("isCopayAntiReflectiveAmount", "");
            await setFieldValue("copayAntiReflectiveAmount", "");
            const validations = { ...calValidations };
            delete validations.antireflectiveType;
            delete validations.isCopayAntiReflectiveAmount;
            delete validations.copayAntiReflectiveAmount;
            setCalValidations({
                ...validations,
            });
        }
        if (values.isCopayAntiReflective && e.target.value === "No") {
            setError(
                "Are you sure, you don't want to use the available discount?"
            );
        } else {
            setError("");
        }
    };
    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };

    const handleAntireflectiveTypeChange = (e) => {
        handleChange(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isAntireflective === antireflectiveYes &&
            e?.target?.value
        ) {
            const validationObject = {};
            validationObject.antireflectiveValue =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.antireflectiveValue;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {(antireflectiveVisibility || values?.lensType === "NVF") && (
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
                                title="Antireflective Properties?"
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleAntireflectiveChange}
                                value={values?.isAntireflective}
                                id="isAntireflective"
                                name="isAntireflective"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isAntireflective === "Yes"}
                                />

                                {values?.lensType !== "NVF" && (
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={
                                            values?.isAntireflective === "No"
                                        }
                                    />
                                )}
                            </Radio.Group>
                            <FormikError name={"isAntireflective"} />
                            {error && (
                                <div className={classes["error"]}>{error}</div>
                            )}
                            {values?.isAntireflective === "Yes" && (
                                <>
                                    <div className={classes["label"]}>
                                        Select Properties
                                    </div>
                                    <Radio.Group
                                        onChange={
                                            handleAntireflectiveTypeChange
                                        }
                                        value={values?.antireflectiveType}
                                        id="antireflectiveType"
                                        name="antireflectiveType"
                                        className={classes["radio-group"]}
                                    >
                                        {getAntireflectiveList()?.map(
                                            (value, index) => {
                                                return (
                                                    <CustomRadio
                                                        key={index}
                                                        label={
                                                            value?.display_name
                                                                ? value?.display_name
                                                                : value?.title
                                                        }
                                                        value={value?.title}
                                                        headClass={
                                                            classes["radio"]
                                                        }
                                                        active={
                                                            values?.antireflectiveType ===
                                                            value?.title
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </Radio.Group>
                                    <FormikError name={"antireflectiveType"} />
                                </>
                            )}
                            {values?.visionPlan === eyemedPlan &&
                                values?.isLensBenifit === lensBenifitYes &&
                                values?.isAntireflective ===
                                    antireflectiveYes &&
                                values?.antireflectiveType && (
                                    <CalculatorInput
                                        onChange={handleInputChange}
                                        value={values?.antireflectiveValue}
                                        name={"antireflectiveValue"}
                                    />
                                )}
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(AntireFlextive);
