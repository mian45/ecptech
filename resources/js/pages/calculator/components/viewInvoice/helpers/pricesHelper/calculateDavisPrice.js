import { BLENDED_BIFOCAL, RIMLESS_DRILL } from "../../../../data/constants";
import {
    GetEyemedFrameFee,
    GetPrivatePolishPrice,
    GetPrivateSlabOffPrice,
    GetPrivateSpecialityLensPrice,
} from "./calculateEyemedPrice";
import {
    GetPrivateAntireflectivePrice,
    GetPrivateLensFee,
    GetPrivatePayMaterialPrice,
    GetPrivatePhotochromicPrice,
    GetPrivateSunGlassesPrice,
    GetProtectionPlanPrice,
} from "./calculateOtherPlansPrices";
export const CalculateDavisPlansPrices = (
    data,
    calculatorObj,
    plansList,
    plansJson,
    davisMaterials
) => {
    let total = 0;
    // add material copay
    total = total + (parseFloat(data?.materialCopay || "") || 0);
    // add Frame Fee
    total =
        total + parseFloat(GetEyemedFrameFee(data, calculatorObj, plansJson));
    //add drill mount fee
    total = total + parseFloat(GetDavisDrillMountFee(data, plansJson));
    if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.yes
    ) {
        // add lens Prices
        total = total + parseFloat(GetDavisLensFee(data, calculatorObj));
        // add material Prices
        total = total + parseFloat(GetDavisMaterialFee(data, davisMaterials));
        // add photochromic price
        total =
            total + parseFloat(GetDavisPhotochromicFee(data, calculatorObj));
        // add sun glasses polarized price
        total = total + parseFloat(GetDavisPolarizedFee(data, calculatorObj));
        // add sun glasses tint price
        total = total + parseFloat(GetDavisTintFee(data, calculatorObj));
        // add sun glasses Mirror coating price
        total = total + parseFloat(GetDavisCoatingFee(data, calculatorObj));
        // add antireflective price
        total =
            total + parseFloat(GetDavisAntireflectiveFee(data, calculatorObj));
        // add blue light filtering price
        total = total + parseFloat(GetDavisBlueLightFee(data, calculatorObj));
        // add Slab off price
        total = total + parseFloat(GetDavisSlabOffFee(data, calculatorObj));
        // add Speciality Lens Price
        total =
            total + parseFloat(GetDavisSpecialityLensFee(data, calculatorObj));
        // add Polish Price
        total = total + parseFloat(GetDavisPolishFee(data));
    } else if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.no
    ) {
        // add lens Prices
        total = total + parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        // add material Prices
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
        //add blue light Price
        total =
            total + parseFloat(GetPrivateBlueLightPrice(calculatorObj, data));
        // add Slab off price
        total = total + parseFloat(GetPrivateSlabOffPrice(calculatorObj, data));
        // add Speciality Lens price
        total =
            total +
            parseFloat(GetPrivateSpecialityLensPrice(calculatorObj, data));
        // add Polish price
        total = total + parseFloat(GetPrivatePolishPrice(calculatorObj, data));
    }

    // add protection plan
    total = total + parseFloat(GetProtectionPlanPrice(data));
    return total;
};

export const GetDavisDrillMountFee = (data, plansJson) => {
    const newFrame =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.question;
    const drillMountYes =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.subQuestion
            ?.options?.yes;
    return data?.frameOrder?.type === newFrame &&
        data?.frameOrder?.drillMount === drillMountYes
        ? parseFloat(RIMLESS_DRILL || 0)
        : 0;
};
export const GetDavisLensFee = (data, calculatorObj) => {
    let price = 0;
    switch (data?.lensType?.type) {
        case "Single Vision":
        case "NVF":
            price = getPriceForLens(data, calculatorObj);
            break;
        case "Bifocal":
        case "Trifocal":
            price = getPriceForLens(data, calculatorObj) + BLENDED_BIFOCAL;
            break;
        case "PAL":
            price = getProgressiveLensPrice(data, calculatorObj);
            break;
    }
    return price;
};

const getPriceForLens = (data, calculatorObj) => {
    let price = 0;
    const lensType = calculatorObj?.lens_types?.find(
        (item) => item?.title === data?.lensType?.type
    );

    lensType?.brands?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.display_name) {
                if (val?.display_name == data?.lensType?.brand) {
                    price = val?.lense_price || 0;
                }
            } else {
                if (val?.title == data?.lensType?.brand) {
                    price = val?.lense_price || 0;
                }
            }
        });
    });
    return parseFloat(price || 0);
};
const getProgressiveLensPrice = (data, calculatorObj) => {
    const isStandardProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Standard Progressives"
    );
    const isPremiumProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Premium Progressives"
    );
    const isUltraProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Ultra Progressives"
    );
    const isUltimateProg = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Ultimate Progressives"
    );
    let progressiveCategory = "";
    const categoryBrands = calculatorObj?.lens_types.find(
        (item) => item?.title === data?.lensType?.type
    )?.brands;
    categoryBrands?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.display_name) {
                if (val?.display_name == data?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            } else {
                if (val?.title == data?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            }
        });
    });
    if (isStandardProg?.status && progressiveCategory === "Standard") {
        if (isStandardProg?.copayType === "$0 Copay") {
            return 0;
        } else if (
            isStandardProg?.copayType === "Lowered copay dollar amount"
        ) {
            return parseFloat(isStandardProg?.price || 0);
        }
    } else if (isPremiumProg?.status && progressiveCategory === "Premium") {
        if (isPremiumProg?.copayType === "$0 Copay") {
            return 0;
        } else if (isPremiumProg?.copayType === "Lowered copay dollar amount") {
            return parseFloat(isPremiumProg?.price || 0);
        }
    } else if (isUltraProg?.status && progressiveCategory === "Ultra") {
        if (isUltraProg?.copayType === "$0 Copay") {
            return 0;
        } else if (isUltraProg?.copayType === "Lowered copay dollar amount") {
            return parseFloat(isUltraProg?.price || 0);
        }
    } else if (isUltimateProg?.status && progressiveCategory === "Ultimate") {
        if (isUltimateProg?.copayType === "$0 Copay") {
            return 0;
        } else if (
            isUltimateProg?.copayType === "Lowered copay dollar amount"
        ) {
            return parseFloat(isUltimateProg?.price || 0);
        }
    } else {
        return parseFloat(getProgressiveLensPrice(data, calculatorObj) || 0);
    }
};
export const GetDavisMaterialFee = (data, davisMaterials) => {
    const isHighIndexActive = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "High Index"
    );
    if (
        isHighIndexActive?.status &&
        (data?.lensMaterial?.includes("Hi index") ||
            data?.lensMaterial?.includes("Hi Index"))
    ) {
        if (isHighIndexActive?.copayType === "$0 Copay") {
            return 0;
        } else if (
            isHighIndexActive?.copayType === "Lowered copay dollar amount"
        ) {
            return parseFloat(isHighIndexActive?.price || "") || 0;
        }
    } else {
        const price = davisMaterials?.find(
            (item) => item?.lens_material_title === data?.lensMaterial
        )?.price;
        return parseFloat(price || 0);
    }
};
export const GetDavisPhotochromicFee = (data, calculatorObj) => {
    let total = 0;
    if (data?.photochromics?.status === "Yes" && data?.photochromics?.type) {
        const isPhotochromicActive =
            data?.lowerCopaythanStandard?.copayList?.find(
                (item) => item?.type === "Photochromics"
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
            }
        } else {
            total =
                calculatorObj?.addons
                    ?.find((item) => item?.title === data?.visionPlan)
                    ?.addon_types?.find((val) => val?.title === "Photochromics")
                    ?.addons?.find(
                        (ele) => ele.title === data?.photochromics?.type
                    )?.addon_price || 0;
        }
    }
    return parseFloat(total || 0);
};

export const GetDavisPolarizedFee = (data, calculatorObj) => {
    const total =
        calculatorObj?.addons
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Sunglass Options")
            ?.addons?.find((ele) => ele.title === "Polarized")?.addon_price ||
        0;

    return data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType === "Polarized"
        ? parseFloat(total || 0)
        : 0;
};

export const GetDavisTintFee = (data, calculatorObj) => {
    let total = 0;
    if (
        data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType === "Tint" &&
        data?.sunGlassesLens?.tintType === "Solid Tint"
    ) {
        total =
            calculatorObj?.addons
                ?.find((item) => item?.title === data?.visionPlan)
                ?.addon_types?.find((val) => val?.title === "Sunglass Options")
                ?.addons?.find((ele) => ele?.title === "Solid Tint")
                ?.addon_price || 0;
    } else if (
        data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType === "Tint" &&
        data?.sunGlassesLens?.tintType === "Gradient Tint"
    ) {
        total =
            calculatorObj?.addons
                ?.find((item) => item?.title === data?.visionPlan)
                ?.addon_types?.find((val) => val?.title === "Sunglass Options")
                ?.addons?.find((ele) => ele?.title === "Gradient Tint")
                ?.addon_price || 0;
    }

    return parseFloat(total || 0);
};
export const GetDavisCoatingFee = (data, calculatorObj) => {
    let total = 0;
    if (
        data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType &&
        data?.sunGlassesLens?.mirrorCoating === "Yes" &&
        data?.sunGlassesLens?.coatingType === "Ski Type Mirror"
    ) {
        total =
            calculatorObj?.addons
                ?.find((item) => item?.title === data?.visionPlan)
                ?.addon_types?.find((val) => val?.title === "Sunglass Options")
                ?.addons?.find((ele) => ele?.title === "Ski Type Mirror")
                ?.addon_price || 0;
    } else if (
        data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType &&
        data?.sunGlassesLens?.mirrorCoating === "Yes" &&
        data?.sunGlassesLens?.coatingType === "Solid/Single Gradient Mirror"
    ) {
        total =
            calculatorObj?.addons
                ?.find((item) => item?.title === data?.visionPlan)
                ?.addon_types?.find((val) => val?.title === "Sunglass Options")
                ?.addons?.find(
                    (ele) => ele?.title === "Solid/Single Gradient Mirror"
                )?.addon_price || 0;
    }

    return parseFloat(total || 0);
};
export const GetDavisAntireflectiveFee = (data, calculatorObj) => {
    const isStandardAnti = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Standard Anti-Reflective Properties"
    );
    const isPremiumAnti = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Premium Anti-Reflective Properties"
    );
    const isUltraAnti = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Ultra Anti-Reflective Properties"
    );
    const isUltimateAnti = data?.lowerCopaythanStandard?.copayList?.find(
        (item) => item?.type === "Ultimate Anti-Reflective Properties"
    );
    const antiCategory = calculatorObj?.addons
        ?.find((item) => item?.title === data?.visionPlan)
        ?.addon_types?.find(
            (val) => val?.title === "Anti-Reflective Properties"
        )
        ?.addons?.find(
            (ele) => ele?.title === data?.antiReflectiveProperties?.type
        )?.category;
    if (
        data?.antiReflectiveProperties?.status === "Yes" &&
        data?.antiReflectiveProperties?.type
    ) {
        if (isStandardAnti?.status && antiCategory === "Standard") {
            if (isStandardAnti?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isStandardAnti?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isStandardAnti?.price || 0);
            }
        } else if (isPremiumAnti?.status && antiCategory === "Premium") {
            if (isPremiumAnti?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isPremiumAnti?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isPremiumAnti?.price || 0);
            }
        } else if (isUltraAnti?.status && antiCategory === "Ultra") {
            if (isUltraAnti?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isUltraAnti?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isUltraAnti?.price || 0);
            }
        } else if (isUltimateAnti?.status && antiCategory === "Ultimate") {
            if (isUltimateAnti?.copayType === "$0 Copay") {
                return 0;
            } else if (
                isUltimateAnti?.copayType === "Lowered copay dollar amount"
            ) {
                return parseFloat(isUltimateAnti?.price || 0);
            }
        } else {
            const antiPrice =
                calculatorObj?.addons
                    ?.find((item) => item?.title === data?.visionPlan)
                    ?.addon_types?.find(
                        (val) => val?.title === "Anti-Reflective Properties"
                    )
                    ?.addons?.find(
                        (ele) =>
                            ele?.title === data?.antiReflectiveProperties?.type
                    )?.addon_price || 0;
            return parseFloat(antiPrice || 0);
        }
    } else {
        return 0;
    }
};
export const GetDavisBlueLightFee = (data, calculatorObj) => {
    const total =
        calculatorObj?.addons
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Blue Light Filtering")
            ?.addons?.find((ele) => ele?.title === "Blue Light Filtering")
            ?.addon_price || 0;

    return data?.blueLight === "Yes" ? parseFloat(total || 0) : 0;
};
export const GetDavisSlabOffFee = (data, calculatorObj) => {
    const total =
        calculatorObj?.additional_lense_setting
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Slab Off")
            ?.addons?.find((ele) => ele?.title === "Slab Off")?.addon_price ||
        0;

    return data?.slabOff?.status === "Yes" ? parseFloat(total || 0) : 0;
};
export const GetDavisSpecialityLensFee = (data, calculatorObj) => {
    const total =
        calculatorObj?.additional_lense_setting
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Speciality Lens")
            ?.addons?.find((ele) => ele?.title === "Speciality Lens")
            ?.addon_price || 0;

    return data?.specialtyLens?.status === "Yes" ? parseFloat(total || 0) : 0;
};
export const GetDavisPolishFee = (data, calculatorObj) => {
    const total =
        calculatorObj?.additional_lense_setting
            ?.find((item) => item?.title === data?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Polish")
            ?.addons?.find((ele) => ele?.title === data?.polish?.type)
            ?.addon_price || 0;

    return data?.polish?.status === "Yes" && data?.polish?.type
        ? parseFloat(total || 0)
        : 0;
};
export const GetPrivateBlueLightPrice = (calculatorObj, data) => {
    const total = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Blue Light Filtering")
        ?.addons?.find((item) => item?.title === "Blue Light Filtering")?.price;

    return data?.blueLight === "Yes" ? parseFloat(total || 0) : 0;
};

export const RenderBlueLight = (calculatorObj, data) => {
    if (
        data?.isLensBenifit === "Only multiple pair benefit only at this time"
    ) {
        return parseFloat(GetPrivateBlueLightPrice(calculatorObj, data));
    } else if (data?.isLensBenifit === "Yes") {
        return parseFloat(GetDavisBlueLightFee(data, calculatorObj));
    }
};
