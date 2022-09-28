import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import glassesIcon from "../../../../../images/calculator/sunglasses.svg";
import lensIcon from "../../../../../images/calculator/lens.svg";
import materialIcon from "../../../../../images/calculator/material.svg";

const VisionBenifits = ({ formProps, calculatorObj }) => {
    const { values, handleChange, handleBlur, errors } = formProps;
    const [err, setErr] = useState("");
    const frameBenifitVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.frameBenefit?.visibility;
    const lensBenifitVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.lensBenefit?.visibility;
    const materialCopayVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.materialCopay?.visibility;

    const handleMaterialCopayChange = (e) => {
        handleChange(e);
        if (e?.target?.value >= 50) {
            setErr("Current enter amount is more than $50");
        } else {
            setErr("");
        }
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
                            onChange={handleChange}
                            value={values?.isFrameBenifit}
                            id="isFrameBenifit"
                            name="isFrameBenifit"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                active={values?.isFrameBenifit === "Yes"}
                            />

                            <CustomRadio
                                label={
                                    "Only multiple pair benefit only at this time"
                                }
                                value={
                                    "Only multiple pair benefit only at this time"
                                }
                                active={
                                    values?.isFrameBenifit ===
                                    "Only multiple pair benefit only at this time"
                                }
                                disabled={true}
                            />
                        </Radio.Group>
                        <FormikError name={"isFrameBenifit"} />
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
                            onChange={handleChange}
                            value={values?.isLensBenifit}
                            id="isLensBenifit"
                            name="isLensBenifit"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                active={values?.isLensBenifit === "Yes"}
                            />

                            <CustomRadio
                                label={
                                    "Only multiple pair benefit only at this time"
                                }
                                value={
                                    "Only multiple pair benefit only at this time"
                                }
                                active={
                                    values?.isLensBenifit ===
                                    "Only multiple pair benefit only at this time"
                                }
                                disabled={true}
                            />
                        </Radio.Group>
                        <FormikError name={"isLensBenifit"} />
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
