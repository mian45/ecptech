import { CompareStrings } from "../../../../../../utils/utils";
import { PriceConstants } from "../../../../data/constants";
import { GetEyemedFrameFee } from "./calculateEyemedPrice";
import {
    GetPrivatePhotochromicPrice,
    GetProtectionPlanPrice,
} from "./calculateOtherPlansPrices";

export const CalculateVBAPlansPrices = (
    data,
    calculatorObj,
    plansList,
    plansJson
) => {
    let total = 0;
    // add material copay
    total = total + (parseFloat(data?.materialCopay || "") || 0);
    // add Frame Fee
    total =
        total + parseFloat(GetEyemedFrameFee(data, calculatorObj, plansJson));
    //add drill mount fee
    total = total + parseFloat(GetVBADrillMountFee(data, plansJson));
    if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.yes
    ) {
        // add lens Prices
        total = total + parseFloat(GetVBALensFee(data, calculatorObj));
        // add material Prices
        total = total + parseFloat(GetVBAMaterialFee(data, calculatorObj));
        // add photochromic price
        total = total + parseFloat(GetVBAPhotochromicFee(data));
        // add sun glasses polarized price
        total = total + parseFloat(GetVBAPolarizedFee(data));
        // add sun glasses tint price
        total = total + parseFloat(GetVBATintFee(data));
        // add sun glasses Mirror coating price
        total = total + parseFloat(GetVBACoatingFee(data));
        // add sun glasses UV Protection price
        total = total + parseFloat(GetVBAUVProtectionFee(data));
        // add antireflective price
        total = total + parseFloat(GetVBAAntireflectiveFee(data));
        // add Aspheric price
        total = total + parseFloat(GetVBAAsphericFee(data));
        // add Blue Protection price
        total = total + parseFloat(GetVBABlueProtectionFee(data));
        // add Roll and Polish price
        total = total + parseFloat(GetVBARollAndPolishFee(data));
        // add Licensed Speciality price
        total = total + parseFloat(GetVBALicensedFee(data));
        // add Scratch Resistant Coatings price
        total = total + parseFloat(GetVBAScratchFee(data));
    } else if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.no
    ) {
        // add lens Prices
        total =
            total + parseFloat(GetPrivateVBALensFee(data, calculatorObj) || 0);
        // add material Prices
        total =
            total +
            parseFloat(GetPrivatePayVBAMaterialPrice(data, calculatorObj) || 0);
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
        //// add polarized
        total =
            total + parseFloat(GetPrivatePolarizedPrice(calculatorObj, data));
        //// add Tint
        total = total + parseFloat(GetPrivateTintPrice(calculatorObj, data));
        //// add Mirror Coating
        total =
            total +
            parseFloat(GetPrivateMirrorCoatingPrice(calculatorObj, data));
        /// add sun glasses UV Protection price
        total = total + parseFloat(GetVBAUVProtectionFee(data));

        // add antireflective price
        total =
            total +
            parseFloat(
                GetVBAPrivateAntireflectivePrice(
                    calculatorObj,
                    data?.antiReflectiveProperties?.type,
                    data
                )
            );

        // add Aspheric price
        total =
            total + parseFloat(GetPrivateVBAAsphericFee(calculatorObj, data));
        // add Blue Protection price
        total =
            total +
            parseFloat(GetPrivateVBABlueProtectionFee(calculatorObj, data));
        // add Roll and Polish price
        total =
            total +
            parseFloat(GetPrivateVBARollAndPolishFee(calculatorObj, data));
        // add Licensed Speciality price
        total =
            total + parseFloat(GetPrivateVBALicensedFee(calculatorObj, data));
        // add Scratch Resistant Coatings price
        total =
            total + parseFloat(GetPrivateVBAScratchFee(calculatorObj, data));
    }

    // add protection plan
    total = total + parseFloat(GetProtectionPlanPrice(data));
    return total;
};

export const GetVBADrillMountFee = (data, plansJson) => {
    const newFrame =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.question;
    const drillMountYes =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.subQuestion
            ?.options?.yes;

    if (
        data?.frameOrder?.type === newFrame &&
        data?.frameOrder?.drillMount === drillMountYes
    ) {
        switch (data?.frameOrder?.drillMountOption) {
            case "Rimless Mounting":
                return parseFloat(PriceConstants?.vba?.rimlessMounting || 0);
            case "Drill Rimless Mounting":
                return parseFloat(
                    PriceConstants?.vba?.drillRimlessMounting || 0
                );
            case "Drill & Notch Rimless Mounting":
                return parseFloat(
                    PriceConstants?.vba?.drillAndNotchRimlessMounting || 0
                );

            default:
                return 0;
        }
    }
};

export const GetVBALensFee = (data, calculatorObj) => {
    switch (data?.lensType?.type) {
        case "Single Vision":
            return getVBASingleVisionPrice(data, calculatorObj);
        case "PAL":
            return getVBAPALPrice(data, calculatorObj);
        case "NVF":
            return getVBANVFPrice(data, calculatorObj);
        case "Bifocal/Trifocal":
            return 0;
        default:
            return 0;
    }
};
const getVBASingleVisionPrice = (data, calculatorObj) => {
    let total = 0;
    if (CompareStrings(data?.lensType?.category, "Traditional Single Vision")) {
        total = 0;
    } else if (
        CompareStrings(data?.lensType?.category, "Digital Single Vision") &&
        data?.lensType?.brand &&
        data?.lensType?.subCategory
    ) {
        const menufecturer = calculatorObj?.lens_types
            ?.find((lens) => lens?.title === data?.lensType?.type)
            ?.categories?.find((cat) => cat?.title === data?.lensType?.category)
            ?.sub_categories?.find(
                (subCat) => subCat?.title === data?.lensType?.subCategory
            )?.brands;

        menufecturer?.forEach((item) => {
            item?.collections?.forEach((val) => {
                if (val?.title == data?.lensType?.brand) {
                    total = val?.lense_price || 0;
                }
            });
        });
    }
    return parseFloat(total || 0);
};

const getVBAPALPrice = (data, calculatorObj) => {
    let total = 0;
    const menufecturer = calculatorObj?.lens_types
        ?.find((lens) => lens?.title === data?.lensType?.type)
        ?.categories?.find(
            (cat) => cat?.title === data?.lensType?.category
        )?.brands;
    menufecturer?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.title == data?.lensType?.brand) {
                total = val?.lense_price || 0;
            }
        });
    });
    return CompareStrings(data?.lensType?.type, "PAL") &&
        data?.lensType?.category &&
        data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};

const getVBANVFPrice = (data, calculatorObj) => {
    let total = 0;
    const menufecturer = calculatorObj?.lens_types?.find(
        (lens) => lens?.title === data?.lensType?.type
    )?.brands;
    menufecturer?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.title == data?.lensType?.brand) {
                total = val?.lense_price || 0;
            }
        });
    });
    return CompareStrings(data?.lensType?.type, "NVF") && data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};

export const GetVBAMaterialFee = (data, calculatorObj) => {
    const price = calculatorObj?.lens_material
        ?.find((lens) => lens?.lens_material_title === data?.lensMaterial)
        ?.prices?.find(
            (lens) => lens?.lense_type === data?.lensType?.type
        )?.price;

    return data?.lensMaterial
        ? parseFloat(price || 0) + getCenterThickness(data)
        : 0;
};

const getCenterThickness = (data) => {
    return CompareStrings(data?.centerThickness, "Yes") && data?.lensMaterial
        ? parseFloat(PriceConstants?.vba?.centerThickness || 0)
        : 0;
};
export const GetVBAPhotochromicFee = (data) => {
    if (
        CompareStrings(data?.photochromics?.status, "Yes") &&
        data?.photochromics?.type &&
        data?.photochromics?.category
    ) {
        switch (data?.lensType?.type) {
            case "Single Vision":
                switch (data?.photochromics?.category) {
                    case "Photochromic":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic?.photochromic
                                ?.sv || 0
                        );
                    case "Photochromic + Polarized":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicPolarized?.sv || 0
                        );
                    case "Photochromic + Mirror":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicMirror?.sv || 0
                        );
                }
            case "PAL":
                switch (data?.photochromics?.category) {
                    case "Photochromic":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic?.photochromic
                                ?.pal || 0
                        );
                    case "Photochromic + Polarized":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicPolarized?.pal || 0
                        );
                    case "Photochromic + Mirror":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicMirror?.pal || 0
                        );
                }
            case "NVF":
                switch (data?.photochromics?.category) {
                    case "Photochromic":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic?.photochromic
                                ?.nvf || 0
                        );
                    case "Photochromic + Polarized":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicPolarized?.nvf || 0
                        );
                    case "Photochromic + Mirror":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicMirror?.nvf || 0
                        );
                }
            case "Bifocal/Trifocal":
                switch (data?.photochromics?.category) {
                    case "Photochromic":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic?.photochromic
                                ?.bifocal || 0
                        );
                    case "Photochromic + Polarized":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicPolarized?.bifocal || 0
                        );
                    case "Photochromic + Mirror":
                        return parseFloat(
                            PriceConstants?.vba?.photochromic
                                ?.photochromicMirror?.bifocal || 0
                        );
                }
            default:
                return 0;
        }
    }
    return 0;
};

export const GetVBAPolarizedFee = (data) => {
    if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Polarized")
    ) {
        switch (data?.lensType?.type) {
            case "Single Vision":
                return parseFloat(PriceConstants?.vba?.polarized?.sv || 0);
            case "PAL":
                return parseFloat(PriceConstants?.vba?.polarized?.pal || 0);
            case "NVF":
                return parseFloat(PriceConstants?.vba?.polarized?.nvf || 0);
            case "Bifocal/Trifocal":
                return parseFloat(PriceConstants?.vba?.polarized?.bifocal || 0);
            default:
                return 0;
        }
    }
    return 0;
};

export const GetVBATintFee = (data) => {
    if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Tint") &&
        CompareStrings(
            data?.sunGlassesLens?.tintType,
            "Tint - Solid Pink 1 & 2"
        ) &&
        CompareStrings(data?.sunGlassesLens?.tintCategory, "Normal Use")
    ) {
        return parseFloat(PriceConstants?.vba?.tint?.normalUse || 0);
    }
    if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Tint") &&
        CompareStrings(
            data?.sunGlassesLens?.tintType,
            "Tint - Solid Pink 1 & 2"
        ) &&
        CompareStrings(data?.sunGlassesLens?.tintCategory, "Therapeutic Use")
    ) {
        return parseFloat(PriceConstants?.vba?.tint?.therapeuticUse || 0);
    }
    return 0;
};

export const GetVBACoatingFee = (data) => {
    let total = 0;
    if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.lensType &&
        CompareStrings(data?.sunGlassesLens?.mirrorCoating, "Yes") &&
        CompareStrings(
            data?.sunGlassesLens?.coatingType,
            "Color Coating - Glass and non-tintable materials"
        )
    ) {
        total = PriceConstants?.vba?.mirrorCoating?.glass || 0;
    } else if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.lensType &&
        CompareStrings(data?.sunGlassesLens?.mirrorCoating, "Yes") &&
        CompareStrings(
            data?.sunGlassesLens?.coatingType,
            "Mirror Coating - Flash/Gradient/Solid"
        )
    ) {
        total = PriceConstants?.vba?.mirrorCoating?.solid || 0;
    }

    return parseFloat(total || 0);
};
export const GetVBAUVProtectionFee = (data) => {
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.uvProtection, "Yes")
        ? parseFloat(PriceConstants?.vba?.uvProtection || 0)
        : 0;
};

export const GetVBAAntireflectiveFee = (data) => {
    if (
        CompareStrings(data?.antiReflectiveProperties?.status, "Yes") &&
        data?.antiReflectiveProperties?.type &&
        data?.antiReflectiveProperties?.category
    ) {
        switch (data?.antiReflectiveProperties?.category) {
            case "Standard A/R 1":
                return parseFloat(
                    PriceConstants?.vba?.antiReflective?.standardAR1 || 0
                );
            case "Standard A/R 2":
                return parseFloat(
                    PriceConstants?.vba?.antiReflective?.standardAR2 || 0
                );
            case "Premium A/R 1":
                return parseFloat(
                    PriceConstants?.vba?.antiReflective?.premiumAR1 || 0
                );
            case "Premium A/R 2":
                return parseFloat(
                    PriceConstants?.vba?.antiReflective?.premiumAR2 || 0
                );
            case "Ultra A/R":
                return parseFloat(
                    PriceConstants?.vba?.antiReflective?.ultraAR || 0
                );
        }
    }
    return 0;
};
export const GetVBAAsphericFee = (data) => {
    if (CompareStrings(data?.aspheric?.status, "Yes") && data?.aspheric?.type) {
        switch (data?.lensType?.type) {
            case "Single Vision":
                return getVBASVAsphericPrice(data);
            case "PAL":
                return getVBAPALAsphericPrice(data);
            case "NVF":
                return getVBANVFAsphericPrice(data);
            case "Bifocal/Trifocal":
                return getVBABifocalTrifocalAsphericPrice(data);
            default:
                return 0;
        }
    }
    return 0;
};

const getVBASVAsphericPrice = (data) => {
    switch (data?.aspheric?.type) {
        case "Aspheric & Atoric Standard Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.standardPlastic?.sv || 0
            );
        case "Aspheric & Atoric Polycarbonate":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.polycarbonate?.sv || 0
            );
        case "Aspheric & Atoric Mid Index Plastic/Trivex":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexTrivax?.sv || 0
            );
        case "Aspheric and Atoric Mid Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexPlastic?.sv || 0
            );
        case "Aspheric & Atoric High Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.highIndexPlastic?.sv || 0
            );

        default:
            return 0;
    }
};

const getVBAPALAsphericPrice = (data) => {
    switch (data?.aspheric?.type) {
        case "Aspheric & Atoric Standard Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.standardPlastic?.pal || 0
            );
        case "Aspheric & Atoric Polycarbonate":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.polycarbonate?.pal || 0
            );
        case "Aspheric & Atoric Mid Index Plastic/Trivex":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexTrivax?.pal || 0
            );
        case "Aspheric and Atoric Mid Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexPlastic?.pal || 0
            );
        case "Aspheric & Atoric High Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.highIndexPlastic?.pal || 0
            );

        default:
            return 0;
    }
};
const getVBANVFAsphericPrice = (data) => {
    switch (data?.aspheric?.type) {
        case "Aspheric & Atoric Standard Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.standardPlastic?.nvf || 0
            );
        case "Aspheric & Atoric Polycarbonate":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.polycarbonate?.nvf || 0
            );
        case "Aspheric & Atoric Mid Index Plastic/Trivex":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexTrivax?.nvf || 0
            );
        case "Aspheric and Atoric Mid Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexPlastic?.nvf || 0
            );
        case "Aspheric & Atoric High Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.highIndexPlastic?.nvf || 0
            );

        default:
            return 0;
    }
};
const getVBABifocalTrifocalAsphericPrice = (data) => {
    switch (data?.aspheric?.type) {
        case "Aspheric & Atoric Standard Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.standardPlastic?.bifocal || 0
            );
        case "Aspheric & Atoric Polycarbonate":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.polycarbonate?.bifocal || 0
            );
        case "Aspheric & Atoric Mid Index Plastic/Trivex":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexTrivax?.bifocal || 0
            );
        case "Aspheric and Atoric Mid Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.midIndexPlastic?.bifocal || 0
            );
        case "Aspheric & Atoric High Index Plastic":
            return parseFloat(
                PriceConstants?.vba?.aspheric?.highIndexPlastic?.bifocal || 0
            );

        default:
            return 0;
    }
};

export const GetVBABlueProtectionFee = (data) => {
    let total = 0;
    if (
        CompareStrings(data?.blueProtection?.status, "Yes") &&
        CompareStrings(
            data?.blueProtection?.category,
            "Blue Protection Material 1"
        ) &&
        data?.blueProtection?.type
    ) {
        total = PriceConstants?.vba?.blueProtection?.material1;
    } else if (
        CompareStrings(data?.blueProtection?.status, "Yes") &&
        CompareStrings(
            data?.blueProtection?.category,
            "Blue Protection Material 2"
        ) &&
        data?.blueProtection?.type
    ) {
        total = PriceConstants?.vba?.blueProtection?.material2;
    }
    return parseFloat(total || 0);
};

export const GetVBARollAndPolishFee = (data) => {
    if (
        CompareStrings(data?.rollAndPolish?.status, "Yes") &&
        data?.rollAndPolish?.type
    ) {
        switch (data?.rollAndPolish?.type) {
            case "Roll or Standard Polish":
                return parseFloat(
                    PriceConstants?.vba?.rollAndPolish?.rollOrStandard || 0
                );
            case "Roll & Standard Polish":
                return parseFloat(
                    PriceConstants?.vba?.rollAndPolish?.rollAndStandard || 0
                );
            case "High Luster Edge Polish":
                return parseFloat(
                    PriceConstants?.vba?.rollAndPolish?.highLuster || 0
                );
            case "Roll & High Luster Edge Polish":
                return parseFloat(
                    PriceConstants?.vba?.rollAndPolish?.rollAndHignLuster || 0
                );

            default:
                return 0;
        }
    }
    return 0;
};
export const GetVBALicensedFee = (data) => {
    if (
        CompareStrings(data?.licensedSpeciality?.status, "Yes") &&
        CompareStrings(
            data?.licensedSpeciality?.type,
            "RB Chromance Color Enhancement"
        )
    ) {
        return parseFloat(PriceConstants?.vba?.licensed?.color || 0);
    } else if (
        CompareStrings(data?.licensedSpeciality?.status, "Yes") &&
        CompareStrings(
            data?.licensedSpeciality?.type,
            "RB Licensed Visible Branding"
        )
    ) {
        return parseFloat(PriceConstants?.vba?.licensed?.branding || 0);
    }
    return 0;
};
export const GetVBAScratchFee = (data) => {
    if (CompareStrings(data?.scratch?.status, "Yes") && data?.scratch?.type) {
        switch (data?.scratch?.type) {
            case "Basic Scratch Coating":
                return PriceConstants?.vba?.scratchCoating?.scratchCoating;
            case "Scratch Resistant Coating 1":
                return PriceConstants?.vba?.scratchCoating?.coating1;
            case "Scratch Resistant Coating 2":
                return PriceConstants?.vba?.scratchCoating?.coating2;

            default:
                return 0;
        }
    }
    return 0;
};

//private pay prices
export const GetPrivateVBALensFee = (calculatorObj, data) => {
    switch (data?.lensType?.type) {
        case "Single Vision":
            return getVBASingleVisionPrivatePrice(data, calculatorObj);
        case "PAL":
            return getVBAPALPrivatePrice(data, calculatorObj);
        case "NVF":
            return getVBANVFPrivatePrice(data, calculatorObj);
        case "Bifocal/Trifocal":
            return 0;
        default:
            return 0;
    }
};
const getVBASingleVisionPrivatePrice = (data, calculatorObj) => {
    let total = 0;
    if (CompareStrings(data?.lensType?.category, "Traditional Single Vision")) {
        total = 0;
    } else if (
        CompareStrings(data?.lensType?.category, "Digital Single Vision") &&
        data?.lensType?.brand &&
        data?.lensType?.subCategory
    ) {
        const menufecturer = calculatorObj?.lens_types
            ?.find((lens) => lens?.title === data?.lensType?.type)
            ?.categories?.find((cat) => cat?.title === data?.lensType?.category)
            ?.sub_categories?.find(
                (subCat) => subCat?.title === data?.lensType?.subCategory
            )?.brands;

        menufecturer?.forEach((item) => {
            item?.collections?.forEach((val) => {
                if (val?.title == data?.lensType?.brand) {
                    total = val?.price || 0;
                }
            });
        });
    }
    return parseFloat(total || 0);
};
const getVBAPALPrivatePrice = (data, calculatorObj) => {
    let total = 0;
    const menufecturer = calculatorObj?.lens_types
        ?.find((lens) => lens?.title === data?.lensType?.type)
        ?.categories?.find(
            (cat) => cat?.title === data?.lensType?.category
        )?.brands;
    menufecturer?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.title == data?.lensType?.brand) {
                total = val?.price || 0;
            }
        });
    });
    return CompareStrings(data?.lensType?.type, "PAL") &&
        data?.lensType?.category &&
        data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};

const getVBANVFPrivatePrice = (data, calculatorObj) => {
    let total = 0;
    const menufecturer = calculatorObj?.lens_types?.find(
        (lens) => lens?.title === data?.lensType?.type
    )?.brands;
    menufecturer?.forEach((item) => {
        item?.collections?.forEach((val) => {
            if (val?.title == data?.lensType?.brand) {
                total = val?.price || 0;
            }
        });
    });
    return CompareStrings(data?.lensType?.type, "NVF") && data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};
export const GetPrivatePayVBAMaterialPrice = (data, calculatorObj) => {
    const price = calculatorObj?.lens_material
        ?.find((lens) => lens?.lens_material_title === data?.lensMaterial)
        ?.prices?.find(
            (lens) => lens?.lense_type === data?.lensType?.type
        )?.retail_price;
    return data?.lensMaterial
        ? parseFloat(price || 0) + getCenterThickness(data)
        : 0;
};

export const GetVBAPrivateAntireflectivePrice = (
    calculatorObj,
    value,
    data
) => {
    const antiReflectiveAddons = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find(
            (item) => item?.title === "Anti-Reflective Coatings"
        );
    let total = 0;
    if (CompareStrings(data?.antiReflectiveProperties?.status, "Yes")) {
        const selectedAntireflective =
            antiReflectiveAddons?.addons?.find((item) => item?.title === value)
                ?.price || 0;
        total = total + parseFloat(selectedAntireflective || 0) || 0;
    }
    return total;
};

export const GetPrivatePolarizedPrice = (calculatorObj, data) => {
    const polarizedAddon = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Polarized");
    let total = 0;
    if (
        CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Polarized")
    ) {
        const selectedPolarized =
            polarizedAddon?.addons?.find(
                (item) => item?.title === data?.sunGlassesLens?.lensType
            )?.price || 0;
        total = total + parseFloat(selectedPolarized || 0) || 0;
    }
    return total;
};

export const GetPrivateTintPrice = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((type) => type?.title === "Tint")
        ?.addons?.find(
            (val) => val?.title === data?.sunGlassesLens?.tintType
        )?.price;

    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Tint") &&
        data?.sunGlassesLens?.lensType &&
        data?.sunGlassesLens?.tintCategory
        ? parseFloat(price || 0)
        : 0;
};

export const GetPrivateMirrorCoatingPrice = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((type) => type?.title === "Mirror Coating")
        ?.addons?.find(
            (val) => val?.title === data?.sunGlassesLens?.coatingType
        )?.price;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.mirrorCoating, "Yes") &&
        data?.sunGlassesLens?.coatingType
        ? parseFloat(price || 0)
        : 0;
};
export const GetPrivateVBAAsphericFee = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((type) => type?.title === "Aspheric")
        ?.addons?.find((val) => val?.title === data?.aspheric?.type)?.price;

    return CompareStrings(data?.aspheric?.status, "Yes") && data?.aspheric?.type
        ? parseFloat(price || 0)
        : 0;
};

export const GetPrivateVBABlueProtectionFee = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((type) => type?.title === "Blue Protection")
        ?.addons?.find(
            (val) => val?.title === data?.blueProtection?.type
        )?.price;

    return CompareStrings(data?.blueProtection?.status, "Yes") &&
        data?.blueProtection?.type &&
        data?.blueProtection?.category
        ? parseFloat(price || 0)
        : 0;
};
export const GetPrivateVBARollAndPolishFee = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((type) => type?.title === "Roll & Polish")
        ?.addons?.find(
            (val) => val?.title === data?.rollAndPolish?.type
        )?.price;

    return CompareStrings(data?.rollAndPolish?.status, "Yes") &&
        data?.rollAndPolish?.type
        ? parseFloat(price || 0)
        : 0;
};

export const GetPrivateVBALicensedFee = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find(
            (type) => type?.title === "Licensed Specialty Enhancement"
        )
        ?.addons?.find(
            (val) => val?.title === data?.licensedSpeciality?.type
        )?.price;

    return CompareStrings(data?.licensedSpeciality?.status, "Yes") &&
        data?.licensedSpeciality?.type
        ? parseFloat(price || 0)
        : 0;
};
export const GetPrivateVBAScratchFee = (calculatorObj, data) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find(
            (type) => type?.title === "Scratch Resistant Coatings"
        )
        ?.addons?.find((val) => val?.title === data?.scratch?.type)?.price;

    return CompareStrings(data?.scratch?.status, "Yes") && data?.scratch?.type
        ? parseFloat(price || 0)
        : 0;
};
