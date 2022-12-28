export const getAddons = (calculatorObj, addon, key, plan) => {
    return calculatorObj?.addons
        ?.find((val) => val?.title === plan)
        ?.addon_types?.find((item) => item?.title === addon)
        ?.addons?.find((ele) => ele?.title === key);
};

export const getAddonsList = (calculatorObj, currentplan, key) => {
    return calculatorObj?.addons
        ?.find((plan) => plan?.title === currentplan)
        ?.addon_types?.find((item) => item?.title === key)?.addons;
};
