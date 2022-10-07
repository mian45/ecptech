import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import glassesIcon from "../../../../../images/calculator/sunglasses.svg";
import lensIcon from "../../../../../images/calculator/lens.svg";
import materialIcon from "../../../../../images/calculator/material.svg";
import {
    FrameBenifitAvailableEnum,
    LensBenifitAvailableEnum,
} from "../../data/enums";
import { BenifitTypeEnums } from "../../data/initialValues";
import * as Yup from "yup";

const VisionBenifits = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const [err, setErr] = useState("");
    const [privatePayError, setPrivatePayError] = useState("");
    const frameBenifitVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Frame Benefit Available"
        )?.visibility;
    const lensBenifitVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Lens Benefit Available"
        )?.visibility;
    const materialCopayVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Material Copay"
        )?.visibility;

    const handleMaterialCopayChange = (e) => {
        handleChange(e);
        if (e?.target?.value > 50) {
            setErr("Current enter amount is more than $50");
        } else {
            setErr("");
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
            setCalValidations({
                ...validations,
            });
        } else {
            setPrivatePayError("");
            if (
                !data?.find(
                    (ques) => ques.question === "Frame Benefit Available"
                )?.optional
            ) {
                const validationObject = {
                    frameOrderType: Yup.string().required(
                        "Frame Order is required"
                    ),
                };
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
            delete validations.isloweredCopay;
            delete validations.lensType;
            delete validations.lensTypeValue;
            delete validations.lensMaterial;
            delete validations.isPhotochromics;
            delete validations.isSunglasses;
            delete validations.isAntireflective;
            setCalValidations({
                ...validations,
            });
        } else {
            setPrivatePayError("");
            const validationObject = GetValidations(data, false);
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        }
        handleChange(event);
    };

    return (
        <div className={classes["container"]}>
            {frameBenifitVisibility && (
                <div className={classes["frame-container"]}>
                    <QuestionIcon
                        icon={glassesIcon}
                        active={values?.isFrameBenifit}
                    />
                    <div className={classes["question-container"]}>
                        <CalculatorHeading
                            title="Frame Benefit Available?"
                            active={values?.isFrameBenifit}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
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
                                label={FrameBenifitAvailableEnum.onlyThisTime}
                                value={FrameBenifitAvailableEnum.onlyThisTime}
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
                </div>
            )}
            {lensBenifitVisibility && (
                <div className={classes["frame-container"]}>
                    <QuestionIcon
                        icon={lensIcon}
                        active={values?.isLensBenifit}
                    />
                    <div className={classes["question-container"]}>
                        <CalculatorHeading
                            title="Lens Benefit Available?"
                            active={values?.isLensBenifit}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
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
                                label={LensBenifitAvailableEnum.onlyThisTime}
                                value={LensBenifitAvailableEnum.onlyThisTime}
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
                </div>
            )}
            {materialCopayVisibility && (
                <div className={classes["frame-container"]}>
                    <QuestionIcon
                        icon={materialIcon}
                        active={values?.materialCopay}
                    />
                    <div className={classes["question-container"]}>
                        <CalculatorHeading
                            title="Material Copay?"
                            active={values?.materialCopay}
                        />
                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <input
                                className={classes["input"]}
                                type={"number"}
                                onBlur={handleBlur}
                                onChange={handleMaterialCopayChange}
                                value={values?.materialCopay}
                                id="materialCopay"
                                name="materialCopay"
                                step={0.01}
                                min={0.0}
                            />
                        </div>
                        {err && <div className={classes["error"]}>{err}</div>}
                        <FormikError name={"materialCopay"} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisionBenifits;

export const GetValidations = (data, isLoweredCopay) => {
    const validationObject = {};
    if (
        !data?.find(
            (ques) => ques.question === "Any copay lowered than standard"
        )?.optional &&
        isLoweredCopay
    ) {
        validationObject.isloweredCopay =
            Yup.string().required("Option is required");
    }
    if (!data?.find((ques) => ques.question === "Lens Type")?.optional) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Lens Type")?.optional) {
        validationObject.lensTypeValue =
            Yup.string().required("Option is required");
    }
    if (!data?.find((ques) => ques.question === "Lens Material")?.optional) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Photochromics")?.optional) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Sunglass Lens")?.optional) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglass lens is required"
        );
    }
    if (
        !data?.find((ques) => ques.question === "Antireflective Properties")
            ?.optional
    ) {
        validationObject.isAntireflective = Yup.string().required(
            "Antireflective is required"
        );
    }
    return validationObject;
};
