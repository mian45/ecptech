import {
    GRADIENT_TINT,
    POLARIZED,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
} from "../../../../data/constants";
import {
    GetAntireflectivePrice,
    getLensByLowerCopay,
    getMaterialByLowerCopay,
    GetPhotochromicPrice,
    getPriceFromDB,
    GetPrivateAntireflectivePrice,
    GetPrivateLensFee,
    GetPrivatePayMaterialPrice,
    GetPrivatePhotochromicPrice,
} from "../../helpers/pricesHelper/calculateOtherPlansPrices";

export const RenderPhotochromicPrices = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        total = total + parseFloat(GetPhotochromicPrice(data));
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        total =
            total +
            parseFloat(
                GetPrivatePhotochromicPrice(
                    data?.photochromics?.type,
                    calculatorObj,
                    data
                )
            );
    }
    return (total || 0).toFixed(2);
};

export const RenderAntireflectivePrices = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        total = total + parseFloat(GetAntireflectivePrice(data));
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        total =
            total +
            parseFloat(
                GetPrivateAntireflectivePrice(
                    calculatorObj,
                    data?.antiReflectiveProperties?.type,
                    data
                )
            );
    }
    return (total || 0).toFixed(2);
};

export const RenderPolarizedFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.lensType === "Polarized"
        ) {
            total = POLARIZED;
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.lensType === "Polarized"
        ) {
            const polirizedPrice = glassesAddons?.addons?.find(
                (item) => item?.title === "Polarized"
            )?.price;

            total = total + parseFloat(polirizedPrice || 0) || 0;
        }
    }
    return (total || 0).toFixed(2);
};
export const RenderTintFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.lensType === "Tint"
        ) {
            if (data?.sunGlassesLens?.tintType === "Solid Tint") {
                total = total + SOLID_TINT;
            } else {
                total = total + GRADIENT_TINT;
            }
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.lensType === "Tint"
        ) {
            if (data?.sunGlassesLens?.tintType === "Solid Tint") {
                const solidTindPrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Solid Tint"
                )?.price;
                total = total + parseFloat(solidTindPrice || 0) || 0;
            } else {
                const gradientTindPrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Gradient Tint"
                )?.price;
                total = total + parseFloat(gradientTindPrice || 0) || 0;
            }
        }
    }
    return (total || 0).toFixed(2);
};

export const RenderCoatingFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.mirrorCoating === "Yes"
        ) {
            if (data?.sunGlassesLens?.coatingType === "Ski Type Mirror") {
                total = SKI_TYPE_MIRROR;
            } else {
                total = SOLID_SINGLE_GRADIENT;
            }
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        const glassesAddons = calculatorObj?.addons?.find(
            (item) => item?.title === "SunGlasses"
        );
        if (
            data?.sunGlassesLens?.status === "Yes" &&
            data?.sunGlassesLens?.mirrorCoating === "Yes"
        ) {
            if (data?.sunGlassesLens?.coatingType === "Ski Type Mirror") {
                const skiTypePrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Ski Type Mirror"
                )?.price;
                total = parseFloat(skiTypePrice || 0) || 0;
            } else {
                const solidGradientPrice = glassesAddons?.addons?.find(
                    (item) => item.title === "Solid/Single Gradient Mirror"
                )?.price;
                total = parseFloat(solidGradientPrice || 0) || 0;
            }
        }
    }
    return (total || 0).toFixed(2);
};
export const RenderBasePrice = (data, calculatorObj, lensPrices) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        total =
            total +
            parseFloat(GetLensFee(data, calculatorObj, lensPrices)?.lensPrice);
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        total = total + parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
    }
    return (total || 0).toFixed(2);
};

export const RenderLensMaterialPrice = (data, calculatorObj, lensPrices) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        total =
            total +
            parseFloat(
                GetLensFee(data, calculatorObj, lensPrices)?.materialPrice
            );
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        total =
            total +
            parseFloat(GetPrivatePayMaterialPrice(calculatorObj, data) || 0);
    }
    return (total || 0).toFixed(2);
};

const GetLensFee = (data, calculatorObj, lensPrices) => {
    const lensPrice = parseFloat(
        getPriceFromDB(data, calculatorObj, lensPrices)?.lensPrice || 0
    );
    const materialPrice = parseFloat(
        getPriceFromDB(data, calculatorObj, lensPrices)?.materialPrice || 0
    );
    let progressiveCategory = "";
    const categoryBrands = calculatorObj?.lens_types.find(
        (item) => item?.title === "PAL"
    )?.brands;
    categoryBrands?.forEach((item) => {
        item.collections?.forEach((val) => {
            if (val?.display_name) {
                if (val.display_name == data?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            } else {
                if (val.title == data?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            }
        });
    });
    const isStandardProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Standard Progressives"
    );
    const isPremiumProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Premium Progressives"
    );
    const isCustomProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Custom Progressives"
    );
    if (data?.lensType?.type && data?.lensType?.brand && data?.lensMaterial) {
        if (
            data?.lensMaterial === "Polycarbonate" ||
            data?.lensMaterial?.includes("Hi index") ||
            data?.lensMaterial?.includes("Hi Index")
        ) {
            if (data?.lensMaterial === "Polycarbonate") {
                const isPholicarbinateActive =
                    data?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "Polycarbonate"
                    );
                if (isPholicarbinateActive?.status) {
                    if (isPholicarbinateActive?.copayType === "$0 Copay") {
                        return {
                            materialPrice: 0,
                            lensPrice: parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            ),
                        };
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            materialPrice:
                                parseFloat(
                                    isPholicarbinateActive?.price || ""
                                ) || 0,
                            lensPrice: parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            ),
                        };
                    }
                } else {
                    return {
                        materialPrice: materialPrice,
                        lensPrice: getLensByLowerCopay(
                            data,
                            calculatorObj,
                            lensPrices
                        ),
                    };
                }
            } else {
                const isHighIndexActive =
                    data?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "High Index"
                    );
                if (isHighIndexActive?.status) {
                    if (isHighIndexActive?.copayType === "$0 Copay") {
                        return {
                            materialPrice: 0,
                            lensPrice: parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            ),
                        };
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return {
                            materialPrice:
                                parseFloat(isHighIndexActive?.price || "") || 0,
                            lensPrice: parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            ),
                        };
                    }
                } else {
                    return {
                        materialPrice: materialPrice,
                        lensPrice: parseFloat(
                            getLensByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                    };
                }
            }
        } else if (data?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: 0,
                    };
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: parseFloat(isCustomProg?.price || ""),
                    };
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: 0,
                    };
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: parseFloat(isPremiumProg?.price || ""),
                    };
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: 0,
                    };
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return {
                        materialPrice: parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ),
                        lensPrice: parseFloat(isStandardProg?.price || ""),
                    };
                }
            } else {
                return {
                    materialPrice: getMaterialByLowerCopay(
                        data,
                        calculatorObj,
                        lensPrices
                    ),
                    lensPrice: lensPrice,
                };
            }
        } else {
            return { lensPrice: lensPrice, materialPrice: materialPrice };
        }
    } else {
        return { lensPrice: 0, materialPrice: 0 };
    }
};
