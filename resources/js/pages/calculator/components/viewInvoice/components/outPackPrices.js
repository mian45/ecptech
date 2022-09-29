import React from "react";
import {
    getPriceByPhotochromicMaterial,
    InvoiceBoldSlot,
    InvoiceSlot,
} from "..";
import {
    CRIZAL_SUNSHIELD,
    DRILL_MOUNT,
    GRADIENT_TINT,
    POLARIZED,
    SHAMIR_GLACIER_PLUS_UV,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
    TECHSHIELD_PLUS_UVR,
} from "../../../data/constants";
import classes from "../styles.module.scss";

const OutPackPrices = ({ receipt, totalPrice, calculatorObj }) => {
    const getCoatingPrice = () => {
        if (
            receipt?.values?.sunGlassesLens?.coatingType === "Ski Type Mirror"
        ) {
            return SKI_TYPE_MIRROR;
        } else if (
            receipt?.values?.sunGlassesLens?.coatingType ===
            "Solid/Single Gradient"
        ) {
            return SOLID_SINGLE_GRADIENT;
        } else {
            return 0;
        }
    };
    const getAntireflectivePrice = () => {
        if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
            const isAntireflectiveActive =
                receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                    (item) => item?.type === "Anti-Reflective Properties"
                );
            if (isAntireflectiveActive?.status) {
                if (isAntireflectiveActive?.copayType === "$0 Copay") {
                    return 0;
                } else if (
                    isAntireflectiveActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    return isAntireflectiveActive?.price || 0;
                }
            } else {
                return getPriceByAntireflective(
                    receipt?.values?.antiReflectiveProperties?.type
                );
            }
        } else {
            return 0;
        }
    };

    const getPhotochromicPrice = () => {
        if (receipt?.values?.photochromics?.status === "Yes") {
            const isPhotochromicActive =
                receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                    (item) => item?.type === "Photochromic"
                );
            if (isPhotochromicActive?.status) {
                if (isPhotochromicActive?.copayType === "$0 Copay") {
                    return 0;
                } else if (
                    isPhotochromicActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    return isPhotochromicActive?.price || 0;
                }
            } else {
                return getPriceByPhotochromicMaterial(
                    receipt?.values?.photochromics?.type
                );
            }
        } else {
            return 0;
        }
    };

    const calculateFrameFee = () => {
        if (
            receipt?.values?.frameOrder?.retailFee <=
            receipt?.values?.frameOrder?.frameContribution
        ) {
            return 0;
        } else {
            const actualPrice =
                receipt?.values?.frameOrder?.retailFee -
                receipt?.values?.frameOrder?.frameContribution;
            const discount =
                (receipt?.values?.frameOrder?.frameContribution /
                    receipt?.values?.frameOrder?.retailFee) *
                20;
            const payableFramePrice = actualPrice - discount;
            return payableFramePrice || 0;
        }
    };

    const getMaterialValues = () => {
        const currentPlan = calculatorObj?.sheet_data?.find(
            (plan) => plan.title === receipt?.values?.visionPlan
        );
        const currentLensType = currentPlan?.lensetypes?.find(
            (lens) => lens.title === receipt?.values?.lensType
        );
    };

    return (
        <>
            <div className={classes["page-sub-label"]}>Out of pocket Fees</div>
            <InvoiceSlot
                title={`${receipt?.values?.lensType?.brand || ""} ( Base fee )`}
                subTitle={"$50.00"}
            />
            <InvoiceSlot
                title={`${
                    receipt?.values?.lensType?.brand || ""
                } ( Lens Material: ${receipt?.values?.lensMaterial} )`}
                subTitle={"$0.00"}
            />
            <InvoiceSlot
                title={"Material Copay"}
                subTitle={`${receipt?.values?.materialCopay || 0}`}
            />
            {receipt?.values?.frameOrder?.type === "New Frame Purchase" && (
                <InvoiceSlot
                    title={`Frame: `}
                    subTitle={`$${calculateFrameFee()}`}
                />
            )}
            {receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
                receipt?.values?.frameOrder?.drillMount ===
                    "Yes"(
                        <InvoiceSlot
                            title={`Drill Mount: `}
                            subTitle={`$${DRILL_MOUNT}`}
                        />
                    )}
            {receipt?.values?.photochromics?.status === "Yes" && (
                <InvoiceSlot
                    title={`Photochromic Option: ${receipt?.values?.photochromics?.type}`}
                    subTitle={`$${getPhotochromicPrice()}`}
                />
            )}
            {receipt?.values?.antiReflectiveProperties?.status === "Yes" && (
                <InvoiceSlot
                    title={`Antireflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
                    subTitle={`$${getAntireflectivePrice()}`}
                />
            )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" &&
                receipt?.values?.sunGlassesLens?.status === "Yes" && (
                    <InvoiceSlot
                        title={`Mirror Coating: ${receipt?.values?.sunGlassesLens?.coatingType}`}
                        subTitle={`${getCoatingPrice() || 0}`}
                    />
                )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" && (
                <InvoiceSlot
                    title={"Is Sunglass Lens Polarized?"}
                    subTitle={
                        receipt?.values?.sunGlassesLens?.lensType ===
                        "Polarized"
                            ? "Yes"
                            : "No"
                    }
                />
            )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" && (
                <InvoiceSlot
                    title={"Is Sunglass Lens Tint?"}
                    subTitle={
                        receipt?.values?.sunGlassesLens?.lensType === "Tint"
                            ? "Yes"
                            : "No"
                    }
                />
            )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" &&
                receipt?.values?.sunGlassesLens?.lensType === "Polarized" && (
                    <InvoiceSlot
                        title={"Polarized Fee"}
                        subTitle={
                            receipt?.values?.sunGlassesLens?.lensType ===
                            "Polarized"
                                ? `$${POLARIZED}`
                                : "$0.00"
                        }
                    />
                )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" &&
                receipt?.values?.sunGlassesLens?.lensType === "Tint" && (
                    <InvoiceSlot
                        title={"Tint Fee"}
                        subTitle={
                            receipt?.values?.sunGlassesLens?.tintType ===
                            "Solid Tint"
                                ? `$${SOLID_TINT}`
                                : `$${GRADIENT_TINT}`
                        }
                    />
                )}
            {receipt?.values?.protectionPlan?.status === "Yes" &&
                receipt?.values?.protectionPlan?.paymentStatus === "Paid" && (
                    <InvoiceSlot
                        title={"Protection Plan Fee"}
                        subTitle={receipt?.values?.protectionPlan?.price}
                    />
                )}
            {receipt?.values?.shipping?.status === "Yes" && (
                <InvoiceSlot
                    title={"Shipping Fee"}
                    subTitle={receipt?.values?.shipping?.price}
                />
            )}

            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>
                    Percent discount
                </div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>{"($400)"}</span>{" "}
                    40.78%
                </div>
            </div>
            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>Sales Tax</div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>{"(25%)"}</span>{" "}
                    $100
                </div>
            </div>
            <InvoiceBoldSlot title={"Total Due"} subTitle={`$${totalPrice}`} />
        </>
    );
};

export default OutPackPrices;

export const getPriceByAntireflective = (value) => {
    switch (value) {
        case "Shamir Glacier Plus UV":
            return SHAMIR_GLACIER_PLUS_UV;
        case "TechShield Plus UVR":
            return TECHSHIELD_PLUS_UVR;
        case "Crizal Sunshield (Backside AR Only)":
            return CRIZAL_SUNSHIELD;
    }
};
