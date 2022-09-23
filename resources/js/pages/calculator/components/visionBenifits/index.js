import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import glassesIcon from "../../../../../images/calculator/sunglasses.svg";
import lensIcon from "../../../../../images/calculator/lens.svg";
import materialIcon from "../../../../../images/calculator/material.svg";

const VisionBenifits = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["frame-container"]}>
                <QuestionIcon icon={glassesIcon} />
                <div className={classes["question-container"]}>
                    <CalculatorHeading title="Frame Benefit Available?" />
                    <Radio.Group
                        onChange={() => {}}
                        // value={""}
                        className={classes["radio-group"]}
                    >
                        <CustomRadio label={"Yes"} value={"Yes"} />

                        <CustomRadio
                            label={
                                "Only multiple pair benefit only at this time"
                            }
                            value={
                                "Only multiple pair benefit only at this time"
                            }
                        />
                    </Radio.Group>
                </div>
            </div>
            <div className={classes["frame-container"]}>
                <QuestionIcon icon={lensIcon} />
                <div className={classes["question-container"]}>
                    <CalculatorHeading title="Lens Benefit Available?" />
                    <Radio.Group
                        onChange={() => {}}
                        // value={""}
                        className={classes["radio-group"]}
                    >
                        <CustomRadio label={"Yes"} value={"Yes"} />

                        <CustomRadio
                            label={
                                "Only multiple pair benefit only at this time"
                            }
                            value={
                                "Only multiple pair benefit only at this time"
                            }
                        />
                    </Radio.Group>
                </div>
            </div>
            <div className={classes["frame-container"]}>
                <QuestionIcon icon={materialIcon} />
                <div className={classes["question-container"]}>
                    <CalculatorHeading title="Material Copay?" />
                    <div className={classes["input-container"]}>
                        <div className={classes["input-label"]}>$</div>
                        <input className={classes["input"]} type={"number"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionBenifits;
