import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/antireflictive.svg";

const AntireFlextive = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={icon} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Antireflective Properties?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio label={"Yes"} value={"Yes"} />

                    <CustomRadio label={"No"} value={"No"} />
                </Radio.Group>
                <div className={classes["label"]}>Select Properties</div>
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        headClass={classes["margin"]}
                        label={"Shamir Glacier Plus UV"}
                        value={"Shamir Glacier Plus UV"}
                    />
                    <CustomRadio
                        headClass={classes["margin"]}
                        label={"TechShield Plus UVR"}
                        value={"TechShield Plus UVR"}
                    />
                    <CustomRadio
                        label={"Crizal Sunshield (Backside AR Only)"}
                        value={"Crizal Sunshield (Backside AR Only)"}
                    />
                </Radio.Group>
            </div>
        </div>
    );
};

export default AntireFlextive;
