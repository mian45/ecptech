import { Radio } from "antd";
import React from "react";
import CustomRadio from "../../../../../../components/customRadio";
import {
    LowerCopayAmountTypeEnum,
    LowerCopayTypeEnum,
} from "../../../../data/enums";
import { CalculatorHeading, FormikError } from "../../../selectVisionPlan";
import classes from "./specialCopaySlot.module.scss";
import * as Yup from "yup";
import { getOriginalPrice } from "../../data/getOriginalPrice";

const SpecialCopaySlot = ({
    title,
    formProps,
    radioValue,
    inputValue,
    setCalValidations,
    calValidations,
    data,
    lensPrices,
    calculatorObj,
    amountError,
    setAmountError,
    davisMaterials,
}) => {
    const { values, handleChange } = formProps;

    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value) || e.target.value === "") {
            handleChange(e);
            const price = getOriginalPrice(
                inputValue,
                calculatorObj,
                lensPrices,
                values,
                davisMaterials
            );
            if (e.target.value > price) {
                setAmountError({
                    ...amountError,
                    [inputValue]:
                        "Entered amount is greater than actual amount.",
                });
            } else {
                setAmountError({ ...amountError, [inputValue]: "" });
            }
        }
    };

    const handleValueChange = (e) => {
        handleChange(e);
        if (e?.target?.value === LowerCopayAmountTypeEnum.amount) {
            const validationObject = {
                [inputValue]: Yup.string().required("Amount is required"),
            };
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else if (e?.target?.value === LowerCopayAmountTypeEnum.noAmount) {
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
                title={`${LowerCopayTypeEnum[title]} Lower Copay?`}
            />
            <Radio.Group
                onChange={handleValueChange}
                value={values[radioValue]}
                id={radioValue}
                name={radioValue}
                className={classes["radio-group"]}
            >
                <CustomRadio
                    label={"Lower copay dollar amount"}
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
                            type={"text"}
                            onChange={handleInputChange}
                            value={values[inputValue]}
                            id={inputValue}
                            name={inputValue}
                        />
                    </div>
                    <FormikError name={inputValue} />
                    {amountError[inputValue] && (
                        <div className={classes["error"]}>
                            {amountError[inputValue]}
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default SpecialCopaySlot;
