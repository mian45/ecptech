import * as Yup from "yup";

export const CreateCalculatorValidations = (data) => {
    const validationObject = {};
    validationObject.invoiceName = Yup.string().required(
        "Invoice name is required"
    );
    if (!data?.visionPlan?.optional) {
        validationObject.visionPlan = Yup.string().required(
            "Vision plan is required"
        );
    }
    if (!data?.frameBenefit?.optional) {
        validationObject.isFrameBenifit = Yup.string().required(
            "Frame benefit is required"
        );
    }
    if (!data?.lensBenefit?.optional) {
        validationObject.isLensBenifit = Yup.string().required(
            "Lens benefit is required"
        );
    }
    if (!data?.materialCopay?.optional) {
        validationObject.materialCopay = Yup.string().required(
            "Material copay is required"
        );
    }
    if (!data?.frameOrder?.optional) {
        validationObject.frameOrderType = Yup.string().required(
            "Frame Order is required"
        );
    }
    if (!data?.copayDollarAmount?.optional) {
        validationObject.isloweredCopay =
            Yup.string().required("Option is required");
    }
    if (!data?.lensType?.optional) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    if (!data?.lensType?.optional) {
        validationObject.lensTypeValue =
            Yup.string().required("Option is required");
    }
    if (!data?.lensMaterial?.optional) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (!data?.photochromics?.optional) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (!data?.sunglassLens?.optional) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglass lens is required"
        );
    }
    if (!data?.antireflective?.optional) {
        validationObject.isAntireflective = Yup.string().required(
            "Antireflective is required"
        );
    }
    if (!data?.protectionPlan?.optional) {
        validationObject.isProtectionPlan = Yup.string().required(
            "Protection plan is required"
        );
    }
    if (!data?.shipping?.optional) {
        validationObject.shipping = Yup.string().required(
            "Add Shipping is required"
        );
    }
    return validationObject;
};

export const GetMappedPayload = (data) => {
    return {
        invoiceName: data?.invoiceName,
        staffName: data?.staffName,
        staffId: data?.staffId,
        visionPlan: data?.visionPlan,
        isFrameBenifit: data?.isFrameBenifit,
        isLensBenifit: data?.isLensBenifit,
        materialCopay: data?.materialCopay,
        frameOrder: {
            type: data?.frameOrderType,
            retailFee: data?.frameRetailFee,
            frameContribution: data?.frameContribution,
            drillMount: data?.drillMount,
        },
        lowerCopaythanStandard: {
            value: data?.isloweredCopay,
            copayList: [
                {
                    type: "Polycarbonate",
                    status: data?.isCopayPolycarbonate,
                    copayType: data?.isCopayPolycarbonateAmount,
                    price: data?.copayPolycarbonateAmount,
                },
                {
                    type: "Photochromic",
                    status: data?.isCopayPhotochromic,
                    copayType: data?.isCopayPhotochromicAmount,
                    price: data?.copayPhotochromicAmount,
                },
                {
                    type: "High Index",
                    status: data?.isCopayHighIndex,
                    copayType: data?.isCopayHighIndexAmount,
                    price: data?.copayHighIndexAmount,
                },
                {
                    type: "Anti-Reflective Properties",
                    status: data?.isCopayAntiReflective,
                    copayType: data?.isCopayAntiReflectiveAmount,
                    price: data?.copayAntiReflectiveAmount,
                },
                {
                    type: "Premium Progressives",
                    status: data?.isCopayPremiumProgressives,
                    copayType: data?.isCopaypremiumProgressiveAmount,
                    price: data?.copaypremiumProgressiveAmount,
                },
            ],
        },
        lensType: {
            type: data?.lensType,
            brand: data?.lensTypeValue,
        },
        lensMaterial: data?.lensMaterial,
        photochromics: {
            status: data?.isPhotochromics,
            type: data?.photochromicsType,
        },
        sunGlassesLens: {
            status: data?.isSunglasses,
            lensType: data?.sunglassesType,
            tintType: data?.tintType,
            mirrorCoating: data?.isMirrorCoating,
            coatingType: data?.mirrorCoatingType,
        },
        antiReflectiveProperties: {
            status: data?.isAntireflective,
            type: data?.antireflectiveType,
        },
        protectionPlan: {
            status: data?.isProtectionPlan,
            type: data?.protectionPlanType,
            paymentStatus: data?.isProtectionPlanPaid,
            price: data?.protectionPlanAmount,
        },
        shipping: {
            status: data?.shipping,
            price: data?.shippingAmount,
        },
    };
};
