import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import classes from "./styles.module.scss";
import tickIcon from "../../../../../images/tick-green.svg";
import CustomRadio from "../../../../components/customRadio";
import visionIcon from "../../../../../images/calculator/vision.svg";

const SelectVisionPlan = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={visionIcon} active />
            <div className={classes["vision-container"]}>
                <CalculatorHeading title="Select Vision Plan" active />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"VSP Signature"}
                        value={"VSP Signature"}
                    />
                    <CustomRadio label={"VSP Choice"} value={"VSP Choice"} />
                    <CustomRadio
                        label={"VSP Advantage"}
                        value={"VSP Advantage"}
                    />
                    <CustomRadio label={"Eyemed"} value={"Eyemed"} />
                </Radio.Group>
            </div>
        </div>
    );
};

export default SelectVisionPlan;

export const CalculatorHeading = ({ title, active }) => {
    return (
        <div className={classes["heading"]}>
            <span>{title}</span>{" "}
            {active && (
                <img
                    src={tickIcon}
                    alt="icon"
                    className={classes["green-icon"]}
                />
            )}
        </div>
    );
};
