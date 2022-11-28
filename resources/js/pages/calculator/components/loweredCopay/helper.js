export const handleCheckboxFalse = (values, key, value) => {
    switch (key) {
        case "isCopayPolycarbonate":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayPhotochromic":
            return (
                !value &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayHighIndex":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayAntiReflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayPremiumProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayStandardProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayCustomProgressives
            );
        case "isCopayCustomProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate
            );
    }
};
