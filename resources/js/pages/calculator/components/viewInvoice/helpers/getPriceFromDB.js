import { getPrivatePayLensPices, getPrivatePayMaterialPices } from "..";

export const getPriceFromDB = (receipt, calculatorObj, lensPrices) => {
    let lensPrice = 0;
    let materialPrice = 0;

    const materials =
        lensPrices?.lenses_price &&
        lensPrices?.lenses_price[0]?.lenses?.filter(
            (item) =>
                item?.lens_material_title === receipt?.values?.lensMaterial
        );
    if (materials?.length <= 0) {
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
