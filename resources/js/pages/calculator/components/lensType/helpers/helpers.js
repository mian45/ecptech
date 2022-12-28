import { CompareStrings } from "../../../../../utils/utils";

export const getVBASingleVisionCategories = (calculatorObj, values) => {
    return calculatorObj["lens_types"]?.find(
        (val) => val?.title === values?.lensType
    )?.categories;
};
export const getVBASingleVisionSubCategories = (calculatorObj, values) => {
    return calculatorObj["lens_types"]
        ?.find((val) => val?.title === values?.lensType)
        ?.categories?.find((item) => item?.title === values?.lensCategory)
        ?.sub_categories;
};

export const getRegularPlanBrands = (calculatorObj, values) => {
    const selectedLensType = calculatorObj["lens_types"]?.find(
        (value) => value?.title === values?.lensType
    );
    let lenses = [];
    selectedLensType?.brands?.forEach((element) => {
        element?.collections?.forEach((lens) => {
            lenses.push(lens);
        });
    });
    return lenses;
};

export const getVbaSingleVisionBrands = (calculatorObj, values) => {
    const selectedLensType = calculatorObj["lens_types"]
        ?.find((value) => value?.title === values?.lensType)
        ?.categories?.find((item) => item?.title === values?.lensCategory)
        ?.sub_categories?.find((val) => val?.title === values?.lensSubCategory);
    let lenses = [];
    selectedLensType?.brands?.forEach((element) => {
        element?.collections?.forEach((lens) => {
            lenses.push(lens);
        });
    });
    return lenses;
};

export const getVbaPALBrands = (calculatorObj, values) => {
    const selectedLensType = calculatorObj["lens_types"]
        ?.find((value) => value?.title === values?.lensType)
        ?.categories?.find((item) => item?.title === values?.lensCategory);
    let lenses = [];
    selectedLensType?.brands?.forEach((element) => {
        element?.collections?.forEach((lens) => {
            lenses.push(lens);
        });
    });
    return lenses;
};

export const isShowBrands = (values) => {
    return (CompareStrings(values?.visionPlan, "VBA") &&
        CompareStrings(values?.lensType, "Single Vision") &&
        values?.lensCategory &&
        values?.lensSubCategory) ||
        (CompareStrings(values?.visionPlan, "VBA") &&
            CompareStrings(values?.lensType, "PAL") &&
            values?.lensCategory) ||
        (CompareStrings(values?.visionPlan, "VBA") &&
            CompareStrings(values?.lensType, "NVF")) ||
        (!CompareStrings(values?.visionPlan, "VBA") && values?.lensType)
        ? true
        : false;
};
