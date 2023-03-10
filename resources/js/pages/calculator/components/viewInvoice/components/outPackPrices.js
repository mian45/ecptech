import React from "react";
import {
    getPriceByAntireflective,
    getPriceByPhotochromicMaterial,
    getPrivatePayAntireflective,
    getPrivatePayLensPices,
    getPrivatePayMaterialPices,
    getPrivatePayPhotochromic,
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
import { BenifitTypeEnums } from "../../../data/initialValues";
import { getPriceFromDB } from "../helpers/getPriceFromDB";
import classes from "../styles.module.scss";

const OutPackPrices = ({
    receipt,
    totalPrice,
    calculatorObj,
    withoutTaxPrice,
    lensPrices,
}) => {
    const getCoatingPrice = () => {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            receipt?.values?.sunGlassesLens?.coatingType === "Ski Type Mirror"
        ) {
            if (
                receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
                receipt?.values?.visionPlan === "Private Pay"
            ) {
                const skiTypePrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Ski Type Mirror"
                )?.price;
                return parseFloat(skiTypePrice || 0) || 0;
            } else {
                return SKI_TYPE_MIRROR;
            }
        } else if (
            receipt?.values?.sunGlassesLens?.coatingType ===
            "Solid/Single Gradient Mirror"
        ) {
            if (
                receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
                receipt?.values?.visionPlan === "Private Pay"
            ) {
                const solidGradientPrice = glassesAddons?.addons?.find(
                    (item) => item?.title === "Solid/Single Gradient Mirror"
                )?.price;
                return parseFloat(solidGradientPrice || 0) || 0;
            } else {
                return SOLID_SINGLE_GRADIENT;
            }
        } else {
            return 0;
        }
    };
    const getAntireflectivePrice = () => {
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            if (receipt?.values?.antiReflectiveProperties?.status === "Yes") {
                return getPrivatePayAntireflective(
                    receipt?.values?.antiReflectiveProperties?.type,
                    calculatorObj
                );
            } else {
                return 0;
            }
        } else {
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
                        receipt?.values?.visionPlan,
                        receipt?.values?.antiReflectiveProperties?.type
                    );
                }
            } else {
                return 0;
            }
        }
    };

    const getPhotochromicPrice = () => {
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            if (receipt?.values?.photochromics?.status === "Yes") {
                return getPrivatePayPhotochromic(
                    receipt?.values?.photochromics?.type,
                    calculatorObj
                );
            } else {
                return 0;
            }
        } else {
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
                        receipt?.values?.visionPlan,
                        receipt?.values?.photochromics?.type
                    );
                }
            } else {
                return 0;
            }
        }
    };

    const calculateFrameFee = () => {
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.frame ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            return receipt?.values?.frameOrder?.retailFee || 0;
        } else {
            if (
                receipt?.values?.frameOrder?.retailFee <=
                receipt?.values?.frameOrder?.frameContribution
            ) {
                return 0;
            } else {
                const actualPrice =
                    receipt?.values?.frameOrder?.retailFee -
                    receipt?.values?.frameOrder?.frameContribution;
                const discount = actualPrice * 0.2;
                const payableFramePrice = actualPrice - discount;
                return payableFramePrice || 0;
            }
        }
    };
    const renderLensTypePrice = () => {
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            return (
                getPrivatePayLensPices(calculatorObj, receipt, lensPrices) || 0
            );
        } else {
            return (
                getLensFee(receipt, calculatorObj, lensPrices)?.lensPrice || 0
            );
        }
    };
    const renderLensMaterialPrice = () => {
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            return (
                getPrivatePayMaterialPices(
                    calculatorObj,
                    receipt,
                    lensPrices
                ) || 0
            );
        } else {
            return (
                getLensFee(receipt, calculatorObj, lensPrices)?.materialPrice ||
                0
            );
        }
    };
    const getDiscountPercent = () => {
        const discount = parseInt(getDiscountPrice() || 0);
        const totalRetailFee =
            (receipt?.values?.frameOrder?.retailFee || 0) + 200;
        return (discount / totalRetailFee) * 100;
    };
    const getDiscountPrice = () => {
        const totalRetailFee =
            (receipt?.values?.frameOrder?.retailFee || 0) + 200;
        return totalRetailFee - (totalPrice || 0);
    };

    const getPolirizedFee = () => {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            const polirizedPrice = glassesAddons?.addons?.find(
                (item) => item?.title === "Polarized"
            )?.price;

            return parseFloat(polirizedPrice || 0) || 0;
        } else {
            return POLARIZED;
        }
    };

    const getSolidTintFee = () => {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            const solidTindPrice = glassesAddons?.addons?.find(
                (item) => item.title === "Solid Tint"
            )?.price;

            return parseFloat(solidTindPrice || 0) || 0;
        } else {
            return SOLID_TINT;
        }
    };
    const getGradientTintFee = () => {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
            receipt?.values?.visionPlan === "Private Pay"
        ) {
            const gradientTindPrice = glassesAddons?.addons?.find(
                (item) => item.title === "Gradient Tint"
            )?.price;

            return parseFloat(gradientTindPrice || 0) || 0;
        } else {
            return GRADIENT_TINT;
        }
    };

    const LensPayInvoice = () => {
        return (
            <>
                {calculatorObj && (
                    <InvoiceSlot
                        title={`${
                            receipt?.values?.lensType?.brand || ""
                        } ( Base fee )`}
                        subTitle={`$${renderLensTypePrice()}`}
                    />
                )}
                {calculatorObj && (
                    <InvoiceSlot
                        title={`${
                            receipt?.values?.lensType?.brand || ""
                        } ( Lens Material ${receipt?.values?.lensMaterial} )`}
                        subTitle={`$${renderLensMaterialPrice()}`}
                    />
                )}
                {receipt?.values?.photochromics?.status === "Yes" && (
                    <InvoiceSlot
                        title={`Photochromic Option: ${receipt?.values?.photochromics?.type}`}
                        subTitle={`$${
                            (getPhotochromicPrice() || 0).toFixed(2) || 0
                        }`}
                    />
                )}
                {receipt?.values?.antiReflectiveProperties?.status ===
                    "Yes" && (
                    <InvoiceSlot
                        title={`Anti-Reflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
                        subTitle={`$${
                            (getAntireflectivePrice() || 0).toFixed(2) || 0
                        }`}
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
                    receipt?.values?.sunGlassesLens?.lensType ===
                        "Polarized" && (
                        <InvoiceSlot
                            title={"Polarized Fee"}
                            subTitle={
                                receipt?.values?.sunGlassesLens?.lensType ===
                                "Polarized"
                                    ? `$${getPolirizedFee()}`
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
                                    ? `$${getSolidTintFee()}`
                                    : `$${getGradientTintFee()}`
                            }
                        />
                    )}
            </>
        );
    };

    const FramePayInvoice = () => {
        return (
            <>
                {receipt?.values?.frameOrder?.type === "New Frame Purchase" && (
                    <InvoiceSlot
                        title={`Frame: `}
                        subTitle={`$${
                            (calculateFrameFee() || 0).toFixed(2) || 0
                        }`}
                    />
                )}
                {receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
                    receipt?.values?.frameOrder?.drillMount === "Yes" && (
                        <InvoiceSlot
                            title={`Drill Mount: `}
                            subTitle={`$${DRILL_MOUNT}`}
                        />
                    )}
            </>
        );
    };
    const underPrivatePay = () => {
        return (
            <>
                <div className={classes["plan-sub-label"]}>
                    Estimates under Private Pay
                </div>
                {LensPayInvoice()}
            </>
        );
    };
    const underPlanPay = () => {
        return (
            <>
                <div
                    className={classes["plan-sub-label"]}
                >{`Estimates under ${receipt?.values?.visionPlan}`}</div>
                {calculatorObj && (
                    <InvoiceSlot
                        title={`${
                            receipt?.values?.lensType?.brand || ""
                        } ( Base fee )`}
                        subTitle={`$${renderLensTypePrice()}`}
                    />
                )}
                {calculatorObj && (
                    <InvoiceSlot
                        title={`${
                            receipt?.values?.lensType?.brand || ""
                        } ( Lens Material ${receipt?.values?.lensMaterial} )`}
                        subTitle={`$${renderLensMaterialPrice()}`}
                    />
                )}
                {receipt?.values?.frameOrder?.type === "New Frame Purchase" && (
                    <InvoiceSlot
                        title={`Frame: `}
                        subTitle={`$${
                            (calculateFrameFee() || 0).toFixed(2) || 0
                        }`}
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
                        subTitle={`$${
                            (getPhotochromicPrice() || 0).toFixed(2) || 0
                        }`}
                    />
                )}
                {receipt?.values?.antiReflectiveProperties?.status ===
                    "Yes" && (
                    <InvoiceSlot
                        title={`Anti-Reflective Properties: ${receipt?.values?.antiReflectiveProperties?.type}`}
                        subTitle={`$${
                            (getAntireflectivePrice() || 0).toFixed(2) || 0
                        }`}
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
                    receipt?.values?.sunGlassesLens?.lensType ===
                        "Polarized" && (
                        <InvoiceSlot
                            title={"Polarized Fee"}
                            subTitle={
                                receipt?.values?.sunGlassesLens?.lensType ===
                                "Polarized"
                                    ? `$${getPolirizedFee()}`
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
                                    ? `$${getSolidTintFee()}`
                                    : `$${getGradientTintFee()}`
                            }
                        />
                    )}
                {receipt?.values?.frameOrder?.type === "New Frame Purchase" && (
                    <InvoiceSlot
                        title={`Frame: `}
                        subTitle={`$${
                            (calculateFrameFee() || 0).toFixed(2) || 0
                        }`}
                    />
                )}
                {receipt?.values?.frameOrder?.type === "New Frame Purchase" &&
                    receipt?.values?.frameOrder?.drillMount === "Yes" && (
                        <InvoiceSlot
                            title={`Drill Mount: `}
                            subTitle={`$${DRILL_MOUNT}`}
                        />
                    )}
            </>
        );
    };
    const underFramePay = () => {
        return (
            <>
                <div
                    className={classes["plan-sub-label"]}
                >{`Estimates under Private Pay`}</div>
                {FramePayInvoice()}
            </>
        );
    };

    const renderReceiptByType = () => {
        if (receipt?.values?.submitBenifitType === BenifitTypeEnums.lens) {
            return underPrivatePay();
        } else if (
            receipt?.values?.submitBenifitType === BenifitTypeEnums.frame
        ) {
            return underFramePay();
        } else {
            return underPlanPay();
        }
    };

    const appliedDiscountsList = () => {
        let price = 0;

        const discountToApply = parseFloat(
            receipt?.values?.discount?.value || ""
        );
        if (discountToApply != 0) {
            price = (withoutTaxPrice * discountToApply) / 100;
        }
        return (
            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>
                    {`Discount ${receipt?.values?.discount?.type}`}
                </div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>
                        {`(${parseFloat(
                            receipt?.values?.discount?.value || 0
                        )?.toFixed(2)}%) `}
                    </span>

                    {`$${parseFloat(price || 0)?.toFixed(2)}`}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={classes["page-sub-label"]}>Out of pocket Fees</div>
            {renderReceiptByType()}
            {(receipt?.values?.submitBenifitType === BenifitTypeEnums.lens ||
                receipt?.values?.submitBenifitType ===
                    BenifitTypeEnums.frame) && (
                <div
                    style={{ marginTop: "20px" }}
                    className={classes["plan-sub-label"]}
                >{`Estimates under ${receipt?.values?.visionPlan}`}</div>
            )}
            {receipt?.values?.submitBenifitType === BenifitTypeEnums.frame &&
                LensPayInvoice()}

            {receipt?.values?.submitBenifitType === BenifitTypeEnums.lens &&
                FramePayInvoice()}

            <InvoiceSlot
                title={"Material Copay"}
                subTitle={`$${receipt?.values?.materialCopay || 0}`}
            />

            {receipt?.values?.protectionPlan?.status === "Yes" &&
                receipt?.values?.protectionPlan?.paymentStatus === "Paid" && (
                    <InvoiceSlot
                        title={"Protection Plan Fee"}
                        subTitle={
                            "$" +
                                (
                                    receipt?.values?.protectionPlan?.price || 0
                                ).toFixed(2) || 0
                        }
                    />
                )}
            {receipt?.values?.shipping?.status === "Yes" && (
                <InvoiceSlot
                    title={"Shipping Fee"}
                    subTitle={"$" + (calculatorObj?.shipping || 0)}
                />
            )}
            {appliedDiscountsList()}

            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>
                    Percent discount
                </div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>
                        {`(${(getDiscountPercent() || 0)?.toFixed(2)}%) `}
                    </span>

                    {`$${parseInt(getDiscountPrice() || 0)?.toFixed(2)}`}
                </div>
            </div>
            <div className={classes["invoice-slot-container"]}>
                <div className={classes["invoice-slot-title"]}>Sales Tax</div>
                <div className={classes["invoice-slot-title"]}>
                    <span className={classes["light-title"]}>{`(${(
                        calculatorObj.tax || 0
                    ).toFixed(2)}%) `}</span>
                    $
                    {(
                        (withoutTaxPrice * (calculatorObj.tax || 0)) /
                        100
                    ).toFixed(2) || 0}
                </div>
            </div>
            <InvoiceBoldSlot
                title={"Total Due"}
                subTitle={`$${(totalPrice || 0).toFixed(2)}`}
            />
        </>
    );
};

export default OutPackPrices;

export const getPriceFromDBOld = (receipt, calculatorObj, lensPrices) => {
    let lensPrice = 0;
    let materialPrice = 0;
    let progressiveCategory = "";

    const categoryBrands = calculatorObj?.lens_types.find(
        (item) => item?.title === "PAL"
    )?.brands;
    categoryBrands?.forEach((item) => {
        item.collections?.forEach((val) => {
            if (val.title == receipt?.values?.lensType?.brand) {
                progressiveCategory = val?.category;
            }
        });
    });

    const materials =
        lensPrices?.lenses_price &&
        lensPrices?.lenses_price[0]?.lenses?.filter(
            (item) =>
                item?.lens_material_title === receipt?.values?.lensMaterial
        );
    const isStandardProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Standard Progressives"
        );
    const isPremiumProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Premium Progressives"
        );
    const isCustomProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Custom Progressives"
        );
    console.log("materials", materials);
    if (!materials || materials?.length <= 0) {
        if (receipt?.values?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isCustomProg?.price;
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isPremiumProg?.price;
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isStandardProg?.price;
                }
            }
        }

        return {
            lensPrice: lensPrice,
            materialPrice: materialPrice,
        };
    } else if (materials?.characteristics?.length === 1) {
        if (receipt?.values?.visionPlan === "VSP Advantage") {
            if (
                (materials[0]?.characteristics?.price || "")?.trim() ===
                    "80% of U&C" ||
                (materials[0]?.characteristics?.price || "")
                    ?.trim()
                    ?.includes("+") ||
                (materials[0]?.characteristics?.price || "")
                    ?.trim()
                    ?.includes("^")
            ) {
                lensPrice =
                    parseFloat(
                        getPrivatePayLensPices(
                            calculatorObj,
                            receipt,
                            lensPrices
                        )
                    ) * 0.8;
            } else {
                if (
                    (materials[0]?.characteristics?.price || "")?.trim() ===
                        "NULL" ||
                    !(materials[0]?.characteristics?.price || "")?.trim()
                ) {
                    lensPrice = 0;
                } else {
                    lensPrice = (materials[0]?.characteristics?.price || "")
                        ?.trim()
                        ?.slice(1, lensPrice?.length);
                }
            }
        } else {
            if (
                (materials[0]?.characteristics?.price || "")?.trim() ===
                    "NULL" ||
                !(materials[0]?.characteristics?.price || "")?.trim()
            ) {
                lensPrice = 0;
            } else {
                lensPrice = (materials[0]?.characteristics?.price || "")
                    ?.trim()
                    ?.slice(1, (lensPrice || "")?.trim()?.length);
            }
        }
        if (receipt?.values?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isCustomProg?.price;
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isPremiumProg?.price;
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isStandardProg?.price;
                }
            }
        }
        return {
            lensPrice: lensPrice,
            materialPrice: materialPrice,
        };
    } else {
        const baseCharecterstics = materials[0]?.characteristics?.filter(
            (item) => item.type !== "add-on"
        );
        const TACharecterstics = materials[0]?.characteristics?.filter(
            (item) => item.name === "TA"
        );
        if (materials) {
            if (receipt?.values?.visionPlan === "VSP Advantage") {
                if (
                    (baseCharecterstics[0]?.price || "")?.trim() ===
                        "80% of U&C" ||
                    (baseCharecterstics[0]?.price || "")
                        ?.trim()
                        ?.includes("+") ||
                    (baseCharecterstics[0]?.price || "")?.trim()?.includes("^")
                ) {
                    lensPrice =
                        parseFloat(
                            getPrivatePayLensPices(
                                calculatorObj,
                                receipt,
                                lensPrices
                            )
                        ) * 0.8;
                } else {
                    if (
                        (materials[0]?.characteristics?.price || "")?.trim() ===
                            "NULL" ||
                        !(materials[0]?.characteristics?.price || "")
                            ?.trim()(baseCharecterstics[0]?.price || "")
                            ?.trim() === "NULL" ||
                        !(baseCharecterstics[0]?.price || "")?.trim()
                    ) {
                        lensPrice = 0;
                    } else {
                        lensPrice = (baseCharecterstics[0]?.price || "")
                            ?.trim()
                            ?.slice(
                                1,
                                (baseCharecterstics[0]?.price || "")?.trim()
                                    ?.length
                            );
                    }
                }
                baseCharecterstics.splice(0, 1);
                const restBases = [...baseCharecterstics, ...TACharecterstics];
                restBases.forEach((item) => {
                    if (
                        (item?.price || "")?.trim() === "80% of U&C" ||
                        (item?.price || "")?.trim()?.includes("+") ||
                        (item?.price || "")?.trim()?.includes("^")
                    ) {
                        materialPrice =
                            materialPrice +
                            parseFloat(
                                getPrivatePayMaterialPices(
                                    calculatorObj,
                                    receipt,
                                    lensPrices
                                )
                            ) *
                                0.8;
                    } else {
                        if (
                            !(item?.price || "")
                                ?.trim()
                                .includes("80% of U&C") ||
                            !(item?.price || "")?.trim().includes("+")
                        ) {
                            if (
                                (item?.price || "")?.trim() === "NULL" ||
                                !(item?.price || "")?.trim()
                            ) {
                                materialPrice = materialPrice + 0;
                            } else {
                                materialPrice =
                                    materialPrice +
                                    parseInt(
                                        (item?.price || "")
                                            ?.trim()
                                            ?.slice(
                                                1,
                                                (item?.price || "")?.trim()
                                                    ?.length
                                            )
                                    );
                            }
                        }
                    }
                });

                return {
                    lensPrice: lensPrice,
                    materialPrice: materialPrice,
                };
            } else {
                if (
                    (baseCharecterstics[0]?.price || "")?.trim() === "NULL" ||
                    !(baseCharecterstics[0]?.price || "")?.trim()
                ) {
                    lensPrice = 0;
                } else {
                    lensPrice = (baseCharecterstics[0]?.price || "")
                        ?.trim()
                        ?.slice(
                            1,
                            (baseCharecterstics[0]?.price || "")?.trim()?.length
                        );
                }
                baseCharecterstics.splice(0, 1);
                const restBases = [...baseCharecterstics, ...TACharecterstics];
                restBases.forEach((item) => {
                    if (
                        (item?.price || "")?.trim() === "NULL" ||
                        !(item?.price || "")?.trim()
                    ) {
                        materialPrice = materialPrice + 0;
                    } else {
                        let currentPrice = 0;
                        currentPrice = parseInt(
                            (item?.price || "")
                                ?.trim()
                                ?.slice(
                                    1,
                                    (item?.price || "")?.trim()?.length
                                ) || 0
                        );
                        materialPrice = materialPrice + currentPrice;
                    }
                });
                if (receipt?.values?.lensType?.type === "PAL") {
                    if (
                        isCustomProg?.status &&
                        progressiveCategory === "Custom"
                    ) {
                        if (isCustomProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isCustomProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isCustomProg?.price;
                        }
                    } else if (
                        isPremiumProg?.status &&
                        progressiveCategory === "Premium"
                    ) {
                        if (isPremiumProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isPremiumProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isPremiumProg?.price;
                        }
                    } else if (
                        isStandardProg?.status &&
                        progressiveCategory === "Standard"
                    ) {
                        if (isStandardProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isStandardProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isStandardProg?.price;
                        }
                    }
                }
                return {
                    lensPrice: lensPrice,
                    materialPrice: materialPrice,
                };
            }
        } else {
            return { lensPrice: 0, materialPrice: 0 };
        }
    }
};

export const getLensFee = (receipt, calculatorObj, lensPrices) => {
    if (
        receipt?.values?.lensType?.type &&
        receipt?.values?.lensType?.brand &&
        receipt?.values?.lensMaterial
    ) {
        if (
            receipt?.values?.lensMaterial === "Polycarbonate" ||
            receipt?.values?.lensMaterial?.includes("Hi index") ||
            receipt?.values?.lensMaterial?.includes("Hi Index")
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
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            ),
                            materialPrice: 0,
                        };
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            ),
                            materialPrice: isPholicarbinateActive?.price || 0,
                        };
                    }
                } else {
                    return getPriceFromDB(receipt, calculatorObj, lensPrices);
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
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            ),
                            materialPrice: 0,
                        };
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            lensPrice: parseInt(
                                getPriceFromDB(
                                    receipt,
                                    calculatorObj,
                                    lensPrices
                                )?.lensPrice || 0
                            ),
                            materialPrice: isHighIndexActive?.price || 0,
                        };
                    }
                } else {
                    return getPriceFromDB(receipt, calculatorObj, lensPrices);
                }
            }
        } else {
            return getPriceFromDB(receipt, calculatorObj, lensPrices);
        }
    } else {
        return { lensPrice: 0, materialPrice: 0 };
    }
};
