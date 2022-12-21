import * as Yup from "yup";

export const handleFrameBenifitYes = (data, isContribution, values) => {
    const validationObject = {};
    // add Frame Order validations
    if (
        data?.find((ques) => ques?.question === "Frame Order")?.optional ===
        "true"
    ) {
        validationObject.frameOrderType = Yup.string().required(
            "Frame Order is required"
        );
    }

    // add Frame Retail Fee validations
    if (values?.frameOrderType === "New Frame Purchase") {
        validationObject.frameRetailFee = Yup.string().required(
            "Retail fee is required"
        );
        // add Drill mount validations
        validationObject.drillMount = Yup.string().required(
            "Drill mount is required"
        );
    }

    // add Frame Contribution Fee validations
    if (values?.frameOrderType === "New Frame Purchase" && isContribution) {
        validationObject.frameContribution = Yup.string().required(
            "Contribution is required"
        );
    }

    // add Drill mount input validations
    if (
        values?.frameOrderType === "New Frame Purchase" &&
        values?.drillMount === "Yes" &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.drillMountValue = Yup.string().required(
            "Drill mount is required"
        );
    }

    // add Tracing Fee validations
    if (values?.frameOrderType === "Patient Own Frame") {
        validationObject.tracingFee = Yup.string().required(
            "Tracing Fee is required"
        );
    }

    return validationObject;
};
