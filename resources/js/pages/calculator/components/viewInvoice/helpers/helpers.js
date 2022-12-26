export const getManufacturer = (data, calculatorObj) => {
    return calculatorObj?.lens_types?.find(
        (lensType) => lensType?.title === data?.lensType?.type
    )?.brands;
};
