import {
    DRILL_MOUNT,
    GRADIENT_TINT,
    POLARIZED,
    SENSITY_PHOTOCHROMIC,
    SKI_TYPE_MIRROR,
    SOLID_SINGLE_GRADIENT,
    SOLID_TINT,
    SUNSYNC_DRIVEXT,
    SUNSYNC_ELITE_XT,
    TRANSITION_SIGNATURE,
    TRANSITION_VANTAGE,
    TRANSITION_XTRACTION,
    ZEISS_PHOTOFUSION,
} from "../../../../data/constants";

export const CalculateOtherPlansPrices = (
    data,
    calculatorObj,
    lensPrices,
    isPrivate = false
) => {
    let total = 0;
    // add material copay
    total = total + (parseFloat(data?.materialCopay || "") || 0);
    // add Frame Fee
    total = total + parseFloat(GetFrameFee(data, isPrivate));
    if (data?.isLensBenifit === "Yes") {
        // add lens Prices
        total = total + parseFloat(GetLensFee(data, calculatorObj, lensPrices));
        // add photochromic price
        total = total + parseFloat(GetPhotochromicPrice(data));
        // add sun glasses price
        total = total + parseFloat(GetSunGlassesPrice(data));
        // add antireflective price
        total = total + parseFloat(GetAntireflectivePrice(data));
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        // add lens Prices
        total = total + parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        total =
            total +
            parseFloat(GetPrivatePayMaterialPrice(calculatorObj, data) || 0);
        // add photochromic price
        total =
            total +
            parseFloat(
                GetPrivatePhotochromicPrice(
                    data?.photochromics?.type,
                    calculatorObj,
                    data
                )
            );
        // add sun glasses price
        total =
            total + parseFloat(GetPrivateSunGlassesPrice(calculatorObj, data));
        // add antireflective price
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

    // add protection plan
    total = total + parseFloat(GetProtectionPlanPrice(data));
    return total;
};

export const GetFrameFee = (data, isPrivate) => {
    let total = 0;
    const retailFee = parseFloat(data?.frameOrder?.retailFee || "");
    const frameContribution = parseFloat(
        data?.frameOrder?.frameContribution || ""
    );
    if (
        isPrivate ||
        data?.isFrameBenifit === "Only multiple pair benefit only at this time"
    ) {
        if (data?.frameOrder?.type === "New Frame Purchase") {
            total = retailFee;
            if (data?.frameOrder?.drillMount === "Yes") {
                total = total + DRILL_MOUNT;
            }
        }
    } else if (data?.isFrameBenifit === "Yes") {
        if (data?.frameOrder?.type === "New Frame Purchase") {
            if (retailFee <= frameContribution) {
                total = total + 0;
            } else if (retailFee > frameContribution) {
                const actualPrice = retailFee - frameContribution;
                const discount = actualPrice * 0.2;
                const payableFramePrice = actualPrice - discount;
                total = total + (payableFramePrice || 0);
            }
            if (data?.frameOrder?.drillMount === "Yes") {
                total = total + DRILL_MOUNT;
            }
        }
    }
    return total;
};

const GetPhotochromicPrice = (data) => {
    let total = 0;
    if (data?.photochromics?.status === "Yes") {
        const isPhotochromicActive =
            data?.lowerCopaythanStandard?.copayList?.find(
                (item) => item?.type === "Photochromic"
            );
        if (isPhotochromicActive?.status) {
            if (isPhotochromicActive?.copayType === "$0 Copay") {
                total = total + 0;
            } else if (
                isPhotochromicActive?.copayType ===
                "Lowered copay dollar amount"
            ) {
                total =
                    total +
                    (parseFloat(isPhotochromicActive?.price || "") || 0);
            } else {
                total = total + 0;
            }
        } else {
            const price = parseFloat(
                getPriceByPhotochromicMaterial(
                    data?.visionPlan,
                    data?.photochromics?.type
                ) || 0
            );
            total = total + (price || 0);
        }
    }
    return total;
};

export const getPriceByPhotochromicMaterial = (plan, value) => {
    if (plan === "VSP Signature" || plan === "VSP Advantage") {
        return getSignaturePhotochromic(value);
    } else if (plan === "VSP Choice") {
        return 75;
    }
};
const getSignaturePhotochromic = (value) => {
    switch (value) {
        case "Transition Signature":
            return TRANSITION_SIGNATURE;
        case "Transition XTRActive":
            return TRANSITION_XTRACTION;
        case "SunSync / Drive XT":
            return SUNSYNC_DRIVEXT;
        case "SunSync Elite / Elite XT":
            return SUNSYNC_ELITE_XT;
        case "Sensity Photochromic":
            return SENSITY_PHOTOCHROMIC;
        case "ZEISS Photofusion":
            return ZEISS_PHOTOFUSION;
        case "Transition Vantage":
            return TRANSITION_VANTAGE;
    }
};

const GetAntireflectivePrice = (data) => {
    let total = 0;
    if (data?.antiReflectiveProperties?.status === "Yes") {
        const isAntireflectiveActive =
            data?.lowerCopaythanStandard?.copayList?.find(
                (item) => item?.type === "Anti-Reflective Properties"
            );
        if (isAntireflectiveActive?.status) {
            if (isAntireflectiveActive?.copayType === "$0 Copay") {
                total = total + 0;
            } else if (
                isAntireflectiveActive?.copayType ===
                "Lowered copay dollar amount"
            ) {
                total =
                    total +
                    (parseFloat(isAntireflectiveActive?.price || "") || 0);
            }
        } else {
            const price = parseFloat(
                getPriceByAntireflective(
                    data?.visionPlan,
                    data?.antiReflectiveProperties?.type
                ) || 0
            );
            total = total + (price || 0);
        }
    }
    return total;
};

export const getPriceByAntireflective = (plan, value) => {
    if (plan === "VSP Signature") {
        return getSignatureAntireflective(value);
    } else if (plan === "VSP Choice" || plan === "VSP Advantage") {
        return getChoiceAntireflective(value);
    }
};
const getChoiceAntireflective = (value) => {
    switch (value) {
        case "Glacier Plus":
        case "Crizal Sapphire 360 UV":
        case "Crizal Avance UV":
        case "Crizal Rock":
        case "Crizal Sunshield":
        case "DuraVision BlueProtect UV":
        case "DuraVision Platinum UV":
        case "DuraVision Sun UV":
        case "Kodak Clean&CleAR":
        case "Kodak Clean&CleAR UV":
        case "Kodak Clean&CleAR with Silk":
        case "Kodak Clean&CleAR UV with Silk":
        case "Kodak Total Blue":
        case "Maui Jim AR":
            return 85;
        case "Crizal Alize UV":
        case "DuraVision Silver UV":
        case "HiVision with ViewProtect":
        case "Kodak CleAR":
            return 69;
        case "Crizal Prevencia":
        case "DuraVision Chrome":
        case "Crizal Easy UV":
            return 58;
        case "Crizal UV Kids":
            return 41;
    }
};
const getSignatureAntireflective = (value) => {
    switch (value) {
        case "Glacier Plus":
        case "Crizal Sapphire 360 UV":
        case "Crizal Avance UV":
        case "Crizal Rock":
        case "Crizal Sunshield":
        case "DuraVision BlueProtect UV":
        case "DuraVision Platinum UV":
        case "DuraVision Sun UV":
        case "Kodak Clean&CleAR":
        case "Kodak Clean&CleAR UV":
        case "Kodak Clean&CleAR with Silk":
        case "Kodak Clean&CleAR UV with Silk":
        case "Kodak Total Blue":
        case "Maui Jim AR":
            return 75;
        case "Crizal Alize UV":
        case "DuraVision Silver UV":
        case "HiVision with ViewProtect":
        case "Kodak CleAR":
            return 61;
        case "Crizal Prevencia":
        case "DuraVision Chrome":
        case "Crizal Easy UV":
            return 51;
        case "Crizal UV Kids":
            return 37;
    }
};

const GetSunGlassesPrice = (data) => {
    let total = 0;
    if (data?.sunGlassesLens?.status === "Yes") {
        if (data?.sunGlassesLens?.lensType === "Polarized") {
            total = POLARIZED;
            total = total + parseFloat(getMirrorCoating(data) || 0);
        } else if (data?.sunGlassesLens?.lensType === "Tint") {
            if (data?.sunGlassesLens?.tintType === "Solid Tint") {
                total = total + SOLID_TINT;
            } else {
                total = total + GRADIENT_TINT;
            }
            total = total + parseFloat(getMirrorCoating(data) || 0);
        }
    }

    return parseFloat(total);
};
const getMirrorCoating = (data) => {
    let total = 0;
    if (data?.sunGlassesLens?.mirrorCoating === "Yes") {
        if (data?.sunGlassesLens?.coatingType === "Ski Type Mirror") {
            total = SKI_TYPE_MIRROR;
        } else {
            total = SOLID_SINGLE_GRADIENT;
        }
    }
    return total;
};
const GetProtectionPlanPrice = (data) => {
    let total = 0;
    if (
        data?.protectionPlan?.status === "Yes" &&
        data?.protectionPlan?.paymentStatus === "Paid"
    ) {
        total = parseFloat(data?.protectionPlan?.price || "") || 0;
    }
    return total;
};
const getLensByLowerCopay = (data, calculatorObj, lensPrices) => {
    const lensPrice = parseFloat(
        getPriceFromDB(data, calculatorObj, lensPrices)?.lensPrice || 0
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
    if (data?.lensType?.type === "PAL") {
        if (isCustomProg?.status && progressiveCategory === "Custom") {
            if (isCustomProg?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isCustomProg?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isCustomProg?.price || "");
            }
        } else if (isPremiumProg?.status && progressiveCategory === "Premium") {
            if (isPremiumProg?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isPremiumProg?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isPremiumProg?.price || "");
            }
        } else if (
            isStandardProg?.status &&
            progressiveCategory === "Standard"
        ) {
            if (isStandardProg?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isStandardProg?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isStandardProg?.price || "");
            }
        } else {
            return lensPrice;
        }
    } else {
        return lensPrice;
    }
};

const getMaterialByLowerCopay = (data, calculatorObj, lensPrices) => {
    const materialPrice = parseFloat(
        getPriceFromDB(data, calculatorObj, lensPrices)?.materialPrice || 0
    );
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
                    return 0;
                } else if (
                    isPholicarbinateActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    return parseFloat(isPholicarbinateActive?.price || "") || 0;
                }
            } else {
                return materialPrice;
            }
        } else {
            const isHighIndexActive =
                data?.lowerCopaythanStandard?.copayList?.find(
                    (item) => item?.type === "High Index"
                );
            if (isHighIndexActive?.status) {
                if (isHighIndexActive?.copayType === "$0 Copay") {
                    return 0;
                } else if (
                    isHighIndexActive?.copayType ===
                    "Lowered copay dollar amount"
                ) {
                    return parseFloat(isHighIndexActive?.price || "") || 0;
                } else {
                    return materialPrice;
                }
            } else {
                return parseFloat(materialPrice);
            }
        }
    } else {
        return materialPrice;
    }
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
                        return parseFloat(
                            getLensByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        );
                    } else if (
                        isPholicarbinateActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (parseFloat(isPholicarbinateActive?.price || "") ||
                                0) +
                            parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            )
                        );
                    }
                } else {
                    return (
                        getLensByLowerCopay(data, calculatorObj, lensPrices) +
                        materialPrice
                    );
                }
            } else {
                const isHighIndexActive =
                    data?.lowerCopaythanStandard?.copayList?.find(
                        (item) => item?.type === "High Index"
                    );
                if (isHighIndexActive?.status) {
                    if (isHighIndexActive?.copayType === "$0 Copay") {
                        return parseFloat(
                            getLensByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        );
                    } else if (
                        isHighIndexActive?.copayType ===
                        "Lowered copay dollar amount"
                    ) {
                        return (
                            (parseFloat(isHighIndexActive?.price || "") || 0) +
                            parseFloat(
                                getLensByLowerCopay(
                                    data,
                                    calculatorObj,
                                    lensPrices
                                ) || 0
                            )
                        );
                    }
                } else {
                    return (
                        parseFloat(
                            getLensByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        ) + materialPrice
                    );
                }
            }
        } else if (data?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    return parseFloat(
                        getMaterialByLowerCopay(
                            data,
                            calculatorObj,
                            lensPrices
                        ) || 0
                    );
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return (
                        parseFloat(isCustomProg?.price || "") +
                        parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        )
                    );
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    return parseFloat(
                        getMaterialByLowerCopay(
                            data,
                            calculatorObj,
                            lensPrices
                        ) || 0
                    );
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return (
                        parseFloat(isPremiumProg?.price || "") +
                        parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        )
                    );
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    return parseFloat(
                        getMaterialByLowerCopay(
                            data,
                            calculatorObj,
                            lensPrices
                        ) || 0
                    );
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    return (
                        parseFloat(isStandardProg?.price || "") +
                        parseFloat(
                            getMaterialByLowerCopay(
                                data,
                                calculatorObj,
                                lensPrices
                            ) || 0
                        )
                    );
                }
            } else {
                return (
                    lensPrice +
                    getMaterialByLowerCopay(data, calculatorObj, lensPrices)
                );
            }
        } else {
            return lensPrice + materialPrice;
        }
    } else {
        return 0;
    }
};

export const getPriceFromDB = (data, calculatorObj, lensPrices) => {
    if (data.visionPlan === "VSP Advantage") {
        return getAdvantagePricesFromDB(data, calculatorObj, lensPrices);
    } else {
        let lensPrice = 0;
        let materialPrice = 0;
        const materials =
            lensPrices?.lenses_price &&
            lensPrices?.lenses_price[0]?.lenses?.filter(
                (item) => item?.lens_material_title === data?.lensMaterial
            );
        console.log("materials", materials);
        if (!materials || materials?.length <= 0) {
            return {
                lensPrice: 0,
                materialPrice: 0,
            };
        } else if (materials[0]?.characteristics?.length === 1) {
            if ((materials[0]?.characteristics[0]?.price || "")?.trim()) {
                if (materials[0]?.characteristics[0]?.type !== "add-on") {
                    lensPrice = parseFloat(
                        (
                            materials[0]?.characteristics[0]?.price || ""
                        )?.trim() || ""
                    );
                }
            }
            return {
                lensPrice: lensPrice,
                materialPrice: 0,
            };
        } else {
            const characteristicsList = materials[0]?.characteristics || [];
            const baseCharecterstics = characteristicsList?.filter(
                (item) => item?.type !== "add-on"
            );
            const TACharecterstics = characteristicsList?.filter(
                (item) => item?.name === "TA"
            );
            if ((baseCharecterstics[0]?.price || "")?.trim()) {
                lensPrice = parseFloat(
                    (baseCharecterstics[0]?.price || "")?.trim() || ""
                );
            }
            baseCharecterstics.splice(0, 1);

            const restBases = [...baseCharecterstics, ...TACharecterstics];
            restBases.forEach((item) => {
                if ((item?.price || "")?.trim()) {
                    materialPrice =
                        materialPrice +
                        parseFloat((item?.price || "")?.trim() || "");
                }
            });
            return {
                lensPrice: lensPrice,
                materialPrice: materialPrice,
            };
        }
    }
};
export const GetPrivateLensFee = (calculatorObj, data) => {
    let price = 0;
    if (calculatorObj?.lens_types) {
        const currentPlan = calculatorObj?.lens_types?.find(
            (val) => val?.title === data?.lensType?.type
        );
        currentPlan?.brands?.forEach((item) => {
            item.collections?.forEach((val) => {
                if (val?.display_name) {
                    if (val.display_name == data?.lensType?.brand) {
                        if (!val?.price) {
                            price = 0;
                        } else {
                            price = parseFloat(val?.price || 0) || 0;
                        }
                    }
                } else {
                    if (val.title == data?.lensType?.brand) {
                        if (!val?.price) {
                            price = 0;
                        } else {
                            price = parseFloat(val?.price || 0) || 0;
                        }
                    }
                }
            });
        });
    }
    return parseFloat(price || 0);
};

export const GetPrivatePayMaterialPrice = (calculatorObj, data) => {
    let price = 0;
    const material = calculatorObj?.lens_material?.find(
        (material) => material?.lens_material_title === data?.lensMaterial
    );
    if (!material?.retail_price) {
        price = 0;
    } else {
        price = parseFloat(material?.retail_price || 0) || 0;
    }

    return parseFloat(price || 0);
};

export const GetPrivatePhotochromicPrice = (value, calculatorObj, data) => {
    const photochromicAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "Photochromic"
    );
    if (data?.photochromics?.status === "Yes") {
        const selectedPhotochromic = photochromicAddons?.addons?.find(
            (item) => item.title === value
        )?.price;
        return parseFloat(selectedPhotochromic || 0) || 0;
    }
    return 0;
};
const GetPrivateSunGlassesPrice = (calculatorObj, data) => {
    const glassesAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "SunGlasses"
    );
    let total = 0;
    if (data?.sunGlassesLens?.status === "Yes") {
        if (data?.sunGlassesLens?.lensType === "Polarized") {
            const polirizedPrice = glassesAddons?.addons?.find(
                (item) => item.title === "Polarized"
            )?.price;

            total = total + parseFloat(polirizedPrice || 0) || 0;
            total =
                total +
                    parseFloat(
                        GetPrivateMirrorCoating(glassesAddons, data) || 0
                    ) || 0;
        }
    } else if (data?.sunGlassesLens?.lensType === "Tint") {
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
        total =
            total +
                parseFloat(GetPrivateMirrorCoating(glassesAddons, data) || 0) ||
            0;
    }
    return total;
};

const GetPrivateMirrorCoating = (glassesAddons, data) => {
    let total = 0;
    if (data?.sunGlassesLens?.mirrorCoating === "Yes") {
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
    return total;
};

export const GetPrivateAntireflectivePrice = (calculatorObj, value, data) => {
    const antiReflectiveAddons = calculatorObj?.addons?.find(
        (item) => item?.title === "Anti Reflective"
    );
    let total = 0;
    if (data?.antiReflectiveProperties?.status === "Yes") {
        const selectedAntireflective =
            antiReflectiveAddons?.addons?.find((item) => item?.title === value)
                ?.price || 0;
        total = total + parseFloat(selectedAntireflective || 0) || 0;
    }
    return total;
};
const getAdvantagePricesFromDB = (data, calculatorObj, lensPrices) => {
    let lensPrice = 0;
    let materialPrice = 0;
    const materials =
        lensPrices?.lenses_price &&
        lensPrices?.lenses_price[0]?.lenses?.filter(
            (item) => item?.lens_material_title === data?.lensMaterial
        );
    console.log("materials", materials);
    if (!materials || materials?.length <= 0) {
        return {
            lensPrice: 0,
            materialPrice: 0,
        };
    } else if (materials[0]?.characteristics?.length === 1) {
        if (
            (materials[0]?.characteristics[0]?.price || "")?.trim() ||
            (materials[0]?.characteristics[0]?.price_formula || "")?.trim()
        ) {
            if (materials[0]?.characteristics[0]?.type !== "add-on") {
                const price = materials[0]?.characteristics[0]?.price;
                if (price) {
                    lensPrice = parseFloat(
                        (
                            materials[0]?.characteristics[0]?.price || ""
                        )?.trim() || ""
                    );
                } else {
                    const formula =
                        materials[0]?.characteristics[0]?.price_formula;
                    if (formula) {
                        if ((formula || "")?.trim() === "80% of U&C") {
                            lensPrice =
                                parseFloat(
                                    GetPrivateLensFee(calculatorObj, data) || 0
                                ) * 0.8;
                        } else if ((formula || "")?.trim().includes("+")) {
                            if (
                                (formula || "")?.trim().includes("80% of U&C")
                            ) {
                                const secondIndex = formula
                                    ?.split("+")[1]
                                    ?.trim();
                                if (secondIndex === "80% of U&C") {
                                    const value1 = formula
                                        ?.split("+")[0]
                                        ?.trim();
                                    const value2 =
                                        parseFloat(
                                            GetPrivateLensFee(
                                                calculatorObj,
                                                data
                                            ) || 0
                                        ) * 0.8;
                                    lensPrice =
                                        parseFloat(value1 || 0) +
                                        parseFloat(value2 || 0);
                                } else if (secondIndex === "80% of U&C^3") {
                                    const value1 = formula
                                        ?.split("+")[0]
                                        ?.trim();
                                    const value2 =
                                        parseFloat(
                                            GetPrivateLensFee(
                                                calculatorObj,
                                                data
                                            ) || 0
                                        ) * 0.8;
                                    lensPrice =
                                        parseFloat(value1 || 0) +
                                        parseFloat(value2 || 0) *
                                            parseFloat(value2 || 0) *
                                            parseFloat(value2 || 0);
                                }
                            } else {
                                const value1 = formula?.split("+")[0]?.trim();
                                const value2 = formula?.split("+")[1]?.trim();
                                lensPrice =
                                    parseFloat(value1 || 0) +
                                    parseFloat(value2 || 0);
                            }
                        }
                    } else {
                        lensPrice = 0;
                    }
                }
            }
        }
        return {
            lensPrice: lensPrice,
            materialPrice: 0,
        };
    } else {
        const characteristicsList = materials[0]?.characteristics || [];
        const baseCharecterstics = characteristicsList?.filter(
            (item) => item?.type !== "add-on"
        );
        const TACharecterstics = characteristicsList?.filter(
            (item) => item?.name === "TA"
        );
        if ((baseCharecterstics[0]?.price || "")?.trim()) {
            lensPrice = parseFloat(
                (baseCharecterstics[0]?.price || "")?.trim() || ""
            );
        } else {
            const formula = baseCharecterstics[0]?.price_formula;
            if (formula) {
                if ((formula || "")?.trim() === "80% of U&C") {
                    lensPrice =
                        parseFloat(
                            GetPrivateLensFee(calculatorObj, data) || 0
                        ) * 0.8;
                } else if ((formula || "")?.trim().includes("+")) {
                    if ((formula || "")?.trim().includes("80% of U&C")) {
                        const secondIndex = formula?.split("+")[1]?.trim();
                        if (secondIndex === "80% of U&C") {
                            const value1 = formula?.split("+")[0]?.trim();
                            const value2 =
                                parseFloat(
                                    GetPrivateLensFee(calculatorObj, data) || 0
                                ) * 0.8;
                            lensPrice =
                                parseFloat(value1 || 0) +
                                parseFloat(value2 || 0);
                        } else if (secondIndex === "80% of U&C^3") {
                            const value1 = formula?.split("+")[0]?.trim();
                            const value2 =
                                parseFloat(
                                    GetPrivateLensFee(calculatorObj, data) || 0
                                ) * 0.8;
                            lensPrice =
                                parseFloat(value1 || 0) +
                                parseFloat(value2 || 0) *
                                    parseFloat(value2 || 0) *
                                    parseFloat(value2 || 0);
                        }
                    } else {
                        const value1 = formula?.split("+")[0]?.trim();
                        const value2 = formula?.split("+")[1]?.trim();
                        lensPrice =
                            parseFloat(value1 || 0) + parseFloat(value2 || 0);
                    }
                }
            } else {
                lensPrice = 0;
            }
        }
        baseCharecterstics.splice(0, 1);

        const restBases = [...baseCharecterstics, ...TACharecterstics];
        restBases.forEach((item) => {
            if ((item?.price || "")?.trim()) {
                materialPrice =
                    materialPrice +
                    parseFloat((item?.price || "")?.trim() || "");
            } else {
                const formula = item?.price_formula;
                if (formula) {
                    if ((formula || "")?.trim() === "80% of U&C") {
                        materialPrice =
                            materialPrice +
                            parseFloat(
                                GetPrivatePayMaterialPrice(
                                    calculatorObj,
                                    data
                                ) || 0
                            ) *
                                0.8;
                    } else if ((formula || "")?.trim().includes("+")) {
                        if ((formula || "")?.trim().includes("80% of U&C")) {
                            const secondIndex = formula?.split("+")[1]?.trim();
                            if (secondIndex === "80% of U&C") {
                                const value1 = formula?.split("+")[0]?.trim();
                                const value2 =
                                    parseFloat(
                                        GetPrivatePayMaterialPrice(
                                            calculatorObj,
                                            data
                                        ) || 0
                                    ) * 0.8;
                                materialPrice =
                                    materialPrice +
                                    parseFloat(value1 || 0) +
                                    parseFloat(value2 || 0);
                            } else if (secondIndex === "80% of U&C^3") {
                                const value1 = formula?.split("+")[0]?.trim();
                                const value2 =
                                    parseFloat(
                                        GetPrivatePayMaterialPrice(
                                            calculatorObj,
                                            data
                                        ) || 0
                                    ) * 0.8;
                                materialPrice =
                                    materialPrice +
                                    parseFloat(value1 || 0) +
                                    parseFloat(value2 || 0) *
                                        parseFloat(value2 || 0) *
                                        parseFloat(value2 || 0);
                            }
                        } else {
                            const value1 = formula?.split("+")[0]?.trim();
                            const value2 = formula?.split("+")[1]?.trim();
                            materialPrice =
                                materialPrice +
                                parseFloat(value1 || 0) +
                                parseFloat(value2 || 0);
                        }
                    }
                } else {
                    materialPrice = materialPrice + 0;
                }
            }
        });
        return {
            lensPrice: lensPrice,
            materialPrice: materialPrice,
        };
    }
};

export const GetFrameRetailFee = (calculatorObj, data) => {
    let total = 0;
    total = total + GetPrivateLensFee(calculatorObj, data);
    total = total + GetPrivatePayMaterialPrice(calculatorObj, data);
    if (data?.photochromics?.status === "Yes") {
        total =
            total +
            GetPrivatePhotochromicPrice(
                data?.photochromics?.type,
                calculatorObj,
                data
            );
    }
    if (data?.antiReflectiveProperties?.status === "Yes") {
        total =
            total +
            GetPrivateAntireflectivePrice(
                calculatorObj,
                data?.antiReflectiveProperties?.type,
                data
            );
    }
    total = total + GetPrivateSunGlassesPrice(calculatorObj, data);
    return total;
};

export const calculateLensesCopaysFee = (
    data,
    calculatorObj,
    lensPrices,
    isPrivate
) => {
    let total = 0;
    if (data?.isLensBenifit === "Yes") {
        // add lens Prices
        total = total + parseFloat(GetLensFee(data, calculatorObj, lensPrices));
        // add photochromic price
        total = total + parseFloat(GetPhotochromicPrice(data));
        // add sun glasses price
        total = total + parseFloat(GetSunGlassesPrice(data));
        // add antireflective price
        total = total + parseFloat(GetAntireflectivePrice(data));
    } else if (
        isPrivate ||
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        // add lens Prices
        total = total + parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        total =
            total +
            parseFloat(GetPrivatePayMaterialPrice(calculatorObj, data) || 0);
        // add photochromic price
        total =
            total +
            parseFloat(
                GetPrivatePhotochromicPrice(
                    data?.photochromics?.type,
                    calculatorObj,
                    data
                )
            );
        // add sun glasses price
        total =
            total + parseFloat(GetPrivateSunGlassesPrice(calculatorObj, data));
        // add antireflective price
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
    return total;
};
