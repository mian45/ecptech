import { GetMappedPayload } from "../../../data/validationHelper";
import {
    getPriceByAntireflective,
    getPriceByPhotochromicMaterial,
    getPriceFromDB,
    GetPrivateAntireflectivePrice,
    GetPrivateLensFee,
    GetPrivatePayMaterialPrice,
    GetPrivatePhotochromicPrice,
} from "../../viewInvoice/helpers/pricesHelper/calculateOtherPlansPrices";

export const getOriginalPrice = (
    value,
    calculatorObj,
    lensPrices,
    values,
    davisMaterials
) => {
    const data = GetMappedPayload(values);
    let lensPrice = 0;
    let materialPrice = 0;
    let antireflective = 0;
    let photochromic = 0;
    if (data?.visionPlan === "Private Pay") {
        lensPrice = parseFloat(GetPrivateLensFee(calculatorObj, data) || 0);
        materialPrice = parseFloat(
            GetPrivatePayMaterialPrice(calculatorObj, data) || 0
        );
        antireflective = parseFloat(
            GetPrivateAntireflectivePrice(
                calculatorObj,
                data?.antiReflectiveProperties?.type,
                data
            ) || 0
        );
        photochromic = parseFloat(
            GetPrivatePhotochromicPrice(
                data?.photochromics?.type,
                calculatorObj,
                data
            )
        );
    } else if (data?.visionPlan === "Davis Vision") {
        console.log("davisMaterials", davisMaterials);
        //get lens type price
        const lensType = calculatorObj?.lens_types?.find(
            (item) => item.title === values?.lensType
        );
        lensType?.brands?.forEach((item) => {
            item.collections?.forEach((val) => {
                if (val?.display_name) {
                    if (val.display_name == values?.lensTypeValue) {
                        lensPrice = parseFloat(val?.lense_price || 0);
                    }
                } else {
                    if (val.title == values?.lensTypeValue) {
                        lensPrice = parseFloat(val?.lense_price || 0);
                    }
                }
            });
        });
        //get lens material price
        const activeMaterial = davisMaterials?.find(
            (item) => item?.lens_material_title === values?.lensMaterial
        );
        materialPrice = parseFloat(activeMaterial?.price || 0);
        //get antireflectivePrice
        const activeAddon = calculatorObj?.addons
            ?.find((item) => item?.title === values?.visionPlan)
            ?.addon_types?.find(
                (val) => val?.title === "Anti-Reflective Properties"
            )
            ?.addons?.find(
                (addon) => addon?.title === values?.antireflectiveType
            );
        antireflective = parseFloat(activeAddon?.addon_price || 0);
        //get photochromic price
        const activePhotochromic = calculatorObj?.addons
            ?.find((item) => item?.title === values?.visionPlan)
            ?.addon_types?.find((val) => val?.title === "Photochromics")
            ?.addons?.find(
                (addon) => addon?.title === values?.photochromicsType
            );
        photochromic = parseFloat(activePhotochromic?.addon_price || 0);
    } else {
        lensPrice = parseFloat(
            getPriceFromDB(data, calculatorObj, lensPrices)?.lensPrice
        );
        materialPrice = parseFloat(
            getPriceFromDB(data, calculatorObj, lensPrices)?.materialPrice
        );
        if (data?.antiReflectiveProperties?.status === "Yes") {
            const price = getPriceByAntireflective(
                data?.visionPlan,
                data?.antiReflectiveProperties?.type
            );
            antireflective = parseFloat(price || 0);
        }
        if (data?.photochromics?.status === "Yes") {
            const price = getPriceByPhotochromicMaterial(
                data?.visionPlan,
                data?.photochromics?.type
            );
            photochromic = parseFloat(price || 0);
        }
    }
    switch (value) {
        case "copayStandardProgressiveAmount":
        case "copayCustomProgressiveAmount":
        case "copaypremiumProgressiveAmount":
        case "copayUltraProgressiveAmount":
        case "copayUltimateProgressiveAmount":
            return lensPrice;
        case "copayAntiReflectiveAmount":
        case "copayStandardAntireflectiveAmount":
        case "copayPremiumAntireflectiveAmount":
        case "copayUltraAntireflectiveAmount":
        case "copayUltimateAntireflectiveAmount":
            return antireflective;
        case "copayHighIndexAmount":
            return materialPrice;
        case "copayPhotochromicAmount":
            return photochromic;
        case "copayPolycarbonateAmount":
            return materialPrice;
    }
};
