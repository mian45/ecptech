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
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayPhotochromic":
            return (
                !value &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayHighIndex":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayAntiReflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayPremiumProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayStandardProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayCustomProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayUltraProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayUltimateProgressives":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayStandardAntireflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayPremiumAntireflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayUltraAntireflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayCustomProgressives &&
                !values?.isCopayUltimateAntireflective
            );
        case "isCopayUltimateAntireflective":
            return (
                !value &&
                !values?.isCopayPhotochromic &&
                !values?.isCopayHighIndex &&
                !values?.isCopayAntiReflective &&
                !values?.isCopayPremiumProgressives &&
                !values?.isCopayStandardProgressives &&
                !values?.isCopayPolycarbonate &&
                !values?.isCopayUltraProgressives &&
                !values?.isCopayUltimateProgressives &&
                !values?.isCopayStandardAntireflective &&
                !values?.isCopayPremiumAntireflective &&
                !values?.isCopayUltraAntireflective &&
                !values?.isCopayCustomProgressives
            );
    }
};
