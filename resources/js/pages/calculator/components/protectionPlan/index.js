import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/protection.svg";

const ProtectionPlan = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Protection Plan" />
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
                >
                    <CustomRadio
                        label={"Lenses Protection Plan"}
                        value={"Lenses Protection Plan"}
                    />

                    <CustomRadio
                        label={"Glasses Protection Plan"}
                        value={"Glasses Protection Plan"}
                    />
                    <CustomRadio label={"Both"} value={"Both"} />
                </Radio.Group>
                <div className={classes["label"]}>Please Select</div>
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Paid"} value={"Paid"} />
                    <CustomRadio label={"Unpaid"} value={"Unpaid"} />
                </Radio.Group>
                <div className={classes["input-container"]}>
                    <div className={classes["input-label"]}>$</div>
                    <input className={classes["input"]} type={"number"} />
                </div>
            </div>
        </div>
    );
};

export default ProtectionPlan;
