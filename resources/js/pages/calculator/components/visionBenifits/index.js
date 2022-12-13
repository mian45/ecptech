import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import glassesIcon from "../../../../../images/calculator/frame.svg";
import lensIcon from "../../../../../images/calculator/lens.svg";
import materialIcon from "../../../../../images/calculator/material.svg";
import {
    FrameBenifitAvailableEnum,
    LensBenifitAvailableEnum,
} from "../../data/enums";
import { BenifitTypeEnums } from "../../data/initialValues";
import * as Yup from "yup";
import { AllPlans } from "../../data/plansList";
import { connect } from "react-redux";

const VisionBenifits = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const [err, setErr] = useState("");
    const [privatePayError, setPrivatePayError] = useState("");
    const frameBenifitVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Frame Benefit Available"
        )?.visibility;
    const lensBenifitVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Lens Benefit Available"
        )?.visibility;
    const materialCopayVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Material Copay"
        )?.visibility;
    const eyemedPlan = AllPlans[language]?.eyemed;

    const handleMaterialCopayChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value) || e.target.value === "") {
            handleChange(e);
            if (e?.target?.value > 50) {
                setErr("Entered amount is greater than $50");
            } else {
                setErr("");
            }
        }
    };
    const handleFrameBenifitAvailableChange = (event) => {
        if (event?.target?.value === FrameBenifitAvailableEnum.onlyThisTime) {
            if (
                event?.target?.value ===
                    FrameBenifitAvailableEnum.onlyThisTime &&
                values?.isLensBenifit == FrameBenifitAvailableEnum.onlyThisTime
            ) {
                setPrivatePayError("Please switch to Private Pay");
            }
            setFieldValue("benifitType", BenifitTypeEnums.frame);
            const validations = { ...calValidations };
            delete validations.frameOrderType;
            delete validations.frameRetailFee;
            delete validations.frameContribution;
            delete validations.drillMount;
            delete validations.drillMountValue;
            delete validations.shipping;
            setCalValidations({
                ...validations,
            });
        } else {
            if (
                values?.isLensBenifit === LensBenifitAvailableEnum.onlyThisTime
            ) {
                setFieldValue("benifitType", BenifitTypeEnums.lens);
            } else {
                setFieldValue("benifitType", "");
            }
            setPrivatePayError("");
            if (
                data?.find(
                    (ques) => ques.question === "Frame Benefit Available"
                )?.optional === "true"
            ) {
                const validationObject = {
                    frameOrderType: Yup.string().required(
                        "Frame Order is required"
                    ),
                };
                if (values?.frameOrderType === "New Frame Purchase") {
                    validationObject.frameRetailFee = Yup.string().required(
                        "Retail fee is required"
                    );
                    validationObject.frameContribution = Yup.string().required(
                        "Contribution is required"
                    );
                    validationObject.drillMount = Yup.string().required(
                        "Drill mount is required"
                    );
                    if (
                        values?.visionPlan === eyemedPlan &&
                        values?.drillMount === "Yes"
                    ) {
                        validationObject.drillMountValue =
                            Yup.string().required("Drill mount is required");
                    }
                }
                if (values?.frameOrderType === "Patient Own Frame") {
                    validationObject.tracingFee = Yup.string().required(
                        "Tracing Fee is required"
                    );
                }
                setCalValidations({
                    ...calValidations,
                    ...validationObject,
                });
            }
        }
        handleChange(event);
    };
    const handleLensBenifitsAvailableChange = (event) => {
        if (event?.target?.value === LensBenifitAvailableEnum.onlyThisTime) {
            if (
                event?.target?.value ===
                    FrameBenifitAvailableEnum.onlyThisTime &&
                values?.isFrameBenifit == FrameBenifitAvailableEnum.onlyThisTime
            ) {
                setPrivatePayError("Please switch to Private Pay");
            }
            setFieldValue("benifitType", BenifitTypeEnums.lens);
            const validations = { ...calValidations };
            delete validations.isLoweredCopay;
            delete validations.lensType;
            if (values.lensType) {
                delete validations.lensTypeValue;
            }
            delete validations.lensMaterial;
            delete validations.isPhotochromics;
            delete validations.isSunglasses;
            delete validations.isAntireflective;
            delete validations.isAdditionalLensOptions;
            setCalValidations({
                ...validations,
            });
        } else {
            if (
                values?.isFrameBenifit ===
                FrameBenifitAvailableEnum.onlyThisTime
            ) {
                setFieldValue("benifitType", BenifitTypeEnums.frame);
            } else {
                setFieldValue("benifitType", "");
            }
            setPrivatePayError("");
            const validationObject = GetValidations(data, false, values);
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        }
        handleChange(event);
    };

    return (
        <div className={classes["container"]}>
            {frameBenifitVisibility && values?.visionPlan !== "Private Pay" && (
                <Row className={classes["frame-container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={glassesIcon}
                            active={values?.isFrameBenifit}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["question-container"]}>
                            <CalculatorHeading
                                title="Frame Benefit Available?"
                                active={values?.isFrameBenifit}
                            />
                            <Radio.Group
                                onChange={handleFrameBenifitAvailableChange}
                                value={values?.isFrameBenifit}
                                id="isFrameBenifit"
                                name="isFrameBenifit"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={FrameBenifitAvailableEnum.yes}
                                    value={FrameBenifitAvailableEnum.yes}
                                    active={
                                        values?.isFrameBenifit ===
                                        FrameBenifitAvailableEnum.yes
                                    }
                                />

                                <CustomRadio
                                    label={
                                        FrameBenifitAvailableEnum.onlyThisTime
                                    }
                                    value={
                                        FrameBenifitAvailableEnum.onlyThisTime
                                    }
                                    active={
                                        values?.isFrameBenifit ===
                                        FrameBenifitAvailableEnum.onlyThisTime
                                    }
                                />
                            </Radio.Group>
                            <FormikError name={"isFrameBenifit"} />
                            <div className={classes["error"]}>
                                {privatePayError}
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
            {lensBenifitVisibility && values?.visionPlan !== "Private Pay" && (
                <Row className={classes["frame-container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={lensIcon}
                            active={values?.isLensBenifit}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["question-container"]}>
                            <CalculatorHeading
                                title="Lens Benefit Available?"
                                active={values?.isLensBenifit}
                            />
                            <Radio.Group
                                onChange={handleLensBenifitsAvailableChange}
                                value={values?.isLensBenifit}
                                id="isLensBenifit"
                                name="isLensBenifit"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={LensBenifitAvailableEnum.yes}
                                    value={LensBenifitAvailableEnum.yes}
                                    active={
                                        values?.isLensBenifit ===
                                        LensBenifitAvailableEnum.yes
                                    }
                                />

                                <CustomRadio
                                    label={
                                        LensBenifitAvailableEnum.onlyThisTime
                                    }
                                    value={
                                        LensBenifitAvailableEnum.onlyThisTime
                                    }
                                    active={
                                        values?.isLensBenifit ===
                                        LensBenifitAvailableEnum.onlyThisTime
                                    }
                                />
                            </Radio.Group>
                            <FormikError name={"isLensBenifit"} />
                            <div className={classes["error"]}>
                                {privatePayError}
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
            {materialCopayVisibility && (
                <Row className={classes["frame-container"]}>
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={materialIcon}
                            active={values?.materialCopay !== ""}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["question-container"]}>
                            <CalculatorHeading
                                title="Material Copay?"
                                active={values?.materialCopay !== ""}
                            />
                            <div className={classes["input-container"]}>
                                <div className={classes["input-label"]}>$</div>
                                <input
                                    className={classes["input"]}
                                    type={"text"}
                                    onChange={handleMaterialCopayChange}
                                    value={values?.materialCopay}
                                    id="materialCopay"
                                    name="materialCopay"
                                />
                            </div>
                            {err && (
                                <div className={classes["error"]}>{err}</div>
                            )}
                            <FormikError name={"materialCopay"} />
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(VisionBenifits);

export const GetValidations = (data, isLoweredCopay, values) => {
    const slabOff =
        data?.find((ques) => ques?.question == "Slab Off")?.optional === "true";
    const specialityLens =
        data?.find((ques) => ques?.question == "Speciality Lens")?.optional ===
        "true";
    const polish =
        data?.find((ques) => ques?.question == "Polish")?.optional === "true";

    const validationObject = {};
    if (
        (slabOff || specialityLens || polish) &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.isAdditionalLensOptions = Yup.string().required(
            "Additional lens options is required"
        );
    }
    if (
        data?.find(
            (ques) => ques.question === "Any copay lowered than standard"
        )?.optional === "true" &&
        isLoweredCopay
    ) {
        validationObject.isLoweredCopay =
            Yup.string().required("Option is required");
    }
    if (
        data?.find((ques) => ques.question === "Lens Type")?.optional === "true"
    ) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    validationObject.lensTypeValue = Yup.string().required("Brand is required");
    if (!values?.lensType) {
        delete validationObject.lensTypeValue;
    }
    if (
        data?.find((ques) => ques.question === "Lens Material")?.optional ===
        "true"
    ) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (
        data?.find((ques) => ques.question === "Photochromics")?.optional ===
        "true"
    ) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (
        data?.find((ques) => ques.question === "Sunglass Options")?.optional ===
        "true"
    ) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglass lens is required"
        );
    }
    if (
        data?.find((ques) => ques.question === "Anti-Reflective Properties")
            ?.optional === "true"
    ) {
        validationObject.isAntireflective = Yup.string().required(
            "Antireflective is required"
        );
    }
    validationObject.antireflectiveType = Yup.string().required(
        "Antireflective type is required"
    );
    if (!values?.isAntireflective || values?.isAntireflective === "No") {
        delete validationObject.antireflectiveType;
    }
    return validationObject;
};
