import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/sunglasses.svg";

const SunglassLens = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Sunglass Lens?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />

                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["label"]}>Select Sunglass Lens</div>
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    <CustomRadio label={"Polarized"} value={"Polarized"} />

                    <CustomRadio label={"Tint"} value={"Tint"} />
                </Radio.Group>
                <CalculatorHeading title="Mirror Coating?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />

                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["label"]}>Please Select</div>
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    <CustomRadio
                        label={"Ski Type Mirror"}
                        value={"Ski Type Mirror"}
                    />

                    <CustomRadio
                        label={"Solid/Single Gradient"}
                        value={"Solid/Single Gradient"}
                    />
                </Radio.Group>
            </div>
        </div>
    );
};

export default SunglassLens;
