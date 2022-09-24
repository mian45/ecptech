import React from "react";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import { Radio } from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { LowerCopayAmountTypeEnum, LowerCopayTypeEnum } from "../../data/enums";

const LoweredCopay = ({ formProps }) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const copayProperties = () => {
        return (
            <>
                <div className={classes["checkbox-group"]}>
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.polycarbonate}
                        defaultChecked={values?.isCopayPolycarbonate}
                        onValueChange={(value) => {
                            setFieldValue("isCopayPolycarbonate", value);
                        }}
                        id="isCopayPolycarbonate"
                        name="isCopayPolycarbonate"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.photochromic}
                        defaultChecked={values?.isCopayPhotochromic}
                        onValueChange={(value) => {
                            setFieldValue("isCopayPhotochromic", value);
                        }}
                        id="isCopayPhotochromic"
                        name="isCopayPhotochromic"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.highIndex}
                        defaultChecked={values?.isCopayHighIndex}
                        onValueChange={(value) => {
                            setFieldValue("isCopayHighIndex", value);
                        }}
                        id="isCopayHighIndex"
                        name="isCopayHighIndex"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.antiReflective}
                        defaultChecked={values?.isCopayAntiReflective}
                        onValueChange={(value) => {
                            setFieldValue("isCopayAntiReflective", value);
                        }}
                        id="isCopayAntiReflective"
                        name="isCopayAntiReflective"
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.premiumProgressives}
                        defaultChecked={values?.isCopayPremiumProgressives}
                        onValueChange={(value) => {
                            setFieldValue("isCopayPremiumProgressives", value);
                        }}
                        id="isCopayPremiumProgressives"
                        name="isCopayPremiumProgressives"
                    />
                </div>
                {values?.isCopayPolycarbonate && (
                    <SpecialCopaySlot
                        title={"photochromic"}
                        formProps={formProps}
                        radioValue={"isCopayPolycarbonateAmount"}
                        inputValue={"copayPolycarbonateAmount"}
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
        <div className={classes["container"]}>
            <QuestionIcon icon={visionIcon} active={values?.isloweredCopay} />
            <div className={classes["vision-container"]}>
                <CalculatorHeading
                    title="Any copay dollar amount lowered than standard?"
                    active={values?.isloweredCopay}
                />
                <Radio.Group
                    onBlur={handleBlur}
                    onChange={handleChange}
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
    );
};

export default LoweredCopay;

const SpecialCopaySlot = ({ title, formProps, radioValue, inputValue }) => {
    const { values, handleChange, handleBlur } = formProps;
    return (
        <>
            <CalculatorHeading
                title={`${LowerCopayTypeEnum[title]} Lowered Copay?`}
            />
            <Radio.Group
                onBlur={handleBlur}
                onChange={handleChange}
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
                            onChange={handleChange}
                            value={values[inputValue]}
                            id={inputValue}
                            name={inputValue}
                        />
                    </div>
                    <FormikError name={inputValue} />
                </>
            )}
        </>
    );
};
