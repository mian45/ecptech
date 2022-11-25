import React, { useState } from "react";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import { Col, Radio, Row } from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import visionIcon from "../../../../../images/calculator/vision.svg";
import { LowerCopayAmountTypeEnum, LowerCopayTypeEnum } from "../../data/enums";
import * as Yup from "yup";
import { GetMappedPayload } from "../../data/validationHelper";
import {
    getPriceByAntireflective,
    getPriceByPhotochromicMaterial,
    getPriceFromDB,
    GetPrivateAntireflectivePrice,
    GetPrivateLensFee,
    GetPrivatePayMaterialPrice,
    GetPrivatePhotochromicPrice,
} from "../viewInvoice/helpers/pricesHelper/calculateOtherPlansPrices";

const LoweredCopay = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    lensPrices,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const [amountError, setAmountError] = useState(defaultError);
    const copayDollarAmountVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Any copay lowered than standard"
        )?.visibility;
    const handleLoweredCopayClick = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            !data?.find(
                (ques) => ques.question === "Any copay lowered than standard"
            ).optional
        ) {
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
        if (value === true) {
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
            } else if (key === "isCopayStandardProgressives") {
                const isCopayStandardProgressiveAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayStandardProgressiveAmount,
                });
            } else if (key === "isCopayCustomProgressives") {
                const isCopayCustomProgressiveAmount =
                    Yup.string().required("Option is required");
                setCalValidations({
                    ...calValidations,
                    isCopayCustomProgressiveAmount,
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
            } else if (key === "isCopayStandardProgressives") {
                const validations = { ...calValidations };
                delete validations.isCopayStandardProgressiveAmount;
                setCalValidations({
                    ...validations,
                });
            } else if (key === "isCopayCustomProgressives") {
                const validations = { ...calValidations };
                delete validations.isCopayCustomProgressiveAmount;
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
                        active={values?.isCopayPolycarbonate || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPolycarbonate"
                            );
                        }}
                        id="isCopayPolycarbonate"
                        name="isCopayPolycarbonate"
                        isDisable={
                            Object.keys(lensPrices)?.length === 0 ||
                            values?.lensMaterial !== "Polycarbonate"
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.photochromic}
                        defaultChecked={values?.isCopayPhotochromic || false}
                        active={values?.isCopayPhotochromic || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPhotochromic"
                            );
                        }}
                        id="isCopayPhotochromic"
                        name="isCopayPhotochromic"
                        isDisable={
                            !values?.isPhotochromics ||
                            values?.isPhotochromics === "No" ||
                            !values?.photochromicsType
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.highIndex}
                        defaultChecked={values?.isCopayHighIndex || false}
                        active={values?.isCopayHighIndex || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(value, "isCopayHighIndex");
                        }}
                        id="isCopayHighIndex"
                        name="isCopayHighIndex"
                        isDisable={
                            Object.keys(lensPrices)?.length === 0 ||
                            !(
                                values?.lensMaterial?.includes("Hi index") ||
                                values?.lensMaterial?.includes("Hi Index")
                            )
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.antiReflective}
                        defaultChecked={values?.isCopayAntiReflective || false}
                        active={values?.isCopayAntiReflective || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayAntiReflective"
                            );
                        }}
                        id="isCopayAntiReflective"
                        name="isCopayAntiReflective"
                        isDisable={
                            !values?.isAntireflective ||
                            values?.isAntireflective === "No" ||
                            !values?.antireflectiveType
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.standardProgressives}
                        defaultChecked={
                            values?.isCopayStandardProgressives || false
                        }
                        active={values?.isCopayStandardProgressives || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayStandardProgressives"
                            );
                        }}
                        id="isCopayStandardProgressives"
                        name="isCopayStandardProgressives"
                        isDisable={
                            Object.keys(lensPrices)?.length === 0 ||
                            (values?.lensType !== "PAL" &&
                                values?.lensTypeValue)
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.premiumProgressives}
                        defaultChecked={
                            values?.isCopayPremiumProgressives || false
                        }
                        active={values?.isCopayPremiumProgressives || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayPremiumProgressives"
                            );
                        }}
                        id="isCopayPremiumProgressives"
                        name="isCopayPremiumProgressives"
                        isDisable={
                            Object.keys(lensPrices).length === 0 ||
                            (values?.lensType !== "PAL" &&
                                values?.lensTypeValue)
                        }
                    />
                    <CustomCheckbox
                        label={LowerCopayTypeEnum.customProgressives}
                        defaultChecked={
                            values?.isCopayCustomProgressives || false
                        }
                        active={values?.isCopayCustomProgressives || false}
                        onValueChange={(value) => {
                            handleCopoayCheckChange(
                                value,
                                "isCopayCustomProgressives"
                            );
                        }}
                        id="isCopayCustomProgressives"
                        name="isCopayCustomProgressives"
                        isDisable={
                            Object.keys(lensPrices).length === 0 ||
                            (values?.lensType !== "PAL" &&
                                values?.lensTypeValue)
                        }
                    />
                </div>
                <FormikError name={"isCopayPolycarbonate"} />
                {values?.isCopayPolycarbonate && (
                    <SpecialCopaySlot
                        title={"polycarbonate"}
                        formProps={formProps}
                        radioValue={"isCopayPolycarbonateAmount"}
                        inputValue={"copayPolycarbonateAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayPhotochromic && (
                    <SpecialCopaySlot
                        title={"photochromic"}
                        formProps={formProps}
                        radioValue={"isCopayPhotochromicAmount"}
                        inputValue={"copayPhotochromicAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayHighIndex && (
                    <SpecialCopaySlot
                        title={"highIndex"}
                        formProps={formProps}
                        radioValue={"isCopayHighIndexAmount"}
                        inputValue={"copayHighIndexAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayAntiReflective && (
                    <SpecialCopaySlot
                        title={"antiReflective"}
                        formProps={formProps}
                        radioValue={"isCopayAntiReflectiveAmount"}
                        inputValue={"copayAntiReflectiveAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayStandardProgressives && (
                    <SpecialCopaySlot
                        title={"standardProgressives"}
                        formProps={formProps}
                        radioValue={"isCopayStandardProgressiveAmount"}
                        inputValue={"copayStandardProgressiveAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayPremiumProgressives && (
                    <SpecialCopaySlot
                        title={"premiumProgressives"}
                        formProps={formProps}
                        radioValue={"isCopaypremiumProgressiveAmount"}
                        inputValue={"copaypremiumProgressiveAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
                {values?.isCopayCustomProgressives && (
                    <SpecialCopaySlot
                        title={"customProgressives"}
                        formProps={formProps}
                        radioValue={"isCopayCustomProgressiveAmount"}
                        inputValue={"copayCustomProgressiveAmount"}
                        setCalValidations={setCalValidations}
                        calValidations={calValidations}
                        data={data}
                        lensPrices={lensPrices}
                        calculatorObj={calculatorObj}
                        setAmountError={setAmountError}
                        amountError={amountError}
                    />
                )}
            </>
        );
    };
    return (
        <>
            {copayDollarAmountVisibility ? (
                <Row className={classes["container"]}>
                    {" "}
                    <Col sx={0} sm={0} md={5}>
                        <QuestionIcon
                            icon={visionIcon}
                            active={values?.isloweredCopay}
                        />
                    </Col>
                    <Col sx={24} sm={24} md={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Any copay dollar amount less than standard?"
                                active={values?.isloweredCopay}
                            />
                            <Radio.Group
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
                            {values?.isloweredCopay === "Yes" &&
                                copayProperties()}
                        </div>
                    </Col>
                </Row>
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
    lensPrices,
    calculatorObj,
    amountError,
    setAmountError,
}) => {
    const { values, handleChange, handleBlur } = formProps;

    const handleInputChange = (e) => {
        handleChange(e);
        const price = getPrice(inputValue, calculatorObj, lensPrices, values);
        if (e.target.value > price) {
            setAmountError({
                ...amountError,
                [inputValue]: "Entered amount is greater than actual amount.",
            });
        } else {
            setAmountError({ ...amountError, [inputValue]: "" });
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
                            type={"number"}
                            onChange={handleInputChange}
                            value={values[inputValue]}
                            id={inputValue}
                            name={inputValue}
                            step={0.01}
                            min={0.0}
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

const getPrice = (value, calculatorObj, lensPrices, values) => {
    const data = GetMappedPayload(values);
    let lensPrice = 0;
    let materialPrice = 0;
    let antireflective = 0;
    let photochromic = 0;
    if (data?.visionPlan === "Private Pay") {
        lensPrice = parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        materialPrice = parseFloat(
            GetPrivatePayMaterialPrice(calculatorObj, data) || 0
        );
        antireflective = parseFloat(
            GetPrivateAntireflectivePrice(
                calculatorObj,
                data?.antiReflectiveProperties?.type,
                data
            ) || 0
        );
        photochromic = parseFloat(
            GetPrivatePhotochromicPrice(
                data?.photochromics?.type,
                calculatorObj,
                data
            )
        );
    } else {
        lensPrice = parseFloat(
            getPriceFromDB(data, calculatorObj, lensPrices)?.lensPrice
        );
        materialPrice = parseFloat(
            getPriceFromDB(data, calculatorObj, lensPrices)?.materialPrice
        );
        if (data?.antiReflectiveProperties?.status === "Yes") {
            const price = getPriceByAntireflective(
                data?.visionPlan,
                data?.antiReflectiveProperties?.type
            );
            antireflective = parseFloat(price || 0);
        }
        if (data?.photochromics?.status === "Yes") {
            const price = getPriceByPhotochromicMaterial(
                data?.visionPlan,
                data?.photochromics?.type
            );
            photochromic = parseFloat(price || 0);
        }
    }
    switch (value) {
        case "copayStandardProgressiveAmount":
            return lensPrice;
        case "copayCustomProgressiveAmount":
            return lensPrice;
        case "copaypremiumProgressiveAmount":
            return lensPrice;
        case "copayAntiReflectiveAmount":
            return antireflective;
        case "copayHighIndexAmount":
            return materialPrice;
        case "copayPhotochromicAmount":
            return photochromic;
        case "copayPolycarbonateAmount":
            return materialPrice;
    }
};
const defaultError = {
    copayCustomProgressiveAmount: "",
    copaypremiumProgressiveAmount: "",
    copayStandardProgressiveAmount: "",
    copayAntiReflectiveAmount: "",
    copayHighIndexAmount: "",
    copayPhotochromicAmount: "",
    copayPolycarbonateAmount: "",
};
