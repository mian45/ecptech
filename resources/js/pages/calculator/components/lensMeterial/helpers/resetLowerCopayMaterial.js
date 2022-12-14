export const resetLowerCopayMaterial = async (
    e,
    calValidations,
    setCalValidations,
    formProps
) => {
    const { setFieldValue } = formProps;
    const validations = { ...calValidations };

    if (e?.target?.value !== "Polycarbonate") {
        //reset polycarbonate validations
        delete validations?.isCopayPolycarbonateAmount;
        delete validations?.copayPolycarbonateAmount;

        //reset polycarbonate values
        await setFieldValue("isCopayPolycarbonate", null);
        await setFieldValue("isCopayPolycarbonateAmount", "");
        await setFieldValue("copayPolycarbonateAmount", "");
    }

    if (
        !(
            e?.target?.value?.includes("Hi index") ||
            e?.target?.value?.includes("Hi Index")
        )
    ) {
        //reset high index validations
        delete validations.isCopayHighIndexAmount;
        delete validations.copayHighIndexAmount;

        //reset high index values
        await setFieldValue("isCopayHighIndex", null);
        await setFieldValue("isCopayHighIndexAmount", "");
        await setFieldValue("copayHighIndexAmount", "");
    }

    setCalValidations({ ...validations });
};
