import React, { useState } from "react";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import { Radio } from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { LowerCopayAmountTypeEnum, LowerCopayTypeEnum } from "../../data/enums";
import * as Yup from "yup";
import {
    ANTI_REFLECTIVE_PROPERTIES,
    HIGH_INDEX,
    PHOTOCHROMIC,
    POLYCARBONATE,
    PREMIUM_PROGRESSIVE,
} from "../../data/constants";

const LoweredCopay = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const copayDollarAmountVisibility =
        calculatorObj?.questions &&
        calculatorObj?.questions["VSP Signature"]?.copayDollarAmount
            ?.visibility;
    const handleLoweredCopayClick = (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes" && !data?.copayDollarAmount?.optional) {
            if (
                !values?.isCopayPolycarbonate ||
                !values?.isCopayPhotochromic ||
                !values?.isCopayHighIndex ||
                !values?.isCopayAntiReflective ||
                !values?.isCopayPremiumProgressives
            ) {
                const isCopayPolycarbonate = Yup.mixed().required(
                    "Minimum 1 sub option is required"
                );
                setCalValidations({
                    ...calValidations,
                    isCopayPolycarbonate,
                });
            }
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.isCopayPolycarbonate;
            delete validations.isCopaypremiumProgressiveAmount;
            delete validations.isCopayAntiReflectiveAmount;
            delete validations.isCopayHighIndexAmount;
            delete validations.isCopayPhotochromicAmount;
            delete validations.isCopayPolycarbonateAmount;
            delete validations.copayPolycarbonateAmount;
            delete validations.copayPhotochromicAmount;
            delete validations.copayHighIndexAmount;
            delete validations.copayAntiReflectiveAmount;
            delete validations.copaypremiumProgressiveAmount;
            setCalValidations({
                ...validations,
            });
        }
    };

    const handleCopoayCheckChange = (value, key) => {
        setFieldValue(key, value);
        if (value === true && !data?.copayDollarAmount?.optional) {
            if (key === "isCopayPolycarbonate") {
                const isCopayPolycarbonateAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayPolycarbonateAmount,
                });
            } else if (key === "isCopayPhotochromic") {
                const isCopayPhotochromicAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayPhotochromicAmount,
                });
            } else if (key === "isCopayHighIndex") {
                const isCopayHighIndexAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayHighIndexAmount,
                });
            } else if (key === "isCopayAntiReflective") {
                const isCopayAntiReflectiveAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayAntiReflectiveAmount,
                });
            } else if (key === "isCopayPremiumProgressives") {
                const isCopaypremiumProgressiveAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopaypremiumProgressiveAmount,
                });
            }
        } else if (value === false) {
            if (key === "isCopayPolycarbonate") {
                const validations = { ...calValidations };
                delete validations.isCopayPolycarbonateAmount;
                setCalValidations({
                    ...validations,
                });
            } else if (key === "isCopayPhotochromic") {
                const validations = { ...calValidations };
                delete validations.isCopayPhotochromicAmount;
                setCalValidations({
                    ...validations,
                });
            } else if (key === "isCopayHighIndex") {
                const validations = { ...calValidations };
                delete validations.isCopayHighIndexAmount;
                setCalValidations({
                    ...validations,
                });
            } else if (key === "isCopayAntiReflective") {
                const validations = { ...calValidations };
                delete validations.isCopayAntiReflectiveAmount;
                setCalValidations({
                    ...validations,
                });
            } else if (key === "isCopayPremiumProgressives") {
                const validations = { ...calValidations };
                delete validations.isCopaypremiumProgressiveAmount;
                setCalValidations({
                    ...validations,
                });
            }
        }
    };
    const copayProperties = () => {
        return (
            <>
                <div className={classes["checkbox-group"]}>
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.polycarbonate}
                        defaultChecked={values?.isCopayPolycarbonate || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPolycarbonate"
                            );
                        }}
                        id="isCopayPolycarbonate"
                        name="isCopayPolycarbonate"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.photochromic}
                        defaultChecked={values?.isCopayPhotochromic || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPhotochromic"
                            );
                        }}
                        id="isCopayPhotochromic"
                        name="isCopayPhotochromic"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.highIndex}
                        defaultChecked={values?.isCopayHighIndex || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(value, "isCopayHighIndex");
                        }}
                        id="isCopayHighIndex"
                        name="isCopayHighIndex"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.antiReflective}
                        defaultChecked={values?.isCopayAntiReflective || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayAntiReflective"
                            );
                        }}
                        id="isCopayAntiReflective"
                        name="isCopayAntiReflective"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.premiumProgressives}
                        defaultChecked={
                            values?.isCopayPremiumProgressives || false
                        }
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPremiumProgressives"
                            );
                        }}
                        id="isCopayPremiumProgressives"
                        name="isCopayPremiumProgressives"
                    />
                </div>
                <FormikError name={"isCopayPolycarbonate"} />
                {values?.isCopayPolycarbonate && (
                    <SpecialCopaySlot
                        title={"Polycarbonate"}
                        formProps={formProps}
                        radioValue={"isCopayPolycarbonateAmount"}
                        inputValue={"copayPolycarbonateAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                    />
                )}
                {values?.isCopayPhotochromic && (
                    <SpecialCopaySlot
                        title={"photochromic"}
                        formProps={formProps}
                        radioValue={"isCopayPhotochromicAmount"}
                        inputValue={"copayPhotochromicAmount"}
                    />
                )}
                {values?.isCopayHighIndex && (
                    <SpecialCopaySlot
                        title={"highIndex"}
                        formProps={formProps}
                        radioValue={"isCopayHighIndexAmount"}
                        inputValue={"copayHighIndexAmount"}
                    />
                )}
                {values?.isCopayAntiReflective && (
                    <SpecialCopaySlot
                        title={"antiReflective"}
                        formProps={formProps}
                        radioValue={"isCopayAntiReflectiveAmount"}
                        inputValue={"copayAntiReflectiveAmount"}
                    />
                )}
                {values?.isCopayPremiumProgressives && (
                    <SpecialCopaySlot
                        title={"premiumProgressives"}
                        formProps={formProps}
                        radioValue={"isCopaypremiumProgressiveAmount"}
                        inputValue={"copaypremiumProgressiveAmount"}
                    />
                )}
            </>
        );
    };
    return (
        <>
            {copayDollarAmountVisibility ? (
                <div className={classes["container"]}>
                    <QuestionIcon
                        icon={visionIcon}
                        active={values?.isloweredCopay}
                    />
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title="Any copay dollar amount lowered than standard?"
                            active={values?.isloweredCopay}
                        />
                        <Radio.Group
                            onBlur={handleBlur}
                            onChange={handleLoweredCopayClick}
                            value={values?.isloweredCopay}
                            id="isloweredCopay"
                            name="isloweredCopay"
                            className={classes["radio-group"]}
                        >
                            <CustomRadio
                                label={"Yes"}
                                value={"Yes"}
                                active={values?.isloweredCopay === "Yes"}
                            />
                            <CustomRadio
                                label={"No"}
                                value={"No"}
                                active={values?.isloweredCopay === "No"}
                            />
                        </Radio.Group>
                        <FormikError name={"isloweredCopay"} />
                        {values?.isloweredCopay === "Yes" && copayProperties()}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default LoweredCopay;

const SpecialCopaySlot = ({
    title,
    formProps,
    radioValue,
    inputValue,
    setCalValidations,
    calValidations,
    data,
}) => {
    const { values, handleChange, handleBlur } = formProps;
    const [err, setErr] = useState("");

    const handleInputChange = (e) => {
        handleChange(e);
        const price = getPrice(inputValue);
        if (e.target.value > price) {
            setErr("You enter a greater amount then total");
        } else {
            setErr("");
        }
    };

    const handleValueChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === LowerCopayAmountTypeEnum.amount &&
            !data?.isCopayPremiumProgressives?.optional
        ) {
            const validationObject = {
                [inputValue]: Yup.string().required("Amount is required"),
            };
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else if (values[radioValue] === LowerCopayAmountTypeEnum.noAmount) {
            const validations = { ...calValidations };
            delete validations[inputValue];
            setCalValidations({
                ...validations,
            });
        }
    };
    return (
        <>
            <CalculatorHeading
                title={`${LowerCopayTypeEnum[title]} Lowered Copay?`}
            />
            <Radio.Group
                onBlur={handleBlur}
                onChange={handleValueChange}
                value={values[radioValue]}
                id={radioValue}
                name={radioValue}
                className={classes["radio-group"]}
            >
                <CustomRadio
                    label={LowerCopayAmountTypeEnum.amount}
                    value={LowerCopayAmountTypeEnum.amount}
                    active={
                        values[radioValue] === LowerCopayAmountTypeEnum.amount
                    }
                />
                <CustomRadio
                    label={LowerCopayAmountTypeEnum.noAmount}
                    value={LowerCopayAmountTypeEnum.noAmount}
                    active={
                        values[radioValue] === LowerCopayAmountTypeEnum.noAmount
                    }
                />
            </Radio.Group>
            <FormikError name={radioValue} />
            {values[radioValue] === LowerCopayAmountTypeEnum.amount && (
                <>
                    <div className={classes["slot-input-container"]}>
                        <div className={classes["slot-input-label"]}>$</div>
                        <input
                            className={classes["slot-input"]}
                            type={"number"}
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            value={values[inputValue]}
                            id={inputValue}
                            name={inputValue}
                            step={0.01}
                            min={0.0}
                        />
                    </div>
                    <FormikError name={inputValue} />
                    {err && <div className={classes["error"]}>{err}</div>}
                </>
            )}
        </>
    );
};

const getPrice = (value) => {
    switch (value) {
        case "copaypremiumProgressiveAmount":
            return PREMIUM_PROGRESSIVE;
        case "copayAntiReflectiveAmount":
            return ANTI_REFLECTIVE_PROPERTIES;
        case "copayHighIndexAmount":
            return HIGH_INDEX;
        case "copayPhotochromicAmount":
            return PHOTOCHROMIC;
        case "copayPolycarbonateAmount":
            return POLYCARBONATE;
    }
};
