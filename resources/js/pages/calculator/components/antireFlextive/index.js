import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/antireflictive.svg";
import { AntireflectiveTypeEnum } from "../../data/enums";
import * as Yup from "yup";
import { AllPlans } from "../../data/plansList";
import { Plans } from "../../data/plansJson";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import { connect } from "react-redux";
import { handleAntiReflectiveNoValidations } from "./helpers/handleAntireflectiveNoValidations";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
import { getAddons, getAddonsList } from "./helpers/addonsHelper";
import RetailError from "../photochromics/components/retailError/retailError";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";
import AntiReflectiveCategory from "./components/category";
import { CompareStrings, groupBy } from "../../../../utils/utils";

const AntireFlextive = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
    retailError,
}) => {
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const dipatch = useDispatch();
    const antireflectiveVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Anti-Reflective Properties"
        )?.visibility;
    const [error, setError] = useState("");

    const eyemedPlan = AllPlans[language]?.eyemed;
    const lensBenifitYes =
        Plans()[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const antireflectiveYes =
        Plans()[language][values?.visionPlan]?.antireflective?.options?.yes;

    const getAntireflectiveList = () => {
        if (CompareStrings(values?.visionPlan, "VBA")) {
            const addons = getAddonsList(
                calculatorObj,
                "VBA",
                "Anti-Reflective Coatings"
            );
            const groupByAddons = groupBy("category", addons);
            return groupByAddons[values?.antiReflectiveCategory];
        } else if (CompareStrings(values?.visionPlan, "Spectra")) {
            const addons = getAddonsList(
                calculatorObj,
                "Spectra",
                "Anti-Reflective"
            );
            const groupByAddons = groupBy("category", addons);
            return groupByAddons[values?.antiReflectiveCategory];
        } else if (!CompareStrings(values?.visionPlan, "VBA")) {
            return (
                calculatorObj?.addons
                    ?.find((plan) => plan?.title === values?.visionPlan)
                    ?.addon_types?.find(
                        (item) => item?.title === "Anti-Reflective Properties"
                    )?.addons || []
            );
        }
    };

    const handleActiveFields = () => {
        return (values?.isAntireflective === "Yes" &&
            values?.antireflectiveType &&
            values?.visionPlan !== eyemedPlan) ||
            values?.isAntireflective === "No" ||
            (values?.isAntireflective === "Yes" &&
                values?.antireflectiveType &&
                values?.visionPlan === eyemedPlan &&
                values?.antireflectiveValue)
            ? true
            : false;
    };

    const handleAntireflectiveChange = async (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            if (
                CompareStrings(values?.visionPlan, "VBA") ||
                CompareStrings(values?.visionPlan, "Spectra")
            ) {
                validationsObj.antiReflectiveCategory = Yup.string().required(
                    "Category is required"
                );
            } else if (!CompareStrings(values?.visionPlan, "VBA")) {
                validationsObj.antireflectiveType = Yup.string().required(
                    "Antireflective type is required"
                );
            }
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await handleAntiReflectiveNoValidations(
                formProps,
                calValidations,
                setCalValidations
            );
        }
        if (values.isCopayAntiReflective && e.target.value === "No") {
            setError(
                "Are you sure, you don't want to use the available discount?"
            );
        } else {
            setError("");
        }
    };
    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };
    const showAlert = (e) => {
        const material = getAddons(
            calculatorObj,
            "Anti-Reflective Properties",
            e?.target?.value,
            values?.visionPlan
        );

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
                    type: "antiReflective",
                    error: retailErrorMessage("this Anti-Reflective"),
                    plan: values?.visionPlan,
                })
            );
        }
    };

    const handleAntireflectiveTypeChange = (e) => {
        handleChange(e);
        showAlert(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isAntireflective === antireflectiveYes &&
            e?.target?.value
        ) {
            const validationObject = {};
            validationObject.antireflectiveValue =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.antireflectiveValue;
            setCalValidations({
                ...validations,
            });
        }
    };

    const isShowAntiReflectiveTypes = () => {
        return ((CompareStrings(values?.visionPlan, "VBA") ||
            CompareStrings(values?.visionPlan, "Spectra")) &&
            CompareStrings(values?.isAntireflective, "Yes") &&
            values?.antiReflectiveCategory) ||
            (!CompareStrings(values?.visionPlan, "VBA") &&
                !CompareStrings(values?.visionPlan, "Spectra") &&
                CompareStrings(values?.isAntireflective, "Yes"))
            ? true
            : false;
    };

    return (
        <>
            {(antireflectiveVisibility || values?.lensType === "NVF") && (
                <Row className={classes["container"]}>
                    <Col xs={24} sm={24} md={5} lg={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveFields()}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={19} lg={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Anti-Reflective Properties ?"
                                active={handleActiveFields()}
                            />
                            <Radio.Group
                                onChange={handleAntireflectiveChange}
                                value={values?.isAntireflective}
                                id="isAntireflective"
                                name="isAntireflective"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isAntireflective === "Yes"}
                                />

                                {!(
                                    values?.lensType === "Single Vision" &&
                                    (values?.lensTypeValue === "Eyezen+ 0" ||
                                        values?.lensTypeValue ===
                                            "Eyezen+ 1, 2, 3, 4")
                                ) && (
                                    <CustomRadio
                                        label={"No"}
                                        value={"No"}
                                        active={
                                            values?.isAntireflective === "No"
                                        }
                                    />
                                )}
                            </Radio.Group>
                            <FormikError name={"isAntireflective"} />
                            {error && (
                                <div className={classes["error"]}>{error}</div>
                            )}
                            <AntiReflectiveCategory
                                formProps={formProps}
                                calculatorObj={calculatorObj}
                                calValidations={calValidations}
                                setCalValidations={setCalValidations}
                            />
                            {isShowAntiReflectiveTypes() && (
                                <>
                                    <div className={classes["label"]}>
                                        Select Properties
                                    </div>
                                    <Radio.Group
                                        onChange={
                                            handleAntireflectiveTypeChange
                                        }
                                        value={values?.antireflectiveType}
                                        id="antireflectiveType"
                                        name="antireflectiveType"
                                        className={classes["radio-group"]}
                                    >
                                        {getAntireflectiveList()?.map(
                                            (value, index) => {
                                                return (
                                                    <CustomRadio
                                                        key={index}
                                                        label={
                                                            value?.display_name
                                                                ? value?.display_name
                                                                : value?.title
                                                        }
                                                        value={value?.title}
                                                        headClass={
                                                            classes[
                                                                "radio-margin"
                                                            ]
                                                        }
                                                        active={
                                                            values?.antireflectiveType ===
                                                            value?.title
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </Radio.Group>
                                    <FormikError name={"antireflectiveType"} />
                                    <RetailError
                                        error={
                                            retailError[values?.visionPlan]
                                                ?.antiReflective
                                        }
                                    />
                                </>
                            )}
                            {(values?.visionPlan === eyemedPlan &&
                                values?.isLensBenifit === lensBenifitYes &&
                                values?.isAntireflective ===
                                    antireflectiveYes &&
                                values?.antireflectiveType) ||
                                (CompareStrings(
                                    values?.antiReflectiveCategory,
                                    "Non - Formulary anti-reflective coatings"
                                ) &&
                                    CompareStrings(
                                        values?.isLensBenifit,
                                        "Yes"
                                    ) &&
                                    CompareStrings(
                                        values?.visionPlan,
                                        "Spectra"
                                    ) && (
                                        <CalculatorInput
                                            onChange={handleInputChange}
                                            value={values?.antireflectiveValue}
                                            name={"antireflectiveValue"}
                                        />
                                    ))}
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailError: state?.persistStore?.retailError,
});

export default connect(mapStateToProps)(AntireFlextive);
