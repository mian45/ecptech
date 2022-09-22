import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import frameIcon from "../../../../../images/calculator/frame.svg";

const FrameOrder = () => {
    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={frameIcon} />
            <div className={classes["frame-container"]}>
                <CalculatorHeading title="Frame Order?" />
                <Radio.Group
                    onChange={() => {}}
                    // value={""}
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"New Frame Purchase"}
                        value={"New Frame Purchase"}
                    />

                    <CustomRadio
                        label={"Patient Own Frame"}
                        value={"Patient Own Frame"}
                    />
                </Radio.Group>
                <div className={classes["amount-container"]}>
                    <div className={classes["amount-sub-container"]}>
                        <div className={classes["sub-label"]}>
                            Retail fee of frame?
                        </div>
                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <input
                                className={classes["input"]}
                                type={"number"}
                            />
                        </div>
                    </div>
                    <div
                        className={classes["amount-sub-container"]}
                        style={{ marginLeft: "50px" }}
                    >
                        <div className={classes["sub-label"]}>
                            Frame Contribution?
                        </div>
                        <div className={classes["input-container"]}>
                            <div className={classes["input-label"]}>$</div>
                            <input
                                className={classes["input"]}
                                type={"number"}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes["frame-sub-container"]}>
                    <CalculatorHeading title="Drill Mount?" />
                    <Radio.Group
                        onChange={() => {}}
                        // value={""}
                        className={classes["radio-group"]}
                    >
                        <CustomRadio label={"Yes"} value={"Yes"} />

                        <CustomRadio label={"No"} value={"No"} />
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

export default FrameOrder;
