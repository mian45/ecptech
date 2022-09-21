import React from "react";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import { Radio } from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import visionIcon from "../../../../../images/calculator/vision.svg";

const LoweredCopay = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={visionIcon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Any copay lowered than standard?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />
                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["checkbox-group"]}>
                    <CustomCheckbox label={"Polycarbonate"} defaultChecked />
                    <CustomCheckbox label={"Photochromic"} />
                    <CustomCheckbox label={"High Index"} />
                    <CustomCheckbox label={"Anti-Reflective Properties"} />
                    <CustomCheckbox label={"Premium Progressives"} />
                </div>
                <CalculatorHeading title="Lowered Copay?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Lowered Copay"}
                        value={"Lowered Copay"}
                    />
                    <CustomRadio label={"$0 Copay"} value={"$0 Copay"} />
                </Radio.Group>
            </div>
        </div>
    );
};

export default LoweredCopay;
