import { DRILL_MOUNT } from "../../../../data/constants";
import {
    GetPrivateAntireflectivePrice,
    GetPrivateLensFee,
    GetPrivatePayMaterialPrice,
    GetPrivatePhotochromicPrice,
    GetPrivateSunGlassesPrice,
    GetProtectionPlanPrice,
} from "./calculateOtherPlansPrices";

export const CalculateEyemedPlansPrices = (data, calculatorObj) => {
    let total = 0;
    // add material copay
    total = total + (parseFloat(data?.materialCopay || "") || 0);
    // add Frame Fee
    total = total + parseFloat(GetEyemedFrameFee(data, calculatorObj));
    //add drill mount fee
    total = total + parseFloat(GetEyemedDrillMountFee(data));
    if (data?.isLensBenifit === "Yes") {
        // add lens Prices
        total = total + parseFloat(GetEyemedLensFee(data));
        // add material Prices
        total = total + parseFloat(GetEyemedMaterialFee(data));
        // add photochromic price
        total = total + parseFloat(GetEyemedPhotochromicFee(data));
        // add sun glasses polarized price
        total = total + parseFloat(GetEyemedPolarizedFee(data));
        // add sun glasses tint price
        total = total + parseFloat(GetEyemedTintFee(data));
        // add sun glasses Mirror coating price
        total = total + parseFloat(GetEyemedCoatingFee(data));
        // add antireflective price
        total = total + parseFloat(GetEyemedAntireflectiveFee(data));
        // add Slab off price
        total = total + parseFloat(GetEyemedSlabOffFee(data));
        // add Speciality Lens Price
        total = total + parseFloat(GetEyemedSpecialityLensFee(data));
        // add Polish Price
        total = total + parseFloat(GetEyemedPolishFee(data));
    } else if (
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
export const GetEyemedFrameFee = (data, calculatorObj) => {
    let total = 0;
    const retailFee = parseFloat(data?.frameOrder?.retailFee || "");
    const frameContribution = parseFloat(
        data?.frameOrder?.frameContribution || ""
    );
    if (
        data?.isFrameBenifit ===
            "Only multiple pair benefit only at this time" &&
        data?.frameOrder?.type === "New Frame Purchase"
    ) {
        total = total + retailFee;
    } else if (
        data?.isFrameBenifit === "Yes" &&
        data?.frameOrder?.type === "New Frame Purchase"
    ) {
        if (retailFee <= frameContribution) {
            total = total + 0;
        } else if (retailFee > frameContribution) {
            const actualPrice = retailFee - frameContribution;
            const discount = actualPrice * 0.2;
            const payableFramePrice = actualPrice - discount;
            total = total + (payableFramePrice || 0);
        }
    } else if (
        data?.isFrameBenifit === "Yes" &&
        data?.frameOrder?.type === "Patient Own Frame" &&
        data?.tracing?.status === "Yes"
    ) {
        total = total + (calculatorObj?.tracing_fee || 0);
    }
    return total;
};
export const GetEyemedDrillMountFee = (data) => {
    return (data?.isFrameBenifit ===
        "Only multiple pair benefit only at this time" &&
        data?.frameOrder?.type === "New Frame Purchase" &&
        data?.frameOrder?.drillMount === "Yes") ||
        (data?.isFrameBenifit === "Yes" &&
            data?.frameOrder?.type === "New Frame Purchase" &&
            data?.frameOrder?.drillMount === "Yes")
        ? DRILL_MOUNT
        : 0;
};

export const GetEyemedLensFee = (data) => {
    return data?.lensType?.type && data?.lensType?.brand
        ? data?.lensType?.brandPrice || 0
        : 0;
};
export const GetEyemedMaterialFee = (data) => {
    return data?.lensMaterial ? data?.lensMaterialPrice || 0 : 0;
};
export const GetEyemedPhotochromicFee = (data) => {
    return data?.photochromics?.status === "Yes" && data?.photochromics?.type
        ? data?.photochromics?.price || 0
        : 0;
};
export const GetEyemedPolarizedFee = (data) => {
    return data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType === "Polarized"
        ? data?.sunGlassesLens?.polarizedPrice || 0
        : 0;
};
export const GetEyemedTintFee = (data) => {
    return data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType === "Tint" &&
        data?.sunGlassesLens?.tintType
        ? data?.sunGlassesLens?.tintPrice || 0
        : 0;
};
export const GetEyemedCoatingFee = (data) => {
    return data?.sunGlassesLens?.status === "Yes" &&
        data?.sunGlassesLens?.lensType &&
        data?.sunGlassesLens?.mirrorCoating === "Yes" &&
        data?.sunGlassesLens?.coatingType
        ? data?.sunGlassesLens?.coatingPrice || 0
        : 0;
};
export const GetEyemedAntireflectiveFee = (data) => {
    return data?.antiReflectiveProperties?.status === "Yes" &&
        data?.antiReflectiveProperties?.type
        ? data?.antiReflectiveProperties?.price || 0
        : 0;
};
export const GetEyemedSlabOffFee = (data) => {
    return data?.slabOff?.status === "Yes" ? data?.slabOff?.price || 0 : 0;
};
export const GetEyemedSpecialityLensFee = (data) => {
    return data?.specialtyLens?.status === "Yes"
        ? data?.specialtyLens?.price || 0
        : 0;
};
export const GetEyemedPolishFee = (data) => {
    return data?.polish?.status === "Yes" && data?.polish?.type
        ? data?.polish?.price || 0
        : 0;
};

export const GetPrivateSlabOffPrice = (calculatorObj, data) => {
    const slabOffAddons = calculatorObj?.additional_lense_setting
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Slab Off");
    let total = 0;
    if (data?.slabOffAddons?.status === "Yes") {
        const selectedSlabOff =
            slabOffAddons?.addons?.find((item) => item?.title === "Slab Off")
                ?.price || 0;
        total = total + parseFloat(selectedSlabOff || 0) || 0;
    }
    return total;
};
export const GetPrivateSpecialityLensPrice = (calculatorObj, data) => {
    const specialityLensAddons = calculatorObj?.additional_lense_setting
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Speciality Lens");
    let total = 0;
    if (data?.specialtyLens?.status === "Yes") {
        const selectedSpecialityLens =
            specialityLensAddons?.addons?.find(
                (item) => item?.title === "Speciality Lens"
            )?.price || 0;
        total = total + parseFloat(selectedSpecialityLens || 0) || 0;
    }
    return total;
};
export const GetPrivatePolishPrice = (calculatorObj, data) => {
    const polishAddons = calculatorObj?.additional_lense_setting
        ?.find((plan) => plan?.title === data?.visionPlan)
        ?.addon_types?.find((item) => item?.title === "Polish");
    let total = 0;
    if (data?.polish?.status === "Yes" && data?.polish?.type) {
        const selectedPolish =
            polishAddons?.addons?.find(
                (item) => item?.title === data?.polish?.type
            )?.price || 0;
        total = total + parseFloat(selectedPolish || 0) || 0;
    }
    return total;
};
