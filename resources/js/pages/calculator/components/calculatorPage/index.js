import React, { useState } from "react";
import AntireFlextive from "../antireFlextive";
import FrameOrder from "../frameOrder";
import GlassesProtection from "../glassesProtection";
import InvoiceInfo from "../invoiceInfo";
import LensMeterials from "../lensMeterial";
import LensType from "../lensType";
import LoweredCopay from "../loweredCopay";
import Photochromics from "../photochromics";
import ProtectionPlan from "../protectionPlan";
import SelectVisionPlan from "../selectVisionPlan";
import SunglassLens from "../sunglassLens";
import ViewInvoice from "../viewInvoice";
import VisionBenifits from "../visionBenifits";
import classes from "./styles.module.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import { CalculatorInitialValues } from "../../data/initialValues";

const CalculatorScreen = () => {
    const [showInvoice, setShowInvoice] = useState(false);
    const ShowInvoice = () => {
        setShowInvoice(true);
    };
    const HideInvoice = () => {
        setShowInvoice(false);
    };

    const handleClick = (values) => {
        console.log("values", values);
    };
    return (
        <div className={classes["container"]}>
            <Formik
                initialValues={CalculatorInitialValues}
                validationSchema={Yup.object().shape({})}
                onSubmit={handleClick}
            >
                {(formProps) => {
                    return (
                        <form
                            onSubmit={formProps.handleSubmit}
                            autoComplete="off"
                        >
                            {showInvoice && (
                                <ViewInvoice onClose={HideInvoice} />
                            )}
                            <InvoiceInfo formProps={formProps} />
                            <div className={classes["sub-container"]}>
                                <SelectVisionPlan formProps={formProps} />
                                <VisionBenifits formProps={formProps} />
                                <FrameOrder formProps={formProps} />
                                <LoweredCopay formProps={formProps} />
                                <LensType formProps={formProps} />
                                <LensMeterials formProps={formProps} />
                                <Photochromics formProps={formProps} />
                                <SunglassLens formProps={formProps} />
                                <AntireFlextive formProps={formProps} />
                                <ProtectionPlan formProps={formProps} />
                                <GlassesProtection formProps={formProps} />
                                <button
                                    className={classes["submit-button"]}
                                    onClick={ShowInvoice}
                                    type={"submit"}
                                >
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CalculatorScreen;
