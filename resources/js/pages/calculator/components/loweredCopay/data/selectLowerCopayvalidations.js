import * as Yup from "yup";
export const handleLowerCopayYesValidations = (
    values,
    setCalValidations,
    calValidations
) => {
    if (
        (values?.visionPlan === "Davis Vision" &&
            (!values?.isCopayPhotochromic ||
                !values?.isCopayHighIndex ||
                !values?.isCopayPremiumProgressives ||
                !values?.isCopayStandardProgressives ||
                !values?.isCopayUltraProgressives ||
                !values?.isCopayUltimateProgressives ||
                !values?.isCopayStandardAntireflective ||
                !values?.isCopayPremiumAntireflective ||
                !values?.isCopayUltraAntireflective ||
                !values?.isCopayUltimateAntireflective)) ||
        (values?.visionPlan !== "Davis Vision" &&
            (!values?.isCopayPolycarbonate ||
                !values?.isCopayPhotochromic ||
                !values?.isCopayHighIndex ||
                !values?.isCopayAntiReflective ||
                !values?.isCopayPremiumProgressives ||
                !values?.isCopayStandardProgressives ||
                !values?.isCopayCustomProgressives))
    ) {
        const isCopayChecked = Yup.mixed().required(
            "Minimum 1 sub option is required"
        );
        setCalValidations({
            ...calValidations,
            isCopayChecked,
        });
    }
};

export const handleLowerCopayNoValidations = (
    setCalValidations,
    calValidations
) => {
    const validations = { ...calValidations };
    delete validations?.isCopayChecked;
    //remove policarbonate
    delete validations?.isCopayPolycarbonateAmount;
    delete validations?.copayPolycarbonateAmount;
    //remove photochromic
    delete validations?.isCopayPhotochromicAmount;
    delete validations?.copayPhotochromicAmount;
    // remove high index
    delete validations?.isCopayHighIndexAmount;
    delete validations?.copayHighIndexAmount;
    //remove standard progressive
    delete validations?.isCopayStandardProgressiveAmount;
    delete validations?.copayStandardProgressiveAmount;
    //remove premium progressive
    delete validations?.isCopaypremiumProgressiveAmount;
    delete validations?.copaypremiumProgressiveAmount;
    //remove custom progressive
    delete validations?.isCopayCustomProgressiveAmount;
    delete validations?.copayCustomProgressiveAmount;
    //remove ultra progressive
    delete validations?.isCopayUltraProgressiveAmount;
    delete validations?.copayUltraProgressiveAmount;
    //remove ultimate progressive
    delete validations?.isCopayUltimateProgressiveAmount;
    delete validations?.copayUltimateProgressiveAmount;
    //remove anti reflective
    delete validations?.isCopayAntiReflectiveAmount;
    delete validations?.copayAntiReflectiveAmount;
    //remove standard anti reflective
    delete validations?.isCopayStandardAntireflectiveAmount;
    delete validations?.copayStandardAntireflectiveAmount;
    //remove premium anti reflective
    delete validations?.isCopayPremiumAntireflectiveAmount;
    delete validations?.copayPremiumAntireflectiveAmount;
    //remove ultra anti reflective
    delete validations?.isCopayUltraAntireflectiveAmount;
    delete validations?.copayUltraAntireflectiveAmount;
    //remove ultimate anti reflective
    delete validations?.isCopayUltimateAntireflectiveAmount;
    delete validations?.copayUltimateAntireflectiveAmount;
    setCalValidations({
        ...validations,
    });
};
