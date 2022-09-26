import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import glassesIcon from "../../../../../images/calculator/sunglasses.svg";
import lensIcon from "../../../../../images/calculator/lens.svg";
import materialIcon from "../../../../../images/calculator/material.svg";

const VisionBenifits = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;

    return (
        <div className={classes["container"]}>
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
            <div className={classes["frame-container"]}>
                <QuestionIcon icon={lensIcon} active={values?.isLensBenifit} />
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
                            onChange={handleChange}
                            value={values?.materialCopay}
                            id="materialCopay"
                            name="materialCopay"
                            step={0.01}
                        />
                    </div>
                    <FormikError name={"materialCopay"} />
                </div>
            </div>
        </div>
    );
};

export default VisionBenifits;
