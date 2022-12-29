import { CompareStrings } from "../../../../../../utils/utils";
import {
    GRADIENT_TINT,
    POLARIZED,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
} from "../../../../data/constants";
import {
    GetDavisAntireflectiveFee,
    GetDavisCoatingFee,
    GetDavisLensFee,
    GetDavisMaterialFee,
    GetDavisPhotochromicFee,
    GetDavisPolarizedFee,
    GetDavisPolishFee,
    GetDavisSlabOffFee,
    GetDavisSpecialityLensFee,
    GetDavisTintFee,
} from "../../helpers/pricesHelper/calculateDavisPrice";
import {
    GetEyemedAntireflectiveFee,
    GetEyemedCoatingFee,
    GetEyemedLensFee,
    GetEyemedMaterialFee,
    GetEyemedPhotochromicFee,
    GetEyemedPolarizedFee,
    GetEyemedPolishFee,
    GetEyemedSlabOffFee,
    GetEyemedSpecialityLensFee,
    GetEyemedTintFee,
    GetPrivateSlabOffPrice,
    GetPrivateSpecialityLensPrice,
} from "../../helpers/pricesHelper/calculateEyemedPrice";
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
import {
    GetPrivateSpectraLens,
    GetSpectraAntireflectiveFee,
    GetSpectraChemistrieClipFee,
    GetSpectraCoatingFee,
    GetSpectraEdgeCoatingFee,
    GetSpectraLensFee,
    GetSpectraLensOptionsFee,
    GetSpectraMaterialFee,
    GetSpectraOverSizeLensesFee,
    GetSpectraPolarizedFee,
    getSpectraPrivateAntiReflective,
    getSpectraPrivateChemistrieClip,
    getSpectraPrivateEdgeCoating,
    getSpectraPrivateLensOptions,
    GetSpectraPrivateMaterial,
    GetSpectraPrivateMirrorCoating,
    getSpectraPrivateOverSizeLenses,
    GetSpectraPrivatePolarized,
    getSpectraPrivateScratchCoating,
    GetSpectraScratchCoatingFee,
    GetSpectraScratechWarrentyFee,
} from "../../helpers/pricesHelper/calculateSpectraPrice";
import {
    GetPrivateMirrorCoatingPrice,
    GetPrivatePayVBAMaterialPrice,
    GetPrivatePolarizedPrice,
    GetPrivateTintPrice,
    GetPrivateVBAAsphericFee,
    GetPrivateVBABlueProtectionFee,
    GetPrivateVBALensFee,
    GetPrivateVBALicensedFee,
    GetPrivateVBARollAndPolishFee,
    GetPrivateVBAScratchFee,
    GetVBAAntireflectiveFee,
    GetVBAAsphericFee,
    GetVBABlueProtectionFee,
    GetVBACoatingFee,
    GetVBALensFee,
    GetVBALicensedFee,
    GetVBAMaterialFee,
    GetVBAPhotochromicFee,
    GetVBAPolarizedFee,
    GetVBAPrivateAntireflectivePrice,
    GetVBARollAndPolishFee,
    GetVBAScratchFee,
    GetVBATintFee,
} from "../../helpers/pricesHelper/calculateVBAPrice";

export const RenderPhotochromicPrices = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedPhotochromicFee(data));
        } else if (currentPlan === "Davis Vision") {
            total =
                total +
                parseFloat(GetDavisPhotochromicFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBAPhotochromicFee(data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(0);
        } else {
            total = total + parseFloat(GetPhotochromicPrice(data));
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(0);
        } else {
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
    }
    return (total || 0).toFixed(2);
};

export const RenderAntireflectivePrices = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedAntireflectiveFee(data));
        } else if (currentPlan === "Davis Vision") {
            total =
                total +
                parseFloat(GetDavisAntireflectiveFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBAAntireflectiveFee(data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(GetSpectraAntireflectiveFee(data));
        } else {
            total = total + parseFloat(GetAntireflectivePrice(data));
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total +
                parseFloat(
                    GetVBAPrivateAntireflectivePrice(
                        calculatorObj,
                        data?.antiReflectiveProperties?.type,
                        data
                    )
                );
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total +
                parseFloat(
                    getSpectraPrivateAntiReflective(data, calculatorObj)
                );
        } else {
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
    }
    return (total || 0).toFixed(2);
};

export const RenderPolarizedFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedPolarizedFee(data));
        } else if (currentPlan === "Davis Vision") {
            total =
                total + parseFloat(GetDavisPolarizedFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBAPolarizedFee(data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(GetSpectraPolarizedFee(data));
        } else {
            if (
                data?.sunGlassesLens?.status === "Yes" &&
                data?.sunGlassesLens?.lensType === "Polarized"
            ) {
                total = POLARIZED;
            }
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total +
                parseFloat(GetPrivatePolarizedPrice(calculatorObj, data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total +
                parseFloat(GetSpectraPrivatePolarized(data, calculatorObj));
        } else {
            const glassesAddons = calculatorObj?.addons
                ?.find((plan) => plan?.title === data?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Sunglass Options"
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
    }
    return (total || 0).toFixed(2);
};
export const RenderTintFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedTintFee(data));
        } else if (currentPlan === "Davis Vision") {
            total = total + parseFloat(GetDavisTintFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBATintFee(data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(0);
        } else {
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
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total + parseFloat(GetPrivateTintPrice(calculatorObj, data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(0);
        } else {
            const glassesAddons = calculatorObj?.addons
                ?.find((plan) => plan?.title === data?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Sunglass Options"
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
    }
    return (total || 0).toFixed(2);
};

export const RenderCoatingFee = (data, calculatorObj) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedCoatingFee(data));
        } else if (currentPlan === "Davis Vision") {
            total = total + parseFloat(GetDavisCoatingFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBACoatingFee(data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(GetSpectraCoatingFee(data));
        } else {
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
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total +
                parseFloat(GetPrivateMirrorCoatingPrice(calculatorObj, data));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total +
                parseFloat(GetSpectraPrivateMirrorCoating(data, calculatorObj));
        } else {
            const glassesAddons = calculatorObj?.addons
                ?.find((plan) => plan?.title === data?.visionPlan)
                ?.addon_types?.find(
                    (item) => item?.title === "Sunglass Options"
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
    }
    return (total || 0).toFixed(2);
};
export const RenderBasePrice = (data, calculatorObj, lensPrices) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedLensFee(data));
        } else if (currentPlan === "Davis Vision") {
            total = total + parseFloat(GetDavisLensFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBALensFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total = total + parseFloat(GetSpectraLensFee(data, calculatorObj));
        } else {
            total =
                total +
                parseFloat(
                    GetLensFee(data, calculatorObj, lensPrices)?.lensPrice
                );
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total +
                parseFloat(GetPrivateVBALensFee(data, calculatorObj) || 0);
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total +
                parseFloat(GetPrivateSpectraLens(data, calculatorObj) || 0);
        } else {
            total =
                total + parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        }
    }
    return (total || 0).toFixed(2);
};

export const RenderLensMaterialPrice = (
    data,
    calculatorObj,
    lensPrices,
    davisMaterials
) => {
    const currentPlan = data?.visionPlan;
    const isPrivate = currentPlan === "Private Pay" ? true : false;
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        if (currentPlan === "Eyemed") {
            total = total + parseFloat(GetEyemedMaterialFee(data));
        } else if (currentPlan === "Davis Vision") {
            total =
                total + parseFloat(GetDavisMaterialFee(data, davisMaterials));
        } else if (CompareStrings(currentPlan, "VBA")) {
            total = total + parseFloat(GetVBAMaterialFee(data, calculatorObj));
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total + parseFloat(GetSpectraMaterialFee(data, calculatorObj));
        } else {
            total =
                total +
                parseFloat(
                    GetLensFee(data, calculatorObj, lensPrices)?.materialPrice
                );
        }
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (CompareStrings(currentPlan, "VBA")) {
            total =
                total +
                parseFloat(
                    GetPrivatePayVBAMaterialPrice(data, calculatorObj) || 0
                );
        } else if (CompareStrings(currentPlan, "Spectra")) {
            total =
                total +
                parseFloat(GetSpectraPrivateMaterial(data, calculatorObj));
        } else {
            total =
                total +
                parseFloat(
                    GetPrivatePayMaterialPrice(calculatorObj, data) || 0
                );
        }
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
        item?.collections?.forEach((val) => {
            if (val?.title == data?.lensType?.brand) {
                progressiveCategory = val?.category;
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
export const RenderAspheric = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "VBA")
    ) {
        return (parseFloat(GetVBAAsphericFee(data) || 0) || 0).toFixed(2);
    } else {
        return (
            parseFloat(GetPrivateVBAAsphericFee(calculatorObj, data) || 0) || 0
        ).toFixed(2);
    }
};

export const RenderBlueProtection = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "VBA")
    ) {
        return (parseFloat(GetVBABlueProtectionFee(data) || 0) || 0).toFixed(2);
    } else {
        return (
            parseFloat(
                GetPrivateVBABlueProtectionFee(calculatorObj, data) || 0
            ) || 0
        ).toFixed(2);
    }
};

export const RenderRollAndPolish = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "VBA")
    ) {
        return (parseFloat(GetVBARollAndPolishFee(data) || 0) || 0).toFixed(2);
    } else {
        return (
            parseFloat(
                GetPrivateVBARollAndPolishFee(calculatorObj, data) || 0
            ) || 0
        ).toFixed(2);
    }
};
export const RenderLicensedPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "VBA")
    ) {
        return (parseFloat(GetVBALicensedFee(data) || 0) || 0).toFixed(2);
    } else {
        return (
            parseFloat(GetPrivateVBALicensedFee(calculatorObj, data) || 0) || 0
        ).toFixed(2);
    }
};

export const RenderScratchedPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "VBA")
    ) {
        return (parseFloat(GetVBAScratchFee(data) || 0) || 0).toFixed(2);
    } else {
        return (
            parseFloat(GetPrivateVBAScratchFee(calculatorObj, data) || 0) || 0
        ).toFixed(2);
    }
};

export const RenderAdditionalLens = (data, calculatorObj, type) => {
    let total = 0;
    const currentPlan = data?.visionPlan;
    if (currentPlan === "Eyemed" && data?.isLensBenifit === "Yes") {
        switch (type) {
            case "Slab off":
                total = total + parseFloat(GetEyemedSlabOffFee(data));
                break;
            case "Speciality Lens":
                total = total + parseFloat(GetEyemedSpecialityLensFee(data));
                break;
            case "Polish":
                total = total + parseFloat(GetEyemedPolishFee(data));
                break;
        }
    } else if (
        currentPlan === "Davis Vision" &&
        data?.isLensBenifit === "Yes"
    ) {
        switch (type) {
            case "Slab off":
                total =
                    total + parseFloat(GetDavisSlabOffFee(data, calculatorObj));
                break;
            case "Speciality Lens":
                total =
                    total +
                    parseFloat(GetDavisSpecialityLensFee(data, calculatorObj));
                break;
            case "Polish":
                total =
                    total + parseFloat(GetDavisPolishFee(data, calculatorObj));
                break;
        }
    } else if (
        (currentPlan === "Eyemed" || currentPlan === "Davis Vision") &&
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        switch (type) {
            case "Slab off":
                total =
                    total +
                    parseFloat(GetPrivateSlabOffPrice(calculatorObj, data));
                break;
            case "Speciality Lens":
                total =
                    total +
                    parseFloat(
                        GetPrivateSpecialityLensPrice(calculatorObj, data)
                    );
                break;
            case "Speciality Lens":
                total =
                    total +
                    parseFloat(GetPrivatePolishPrice(calculatorObj, data));
                break;
        }
    }
    return (total || 0).toFixed(2);
};

export const RenderChemistrieClipPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "Spectra")
    ) {
        return (
            parseFloat(GetSpectraChemistrieClipFee(data) || 0) || 0
        ).toFixed(2);
    } else {
        return (
            parseFloat(
                getSpectraPrivateChemistrieClip(data, calculatorObj) || 0
            ) || 0
        ).toFixed(2);
    }
};

export const RenderEdgeCoatingPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "Spectra")
    ) {
        return (parseFloat(GetSpectraEdgeCoatingFee(data) || 0) || 0).toFixed(
            2
        );
    } else {
        return (
            parseFloat(
                getSpectraPrivateEdgeCoating(data, calculatorObj) || 0
            ) || 0
        ).toFixed(2);
    }
};

export const RenderLensOptionsPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "Spectra")
    ) {
        return (parseFloat(GetSpectraLensOptionsFee(data) || 0) || 0).toFixed(
            2
        );
    } else {
        return (
            parseFloat(
                getSpectraPrivateLensOptions(data, calculatorObj) || 0
            ) || 0
        ).toFixed(2);
    }
};
export const RenderOneYearWarrentyPrice = (data) => {
    return (parseFloat(GetSpectraScratechWarrentyFee(data) || 0) || 0).toFixed(
        2
    );
};

export const RenderOverSizeLensPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "Spectra")
    ) {
        return (
            parseFloat(GetSpectraOverSizeLensesFee(data) || 0) || 0
        ).toFixed(2);
    } else {
        return (
            parseFloat(
                getSpectraPrivateOverSizeLenses(data, calculatorObj) || 0
            ) || 0
        ).toFixed(2);
    }
};

export const RenderScratchCoatingPrice = (calculatorObj, data) => {
    if (
        CompareStrings(data?.isLensBenifit, "Yes") &&
        CompareStrings(data?.visionPlan, "Spectra")
    ) {
        return (
            parseFloat(GetSpectraScratchCoatingFee(data) || 0) || 0
        ).toFixed(2);
    } else {
        return (
            parseFloat(
                getSpectraPrivateScratchCoating(data, calculatorObj) || 0
            ) || 0
        ).toFixed(2);
    }
};
