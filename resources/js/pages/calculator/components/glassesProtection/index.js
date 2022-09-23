import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/shipping.svg";

const GlassesProtection = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} iconClass={classes["icon-style"]} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Add Shipping" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />

                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["label"]}>Amount</div>

                <div className={classes["input-container"]}>
                    <div className={classes["input-label"]}>$</div>
                    <input className={classes["input"]} type={"number"} />
                </div>
            </div>
        </div>
    );
};

export default GlassesProtection;
