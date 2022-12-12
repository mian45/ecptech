import React, { useState } from "react";
import { Col, Radio, Row } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import lensIcon from "../../../../../images/calculator/lens.svg";
import Axios from "../../../../Http";
import InvoicePriceAlert from "../invoicePriceAlert";
import * as Yup from "yup";

const LensType = ({
    formProps,
    calculatorObj,
    setCalculatorObj,
    setCalValidations,
    calValidations,
    getBaseValues,
}) => {
    const { values, handleChange, handleBlur, setFieldValue, setFieldError } =
        formProps;
    const [showInvoiceAlert, setShowInvoiceAlert] = useState(false);

    const lensTypeVisibility = calculatorObj?.questions
        ?.find((item) => item.title === values?.visionPlan)
        ?.question_permissions?.find(
            (ques) => ques.question === "Lens Type"
        )?.visibility;
    const [error, setError] = useState("");
    const showActiveState = () => {
        if (values?.lensType && values?.lensTypeValue) {
            return true;
        }
        return false;
    };
    const lensTypeValues = () => {
        const sortedLenses = [];
        const singleVision = calculatorObj["lens_types"].find(
            (val) => val?.title === "Single Vision"
        )?.title;
        singleVision && sortedLenses.push(singleVision);
        const PAL = calculatorObj["lens_types"].find(
            (val) => val?.title === "PAL"
        )?.title;
        PAL && sortedLenses.push(PAL);
        const NVF = calculatorObj["lens_types"].find(
            (val) => val?.title === "NVF"
        )?.title;
        NVF && sortedLenses.push(NVF);
        const restLenses = calculatorObj["lens_types"].filter(
            (val) =>
                val?.title !== "NVF" &&
                val?.title !== "PAL" &&
                val?.title !== "Single Vision"
        );
        restLenses?.forEach((item) => {
            item && sortedLenses.push(item?.title);
        });

        return sortedLenses;
    };
    const getBrandByLens = async (e) => {
        try {
            if (e?.target?.value !== "PAL") {
                delete calValidations.isCopaypremiumProgressiveAmount;
                delete calValidations.copaypremiumProgressiveAmount;
                delete calValidations.isCopayStandardProgressiveAmount;
                delete calValidations.copayStandardProgressiveAmount;
                delete calValidations.isCopayCustomProgressiveAmount;
                delete calValidations.copayCustomProgressiveAmount;

                await setFieldValue("isCopayPremiumProgressives", null);
                await setFieldValue("isCopaypremiumProgressiveAmount", "");
                await setFieldValue("copaypremiumProgressiveAmount", "");
                await setFieldValue("isCopayStandardProgressives", null);
                await setFieldValue("isCopayStandardProgressiveAmount", "");
                await setFieldValue("copayStandardProgressiveAmount", "");
                await setFieldValue("isCopayCustomProgressives", null);
                await setFieldValue("isCopayCustomProgressiveAmount", "");
                await setFieldValue("copayCustomProgressiveAmount", "");
            }
            const lensTypeValue = Yup.string().required("Brand is required");
            setCalValidations({
                ...calValidations,
                lensTypeValue,
            });
            await handleChange(e);
            await setFieldValue("lensTypeValue", "");
            setError("");
            handleNVFType(e);
        } catch (err) {
            console.log("error while getting brands");
        }
    };
    const handleNVFType = async (e) => {
        if (e?.target?.value === "NVF") {
            let validationObject = {};
            validationObject.isAntireflective = Yup.string().required(
                "Antireflective is required"
            );
            validationObject.antireflectiveType = Yup.string().required(
                "Antireflective type is required"
            );
            validationObject.lensTypeValue =
                Yup.string().required("Brand is required");
            await setFieldValue("isAntireflective", "Yes");
            if (values?.isAntireflective === "No") {
                await setFieldValue("isAntireflective", "");
            }
            if (
                !values?.isAntireflective ||
                values?.isAntireflective === "No"
            ) {
                delete validationObject.antireflectiveType;
            }
            setCalValidations({
                ...calValidations,
                ...validationObject,
            });
        } else {
            const antireflectiveVisibility =
                calculatorObj?.questions
                    ?.find((item) => item?.title === values?.visionPlan)
                    ?.question_permissions?.find(
                        (ques) => ques.question === "Antireflective Properties"
                    )?.optional === "true";
            if (!antireflectiveVisibility) {
                await setFieldError("isAntireflective", "");
                await setFieldError("antireflectiveType", "");
                const validations = { ...calValidations };
                delete validations.isAntireflective;
                delete validations.antireflectiveType;
                setCalValidations({
                    ...validations,
                });
            }
        }
    };
    const getLensSubValues = () => {
        const selectedLensType = calculatorObj["lens_types"]?.find(
            (value) => value?.title === values.lensType
        );
        let lenses = [];
        selectedLensType?.brands?.forEach((element) => {
            element?.collections?.forEach((lens) => {
                if (lens?.display_name) {
                    lenses.push(lens?.display_name);
                } else {
                    lenses.push(lens?.title);
                }
            });
        });
        return lenses;
    };

    const showAlert = (e) => {
        const targetedLens = calculatorObj["lens_types"]?.find(
            (val) => val?.title === values?.lensType
        );

        let collection = null;
        targetedLens?.brands?.forEach((item) => {
            item.collections?.forEach((val) => {
                if (val?.display_name) {
                    if (val.display_name == e.target?.value) {
                        collection = val;
                    }
                } else {
                    if (val.title == e.target?.value) {
                        collection = val;
                    }
                }
            });
        });
        const invoiceData = localStorage.getItem("CALCULATOR_DATA");
        let parsedInvoiceData = false;
        if (invoiceData) {
            const data = JSON.parse(invoiceData);
            parsedInvoiceData = data?.invoicePriceData || false;
        }

        if (!collection?.price && !parsedInvoiceData) {
            setShowInvoiceAlert(true);
        }
        if (!collection?.price && parsedInvoiceData) {
            setError(
                "The Retail Price for this brand is not added from the settings. Are you sure you want to continue?"
            );
        }
    };

    const resetMaterial = async (e) => {
        if (values?.lensType) {
            const lensType = calculatorObj?.lens_types?.find(
                (item) => item?.title === values?.lensType
            );

            let activeMaterials = [];
            lensType?.brands?.forEach((item) => {
                item?.collections?.forEach((val) => {
                    if (val?.display_name) {
                        if (val?.display_name == e?.target?.value) {
                            activeMaterials = val?.lenses;
                        }
                    } else {
                        if (val?.title == e?.target?.value) {
                            activeMaterials = val?.lenses;
                        }
                    }
                });
            });

            if (values?.lensMaterial) {
                let isMaterialFound = true;

                isMaterialFound = activeMaterials?.some(
                    (item) =>
                        item?.lens_material_title?.toLowerCase() ===
                        values?.lensMaterial?.toLowerCase()
                );
                if (activeMaterials?.length > 0 && !isMaterialFound) {
                    setFieldValue("lensMaterial", "");
                } else {
                    if (values?.lensMaterial && e?.target?.value) {
                        await getBaseValues(
                            {
                                ...values,
                                lensTypeValue: e?.target?.value,
                            },
                            calculatorObj
                        );
                    }
                }
            }
        }
    };

    const handleBrandSelection = async (e) => {
        await resetMaterial(e);
        handleChange(e);
        showAlert(e);
        if (values?.lensType === "PAL") {
            const targetedLens = calculatorObj["lens_types"]?.find(
                (val) => val?.title === "PAL"
            );
            let collection = null;
            targetedLens?.brands?.forEach((item) => {
                item.collections?.forEach((val) => {
                    if (val?.display_name) {
                        if (val.display_name == e.target?.value) {
                            collection = val;
                        }
                    } else {
                        if (val.title == e.target?.value) {
                            collection = val;
                        }
                    }
                });
            });

            if (
                values.isCopayStandardProgressives &&
                collection?.category === "Standard"
            ) {
                setError("");
            } else if (
                values.isCopayPremiumProgressives &&
                collection?.category === "Premium"
            ) {
                setError("");
            } else if (
                values.isCopayCustomProgressives &&
                collection?.category === "Custom"
            ) {
                setError("");
            } else if (
                values.isCopayStandardProgressives ||
                values.isCopayPremiumProgressives ||
                values.isCopayCustomProgressives
            ) {
                setError(
                    "Are you sure, you don't want to use the available discount?"
                );
            }
        }
    };

    const handleSaveClick = (dontShow) => {
        if (dontShow) {
            const calculatorData = {
                invoicePriceData: true,
            };
            localStorage.setItem(
                "CALCULATOR_DATA",
                JSON.stringify(calculatorData)
            );
            setShowInvoiceAlert(false);
        } else {
            setShowInvoiceAlert(false);
        }
    };
    const RenderModal = React.useMemo(() => {
        return (
            <>
                {showInvoiceAlert ? (
                    <InvoicePriceAlert
                        accept={handleSaveClick}
                        cancel={() => {
                            setShowInvoiceAlert(false);
                        }}
                        open={showInvoiceAlert}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    }, [showInvoiceAlert]);

    return (
        <>
            {RenderModal}

            {lensTypeVisibility ? (
                <div className={classes["container"]}>
                    <Row className={classes["sub-container"]}>
                        <Col sx={24} sm={24} md={5}>
                            <QuestionIcon
                                icon={lensIcon}
                                active={showActiveState()}
                            />{" "}
                        </Col>
                        <Col sx={24} sm={24} md={19}>
                            <div className={classes["vision-container"]}>
                                <CalculatorHeading
                                    title="Lens Type ?"
                                    active={showActiveState()}
                                />

                                <Radio.Group
                                    onChange={getBrandByLens}
                                    value={values?.lensType}
                                    id="lensType"
                                    name="lensType"
                                    className={classes["radio-group"]}
                                >
                                    {lensTypeValues()?.map((lens, index) => {
                                        return (
                                            <CustomRadio
                                                key={index}
                                                label={lens}
                                                value={lens}
                                                active={
                                                    values?.lensType === lens
                                                }
                                            />
                                        );
                                    })}
                                </Radio.Group>
                                <FormikError name={"lensType"} />
                                {values?.lensType && (
                                    <>
                                        <div
                                            className={classes["choose-label"]}
                                        >
                                            Please Choose
                                        </div>
                                        <Radio.Group
                                            onChange={handleBrandSelection}
                                            value={values?.lensTypeValue}
                                            id="lensTypeValue"
                                            name="lensTypeValue"
                                            className={classes["radio-group"]}
                                        >
                                            {getLensSubValues()?.map(
                                                (lens, index) => {
                                                    return (
                                                        <CustomRadio
                                                            headClass={
                                                                classes[
                                                                    "radio-margin"
                                                                ]
                                                            }
                                                            key={index}
                                                            label={lens}
                                                            value={lens}
                                                            active={
                                                                values?.lensTypeValue ===
                                                                lens
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </Radio.Group>
                                        {error && (
                                            <div className={classes["error"]}>
                                                {error}
                                            </div>
                                        )}
                                        <FormikError name={"lensTypeValue"} />
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : null}
        </>
    );
};

export default LensType;

const LENS_TYPES = ["Single Vision", "PAL", "NVF", "Bifocal/Trifocal"];

const LENS_VALUES = ["Shamir Autograph 3 SV", "Shamir Relax"];
