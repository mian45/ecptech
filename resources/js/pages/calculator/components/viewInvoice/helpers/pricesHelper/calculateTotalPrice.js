import { CalculateEyemedPlansPrices } from "./calculateEyemedPrice";
import { CalculateOtherPlansPrices } from "./calculateOtherPlansPrices";

export const CalculateTotalPrice = (
    data,
    calculatorObj,
    lensPrices,
    plansList,
    plansJson
) => {
    if (data?.visionPlan === plansList?.privatePay) {
        return CalculateOtherPlansPrices(data, calculatorObj, lensPrices, true);
    } else if (data?.visionPlan === plansList?.eyemed) {
        return CalculateEyemedPlansPrices(
            data,
            calculatorObj,
            plansList,
            plansJson
        );
    } else {
        return CalculateOtherPlansPrices(
            data,
            calculatorObj,
            lensPrices,
            false
        );
    }
};

export const CalculateWithTaxesTotalPrice = (
    data,
    calculatorObj,
    lensPrices,
    plansList,
    plansJson
) => {
    let total = 0;
    // without taxes price
    total =
        total +
        CalculateTotalPrice(
            data,
            calculatorObj,
            lensPrices,
            plansList,
            plansJson
        );
    //remove disount price
    total = total - GetAppliedDiscount(total, data);
    //add tax
    let totalTax = 0;
    calculatorObj?.tax?.forEach((element) => {
        if (element?.status === "active") {
            totalTax = totalTax + parseFloat(element?.value || 0);
        }
    });
    const tax =
        (CalculateTotalPrice(
            data,
            calculatorObj,
            lensPrices,
            plansList,
            plansJson
        ) *
            (totalTax || 0)) /
        100;
    total = total + tax;
    //add shipping
    if (data?.shipping?.status === "Yes") {
        total = total + (parseFloat(calculatorObj?.shipping) || 0);
    }
    return total;
};

export const GetAppliedDiscount = (price, data) => {
    const discountToApply = parseFloat(data?.discount?.value || "") || 0;
    if (discountToApply == 0) {
        return 0;
    } else {
        if (data?.discount?.amountType === "percentage") {
            const result = (price * discountToApply) / 100;
            return parseFloat(result);
        } else {
            return discountToApply;
        }
    }
};
