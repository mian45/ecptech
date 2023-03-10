import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import icon from "../../../../../images/calculator/photochromics.svg";
import * as Yup from "yup";
import { connect } from "react-redux";
import { AllPlans } from "../../data/plansList";
import { Plans } from "../../data/plansJson";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
import { getAddons } from "../antireFlextive/helpers/addonsHelper";
import RetailError from "./components/retailError/retailError";
import { retailErrorMessage } from "../sunglassLens/helpers/constants";
import PhotochromicsCategory from "./components/categories/categories";
import { CompareStrings, groupBy } from "../../../../utils/utils";
import { getPhotochromicsAddons } from "./helpers/helpers";

const Photochromics = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
    retailError,
}) => {
    const dipatch = useDispatch();
    const { values, handleChange, handleBlur, setFieldValue } = formProps;
    const photochromicsVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Photochromics"
        )?.visibility;
    const [error, setError] = useState("");
    const eyemedPlan = AllPlans[language]?.eyemed;
    const lensBenifitYes =
        Plans()[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const photochromicsYes =
        Plans()[language][values?.visionPlan]?.photochromics?.options?.yes;

    const getPhotochromicList = () => {
        if (!CompareStrings(values?.visionPlan, "VBA")) {
            return (
                calculatorObj?.addons
                    ?.find((plan) => plan?.title === values?.visionPlan)
                    ?.addon_types?.find(
                        (item) => item?.title === "Photochromics"
                    )?.addons || []
            );
        } else if (CompareStrings(values?.visionPlan, "VBA")) {
            const addons = getPhotochromicsAddons(
                calculatorObj,
                "VBA",
                "Photochromics"
            );
            const groupByAddons = groupBy("category", addons);
            return groupByAddons[values?.photochromicsCategory];
        }
    };

    const handleActiveState = () => {
        return (values?.isPhotochromics === "Yes" &&
            values?.photochromicsType &&
            values?.visionPlan !== eyemedPlan) ||
            values?.isPhotochromics === "No" ||
            (values?.isPhotochromics === "Yes" &&
                values?.photochromicsType &&
                values?.visionPlan === eyemedPlan &&
                values?.photochromicValue)
            ? true
            : false;
    };

    const handlePhotochromicsChange = async (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes") {
            const validationsObj = {};
            if (!CompareStrings(values?.visionPlan, "VBA")) {
                validationsObj.photochromicsType =
                    Yup.string().required("Option is required");
            } else if (CompareStrings(values?.visionPlan, "VBA")) {
                validationsObj.photochromicsCategory = Yup.string().required(
                    "Category is required"
                );
            }
            setCalValidations({
                ...calValidations,
                ...validationsObj,
            });
        } else if (e?.target?.value === "No") {
            await setFieldValue("isCopayPhotochromic", null);
            await setFieldValue("isCopayPhotochromicAmount", "");
            await setFieldValue("copayPhotochromicAmount", "");
            await setFieldValue("photochromicsType", "");
            await setFieldValue("photochromicsCategory", "");
            await setFieldValue("photochromicValue", "");
            const validations = { ...calValidations };
            delete validations.isCopayPhotochromicAmount;
            delete validations.copayPhotochromicAmount;
            delete validations.photochromicsType;
            delete validations.photochromicsCategory;
            delete validations.photochromicValue;
            setCalValidations({
                ...validations,
            });
        }
        if (values.isCopayPhotochromic && e.target.value === "No") {
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
            "Photochromics",
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
                    type: "photochromics",
                    error: retailErrorMessage("this photochromics"),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    const handlePhotochromicsTypeChange = (e) => {
        handleChange(e);
        showAlert(e);
        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isPhotochromics === photochromicsYes &&
            e?.target?.value
        ) {
            const validationObject = {};
            validationObject.photochromicValue =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.photochromicValue;
            setCalValidations({
                ...validations,
            });
        }
    };

    const isShowPhotochromicsTypes = () => {
        return (CompareStrings(values?.visionPlan, "VBA") &&
            CompareStrings(values?.isPhotochromics, "Yes") &&
            values?.photochromicsCategory) ||
            (!CompareStrings(values?.visionPlan, "VBA") &&
                CompareStrings(values?.isPhotochromics, "Yes"))
            ? true
            : false;
    };

    return (
        <>
            {photochromicsVisibility ? (
                <Row className={classes["container"]}>
                    <Col xs={24} sm={24} md={5} lg={5}>
                        <QuestionIcon
                            icon={icon}
                            active={handleActiveState()}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={19} lg={19}>
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Photochromics ?"
                                active={handleActiveState()}
                            />
                            <Radio.Group
                                onChange={handlePhotochromicsChange}
                                value={values?.isPhotochromics}
                                id="isPhotochromics"
                                name="isPhotochromics"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isPhotochromics === "Yes"}
                                />
                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isPhotochromics === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isPhotochromics"} />
                            {error && (
                                <div className={classes["error"]}>{error}</div>
                            )}
                            <PhotochromicsCategory
                                formProps={formProps}
                                calculatorObj={calculatorObj}
                                calValidations={calValidations}
                                setCalValidations={setCalValidations}
                            />
                            {isShowPhotochromicsTypes() && (
                                <>
                                    <div className={classes["label"]}>
                                        Select Photochromics
                                    </div>
                                    <Radio.Group
                                        onChange={handlePhotochromicsTypeChange}
                                        value={values?.photochromicsType}
                                        id="photochromicsType"
                                        name="photochromicsType"
                                        className={classes["radio-group"]}
                                    >
                                        {getPhotochromicList()?.map(
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
                                                            classes["radio"]
                                                        }
                                                        active={
                                                            values?.photochromicsType ===
                                                            value?.title
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </Radio.Group>
                                    <FormikError name={"photochromicsType"} />
                                    <RetailError
                                        error={
                                            retailError[values?.visionPlan]
                                                ?.photochromics
                                        }
                                    />
                                </>
                            )}
                            {values?.visionPlan === eyemedPlan &&
                                values?.isLensBenifit === lensBenifitYes &&
                                values?.isPhotochromics === photochromicsYes &&
                                values?.photochromicsType && (
                                    <CalculatorInput
                                        onChange={handleInputChange}
                                        value={values?.photochromicValue}
                                        name={"photochromicValue"}
                                    />
                                )}
                        </div>
                    </Col>
                </Row>
            ) : null}
        </>
    );
};

const mapStateToProps = (state) => ({
    language: state.Auth.language,
    retailError: state?.persistStore?.retailError,
});

export default connect(mapStateToProps)(Photochromics);

const PHOTOCHROMICS_VALUES = [
    "Transition Signature",
    "Transition XTRActive",
    "SunSync / Drive XT",
    "SunSync Elite / Elite XT",
    "Sensity Photochromic",
    "ZEISS Photofusion",
    "Transition Vantage",
];
