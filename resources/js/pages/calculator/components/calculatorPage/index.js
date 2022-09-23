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

const CalculatorScreen = () => {
    const [showInvoice, setShowInvoice] = useState(false);
    const ShowInvoice = () => {
        setShowInvoice(true);
    };
    const HideInvoice = () => {
        setShowInvoice(false);
    };
    return (
        <div className={classes["container"]}>
            {showInvoice && <ViewInvoice onClose={HideInvoice} />}
            <InvoiceInfo />
            <div className={classes["sub-container"]}>
                <SelectVisionPlan />
                <VisionBenifits />
                <FrameOrder />
                <LoweredCopay />
                <LensType />
                <LensMeterials />
                <Photochromics />
                <SunglassLens />
                <AntireFlextive />
                <ProtectionPlan />
                <GlassesProtection />
                <button
                    className={classes["submit-button"]}
                    onClick={ShowInvoice}
                >
                    Create Invoice
                </button>
            </div>
        </div>
    );
};

export default CalculatorScreen;
