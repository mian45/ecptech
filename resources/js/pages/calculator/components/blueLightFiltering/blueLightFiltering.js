import React, { useState } from "react";
import { connect } from "react-redux";
import { AllPlans } from "../../data/plansList";
import PlanTitles from "../../data/plansTitles/planTitles";
import QuestionIcon from "../questionIcon";
import classes from "./blueLightFiltering.module.scss";
import icon from "../../../../../images/calculator/blue-light.svg";
import { Col, Radio, Row } from "antd";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import CustomRadio from "../../../../components/customRadio";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
import RetailError from "../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";

const BlueLightFiltering = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
    retailError,
}) => {
    const { values, handleChange } = formProps;
    const dipatch = useDispatch();
    const allPlans = AllPlans[language];
    const { blueLightTitle, blueLightYes, blueLightNo } = PlanTitles(
        language,
        values?.visionPlan
    );
    const blueLightVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques?.question === "Blue Light Filtering"
        )?.visibility;
    const showAlert = () => {
        const material = calculatorObj?.addons
            ?.find((val) => val?.title === values?.visionPlan)
            ?.addon_types?.find(
                (item) => item?.title === "Blue Light Filtering"
            )
            ?.addons?.find((ele) => ele?.title === "Blue Light Filtering");
        const invoiceData = localStorage.getItem("CALCULATOR_DATA");
        let parsedInvoiceData = false;
        if (invoiceData) {
            const data = JSON.parse(invoiceData);
            parsedInvoiceData = data?.invoicePriceData || false;
        }

        if (!material?.price && !parsedInvoiceData) {
            dipatch(action.showRetailPopup());
        }
        if (!material?.price && parsedInvoiceData) {
            dipatch(
                action.retailError({
                    type: "blueLightFilter",
                    error: retailErrorMessage("blue light filtering"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    const handleBlueLightChange = (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes") showAlert();
    };
    const renderBlueLight = () => {
        return (
            <Row className={classes["container"]}>
                <Col xs={24} sm={24} md={5} lg={5}>
                    <QuestionIcon icon={icon} active={values?.blueLight} />
                </Col>
                <Col xs={24} sm={24} md={19} lg={19}>
                    <div className={classes["vision-container"]}>
                        <CalculatorHeading
                            title={blueLightTitle}
                            active={values?.blueLight}
                        />
                        <Radio.Group
                            onChange={handleBlueLightChange}
                            value={values?.blueLight}
                            id="blueLight"
                            name="blueLight"
                            className={classes["custom-radio"]}
                        >
                            <CustomRadio
                                label={blueLightYes}
                                value={blueLightYes}
                                active={values?.blueLight === blueLightYes}
                            />

                            {values?.lensType !== "NVF" && (
                                <CustomRadio
                                    label={blueLightNo}
                                    value={blueLightNo}
                                    active={values?.blueLight === blueLightNo}
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"blueLight"} />
                        <RetailError
                            error={
                                retailError[values?.visionPlan]?.blueLightFilter
                            }
                        />
                    </div>
                </Col>
            </Row>
        );
    };
    return (
        <>
            {values?.visionPlan === allPlans?.davis && blueLightVisibility ? (
                renderBlueLight()
            ) : (
                <></>
            )}
        </>
    );
};
const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailError: state?.persistStore?.retailError,
});

export default connect(mapStateToProps)(BlueLightFiltering);
