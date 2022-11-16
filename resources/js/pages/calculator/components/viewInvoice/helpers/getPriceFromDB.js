import { getPrivatePayLensPices, getPrivatePayMaterialPices } from "..";

export const getPriceFromDB = (receipt, calculatorObj, lensPrices) => {
    let lensPrice = 0;
    let materialPrice = 0;

    let progressiveCategory = "";

    const categoryBrands = calculatorObj?.lens_types.find(
        (item) => item?.title === "PAL"
    )?.brands;
    categoryBrands?.forEach((item) => {
        item.collections?.forEach((val) => {
            if (val?.display_name) {
                if (val.display_name == receipt?.values?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            } else {
                if (val.title == receipt?.values?.lensType?.brand) {
                    progressiveCategory = val?.category;
                }
            }
        });
    });

    const isStandardProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Standard Progressives"
        );
    const isPremiumProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Premium Progressives"
        );
    const isCustomProg =
        receipt?.values?.lowerCopaythanStandard?.copayList?.find(
            (item) => item?.type === "Custom Progressives"
        );

    const materials =
        lensPrices?.lenses_price &&
        lensPrices?.lenses_price[0]?.lenses?.filter(
            (item) =>
                item?.lens_material_title === receipt?.values?.lensMaterial
        );

    if (materials?.length <= 0) {
        if (receipt?.values?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isCustomProg?.price;
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isPremiumProg?.price;
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isStandardProg?.price;
                }
            }
        }
        return {
            lensPrice: lensPrice,
            materialPrice: materialPrice,
        };
    } else if (materials?.characteristics?.length === 1) {
        if (receipt?.values?.visionPlan === "VSP Advantage") {
            if (
                (materials[0]?.characteristics?.price_formula || "")?.trim() ===
                "80% of U&C"
            ) {
                lensPrice =
                    parseFloat(
                        getPrivatePayLensPices(
                            calculatorObj,
                            receipt,
                            lensPrices
                        )
                    ) * 0.8;
            } else {
                if (
                    (materials[0]?.characteristics?.price || "")?.trim() ===
                        "NULL" ||
                    !(materials[0]?.characteristics?.price || "")?.trim()
                ) {
                    lensPrice = 0;
                } else {
                    lensPrice = (
                        materials[0]?.characteristics?.price || ""
                    )?.trim();
                }
            }
        } else {
            if (
                (materials[0]?.characteristics?.price || "")?.trim() ===
                    "NULL" ||
                !(materials[0]?.characteristics?.price || "")?.trim()
            ) {
                lensPrice = 0;
            } else {
                lensPrice = (
                    materials[0]?.characteristics?.price || ""
                )?.trim();
            }
        }
        if (receipt?.values?.lensType?.type === "PAL") {
            if (isCustomProg?.status && progressiveCategory === "Custom") {
                if (isCustomProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isCustomProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isCustomProg?.price;
                }
            } else if (
                isPremiumProg?.status &&
                progressiveCategory === "Premium"
            ) {
                if (isPremiumProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isPremiumProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isPremiumProg?.price;
                }
            } else if (
                isStandardProg?.status &&
                progressiveCategory === "Standard"
            ) {
                if (isStandardProg?.copayType === "$0 Copay") {
                    materialPrice = 0;
                } else if (
                    isStandardProg?.copayType === "Lowered copay dollar amount"
                ) {
                    materialPrice = isStandardProg?.price;
                }
            }
        }
        return {
            lensPrice: lensPrice,
            materialPrice: materialPrice,
        };
    } else {
        //multiple case
        const baseCharecterstics = materials[0]?.characteristics?.filter(
            (item) => item.type !== "add-on"
        );
        const TACharecterstics = materials[0]?.characteristics?.filter(
            (item) => item.name === "TA"
        );
        if (materials) {
            if (receipt?.values?.visionPlan === "VSP Advantage") {
                if (
                    (baseCharecterstics[0]?.price_formula || "")?.trim() ===
                    "80% of U&C"
                ) {
                    lensPrice =
                        parseFloat(
                            getPrivatePayLensPices(
                                calculatorObj,
                                receipt,
                                lensPrices
                            )
                        ) * 0.8;
                } else {
                    if (
                        (materials[0]?.characteristics?.price || "")?.trim() ===
                            "NULL" ||
                        !(materials[0]?.characteristics?.price || "")?.trim()
                    ) {
                        lensPrice = 0;
                    } else {
                        lensPrice = (
                            baseCharecterstics[0]?.price || ""
                        )?.trim();
                    }
                }
                baseCharecterstics.splice(0, 1);
                const restBases = [...baseCharecterstics, ...TACharecterstics];
                restBases.forEach((item) => {
                    if ((item?.price_formula || "")?.trim() === "80% of U&C") {
                        lensPrice =
                            parseFloat(
                                getPrivatePayMaterialPices(
                                    calculatorObj,
                                    receipt,
                                    lensPrices
                                )
                            ) * 0.8;
                    } else {
                        if (
                            (item?.price || "")?.trim() === "NULL" ||
                            !(item?.price || "")?.trim()
                        ) {
                            lensPrice = 0;
                        } else {
                            materialPrice =
                                materialPrice +
                                parseInt((item?.price || "")?.trim());
                        }
                    }
                });
            } else {
                if (
                    (baseCharecterstics[0]?.price || "")?.trim() === "NULL" ||
                    !(baseCharecterstics[0]?.price || "")?.trim()
                ) {
                    lensPrice = 0;
                } else {
                    lensPrice = (baseCharecterstics[0]?.price || "")?.trim();
                }
                baseCharecterstics.splice(0, 1);
                const restBases = [...baseCharecterstics, ...TACharecterstics];
                restBases.forEach((item) => {
                    if (
                        (item?.price || "")?.trim() === "NULL" ||
                        !(item?.price || "")?.trim()
                    ) {
                        lensPrice = 0;
                    } else {
                        let currentPrice = 0;
                        if (!!item?.price) {
                            currentPrice = parseInt(
                                (item?.price || "")?.trim() || 0
                            );
                        }
                        materialPrice = materialPrice + currentPrice;
                    }
                });
                if (receipt?.values?.lensType?.type === "PAL") {
                    if (
                        isCustomProg?.status &&
                        progressiveCategory === "Custom"
                    ) {
                        if (isCustomProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isCustomProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isCustomProg?.price;
                        }
                    } else if (
                        isPremiumProg?.status &&
                        progressiveCategory === "Premium"
                    ) {
                        if (isPremiumProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isPremiumProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isPremiumProg?.price;
                        }
                    } else if (
                        isStandardProg?.status &&
                        progressiveCategory === "Standard"
                    ) {
                        if (isStandardProg?.copayType === "$0 Copay") {
                            materialPrice = 0;
                        } else if (
                            isStandardProg?.copayType ===
                            "Lowered copay dollar amount"
                        ) {
                            materialPrice = isStandardProg?.price;
                        }
                    }
                }
                return {
                    lensPrice: lensPrice,
                    materialPrice: materialPrice,
                };
            }
        } else {
            return { lensPrice: 0, materialPrice: 0 };
        }
    }
};
