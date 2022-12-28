export const handleAntiReflectiveNoValidations = async (
    formProps,
    calValidations,
    setCalValidations
) => {
    const { setFieldValue } = formProps;
    const validations = { ...calValidations };

    delete validations.antireflectiveType;
    delete validations.antiReflectiveCategory;
    delete validations.antireflectiveValue;

    // remove anti reflective validations
    delete validations.isCopayAntiReflectiveAmount;
    delete validations.copayAntiReflectiveAmount;

    // remove standard anti reflective validations
    delete validations.isCopayStandardAntireflectiveAmount;
    delete validations.copayStandardAntireflectiveAmount;

    // remove premium anti reflective validations
    delete validations.isCopayPremiumAntireflectiveAmount;
    delete validations.copayPremiumAntireflectiveAmount;

    // remove Ultra anti reflective validations
    delete validations.isCopayUltraAntireflectiveAmount;
    delete validations.copayUltraAntireflectiveAmount;

    // remove ultimate anti reflective validations
    delete validations.isCopayUltimateAntireflectiveAmount;
    delete validations.copayUltimateAntireflectiveAmount;

    setCalValidations({
        ...validations,
    });

    await setFieldValue("antireflectiveType", "");
    await setFieldValue("antiReflectiveCategory", "");
    await setFieldValue("antireflectiveValue", "");

    // reset lower copay Anti reflective values
    await setFieldValue("isCopayAntiReflective", null);
    await setFieldValue("isCopayAntiReflectiveAmount", "");
    await setFieldValue("copayAntiReflectiveAmount", "");

    // reset lower copay standard Anti reflective values
    await setFieldValue("isCopayStandardAntireflective", null);
    await setFieldValue("isCopayStandardAntireflectiveAmount", "");
    await setFieldValue("copayStandardAntireflectiveAmount", "");

    // reset lower copay Premium Anti reflective values
    await setFieldValue("isCopayPremiumAntireflective", null);
    await setFieldValue("isCopayPremiumAntireflectiveAmount", "");
    await setFieldValue("copayPremiumAntireflectiveAmount", "");

    // reset lower copay Ultra Anti reflective values
    await setFieldValue("isCopayUltraAntireflective", null);
    await setFieldValue("isCopayUltraAntireflectiveAmount", "");
    await setFieldValue("copayUltraAntireflectiveAmount", "");

    // reset lower copay Ultimate Anti reflective values
    await setFieldValue("isCopayUltimateAntireflective", null);
    await setFieldValue("isCopayUltimateAntireflectiveAmount", "");
    await setFieldValue("copayUltimateAntireflectiveAmount", "");
};
