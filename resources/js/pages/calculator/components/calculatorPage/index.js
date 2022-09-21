import React from "react";
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
import VisionBenifits from "../visionBenifits";
import classes from "./styles.module.scss";

const CalculatorScreen = () => {
    return (
        <div className={classes["container"]}>
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
            </div>
        </div>
    );
};

export default CalculatorScreen;
