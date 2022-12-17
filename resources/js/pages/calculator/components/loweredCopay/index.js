import React, { Fragment, useState } from "react";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import { Col, Radio, Row } from "antd";
import CustomCheckbox from "../../../../components/customCheckbox";
import visionIcon from "../../../../../images/calculator/vision.svg";
import * as Yup from "yup";
import { handleCheckboxFalse } from "./helper";
import { AllPlans } from "../../data/plansList";
import { connect } from "react-redux";
import SpecialCopaySlot from "./components/specialCopaySlot/specialCopaySlot";
import { GetCopayOptionsJson } from "./data/getCopayOptionsJson";
import { GetSpecialCopayJson } from "./data/getSpecialCopayJson";
import {
    handleLowerCopayNoValidations,
    handleLowerCopayYesValidations,
} from "./data/selectLowerCopayvalidations";
import {
    handleLowerCopayCheckboxNoValidations,
    handleLowerCopayCheckboxYesValidations,
} from "./data/selectLowerCopayCheckboxHelper";

const LoweredCopay = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    lensPrices,
    language,
    davisMaterials,
}) => {
    const { values, handleChange, setFieldValue } = formProps;
    const [amountError, setAmountError] = useState(defaultError);
    const copayDollarAmountVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Any copay lowered than standard"
        )?.visibility;
    const eyemedPlan = AllPlans[language]?.eyemed;
    const handleLoweredCopayClick = (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes") {
            handleLowerCopayYesValidations(
                values,
                setCalValidations,
                calValidations
            );
        } else if (e?.target?.value === "No") {
            handleLowerCopayNoValidations(setCalValidations, calValidations);
        }
    };

    const handleCopoayCheckChange = async (value, key) => {
        await setFieldValue(key, value);
        if (value === true) {
            await handleLowerCopayCheckboxYesValidations(
                setFieldValue,
                key,
                setCalValidations,
                calValidations
            );
        } else if (value === false) {
            const isAllFalse = handleCheckboxFalse(values, key, value);
            if (isAllFalse) {
                setFieldValue("isCopayChecked", "");
                const isCopayChecked = Yup.mixed().required(
                    "Minimum 1 sub option is required"
                );
                setCalValidations({
                    ...calValidations,
                    isCopayChecked,
                });
            }
            handleLowerCopayCheckboxNoValidations(
                key,
                setCalValidations,
                calValidations
            );
        }
    };
    const copayProperties = () => {
        const copayOptionsProps = {
            values: values,
            onChange: handleCopoayCheckChange,
            lensPrices: lensPrices,
        };
        const specialCopayProps = {
            formProps: formProps,
            setCalValidations: setCalValidations,
            calValidations: calValidations,
            data: data,
            lensPrices: lensPrices,
            calculatorObj: calculatorObj,
            setAmountError: setAmountError,
            amountError: amountError,
        };
        const copayList = GetCopayOptionsJson(copayOptionsProps) || [];
        const specialCopayList = GetSpecialCopayJson(specialCopayProps) || [];
        return (
            <>
                <div className={classes["checkbox-group"]}>
                    {copayList?.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                {item?.isShow && (
                                    <CustomCheckbox
                                        label={item?.label}
                                        defaultChecked={item?.defaultChecked}
                                        active={item?.active}
                                        onValueChange={(value) => {
                                            item?.onChange(value, item?.id);
                                        }}
                                        id={item?.id}
                                        name={item?.name}
                                        isDisable={item?.isDisable}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                </div>
                <FormikError name={"isCopayChecked"} />
                {specialCopayList?.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            {item?.isShow && (
                                <SpecialCopaySlot
                                    title={item?.title}
                                    formProps={item?.formProps}
                                    radioValue={item?.radioValue}
                                    inputValue={item?.inputValue}
                                    setCalValidations={item?.setCalValidations}
                                    calValidations={item?.calValidations}
                                    data={item?.data}
                                    lensPrices={item?.lensPrices}
                                    calculatorObj={item?.calculatorObj}
                                    setAmountError={item?.setAmountError}
                                    amountError={item?.amountError}
                                    davisMaterials={davisMaterials}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </>
        );
    };
    const renderCopayScreen = () => {
        return (
            <>
                {copayDollarAmountVisibility ? (
                    <Row className={classes["container"]}>
                        <Col sx={0} sm={0} md={5}>
                            <QuestionIcon
                                icon={visionIcon}
                                active={values?.isLoweredCopay}
                            />
                        </Col>
                        <Col sx={24} sm={24} md={19}>
                            <div className={classes["vision-container"]}>
                                <CalculatorHeading
                                    title="Any copay dollar amount less than standard?"
                                    active={values?.isLoweredCopay}
                                />
                                <Radio.Group
                                    onChange={handleLoweredCopayClick}
                                    value={values?.isLoweredCopay}
                                    id="isLoweredCopay"
                                    name="isLoweredCopay"
                                    className={classes["radio-group"]}
                                >
                                    <CustomRadio
                                        label={"Yes"}
                                        value={"Yes"}
                                        active={
                                            values?.isLoweredCopay === "Yes"
                                        }
                                    />
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={values?.isLoweredCopay === "No"}
                                    />
                                </Radio.Group>
                                <FormikError name={"isLoweredCopay"} />
                                {values?.isLoweredCopay === "Yes" &&
                                    copayProperties()}
                            </div>
                        </Col>
                    </Row>
                ) : null}
            </>
        );
    };
    return (
        <>{values?.visionPlan === eyemedPlan ? <></> : renderCopayScreen()}</>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
});

export default connect(mapStateToProps)(LoweredCopay);

const defaultError = {
    copayCustomProgressiveAmount: "",
    copaypremiumProgressiveAmount: "",
    copayStandardProgressiveAmount: "",
    copayAntiReflectiveAmount: "",
    copayHighIndexAmount: "",
    copayPhotochromicAmount: "",
    copayPolycarbonateAmount: "",
    copayUltraProgressiveAmount: "",
    copayUltimateProgressiveAmount: "",
    copayStandardAntireflectiveAmount: "",
    copayPremiumAntireflectiveAmount: "",
    copayUltraAntireflectiveAmount: "",
    copayUltimateAntireflectiveAmount: "",
};
