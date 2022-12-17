import * as Yup from "yup";
export const handleLowerCopayCheckboxYesValidations = async (
    setFieldValue,
    key,
    setCalValidations,
    calValidations
) => {
    await setFieldValue("isCopayChecked", true);
    const validations = {};
    switch (key) {
        case "isCopayPolycarbonate":
            validations.isCopayPolycarbonateAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayPhotochromic":
            validations.isCopayPhotochromicAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayHighIndex":
            validations.isCopayHighIndexAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayAntiReflective":
            validations.isCopayAntiReflectiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayPremiumProgressives":
            validations.isCopaypremiumProgressiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayStandardProgressives":
            validations.isCopayStandardProgressiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayCustomProgressives":
            validations.isCopayCustomProgressiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayUltraProgressives":
            validations.isCopayUltraProgressiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayUltimateProgressives":
            validations.isCopayUltimateProgressiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayStandardAntireflective":
            validations.isCopayStandardAntireflectiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayPremiumAntireflective":
            validations.isCopayPremiumAntireflectiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayUltraAntireflective":
            validations.isCopayUltraAntireflectiveAmount =
                Yup.string().required("Option is required");
            break;
        case "isCopayUltimateAntireflective":
            validations.isCopayUltimateAntireflectiveAmount =
                Yup.string().required("Option is required");
            break;
    }
    setCalValidations({
        ...calValidations,
        ...validations,
    });
};

export const handleLowerCopayCheckboxNoValidations = (
    key,
    setCalValidations,
    calValidations
) => {
    const validations = { ...calValidations };
    switch (key) {
        case "isCopayPolycarbonate":
            delete validations?.isCopayPolycarbonateAmount;
            delete validations?.copayPolycarbonateAmount;
            break;
        case "isCopayPhotochromic":
            delete validations?.isCopayPhotochromicAmount;
            delete validations?.copayPhotochromicAmount;
            break;
        case "isCopayHighIndex":
            delete validations?.isCopayHighIndexAmount;
            delete validations?.copayHighIndexAmount;
            break;
        case "isCopayAntiReflective":
            delete validations?.isCopayAntiReflectiveAmount;
            delete validations?.copayAntiReflectiveAmount;
            break;
        case "isCopayPremiumProgressives":
            delete validations?.isCopaypremiumProgressiveAmount;
            delete validations?.copaypremiumProgressiveAmount;
            break;
        case "isCopayStandardProgressives":
            delete validations?.isCopayStandardProgressiveAmount;
            delete validations?.copayStandardProgressiveAmount;
            break;
        case "isCopayCustomProgressives":
            delete validations?.isCopayCustomProgressiveAmount;
            delete validations?.copayCustomProgressiveAmount;
            break;
        case "isCopayUltraProgressives":
            delete validations?.isCopayUltraProgressiveAmount;
            delete validations?.copayUltraProgressiveAmount;
            break;
        case "isCopayUltimateProgressives":
            delete validations?.isCopayUltimateProgressiveAmount;
            delete validations?.copayUltimateProgressiveAmount;
            break;
        case "isCopayStandardAntireflective":
            delete validations?.isCopayStandardAntireflectiveAmount;
            delete validations?.copayStandardAntireflectiveAmount;
            break;
        case "isCopayPremiumAntireflective":
            delete validations?.isCopayPremiumAntireflectiveAmount;
            delete validations?.copayPremiumAntireflectiveAmount;
            break;
        case "isCopayUltraAntireflective":
            delete validations?.isCopayUltraAntireflectiveAmount;
            delete validations?.copayUltraAntireflectiveAmount;
            break;
        case "isCopayUltimateAntireflective":
            delete validations?.isCopayUltimateAntireflectiveAmount;
            delete validations?.copayUltimateAntireflectiveAmount;
            break;
    }
    setCalValidations({
        ...validations,
    });
};
