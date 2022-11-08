import React, { useState } from "react";
import { Radio } from "antd";
import QuestionIcon from "../questionIcon";
import { CalculatorHeading, FormikError } from "../selectVisionPlan";
import classes from "./styles.module.scss";
import CustomRadio from "../../../../components/customRadio";
import lensIcon from "../../../../../images/calculator/lens.svg";
import Axios from "../../../../Http";
import InvoicePriceAlert from "../invoicePriceAlert";

const LensType = ({ formProps, calculatorObj, setCalculatorObj }) => {
    const { values, handleChange, handleBlur } = formProps;
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
            handleChange(e);
            return;
            const targetedLens = calculatorObj["lens_types"]?.find(
                (val) => val?.title === e?.target?.value
            );
            if (targetedLens?.brands && targetedLens?.brands.length > 0) {
                return;
            } else {
                const lensId = targetedLens?.id;
                const res = await Axios.post(
                    `${process.env.MIX_REACT_APP_URL}/api/get-brands`,
                    { lense_type_id: lensId }
                );
                const calculatorValues = { ...calculatorObj };
                const selectedLens = calculatorValues["lens_types"]?.find(
                    (item) => item.id === lensId
                );
                selectedLens.brands = res?.data?.data?.brands;
                setCalculatorObj(calculatorValues);
            }
        } catch (err) {
            console.log("error while getting brands");
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
            setError("Are you sure you want to continue without value");
        }
    };

    const handleBrandSelection = (e) => {
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
            } else {
                setError("Are you sure? You don't want to avail discount");
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
                ) : <></>}
            </>
        );
    }, [showInvoiceAlert]);

    return (
        <>
            {RenderModal}

            {lensTypeVisibility ? (
                <div className={classes["container"]}>
                    <div className={classes["sub-container"]}>
                        <QuestionIcon
                            icon={lensIcon}
                            active={showActiveState()}
                        />
                        <div className={classes["vision-container"]}>
                            <CalculatorHeading
                                title="Lens Type?"
                                active={showActiveState()}
                            />

                            <Radio.Group
                                onBlur={handleBlur}
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
                                            active={values?.lensType === lens}
                                        />
                                    );
                                })}
                            </Radio.Group>
                            <FormikError name={"lensType"} />
                            {values?.lensType && (
                                <>
                                    <div className={classes["choose-label"]}>
                                        Please Choose
                                    </div>
                                    <Radio.Group
                                        onBlur={handleBlur}
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
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default LensType;

const LENS_TYPES = ["Single Vision", "PAL", "NVF", "Bifocal/Trifocal"];

const LENS_VALUES = ["Shamir Autograph 3 SV", "Shamir Relax"];
