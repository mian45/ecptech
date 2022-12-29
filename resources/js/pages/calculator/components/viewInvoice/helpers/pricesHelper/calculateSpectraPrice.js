import { CompareStrings } from "../../../../../../utils/utils";
import { PriceConstants } from "../../../../data/constants";
import { GetProtectionPlanPrice } from "./calculateOtherPlansPrices";

export const CalculateSpectraPlansPrices = (
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
        total + parseFloat(GetSpectraFrameFee(data, calculatorObj, plansJson));
    //add drill mount fee
    total =
        total +
        parseFloat(GetSpectraDrillMountFee(data, calculatorObj, plansJson));
    if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.yes
    ) {
        total =
            total +
            SpectraRegularTotal(data, calculatorObj, plansList, plansJson);
    } else if (
        data?.isLensBenifit ===
        plansJson[data?.visionPlan]?.lensBenifit?.options?.no
    ) {
        total =
            total +
            SpectraPrivateTotal(data, calculatorObj, plansList, plansJson);
    }

    // add protection plan
    total = total + parseFloat(GetProtectionPlanPrice(data));
    return total;
};

export const SpectraRegularTotal = (
    data,
    calculatorObj,
    plansList,
    plansJson
) => {
    let total = 0;
    // add lens Prices
    total = total + parseFloat(GetSpectraLensFee(data, calculatorObj));
    // add material Prices
    total = total + parseFloat(GetSpectraMaterialFee(data, calculatorObj));
    // add photochromic price
    total = total + parseFloat(0);
    // add sun glasses polarized price
    total = total + parseFloat(GetSpectraPolarizedFee(data));
    // add sun glasses tint price
    total = total + parseFloat(0);
    // add sun glasses Mirror coating price
    total = total + parseFloat(GetSpectraCoatingFee(data));
    // add antireflective price
    total = total + parseFloat(GetSpectraAntireflectiveFee(data));
    // add chemistrie clip price
    total = total + parseFloat(GetSpectraChemistrieClipFee(data));
    // add edge Coating price
    total = total + parseFloat(GetSpectraEdgeCoatingFee(data));
    // add Lens Options price
    total = total + parseFloat(GetSpectraLensOptionsFee(data));
    // add one Year Scratch warrenty price
    total = total + parseFloat(GetSpectraScratechWarrentyFee(data));
    // add over size lenses price
    total = total + parseFloat(GetSpectraOverSizeLensesFee(data));
    // add spectra Polish price
    total = total + parseFloat(GetSpectraPolishFee(data));
    // add scratch coating price
    total = total + parseFloat(GetSpectraScratchCoatingFee(data));
    // add UV coating price
    total = total + parseFloat(GetSpectraUVCoatingFee(data));
    return total;
};

export const SpectraPrivateTotal = (
    data,
    calculatorObj,
    plansList,
    plansJson
) => {
    let total = 0;
    // add lens Prices
    total = total + parseFloat(GetPrivateSpectraLens(data, calculatorObj) || 0);
    // add material Prices
    total + parseFloat(GetSpectraPrivateMaterial(data, calculatorObj));
    // add photochromic price
    total + parseFloat(GetSpectraPrivatePhotochromic(data, calculatorObj));
    // add sun glasses price
    //// add polarized
    total + parseFloat(GetSpectraPrivatePolarized(data, calculatorObj));
    //// add Tint
    total = total + parseFloat(GetSpectraPrivateTintPrice(data, calculatorObj));
    //// add Mirror Coating
    total =
        total + parseFloat(GetSpectraPrivateMirrorCoating(data, calculatorObj));
    // add antireflective price
    total =
        total +
        parseFloat(getSpectraPrivateAntiReflective(data, calculatorObj));
    // add chemistrie clip
    total =
        total +
        parseFloat(getSpectraPrivateChemistrieClip(data, calculatorObj));
    // add Edge Coating
    total =
        total + parseFloat(getSpectraPrivateEdgeCoating(data, calculatorObj));
    // add Lens Options
    total =
        total + parseFloat(getSpectraPrivateLensOptions(data, calculatorObj));
    // add one Year Scratch warrenty price
    total = total + parseFloat(GetSpectraScratechWarrentyFee(data));
    // add Polish
    total =
        total +
        parseFloat(getSpectraPrivateOverSizeLenses(data, calculatorObj));
    // add Polish
    total = total + parseFloat(getSpectraPrivatePolish(data, calculatorObj));
    // add scratch Coating
    total =
        total +
        parseFloat(getSpectraPrivateScratchCoating(data, calculatorObj));

    // add UV Coating
    total = total + parseFloat(getSpectraPrivateUVCoating(data, calculatorObj));
    return total;
};

export const GetSpectraFrameFee = (data, calculatorObj, plansJson) => {
    let total = 0;
    const retailFee = parseFloat(data?.frameOrder?.retailFee || "");
    const frameContribution = parseFloat(
        data?.frameOrder?.frameContribution || ""
    );
    const newFrame =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.question;
    const frameBenifitYes =
        plansJson[data?.visionPlan]?.frameBenifit?.options?.yes;
    const ownFrame =
        plansJson[data?.visionPlan]?.frameOrder?.options?.ownFrame?.question;
    const tracingYes = plansJson[data?.visionPlan]?.tracingFee?.options?.yes;
    if (
        data?.isFrameBenifit ===
            plansJson[data?.visionPlan]?.frameBenifit?.options?.no &&
        data?.frameOrder?.type === newFrame
    ) {
        total = total + retailFee;
    } else if (
        data?.isFrameBenifit === frameBenifitYes &&
        data?.frameOrder?.type === newFrame
    ) {
        if (retailFee <= frameContribution) {
            total = total + 0;
        } else if (retailFee > frameContribution) {
            const actualPrice = retailFee - frameContribution;
            const discount = actualPrice * 0.3;
            const payableFramePrice = actualPrice - discount;
            total = total + (payableFramePrice || 0);
        }
    } else if (
        data?.isFrameBenifit === frameBenifitYes &&
        data?.frameOrder?.type === ownFrame &&
        data?.tracing?.status === tracingYes
    ) {
        total = total + parseFloat(calculatorObj?.tracing_fee || 0);
    }
    return total;
};
export const GetSpectraDrillMountFee = (data, calculatorObj, plansJson) => {
    const newFrame =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.question;
    const drillMountYes =
        plansJson[data?.visionPlan]?.frameOrder?.options?.newFrame?.subQuestion
            ?.options?.yes;
    let price = 0;
    if (
        data?.frameOrder?.type === newFrame &&
        data?.frameOrder?.drillMount === drillMountYes
    ) {
        const actualPrice = calculatorObj?.drill_amount || 0;
        const discount = actualPrice * 0.2;
        const payablePrice = actualPrice - discount;
        price = actualPrice > 0 ? payablePrice : 0;
    }
    return parseFloat(price || 0);
};
export const GetSpectraLensFee = (data, calculatorObj) => {
    switch (data?.lensType?.type) {
        case "Single Vision":
            if (CompareStrings(data?.lensType?.brand, "Standard Lenses")) {
                return parseFloat(data?.lensType?.brandPrice || 0);
            }
            const actualPrice = data?.lensType?.brandPrice || 0;
            const discount = actualPrice * 0.2;
            const price = actualPrice - discount;
            const payable = actualPrice > 0 ? price : 0;
            return parseFloat(payable || 0);
        case "PAL":
            return getSpectraPALPrice(data, calculatorObj);
        case "NVF":
            return getSpectraNVFPrice(data);
        case "Bifocal/Trifocal":
            return getSpectraBifocalPrice(data);
        default:
            return 0;
    }
};

const getSpectraPALPrice = (data, calculatorObj) => {
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
    if (
        CompareStrings(data?.lensType?.type, "PAL") &&
        CompareStrings(
            data?.lensType?.category,
            "Non - Formulary progressive lenses"
        )
    ) {
        const actualPrice = data?.lensType?.brandPrice || 0;
        const discount = actualPrice * 0.2;
        const price = actualPrice - discount;
        total = actualPrice > 0 ? price : 0;
        return parseFloat(total || 0);
    }
    return CompareStrings(data?.lensType?.type, "PAL") &&
        data?.lensType?.category &&
        data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};
const getSpectraNVFPrice = (data) => {
    const actualPrice = data?.lensType?.brandPrice || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return parseFloat(payable || 0);
};
const getSpectraBifocalPrice = (data) => {
    const actualPrice = data?.lensType?.brandPrice || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;

    return CompareStrings(data?.lensType?.type, "Bifocal/Trifocal") &&
        data?.lensType?.brand
        ? parseFloat(payable || 0)
        : 0;
};
export const GetSpectraMaterialFee = (data, calculatorObj) => {
    let total = 0;
    const actualPrice = data?.lensMaterialPrice || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    if (CompareStrings(data?.lensMaterial, "Hi Index >=1.74")) {
        return parseFloat(payable || 0);
    } else {
        total = calculatorObj?.lens_material?.find(
            (lens) => lens?.lens_material_title === data?.lensMaterial
        )?.prices[0]?.price;

        return data?.lensMaterial ? parseFloat(total || 0) : 0;
    }
};
export const GetSpectraPolarizedFee = (data) => {
    const actualPrice = data?.sunGlassesLens?.polarizedPrice || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        CompareStrings(data?.sunGlassesLens?.lensType, "Polarized")
        ? parseFloat(payable || 0)
        : 0;
};

export const GetSpectraCoatingFee = (data) => {
    const actualPrice = data?.sunGlassesLens?.coatingPrice || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.lensType &&
        CompareStrings(data?.sunGlassesLens?.mirrorCoating, "Yes") &&
        data?.sunGlassesLens?.coatingType
        ? parseFloat(payable || 0)
        : 0;
};

export const GetSpectraAntireflectiveFee = (data) => {
    if (
        CompareStrings(data?.antiReflectiveProperties?.status, "Yes") &&
        data?.antiReflectiveProperties?.category
    ) {
        if (
            data?.antiReflectiveProperties?.category ===
            "Non - Formulary anti-reflective coatings"
        ) {
            const actualPrice = data?.antiReflectiveProperties?.price || 0;
            const discount = actualPrice * 0.2;
            const price = actualPrice - discount;
            const payable = actualPrice > 0 ? price : 0;
            return parseFloat(payable || 0);
        } else {
            switch (data?.antiReflectiveProperties?.price) {
                case "Tier I anti-reflective coatings":
                    return parseFloat(
                        PriceConstants?.spectra?.antireflective?.tier1 || 0
                    );
                case "Tier II anti-reflective coatings":
                    return parseFloat(
                        PriceConstants?.spectra?.antireflective?.tier2 || 0
                    );
                case "Tier III anti-reflective coatings":
                    return parseFloat(
                        PriceConstants?.spectra?.antireflective?.tier3 || 0
                    );
                case "Tier IV anti-reflective coatings":
                    return parseFloat(
                        PriceConstants?.spectra?.antireflective?.tier4 || 0
                    );

                default:
                    return 0;
            }
        }
    }
    return 0;
};
export const GetSpectraChemistrieClipFee = (data) => {
    return CompareStrings(data?.chemistrieClip?.status, "Yes") &&
        data?.chemistrieClip?.type
        ? parseFloat(data?.chemistrieClip?.type || 0)
        : 0;
};
export const GetSpectraEdgeCoatingFee = (data) => {
    const actualPrice = data?.edgeCoating?.type || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return CompareStrings(data?.edgeCoating?.status, "Yes") &&
        data?.edgeCoating?.type
        ? parseFloat(payable || 0)
        : 0;
};
export const GetSpectraLensOptionsFee = (data) => {
    const actualPrice = data?.lensOptions?.type || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return CompareStrings(data?.lensOptions?.status, "Yes") &&
        data?.lensOptions?.type
        ? parseFloat(payable || 0)
        : 0;
};

export const GetSpectraScratechWarrentyFee = (data) => {
    return CompareStrings(data?.scratchWarrenty?.status, "Yes")
        ? parseFloat(PriceConstants?.spectra?.scratchWarrenty || 0)
        : 0;
};

export const GetSpectraOverSizeLensesFee = (data) => {
    const actualPrice = data?.overSizeLens?.type || 0;
    const discount = actualPrice * 0.2;
    const price = actualPrice - discount;
    const payable = actualPrice > 0 ? price : 0;
    return CompareStrings(data?.overSizeLens?.status, "Yes") &&
        data?.overSizeLens?.type
        ? parseFloat(payable || 0)
        : 0;
};

export const GetSpectraPolishFee = (data) => {
    return CompareStrings(data?.spectraPolish?.status, "Yes") &&
        data?.spectraPolish?.type
        ? parseFloat(PriceConstants?.spectra?.polish || 0)
        : 0;
};
export const GetSpectraScratchCoatingFee = (data) => {
    return CompareStrings(data?.scratchCoating?.status, "Yes")
        ? parseFloat(0)
        : 0;
};
export const GetSpectraUVCoatingFee = (data) => {
    return CompareStrings(data?.uvCoating?.status, "Yes") ? parseFloat(0) : 0;
};
// private pay prices
export const getSpectraPrivatePolish = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Polish")
        ?.addons?.find((val) => val?.title === data?.overSizeLens?.type)?.price;
    return CompareStrings(data?.overSizeLens?.status, "Yes") &&
        data?.overSizeLens?.type
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateScratchCoating = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Scratch Coating")
        ?.addons[0]?.price;
    return CompareStrings(data?.scratchCoating?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateUVCoating = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "UV Coating")
        ?.addons[0]?.price;
    return CompareStrings(data?.uvCoating?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateOverSizeLenses = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Oversize Lenses")
        ?.addons[0]?.price;
    return CompareStrings(data?.overSizeLens?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateLensOptions = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find(
            (item) => item?.title === "Miscellaneous Lens Options"
        )?.addons[0]?.price;
    return CompareStrings(data?.lensOptions?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};

export const getSpectraPrivateEdgeCoating = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Edge Coating")
        ?.addons[0]?.price;
    return CompareStrings(data?.edgeCoating?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateChemistrieClip = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Chemistrie Clip")
        ?.addons[0]?.price;
    return CompareStrings(data?.chemistrieClip?.status, "Yes")
        ? parseFloat(price || 0)
        : 0;
};
export const getSpectraPrivateAntiReflective = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Anti-Reflective")
        ?.addons?.find(
            (val) => val?.title === data?.antiReflectiveProperties?.type
        )?.price;
    return CompareStrings(data?.antiReflectiveProperties?.status, "Yes") &&
        data?.antiReflectiveProperties?.type
        ? parseFloat(price || 0)
        : 0;
};
export const GetSpectraPrivateMirrorCoating = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Mirror Coating")
        ?.addons?.find(
            (val) => val?.title === data?.sunGlassesLens?.coatingType
        )?.price;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.coatingType
        ? parseFloat(price || 0)
        : 0;
};
export const GetSpectraPrivateTintPrice = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Tint")
        ?.addons?.find(
            (val) => val?.title === data?.sunGlassesLens?.tintType
        )?.price;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.tintType
        ? parseFloat(price || 0)
        : 0;
};

export const GetSpectraPrivatePolarized = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Polarized")
        ?.addons?.find((val) => val?.title === "Polarized")?.price;
    return CompareStrings(data?.sunGlassesLens?.status, "Yes") &&
        data?.sunGlassesLens?.lensType === "Polarized"
        ? parseFloat(price || 0)
        : 0;
};

export const GetSpectraPrivatePhotochromic = (data, calculatorObj) => {
    const price = calculatorObj?.addons
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Photochromics")
        ?.addons?.find(
            (val) => val?.title === data?.photochromics?.type
        )?.price;
    return CompareStrings(data?.photochromics?.status, "Yes") &&
        data?.photochromics?.type
        ? parseFloat(price || 0)
        : 0;
};

export const GetSpectraPrivateMaterial = (data, calculatorObj) => {
    const price = calculatorObj?.lens_material?.find(
        (lens) => lens?.lens_material_title === data?.lensMaterial
    )?.retail_price;
    return data?.lensMaterial ? parseFloat(price || 0) : 0;
};

export const GetPrivateSpectraLens = (data, calculatorObj) => {
    switch (data?.lensType?.type) {
        case "Single Vision":
            return getPrivateSpectraSVPrice(data, calculatorObj);
        case "PAL":
            return getPrivateSpectraPALPrice(data, calculatorObj);
        case "NVF":
            return 0;
        case "Bifocal/Trifocal":
            return getPrivateSpectraBifocal(data, calculatorObj);
        default:
            return 0;
    }
};

const getPrivateSpectraSVPrice = (data, calculatorObj) => {
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
    return CompareStrings(data?.lensType?.type, "Single Vision") &&
        data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};

const getPrivateSpectraPALPrice = (data, calculatorObj) => {
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
const getPrivateSpectraBifocal = (data, calculatorObj) => {
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
    return CompareStrings(data?.lensType?.type, "Bifocal/Trifocal") &&
        data?.lensType?.brand
        ? parseFloat(total || 0)
        : 0;
};
