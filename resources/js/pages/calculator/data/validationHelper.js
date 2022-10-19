import * as Yup from "yup";

export const CreateCalculatorValidations = (data) => {
    const validationObject = {};
    validationObject.invoiceName = Yup.string().required(
        "Invoice name is required"
    );
    validationObject.staffName = Yup.string().required(
        "Staff name is required"
    );
    if (
        !data?.find((ques) => ques.question === "Select Vision Plan")?.optional
    ) {
        validationObject.visionPlan = Yup.string().required(
            "Vision plan is required"
        );
    }
    if (
        !data?.find((ques) => ques.question === "Frame Benefit Available")
            ?.optional
    ) {
        validationObject.isFrameBenifit = Yup.string().required(
            "Frame benefit is required"
        );
    }
    if (
        !data?.find((ques) => ques.question === "Lens Benefit Available")
            ?.optional
    ) {
        validationObject.isLensBenifit = Yup.string().required(
            "Lens benefit is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Material Copay")?.optional) {
        validationObject.materialCopay = Yup.string().required(
            "Material copay is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Frame Order")?.optional) {
        validationObject.frameOrderType = Yup.string().required(
            "Frame Order is required"
        );
    }
    if (
        !data?.find(
            (ques) => ques.question === "Any copay lowered than standard"
        )?.optional
    ) {
        validationObject.isloweredCopay =
            Yup.string().required("Option is required");
    }
    if (!data?.find((ques) => ques.question === "Lens Type")?.optional) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Lens Type")?.optional) {
        validationObject.lensTypeValue =
            Yup.string().required("Option is required");
    }
    if (!data?.find((ques) => ques.question === "Lens Material")?.optional) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Photochromics")?.optional) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Sunglass Lens")?.optional) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglass lens is required"
        );
    }
    if (
        !data?.find((ques) => ques.question === "Antireflective Properties")
            ?.optional
    ) {
        validationObject.isAntireflective = Yup.string().required(
            "Antireflective is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Protection Plan")?.optional) {
        validationObject.isProtectionPlan = Yup.string().required(
            "Protection plan is required"
        );
    }
    if (!data?.find((ques) => ques.question === "Add Shipping")?.optional) {
        validationObject.shipping = Yup.string().required(
            "Add Shipping is required"
        );
    }
    return validationObject;
};

export const GetMappedPayload = (data) => {
    return {
        submitBenifitType: data?.submitBenifitType,
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

export const mappedEditValues = (data) => {
    const userState = JSON.parse(data?.user_state);
    const lowerCopay = userState?.lowerCopaythanStandard?.copayList;
    const polycarbonate = lowerCopay.find(
        (item) => item.type === "Polycarbonate"
    );
    const photochromic = lowerCopay.find(
        (item) => item.type === "Photochromic"
    );
    const hignIndex = lowerCopay.find((item) => item.type === "High Index");
    const antiReflective = lowerCopay.find(
        (item) => item.type === "Anti-Reflective Properties"
    );
    const premiumProgresive = lowerCopay.find(
        (item) => item.type === "Premium Progressives"
    );

    return {
        benifitType: userState?.submitBenifitType || "",
        submitBenifitType: "",
        invoiceName: data?.name || "",
        staffName: userState?.staffName || "",
        staffId: userState?.staffId || "",
        visionPlan: userState?.visionPlan || "",
        isFrameBenifit: userState?.isFrameBenifit || "",
        isLensBenifit: userState?.isLensBenifit || "",
        materialCopay: userState?.materialCopay || "",
        frameOrderType: userState?.frameOrder?.type || "",
        frameRetailFee: userState?.frameOrder?.retailFee || "",
        frameContribution: userState?.frameOrder?.frameContribution || "",
        drillMount: userState?.frameOrder?.drillMount || "",
        isloweredCopay: userState?.lowerCopaythanStandard?.value || "",
        isCopayPolycarbonate: polycarbonate?.status || null,
        isCopayPhotochromic: photochromic?.status || null,
        isCopayHighIndex: hignIndex?.status || null,
        isCopayAntiReflective: antiReflective?.status || null,
        isCopayPremiumProgressives: premiumProgresive?.status || null,
        isCopayPolycarbonateAmount: polycarbonate?.copayType || "",
        copayPolycarbonateAmount: polycarbonate?.price || "",
        isCopayPhotochromicAmount: photochromic?.copayType || "",
        copayPhotochromicAmount: photochromic?.price || "",
        isCopayHighIndexAmount: hignIndex?.copayType || "",
        copayHighIndexAmount: hignIndex?.price || "",
        isCopayAntiReflectiveAmount: antiReflective?.copayType || "",
        copayAntiReflectiveAmount: antiReflective?.price || "",
        isCopaypremiumProgressiveAmount: antiReflective?.copayType || "",
        copaypremiumProgressiveAmount: antiReflective?.price || "",
        lensType: userState?.lensType?.type || "",
        lensTypeValue: userState?.lensType?.brand || "",
        lensMaterial: userState?.lensMaterial || "",
        isPhotochromics: userState?.photochromics?.status || "",
        photochromicsType: userState?.photochromics?.type || "",
        isSunglasses: userState?.sunGlassesLens?.status || "",
        sunglassesType: userState?.sunGlassesLens?.lensType || "",
        tintType: userState?.sunGlassesLens?.tintType || "",
        isMirrorCoating: userState?.sunGlassesLens?.mirrorCoating || "",
        mirrorCoatingType: userState?.sunGlassesLens?.coatingType || "",
        isAntireflective: userState?.antiReflectiveProperties?.status || "",
        antireflectiveType: userState?.antiReflectiveProperties?.type || "",
        isProtectionPlan: userState?.protectionPlan?.status || "",
        protectionPlanType: userState?.protectionPlan?.type || "",
        isProtectionPlanPaid: userState?.protectionPlan?.paymentStatus || "",
        protectionPlanAmount: userState?.protectionPlan?.price || "",
        shipping: userState?.shipping?.status || "",
        shippingAmount: userState?.shipping?.price || "",
    };
};
