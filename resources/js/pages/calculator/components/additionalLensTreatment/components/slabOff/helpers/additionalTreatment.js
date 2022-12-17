export const getAdditionalTreatment = (calculatorObj, addon, key, plan) => {
    return calculatorObj?.additional_lense_setting
        ?.find((item) => item?.title === plan)
        ?.addon_types?.find((val) => val?.title === addon)
        ?.addons?.find((ele) => ele?.title === key);
};
