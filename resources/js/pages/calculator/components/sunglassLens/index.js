import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import CustomRadio from "../../../../components/customRadio";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import icon from "../../../../../images/calculator/sunglasses.svg";
import * as Yup from "yup";
import { connect } from "react-redux";
import { AllPlans } from "../../data/plansList";
import { Plans } from "../../data/plansJson";
import CalculatorInput from "../frameOrder/components/calculatorInput/calculatorInput";
import { useDispatch } from "react-redux";
import * as action from "../../../../store/actions";
import { getAddons } from "../antireFlextive/helpers/addonsHelper";
import {
    retailErrorMessage,
    retailErrors,
    retailErrorsMessage,
} from "./helpers/constants";
import RetailError from "../photochromics/components/retailError/retailError";

const SunglassLens = ({
    formProps,
    calculatorObj,
    setCalValidations,
    calValidations,
    data,
    language,
    retailError,
}) => {
    const { values, handleChange, handleBlur } = formProps;
    const dipatch = useDispatch();

    const sunglassLensVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Sunglass Options"
        )?.visibility;

    const eyemedPlan = AllPlans[language]?.eyemed;
    const lensBenifitYes =
        Plans()[language][values?.visionPlan]?.lensBenifit?.options?.yes;
    const sunglassesYes =
        Plans()[language][values?.visionPlan]?.sunglasses?.options?.yes;
    const polarizedType =
        Plans()[language][values?.visionPlan]?.sunglasses?.subQuestion?.options
            ?.polarized?.question;
    const tintType =
        Plans()[language][values?.visionPlan]?.sunglasses?.subQuestion?.options
            ?.tint?.question;
    const mirrorCoatingYes =
        Plans()[language][values?.visionPlan]?.sunglasses?.subQuestion
            ?.subQuestion?.options?.yes;
    const addons = calculatorObj?.addons
        ?.find((plan) => plan?.title === values?.visionPlan)
        ?.addon_types?.find(
            (item) => item.title === "Sunglass Options"
        )?.addons;
    const isPolirizedActive = addons?.some(
        (item) => item?.title === "Polarized"
    );
    const isSolidTintActive = addons?.some(
        (item) => item?.title === "Solid Tint"
    );
    const isGradientTintActive = addons?.some(
        (item) => item?.title === "Gradient Tint"
    );
    const isSkyTypeActive = addons?.some(
        (item) => item?.title === "Ski Type Mirror"
    );
    const isSolidTypeActive = addons?.some(
        (item) => item?.title === "Solid/Single Gradient Mirror"
    );

    const handleInputChange = (e) => {
        const regix = new RegExp("^[0-9]*[/.]?([0-9]*)?$");
        if (regix.test(e.target.value)) {
            handleChange(e);
        } else if (e.target.value == "") {
            handleChange(e);
        }
    };

    const handleIsSunglassesLensChange = (e) => {
        handleChange(e);
        if (
            e?.target?.value === "Yes" &&
            data?.find((ques) => ques.question === "Sunglass Options")
                ?.optional === "true"
        ) {
            const sunglassesType = Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                sunglassesType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.sunglassesType;
            delete validations.tintType;
            delete validations.isMirrorCoating;
            delete validations.mirrorCoatingType;
            delete validations.polarizedTypePrice;
            delete validations.tintTypePrice;
            delete validations.mirrorCoatingPrice;
            setCalValidations({
                ...validations,
            });
        }
    };
    const showAlert = (e, type) => {
        const material = getAddons(
            calculatorObj,
            "Sunglass Options",
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
                    type: type,
                    error: retailErrorMessage(retailErrorsMessage(type)),
                    plan: values?.visionPlan,
                })
            );
        }
    };
    const handleSunGlassesLensTypeChange = (e) => {
        handleChange(e);
        if (e?.target?.value === "Polarized") {
            showAlert(e, retailErrors()?.polarized);
            const validations = { ...calValidations };
            delete validations.tintType;
            delete validations.tintTypePrice;
            const validationObject = {};
            validationObject.isMirrorCoating =
                Yup.string().required("Option is required");
            if (
                values?.visionPlan === eyemedPlan &&
                values?.isLensBenifit === lensBenifitYes &&
                values?.isSunglasses === sunglassesYes &&
                e?.target?.value === polarizedType
            ) {
                validationObject.polarizedTypePrice =
                    Yup.string().required("Price is required");
            }
            setCalValidations({
                ...validations,
                ...validationObject,
            });
        } else if (e?.target?.value === "Tint") {
            dipatch(
                action.retailError({
                    type: "polarized",
                    error: "",
                    plan: values?.visionPlan,
                })
            );
            const validations = { ...calValidations };
            delete validations.polarizedTypePrice;
            const validationObj = {};
            validationObj.tintType =
                Yup.string().required("Option is required");
            validationObj.isMirrorCoating =
                Yup.string().required("Option is required");
            if (
                values?.visionPlan === eyemedPlan &&
                values?.isLensBenifit === lensBenifitYes &&
                values?.isSunglasses === sunglassesYes &&
                e?.target?.value === tintType
            ) {
                validationObj.tintTypePrice =
                    Yup.string().required("Price is required");
            }

            setCalValidations({
                ...calValidations,
                ...validationObj,
            });
        }
    };

    const handleMirrirCoatingChange = (e) => {
        handleChange(e);
        if (e?.target?.value === "Yes") {
            const mirrorCoatingType =
                Yup.string().required("Option is required");
            setCalValidations({
                ...calValidations,
                mirrorCoatingType,
            });
        } else if (e?.target?.value === "No") {
            const validations = { ...calValidations };
            delete validations.mirrorCoatingType;
            delete validations.mirrorCoatingPrice;
            setCalValidations({
                ...validations,
            });
        }
    };
    const handleMirrorCoatingChange = (e) => {
        handleChange(e);
        showAlert(e, retailErrors()?.coating);

        if (
            values?.visionPlan === eyemedPlan &&
            values?.isLensBenifit === lensBenifitYes &&
            values?.isSunglasses === sunglassesYes &&
            values?.isMirrorCoating === mirrorCoatingYes &&
            e?.target?.value
        ) {
            const validationObject = {};
            validationObject.mirrorCoatingPrice =
                Yup.string().required("Price is required");
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const validations = { ...calValidations };
            delete validations.mirrorCoatingPrice;
            setCalValidations({
                ...validations,
            });
        }
    };
    const getOtherPlanActiveState = () => {
        return values?.isSunglasses === "No" ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Polarized" &&
                values?.isMirrorCoating === "No") ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Polarized" &&
                values?.isMirrorCoating === "Yes" &&
                values?.mirrorCoatingType) ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Tint" &&
                values?.isMirrorCoating === "No" &&
                values?.tintType) ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Tint" &&
                values?.isMirrorCoating === "Yes" &&
                values?.tintType &&
                values?.mirrorCoatingType)
            ? true
            : false;
    };
    const getEyemedPlanActiveState = () => {
        return values?.isSunglasses === "No" ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Polarized" &&
                values?.polarizedTypePrice &&
                values?.isMirrorCoating === "No") ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Polarized" &&
                values?.polarizedTypePrice &&
                values?.isMirrorCoating === "Yes" &&
                values?.mirrorCoatingType &&
                values?.mirrorCoatingPrice) ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Tint" &&
                values?.isMirrorCoating === "No" &&
                values?.tintTypePrice &&
                values?.tintType) ||
            (values?.isSunglasses === "Yes" &&
                values?.sunglassesType === "Tint" &&
                values?.isMirrorCoating === "Yes" &&
                values?.tintType &&
                values?.tintTypePrice &&
                values?.mirrorCoatingType &&
                values?.mirrorCoatingPrice)
            ? true
            : false;
    };
    const handleActiveState = () => {
        const otherPlan = getOtherPlanActiveState();
        const eyemedPlan = getEyemedPlanActiveState();
        return (values.visionPlan !== eyemedPlan && otherPlan) ||
            (values.visionPlan === eyemedPlan && eyemedPlan)
            ? true
            : false;
    };
    const getPolorized = () => {
        return addons?.find((val) => val?.title === "Polarized");
    };

    const renderSunGlassLens = () => {
        return (
            <>
                <div className={classes["label"]}>Select Sunglass Lens</div>
                <Radio.Group
                    onChange={handleSunGlassesLensTypeChange}
                    value={values?.sunglassesType}
                    id="sunglassesType"
                    name="sunglassesType"
                    className={classes["radio-group"]}
                    headClass={classes["margin"]}
                >
                    {isPolirizedActive && (
                        <CustomRadio
                            label={
                                getPolorized()?.display_name
                                    ? getPolorized()?.display_name
                                    : getPolorized()?.title
                            }
                            value={getPolorized()?.title}
                            active={
                                values?.sunglassesType === getPolorized()?.title
                            }
                        />
                    )}

                    {(isSolidTintActive || isGradientTintActive) && (
                        <CustomRadio
                            label={"Tint"}
                            value={"Tint"}
                            active={values?.sunglassesType === "Tint"}
                        />
                    )}
                </Radio.Group>
                <FormikError name={"sunglassesType"} />
                <RetailError
                    error={retailError[values?.visionPlan]?.polarized}
                />
                {values?.visionPlan === eyemedPlan &&
                    values?.isLensBenifit === lensBenifitYes &&
                    values?.isSunglasses === sunglassesYes &&
                    values?.sunglassesType === polarizedType && (
                        <CalculatorInput
                            onChange={handleInputChange}
                            value={values?.polarizedTypePrice}
                            name={"polarizedTypePrice"}
                        />
                    )}
            </>
        );
    };
    const renderTintLens = () => {
        const getSolid = () => {
            return addons?.find((val) => val?.title === "Solid Tint");
        };
        const getGradient = () => {
            return addons?.find((val) => val?.title === "Gradient Tint");
        };
        return (
            <>
                {(isSolidTintActive || isGradientTintActive) && (
                    <>
                        <div className={classes["label"]}>Select Tint Lens</div>
                        <Radio.Group
                            onChange={(e) => {
                                handleChange(e);
                                showAlert(e, retailErrors()?.tint);
                            }}
                            value={values?.tintType}
                            id="tintType"
                            name="tintType"
                            className={classes["radio-group"]}
                            headClass={classes["margin"]}
                        >
                            {isSolidTintActive && (
                                <CustomRadio
                                    label={
                                        getSolid()?.display_name
                                            ? getSolid()?.display_name
                                            : getSolid()?.title
                                    }
                                    value={getSolid()?.title}
                                    active={
                                        values?.tintType === getSolid()?.title
                                    }
                                />
                            )}

                            {isGradientTintActive && (
                                <CustomRadio
                                    label={
                                        getGradient()?.display_name
                                            ? getGradient()?.display_name
                                            : getGradient()?.title
                                    }
                                    value={getGradient()?.title}
                                    active={
                                        values?.tintType ===
                                        getGradient()?.title
                                    }
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"tintType"} />
                        <RetailError
                            error={retailError[values?.visionPlan]?.tint}
                        />
                        {values?.visionPlan === eyemedPlan &&
                            values?.isLensBenifit === lensBenifitYes &&
                            values?.isSunglasses === sunglassesYes &&
                            values?.sunglassesType === tintType && (
                                <CalculatorInput
                                    onChange={handleInputChange}
                                    value={values?.tintTypePrice}
                                    name={"tintTypePrice"}
                                />
                            )}
                    </>
                )}
            </>
        );
    };
    const renderMirrorCoating = () => {
        return (
            <>
                <CalculatorHeading title="Mirror Coating ?" />
                <Radio.Group
                    onChange={handleMirrirCoatingChange}
                    value={values?.isMirrorCoating}
                    id="isMirrorCoating"
                    name="isMirrorCoating"
                    className={classes["radio-group"]}
                >
                    {(isSkyTypeActive || isSolidTypeActive) && (
                        <CustomRadio
                            label={"Yes"}
                            value={"Yes"}
                            active={values?.isMirrorCoating === "Yes"}
                        />
                    )}

                    <CustomRadio
                        label={"No"}
                        value={"No"}
                        active={values?.isMirrorCoating === "No"}
                    />
                </Radio.Group>
                <FormikError name={"isMirrorCoating"} />
            </>
        );
    };
    const renderMirrorType = () => {
        const getSkyType = () => {
            return addons?.find((val) => val?.title === "Ski Type Mirror");
        };
        const getSolidSingle = () => {
            return addons?.find(
                (val) => val?.title === "Solid/Single Gradient Mirror"
            );
        };
        return (
            <>
                {(isSkyTypeActive || isSolidTypeActive) && (
                    <>
                        <div className={classes["label"]}>Please Select</div>
                        <Radio.Group
                            onChange={handleMirrorCoatingChange}
                            value={values?.mirrorCoatingType}
                            id="mirrorCoatingType"
                            name="mirrorCoatingType"
                            className={classes["radio-group"]}
                            headClass={classes["margin"]}
                        >
                            {isSkyTypeActive && (
                                <CustomRadio
                                    label={
                                        getSkyType()?.display_name
                                            ? getSkyType()?.display_name
                                            : getSkyType()?.title
                                    }
                                    value={getSkyType()?.title}
                                    active={
                                        values?.mirrorCoatingType ===
                                        getSkyType()?.title
                                    }
                                />
                            )}

                            {isSolidTypeActive && (
                                <CustomRadio
                                    label={
                                        getSolidSingle()?.display_name
                                            ? getSolidSingle()?.display_name
                                            : getSolidSingle()?.title
                                    }
                                    value={getSolidSingle()?.title}
                                    active={
                                        values?.mirrorCoatingType ===
                                        getSolidSingle()?.title
                                    }
                                />
                            )}
                        </Radio.Group>
                        <FormikError name={"mirrorCoatingType"} />
                        <RetailError
                            error={retailError[values?.visionPlan]?.coating}
                        />
                        {values?.visionPlan === eyemedPlan &&
                            values?.isLensBenifit === lensBenifitYes &&
                            values?.isSunglasses === sunglassesYes &&
                            values?.isMirrorCoating === mirrorCoatingYes &&
                            values?.mirrorCoatingType && (
                                <CalculatorInput
                                    onChange={handleInputChange}
                                    value={values?.mirrorCoatingPrice}
                                    name={"mirrorCoatingPrice"}
                                />
                            )}
                    </>
                )}
            </>
        );
    };
    return (
        <>
            {sunglassLensVisibility ? (
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
                                title="Sunglass Options ?"
                                active={handleActiveState()}
                            />
                            <Radio.Group
                                onChange={handleIsSunglassesLensChange}
                                value={values?.isSunglasses}
                                id="isSunglasses"
                                name="isSunglasses"
                                className={classes["radio-group"]}
                            >
                                <CustomRadio
                                    label={"Yes"}
                                    value={"Yes"}
                                    active={values?.isSunglasses === "Yes"}
                                />

                                <CustomRadio
                                    label={"No"}
                                    value={"No"}
                                    active={values?.isSunglasses === "No"}
                                />
                            </Radio.Group>
                            <FormikError name={"isSunglasses"} />
                            {values?.isSunglasses === "Yes" && (
                                <>
                                    {renderSunGlassLens()}
                                    {values?.sunglassesType && (
                                        <>
                                            {values?.sunglassesType ===
                                                "Tint" && renderTintLens()}
                                            <span style={{ marginTop: "20px" }}>
                                                {renderMirrorCoating()}
                                            </span>
                                            {values?.isMirrorCoating ===
                                                "Yes" && (
                                                <>{renderMirrorType()}</>
                                            )}
                                        </>
                                    )}
                                </>
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

export default connect(mapStateToProps)(SunglassLens);
