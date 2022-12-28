export const getPhotochromicsAddons = (calculatorObj, currentplan, key) => {
    return calculatorObj?.addons
        ?.find((plan) => plan?.title === currentplan)
        ?.addon_types?.find((item) => item?.title === key)?.addons;
};
