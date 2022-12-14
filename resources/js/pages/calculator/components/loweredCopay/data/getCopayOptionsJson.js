import { LowerCopayTypeEnum } from "../../../data/enums";

export const GetCopayOptionsJson = (actions) => {
    const { values, onChange, lensPrices } = actions;
    const isStandardProgressiveDisable = () => {
        if (values?.visionPlan === "Davis Vision") {
            return values?.lensType &&
                values?.lensType === "PAL" &&
                values?.lensTypeValue
                ? false
                : true;
        } else if (values?.visionPlan !== "Davis Vision") {
            return (
                Object.keys(lensPrices)?.length === 0 ||
                (values?.lensType !== "PAL" && values?.lensTypeValue)
            );
        }
        return true;
    };
    const isHighIndexDisable = () => {
        if (values?.visionPlan === "Davis Vision") {
            return values?.lensMaterial &&
                (values?.lensMaterial?.includes("Hi index") ||
                    values?.lensMaterial?.includes("Hi Index"))
                ? false
                : true;
        } else if (values?.visionPlan !== "Davis Vision") {
            return (
                Object.keys(lensPrices)?.length === 0 ||
                !(
                    values?.lensMaterial?.includes("Hi index") ||
                    values?.lensMaterial?.includes("Hi Index")
                )
            );
        }
        return true;
    };

    return [
        {
            label: LowerCopayTypeEnum.polycarbonate,
            defaultChecked: values?.isCopayPolycarbonate || false,
            active: values?.isCopayPolycarbonate || false,
            onChange: onChange,
            id: "isCopayPolycarbonate",
            name: "isCopayPolycarbonate",
            isShow: values?.visionPlan === "Davis Vision" ? false : true,
            isDisable:
                values?.lensMaterial.toLowerCase() !==
                    "Polycarbonate".toLowerCase() ||
                Object.keys(lensPrices)?.length === 0,
        },
        {
            label: LowerCopayTypeEnum.photochromic,
            defaultChecked: values?.isCopayPhotochromic || false,
            active: values?.isCopayPhotochromic || false,
            onChange: onChange,
            id: "isCopayPhotochromic",
            name: "isCopayPhotochromic",
            isShow: true,
            isDisable:
                !values?.isPhotochromics ||
                values?.isPhotochromics === "No" ||
                !values?.photochromicsType,
        },
        {
            label: LowerCopayTypeEnum.highIndex,
            defaultChecked: values?.isCopayHighIndex || false,
            active: values?.isCopayHighIndex || false,
            onChange: onChange,
            id: "isCopayHighIndex",
            name: "isCopayHighIndex",
            isShow: true,
            isDisable: isHighIndexDisable(),
        },
        {
            label: LowerCopayTypeEnum.antiReflective,
            defaultChecked: values?.isCopayAntiReflective || false,
            active: values?.isCopayAntiReflective || false,
            onChange: onChange,
            id: "isCopayAntiReflective",
            name: "isCopayAntiReflective",
            isShow: values?.visionPlan === "Davis Vision" ? false : true,
            isDisable:
                !values?.isAntireflective ||
                values?.isAntireflective === "No" ||
                !values?.antireflectiveType,
        },
        {
            label: LowerCopayTypeEnum.standardProgressives,
            defaultChecked: values?.isCopayStandardProgressives || false,
            active: values?.isCopayStandardProgressives || false,
            onChange: onChange,
            id: "isCopayStandardProgressives",
            name: "isCopayStandardProgressives",
            isShow: true,
            isDisable: isStandardProgressiveDisable(),
        },
        {
            label: LowerCopayTypeEnum.premiumProgressives,
            defaultChecked: values?.isCopayPremiumProgressives || false,
            active: values?.isCopayPremiumProgressives || false,
            onChange: onChange,
            id: "isCopayPremiumProgressives",
            name: "isCopayPremiumProgressives",
            isShow: true,
            isDisable: isStandardProgressiveDisable(),
        },
        {
            label: LowerCopayTypeEnum.customProgressives,
            defaultChecked: values?.isCopayCustomProgressives || false,
            active: values?.isCopayCustomProgressives || false,
            onChange: onChange,
            id: "isCopayCustomProgressives",
            name: "isCopayCustomProgressives",
            isShow: values?.visionPlan === "Davis Vision" ? false : true,
            isDisable:
                Object.keys(lensPrices)?.length === 0 ||
                (values?.lensType !== "PAL" && values?.lensTypeValue),
        },
        {
            label: LowerCopayTypeEnum.ultraProgressive,
            defaultChecked: values?.isCopayUltraProgressives || false,
            active: values?.isCopayUltraProgressives || false,
            onChange: onChange,
            id: "isCopayUltraProgressives",
            name: "isCopayUltraProgressives",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.lensType &&
                values?.lensType === "PAL" &&
                values?.lensTypeValue
                    ? false
                    : true,
        },
        {
            label: LowerCopayTypeEnum.ultimateProgressive,
            defaultChecked: values?.isCopayUltimateProgressives || false,
            active: values?.isCopayUltimateProgressives || false,
            onChange: onChange,
            id: "isCopayUltimateProgressives",
            name: "isCopayUltimateProgressives",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.lensType &&
                values?.lensType === "PAL" &&
                values?.lensTypeValue
                    ? false
                    : true,
        },
        {
            label: LowerCopayTypeEnum.standardAntireflective,
            defaultChecked: values?.isCopayStandardAntireflective || false,
            active: values?.isCopayStandardAntireflective || false,
            onChange: onChange,
            id: "isCopayStandardAntireflective",
            name: "isCopayStandardAntireflective",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.isAntireflective === "Yes" && values?.antireflectiveType
                    ? false
                    : true,
        },
        {
            label: LowerCopayTypeEnum.premiumAntireflective,
            defaultChecked: values?.isCopayPremiumAntireflective || false,
            active: values?.isCopayPremiumAntireflective || false,
            onChange: onChange,
            id: "isCopayPremiumAntireflective",
            name: "isCopayPremiumAntireflective",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.isAntireflective === "Yes" && values?.antireflectiveType
                    ? false
                    : true,
        },
        {
            label: LowerCopayTypeEnum.ultraAntireflective,
            defaultChecked: values?.isCopayUltraAntireflective || false,
            active: values?.isCopayUltraAntireflective || false,
            onChange: onChange,
            id: "isCopayUltraAntireflective",
            name: "isCopayUltraAntireflective",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.isAntireflective === "Yes" && values?.antireflectiveType
                    ? false
                    : true,
        },
        {
            label: LowerCopayTypeEnum.ultimateAntireflective,
            defaultChecked: values?.isCopayUltimateAntireflective || false,
            active: values?.isCopayUltimateAntireflective || false,
            onChange: onChange,
            id: "isCopayUltimateAntireflective",
            name: "isCopayUltimateAntireflective",
            isShow: values?.visionPlan !== "Davis Vision" ? false : true,
            isDisable:
                values?.isAntireflective === "Yes" && values?.antireflectiveType
                    ? false
                    : true,
        },
    ];
};
