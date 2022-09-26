import React from "react";
import { Radio } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import frameIcon from "../../../../../images/calculator/frame.svg";
import { DrillMountTypeEnum, FrameOrderTypeEnum } from "../../data/enums";

const FrameOrder = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;

    const frameDetails = () => {
        return (
            <>
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
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.frameRetailFee}
                                id="frameRetailFee"
                                name="frameRetailFee"
                            />
                        </div>
                        <FormikError name={"frameRetailFee"} />
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
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.frameContribution}
                                id="frameContribution"
                                name="frameContribution"
                            />
                        </div>
                        <FormikError name={"frameContribution"} />
                    </div>
                </div>
                <div className={classes["frame-sub-container"]}>
                    <CalculatorHeading title="Drill Mount?" />
                    <Radio.Group
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.drillMount}
                        id="drillMount"
                        name="drillMount"
                        className={classes["radio-group"]}
                    >
                        <CustomRadio
                            label={DrillMountTypeEnum.yes}
                            value={DrillMountTypeEnum.yes}
                            active={
                                values?.drillMount === DrillMountTypeEnum.yes
                            }
                        />

                        <CustomRadio
                            label={DrillMountTypeEnum.no}
                            value={DrillMountTypeEnum.no}
                            active={
                                values?.drillMount === DrillMountTypeEnum.no
                            }
                        />
                    </Radio.Group>
                    <FormikError name={"drillMount"} />
                </div>
            </>
        );
    };

    const handleActiveIcons = () => {
        if (values?.frameOrderType === FrameOrderTypeEnum.patientOwnFrame) {
            return true;
        } else if (
            values?.frameOrderType === FrameOrderTypeEnum.newFramePurchase
        ) {
            if (
                values?.frameRetailFee &&
                values?.frameContribution &&
                values?.drillMount
            ) {
                return true;
            }
            return false;
        }
        return false;
    };

    return (
        <div className={classes["container"]}>
            <QuestionIcon icon={frameIcon} active={handleActiveIcons()} />
            <div className={classes["frame-container"]}>
                <CalculatorHeading
                    title="Frame Order?"
                    active={handleActiveIcons()}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.frameOrderType}
                    id="frameOrderType"
                    name="frameOrderType"
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={FrameOrderTypeEnum.newFramePurchase}
                        value={FrameOrderTypeEnum.newFramePurchase}
                        active={
                            values?.frameOrderType ===
                            FrameOrderTypeEnum.newFramePurchase
                        }
                    />

                    <CustomRadio
                        label={FrameOrderTypeEnum.patientOwnFrame}
                        value={FrameOrderTypeEnum.patientOwnFrame}
                        active={
                            values?.frameOrderType ===
                            FrameOrderTypeEnum.patientOwnFrame
                        }
                    />
                </Radio.Group>
                <FormikError name={"frameOrderType"} />
                {values?.frameOrderType ===
                    FrameOrderTypeEnum.newFramePurchase && frameDetails()}
            </div>
        </div>
    );
};

export default FrameOrder;