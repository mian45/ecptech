import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/protection.svg";
import { ProtectionPlanTypeEnum } from "../../data/enums";

const ProtectionPlan = ({ formProps }) => {
    const { values, handleChange, handleBlur } = formProps;

    const handleActiveFields = () => {
        if (values?.isProtectionPlan === "No") {
            return true;
        } else {
            if (values?.isProtectionPlan === "Yes") {
                if (values?.protectionPlanType) {
                    if (values?.isProtectionPlanPaid === "Unpaid") {
                        return true;
                    } else {
                        if (values?.protectionPlanAmount) {
                            return true;
                        }
                        return false;
                    }
                }
                return false;
            }
            return false;
        }
    };

    return (
        <div className={classes["container"]}>
            <QuestionIcon
                icon={icon}
                iconClass={classes["icon-style"]}
                active={handleActiveFields()}
            />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Protection Plan"
                    active={handleActiveFields()}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.isProtectionPlan}
                    id="isProtectionPlan"
                    name="isProtectionPlan"
                    className={classes["radio-group"]}
                >
                    <CustomRadio
                        label={"Yes"}
                        value={"Yes"}
                        active={values?.isProtectionPlan === "Yes"}
                    />

                    <CustomRadio
                        label={"No"}
                        value={"No"}
                        active={values?.isProtectionPlan === "No"}
                    />
                </Radio.Group>
                <FormikError name={"isProtectionPlan"} />
                {values?.isProtectionPlan === "Yes" && (
                    <>
                        <div className={classes["label"]}>Please Select</div>
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.protectionPlanType}
                            id="protectionPlanType"
                            name="protectionPlanType"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={
                                    ProtectionPlanTypeEnum.lensesProtectionPlan
                                }
                                value={
                                    ProtectionPlanTypeEnum.lensesProtectionPlan
                                }
                                active={
                                    values?.protectionPlanType ===
                                    ProtectionPlanTypeEnum.lensesProtectionPlan
                                }
                            />

                            <CustomRadio
                                label={
                                    ProtectionPlanTypeEnum.glassesProtectionPlan
                                }
                                value={
                                    ProtectionPlanTypeEnum.glassesProtectionPlan
                                }
                                active={
                                    values?.protectionPlanType ===
                                    ProtectionPlanTypeEnum.glassesProtectionPlan
                                }
                            />
                            <CustomRadio
                                label={ProtectionPlanTypeEnum.both}
                                value={ProtectionPlanTypeEnum.both}
                                active={
                                    values?.protectionPlanType ===
                                    ProtectionPlanTypeEnum.both
                                }
                            />
                        </Radio.Group>
                        <FormikError name={"protectionPlanType"} />
                        {values?.protectionPlanType && (
                            <>
                                <div className={classes["label"]}>
                                    Please Select
                                </div>
                                <Radio.Group
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values?.isProtectionPlanPaid}
                                    id="isProtectionPlanPaid"
                                    name="isProtectionPlanPaid"
                                    className={classes["radio-group"]}
                                >
                                    <CustomRadio
                                        label={"Paid"}
                                        value={"Paid"}
                                        active={
                                            values?.isProtectionPlanPaid ===
                                            "Paid"
                                        }
                                    />
                                    <CustomRadio
                                        label={"Unpaid"}
                                        value={"Unpaid"}
                                        active={
                                            values?.isProtectionPlanPaid ===
                                            "Unpaid"
                                        }
                                    />
                                </Radio.Group>
                                <FormikError name={"isProtectionPlanPaid"} />
                                {values?.isProtectionPlanPaid === "Paid" && (
                                    <>
                                        <div
                                            className={
                                                classes["input-container"]
                                            }
                                        >
                                            <div
                                                className={
                                                    classes["input-label"]
                                                }
                                            >
                                                $
                                            </div>
                                            <input
                                                className={classes["input"]}
                                                type={"number"}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={
                                                    values?.protectionPlanAmount
                                                }
                                                id="protectionPlanAmount"
                                                name="protectionPlanAmount"
                                                step={0.01}
                                            />
                                        </div>
                                        <FormikError
                                            name={"protectionPlanAmount"}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProtectionPlan;
