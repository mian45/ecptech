import * as Yup from "yup";
export const selectLensTypeValidations = async (
    e,
    formProps,
    calValidations,
    setCalValidations
) => {
    const { values, setFieldValue } = formProps;
    const validations = { ...calValidations };

    if (e?.target?.value !== "PAL") {
        //remove premium progressive validations
        delete validations?.isCopaypremiumProgressiveAmount;
        delete validations?.copaypremiumProgressiveAmount;

        //remove standard progressive validations
        delete validations?.isCopayStandardProgressiveAmount;
        delete validations?.copayStandardProgressiveAmount;

        //remove custom progressive validations
        delete validations?.isCopayCustomProgressiveAmount;
        delete validations?.copayCustomProgressiveAmount;

        //remove ultra progressive validations
        delete validations?.isCopayUltraProgressiveAmount;
        delete validations?.copayUltraProgressiveAmount;

        //remove ultimate progressive validations
        delete validations?.isCopayUltimateProgressiveAmount;
        delete validations?.copayUltimateProgressiveAmount;

        // reset premium progressive values
        await setFieldValue("isCopayPremiumProgressives", null);
        await setFieldValue("isCopaypremiumProgressiveAmount", "");
        await setFieldValue("copaypremiumProgressiveAmount", "");

        // reset standard progressive values
        await setFieldValue("isCopayStandardProgressives", null);
        await setFieldValue("isCopayStandardProgressiveAmount", "");
        await setFieldValue("copayStandardProgressiveAmount", "");

        // reset custom progressive values
        await setFieldValue("isCopayCustomProgressives", null);
        await setFieldValue("isCopayCustomProgressiveAmount", "");
        await setFieldValue("copayCustomProgressiveAmount", "");

        // reset ultra progressive values
        await setFieldValue("isCopayUltraProgressives", null);
        await setFieldValue("isCopayUltraProgressiveAmount", "");
        await setFieldValue("copayUltraProgressiveAmount", "");

        // reset ultimate progressive values
        await setFieldValue("isCopayUltimateProgressives", null);
        await setFieldValue("isCopayUltimateProgressiveAmount", "");
        await setFieldValue("copayUltimateProgressiveAmount", "");
    }
    if (
        values?.visionPlan === "Davis Vision" &&
        (e?.target?.value === "Bifocal" || e?.target?.value === "Trifocal")
    ) {
        validations.blendedBifocal = Yup.string().required(
            "Blended biofocal is required"
        );
    } else if (
        values?.visionPlan === "Davis Vision" &&
        (e?.target?.value !== "Bifocal" || e?.target?.value !== "Trifocal")
    ) {
        delete validations?.blendedBifocal;
        await setFieldValue("blendedBifocal", "");
    }
    validations.lensTypeValue = Yup.string().required("Brand is required");
    setCalValidations({
        ...validations,
    });
};
