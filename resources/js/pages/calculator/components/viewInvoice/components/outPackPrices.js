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

const OutPackPrices = ({
    receipt,
    totalPrice,
    calculatorObj,
    withoutTaxPrice,
}) => {
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

    return (
        <>
            <div className={classes["page-sub-label"]}>Out of pocket Fees</div>
            {calculatorObj && (
                <InvoiceSlot
                    title={`${
                        receipt?.values?.lensType?.brand || ""
                    } ( Base fee )`}
                    subTitle={`$${
                        getLensFee(receipt, calculatorObj)?.lensPrice || 0
                    }`}
                />
            )}
            {calculatorObj && (
                <InvoiceSlot
                    title={`${
                        receipt?.values?.lensType?.brand || ""
                    } ( Lens Material ${receipt?.values?.lensMaterial} )`}
                    subTitle={`$${
                        getLensFee(receipt, calculatorObj)?.materialPrice || 0
                    }`}
                />
            )}

            <InvoiceSlot
                title={"Material Copay"}
                subTitle={`$${receipt?.values?.materialCopay || 0}`}
            />
            {receipt?.values?.frameOrder?.type === "New Frame Purchase" && (
                <InvoiceSlot
                    title={`Frame: `}
                    subTitle={`$${calculateFrameFee().toFixed(2) || 0}`}
                />
            )}
            {receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
                receipt?.values?.frameOrder?.drillMount === "Yes" && (
                    <InvoiceSlot
                        title={`Drill Mount: `}
                        subTitle={`$${DRILL_MOUNT}`}
                    />
                )}
            {receipt?.values?.photochromics?.status === "Yes" && (
                <InvoiceSlot
                    title={`Photochromic Option: ${receipt?.values?.photochromics?.type}`}
                    subTitle={`$${getPhotochromicPrice().toFixed(2) || 0}`}
                />
            )}
            {receipt?.values?.antiReflectiveProperties?.status === "Yes" && (
                <InvoiceSlot
                    title={`Antireflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
                    subTitle={`$${getAntireflectivePrice().toFixed(2) || 0}`}
                />
            )}
            {receipt?.values?.sunGlassesLens?.status === "Yes" &&
                receipt?.values?.sunGlassesLens?.status === "Yes" && (
                    <InvoiceSlot
                        title={`Mirror Coating: ${receipt?.values?.sunGlassesLens?.coatingType}`}
                        subTitle={`$${getCoatingPrice() || 0}`}
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
                        subTitle={
                            "$" +
                                (receipt?.values?.protectionPlan?.price).toFixed(
                                    2
                                ) || 0
                        }
                    />
                )}
            {receipt?.values?.shipping?.status === "Yes" && (
                <InvoiceSlot
                    title={"Shipping Fee"}
                    subTitle={"$" + (calculatorObj?.shipping || 0)}
                />
            )}

            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>
                    Percent discount
                </div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>
                        {(
                            ((totalPrice || 0) /
                                ((receipt?.values?.frameOrder?.retailFee || 0) +
                                    200)) *
                            100
                        ).toFixed(2)}
                        %
                    </span>

                    {`($${(
                        (totalPrice || 0) /
                        ((receipt?.values?.frameOrder?.retailFee || 0) + 200)
                    ).toFixed(2)})`}
                </div>
            </div>
            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>Sales Tax</div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>{`(${(
                        calculatorObj.tax || 0
                    ).toFixed(2)}%)`}</span>
                    $
                    {(
                        (withoutTaxPrice * (calculatorObj.tax || 1)) /
                        100
                    ).toFixed(2) || 0}
                </div>
            </div>
            <InvoiceBoldSlot
                title={"Total Due"}
                subTitle={`$${totalPrice.toFixed(2)}`}
            />
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

export const getPriceFromDB = (receipt, calculatorObj) => {
    let lensPrice = 0;
    let materialPrice = 0;
    const currentPlan = calculatorObj?.price_calculation_data?.find(
        (plan) => plan.title === receipt?.values?.visionPlan
    );
    const currentLensType = currentPlan?.lensetypes?.find(
        (lens) => lens.title === receipt?.values?.lensType?.type
    );
    let brands = null;
    currentLensType?.brands.forEach((item) => {
        item.collections?.forEach((val) => {
            if (val.title === receipt?.values?.lensType?.brand) brands = val;
        });
    });
    const materials = brands?.lenses?.filter(
        (item) => item.lens_material_title === receipt?.values?.lensMaterial
    );
    if (materials?.length < 0) {
        return { lensPrice: lensPrice, materialPrice: materialPrice };
    } else if (materials?.characteristics?.length === 1) {
        lensPrice = materials[0]?.characteristics?.price;
        return { lensPrice: lensPrice, materialPrice: materialPrice };
    } else {
        if (materials) {
            const baseCharecterstics = materials[0]?.characteristics?.filter(
                (item) => item.type !== "add-on"
            );
            const TACharecterstics = materials[0]?.characteristics?.filter(
                (item) => item.name === "TA"
            );
            lensPrice = baseCharecterstics[0]?.price;
            baseCharecterstics.splice(0, 1);
            const restBases = [...baseCharecterstics, ...TACharecterstics];
            restBases.forEach((item) => {
                materialPrice = materialPrice + parseInt(item.price);
            });
            return { lensPrice: lensPrice, materialPrice: materialPrice };
        } else {
            return { lensPrice: 0, materialPrice: 0 };
        }
    }
};

export const getLensFee = (receipt, calculatorObj) => {
    if (
        receipt?.values?.lensType?.type &&
        receipt?.values?.lensType?.brand &&
        receipt?.values?.lensMaterial
    ) {
        if (
            receipt?.values?.lensMaterial === "Polycarbonate" ||
            receipt?.values?.lensMaterial?.includes("Hi index")
        ) {
            if (receipt?.values?.lensMaterial === "Polycarbonate") {
                const isPholicarbinateActive =
                    receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "Polycarbonate"
                    );
                if (isPholicarbinateActive?.status) {
                    if (isPholicarbinateActive?.copayType === "$0 Copay") {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(receipt, calculatorObj)
                                    ?.lensPrice || 0
                            ),
                            materialPrice: 0,
                        };
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(receipt, calculatorObj)
                                    ?.lensPrice || 0
                            ),
                            materialPrice: isPholicarbinateActive?.price || 0,
                        };
                    }
                } else {
                    return getPriceFromDB(receipt, calculatorObj);
                }
            } else {
                const isHighIndexActive =
                    receipt?.values?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "High Index"
                    );
                if (isHighIndexActive?.status) {
                    if (isHighIndexActive?.copayType === "$0 Copay") {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(receipt, calculatorObj)
                                    ?.lensPrice || 0
                            ),
                            materialPrice: 0,
                        };
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(receipt, calculatorObj)
                                    ?.lensPrice || 0
                            ),
                            materialPrice: isHighIndexActive?.price || 0,
                        };
                    }
                } else {
                    return getPriceFromDB(receipt, calculatorObj);
                }
            }
        } else {
            return getPriceFromDB(receipt, calculatorObj);
        }
    } else {
        return { lensPrice: 0, materialPrice: 0 };
    }
};
