import React from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/protection.svg";
import { ProtectionPlanTypeEnum } from "../../data/enums";
import * as Yup from "yup";

const ProtectionPlan = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur } = formProps;
    const protectionPlanVisibility = calculatorObj?.questions
        ?.find((item) => item.title === "VSP Signature")
        ?.question_permissions?.find(
            (ques) => ques.question === "Protection Plan"
        )?.visibility;

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

    const handleProtectionPlanChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find((ques) => ques.question === "Protection Plan").optional
        ) {
            const protectionPlanType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                protectionPlanType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.protectionPlanType;
            delete validations.isProtectionPlanPaid;
            delete validations.protectionPlanAmount;
            setCalValidations({
                ...validations,
            });
        }
    };
    const handleProtectionPlanTypeChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value &&
            !data?.find((ques) => ques.question === "Protection Plan")?.optional
        ) {
            const isProtectionPlanPaid =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                isProtectionPlanPaid,
            });
        } else if (
            data?.find((ques) => ques.question === "Protection Plan")?.optional
        ) {
            const validations = { ...calValidations };
            delete validations.isProtectionPlanPaid;
            setCalValidations({
                ...validations,
            });
        }
    };
    const handleIsPaidClick = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Paid" &&
            !data?.find((ques) => ques.question === "Protection Plan")?.optional
        ) {
            const protectionPlanAmount =
                Yup.string().required("value is required");
            setCalValidations({
                ...calValidations,
                protectionPlanAmount,
            });
        } else if (e?.target?.value === "Unpaid") {
            const validations = { ...calValidations };
            delete validations.protectionPlanAmount;
            setCalValidations({
                ...validations,
            });
        }
    };

    return (
        <>
            {protectionPlanVisibility && (
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
                            onChange={handleProtectionPlanChange}
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
                                <div className={classes["label"]}>
                                    Please Select
                                </div>
                                <Radio.Group
                                    onBlur={handleBlur}
                                    onChange={handleProtectionPlanTypeChange}
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
                                            onChange={handleIsPaidClick}
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
                                        <FormikError
                                            name={"isProtectionPlanPaid"}
                                        />
                                        {values?.isProtectionPlanPaid ===
                                            "Paid" && (
                                            <>
                                                <div
                                                    className={
                                                        classes[
                                                            "input-container"
                                                        ]
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes[
                                                                "input-label"
                                                            ]
                                                        }
                                                    >
                                                        $
                                                    </div>
                                                    <input
                                                        className={
                                                            classes["input"]
                                                        }
                                                        type={"number"}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={
                                                            values?.protectionPlanAmount
                                                        }
                                                        id="protectionPlanAmount"
                                                        name="protectionPlanAmount"
                                                        step={0.01}
                                                        min={0.0}
                                                    />
                                                </div>
                                                <FormikError
                                                    name={
                                                        "protectionPlanAmount"
                                                    }
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProtectionPlan;
