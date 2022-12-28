export const handleFrameBenifitNo = (calValidations, setCalValidations) => {
    const validations = { ...calValidations };

    delete validations.frameOrderType;
    delete validations.frameRetailFee;
    delete validations.frameContribution;
    delete validations.drillMount;
    delete validations.drillMountValue;
    delete validations.drillMountOptions;
    delete validations.tracingFee;

    setCalValidations({
        ...validations,
    });
};
