import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/photochromics.svg";

const Photochromics = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Photochromics?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />
                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["label"]}>Select Photochromics</div>
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Transitions Signature 8"}
                        value={"Transitions Signature 8"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Transitions Xtra Active"}
                        value={"Transitions Xtra Active"}
                        headClass={classes["radio"]}
                    />
                    <CustomRadio
                        label={"Transitions Vantage"}
                        value={"Transitions Vantage"}
                        headClass={classes["radio"]}
                    />
                </Radio.Group>
            </div>
        </div>
    );
};

export default Photochromics;
