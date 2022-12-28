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
        data?.find((ques) => ques.question == "Select Vision Plan")
            ?.optional === "true"
    ) {
        validationObject.visionPlan = Yup.string().required(
            "Vision plan is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Frame Benefit Available")
            ?.optional === "true"
    ) {
        validationObject.isFrameBenifit = Yup.string().required(
            "Frame benefit is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Lens Benefit Available")
            ?.optional === "true"
    ) {
        validationObject.isLensBenifit = Yup.string().required(
            "Lens benefit is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Material Copay")?.optional ===
        "true"
    ) {
        validationObject.materialCopay = Yup.string().required(
            "Material copay is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Frame Order")?.optional ===
        "true"
    ) {
        validationObject.frameOrderType = Yup.string().required(
            "Frame Order is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Any copay lowered than standard")
            ?.optional === "true"
    ) {
        validationObject.isLoweredCopay =
            Yup.string().required("Option is required");
    }
    if (
        data?.find((ques) => ques.question == "Lens Type")?.optional === "true"
    ) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Lens Material")?.optional ===
        "true"
    ) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Photochromics")?.optional ===
        "true"
    ) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Sunglass Options")?.optional ===
        "true"
    ) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglass lens is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Anti-Reflective Properties")
            ?.optional === "true"
    ) {
        validationObject.isAntireflective = Yup.string().required(
            "Antireflective is required"
        );
    }
    if (
        data?.find((ques) => ques.question == "Protection Plan")?.optional ===
        "true"
    ) {
        validationObject.isProtectionPlan = Yup.string().required(
            "Protection plan is required"
        );
    }
    const shipping = data?.find((ques) => ques.question == "Add Shipping");
    if (shipping?.optional === "true") {
        validationObject.shipping = Yup.string().required(
            "Add Shipping is required"
        );
    }
    const discount = data?.find((ques) => ques.question == "Discount");
    if (discount?.optional === "true") {
        validationObject.discountType = Yup.string().required(
            "Discount is required"
        );
        validationObject.discountValue = Yup.string().required(
            "Discount Value is required"
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
            drillMountPrice: data?.drillMountValue,
            drillMountOption: data?.drillMountOptions,
        },
        lowerCopaythanStandard: {
            value: data?.isLoweredCopay,
            copayList: [
                {
                    type: "Polycarbonate",
                    status: data?.isCopayPolycarbonate,
                    copayType: data?.isCopayPolycarbonateAmount,
                    price: data?.copayPolycarbonateAmount,
                },
                {
                    type: "Photochromics",
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
                {
                    type: "Standard Progressives",
                    status: data?.isCopayStandardProgressives,
                    copayType: data?.isCopayStandardProgressiveAmount,
                    price: data?.copayStandardProgressiveAmount,
                },
                {
                    type: "Custom Progressives",
                    status: data?.isCopayCustomProgressives,
                    copayType: data?.isCopayCustomProgressiveAmount,
                    price: data?.copayCustomProgressiveAmount,
                },
                {
                    type: "Ultra Progressives",
                    status: data?.isCopayUltraProgressives,
                    copayType: data?.isCopayUltraProgressiveAmount,
                    price: data?.copayUltraProgressiveAmount,
                },
                {
                    type: "Ultimate Progressives",
                    status: data?.isCopayUltimateProgressives,
                    copayType: data?.isCopayUltimateProgressiveAmount,
                    price: data?.copayUltimateProgressiveAmount,
                },
                {
                    type: "Standard Anti-Reflective Properties",
                    status: data?.isCopayStandardAntireflective,
                    copayType: data?.isCopayStandardAntireflectiveAmount,
                    price: data?.copayStandardAntireflectiveAmount,
                },
                {
                    type: "Premium Anti-Reflective Properties",
                    status: data?.isCopayPremiumAntireflective,
                    copayType: data?.isCopayPremiumAntireflectiveAmount,
                    price: data?.copayPremiumAntireflectiveAmount,
                },
                {
                    type: "Ultra Anti-Reflective Properties",
                    status: data?.isCopayUltraAntireflective,
                    copayType: data?.isCopayUltraAntireflectiveAmount,
                    price: data?.copayUltraAntireflectiveAmount,
                },
                {
                    type: "Ultimate Anti-Reflective Properties",
                    status: data?.isCopayUltimateAntireflective,
                    copayType: data?.isCopayUltimateAntireflectiveAmount,
                    price: data?.copayUltimateAntireflectiveAmount,
                },
            ],
        },
        lensType: {
            type: data?.lensType,
            brand: data?.lensTypeValue,
            brandPrice: data?.lensTypeInput,
            blendedBifocal: data?.blendedBifocal,
            category: data?.lensCategory,
            subCategory: data?.lensSubCategory,
        },
        lensMaterial: data?.lensMaterial,
        lensMaterialPrice: data?.lensMaterialValue,
        centerThickness: data?.centerThickness,
        photochromics: {
            status: data?.isPhotochromics,
            type: data?.photochromicsType,
            price: data?.photochromicValue,
            category: data?.photochromicsCategory,
        },
        sunGlassesLens: {
            status: data?.isSunglasses,
            lensType: data?.sunglassesType,
            polarizedPrice: data?.polarizedTypePrice,
            tintType: data?.tintType,
            tintPrice: data?.tintTypePrice,
            mirrorCoating: data?.isMirrorCoating,
            coatingType: data?.mirrorCoatingType,
            coatingPrice: data?.mirrorCoatingPrice,
            tintCategory: data?.tintCategory,
            uvProtection: data?.uvProtection,
        },
        antiReflectiveProperties: {
            status: data?.isAntireflective,
            type: data?.antireflectiveType,
            price: data?.antireflectiveValue,
            category: data?.antiReflectiveCategory,
        },
        blueLight: data?.blueLight,
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
        discount: {
            type: data?.discountType,
            value: data?.discountValue,
            amountType: data?.discountAmountType,
            discountId: data?.discountId,
        },
        additionalLens: data?.isAdditionalLensOptions,
        slabOff: {
            status: data?.isSlabOff,
            price: data?.slabOffPrice,
        },
        specialtyLens: {
            status: data?.isSpecialtyLens,
            price: data?.specialityLensPrice,
        },
        polish: {
            status: data?.isPolish,
            type: data?.polishType,
            price: data?.polishPrice,
        },
        tracing: {
            status: data?.tracingFee,
            price: data?.tracingPrice,
        },
        aspheric: {
            status: data?.isAspheric,
            type: data?.asphericType,
        },
        blueProtection: {
            status: data?.isBlueProtection,
            category: data?.blueProtectionCategory,
            type: data?.blueProtectionType,
        },
        rollAndPolish: {
            status: data?.isRollAndPolish,
            type: data?.rollAndPolishTypes,
        },
        licensedSpeciality: {
            status: data?.isLicensedSpeciality,
            type: data?.licensedSpecialityType,
        },
        scratch: {
            status: data?.isScratched,
            type: data?.scratchedType,
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
        (item) => item.type === "Photochromics"
    );
    const hignIndex = lowerCopay.find((item) => item.type === "High Index");
    const antiReflective = lowerCopay.find(
        (item) => item.type === "Anti-Reflective Properties"
    );
    const premiumProgresive = lowerCopay.find(
        (item) => item.type === "Premium Progressives"
    );
    const standardProgresive = lowerCopay.find(
        (item) => item.type === "Standard Progressives"
    );
    const customProgresive = lowerCopay.find(
        (item) => item.type === "Custom Progressives"
    );
    const ultraProgresive = lowerCopay.find(
        (item) => item.type === "Ultra Progressives"
    );
    const ultimateProgresive = lowerCopay.find(
        (item) => item.type === "Ultimate Progressives"
    );
    const standardAntireflective = lowerCopay.find(
        (item) => item.type === "Standard Anti-Reflective Properties"
    );
    const premiumAntireflective = lowerCopay.find(
        (item) => item.type === "Premium Anti-Reflective Properties"
    );
    const ultraAntireflective = lowerCopay.find(
        (item) => item.type === "Ultra Anti-Reflective Properties"
    );
    const ultimateAntireflective = lowerCopay.find(
        (item) => item.type === "Ultimate Anti-Reflective Properties"
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
        materialCopay: userState?.materialCopay || 0,
        frameOrderType: userState?.frameOrder?.type || "",
        frameRetailFee: userState?.frameOrder?.retailFee || "",
        frameContribution: userState?.frameOrder?.frameContribution || "",
        drillMount: userState?.frameOrder?.drillMount || "",
        drillMountValue: userState?.frameOrder?.drillMountPrice || "",
        drillMountOptions: userState?.frameOrder?.drillMountOption || "",
        isLoweredCopay: userState?.lowerCopaythanStandard?.value || "",
        isCopayPolycarbonate: polycarbonate?.status || null,
        isCopayPhotochromic: photochromic?.status || null,
        isCopayHighIndex: hignIndex?.status || null,
        isCopayAntiReflective: antiReflective?.status || null,
        isCopayPremiumProgressives: premiumProgresive?.status || null,
        isCopayStandardProgressives: standardProgresive?.status || null,
        isCopayCustomProgressives: customProgresive?.status || null,
        isCopayPolycarbonateAmount: polycarbonate?.copayType || "",
        copayPolycarbonateAmount: polycarbonate?.price || "",
        isCopayPhotochromicAmount: photochromic?.copayType || "",
        copayPhotochromicAmount: photochromic?.price || "",
        isCopayHighIndexAmount: hignIndex?.copayType || "",
        copayHighIndexAmount: hignIndex?.price || "",
        isCopayAntiReflectiveAmount: antiReflective?.copayType || "",
        copayAntiReflectiveAmount: antiReflective?.price || "",
        isCopaypremiumProgressiveAmount: premiumProgresive?.copayType || "",
        copaypremiumProgressiveAmount: premiumProgresive?.price || "",
        isCopayStandardProgressiveAmount: standardProgresive?.copayType || "",
        copayStandardProgressiveAmount: standardProgresive?.price || "",
        isCopayCustomProgressiveAmount: customProgresive?.copayType || "",
        copayCustomProgressiveAmount: customProgresive?.price || "",
        //ultra progressive
        isCopayUltraProgressives: ultraProgresive?.price || null,
        isCopayUltraProgressiveAmount: ultraProgresive?.copayType || "",
        copayUltraProgressiveAmount: ultraProgresive?.price || "",
        //ultimate progressive
        isCopayUltimateProgressives: ultimateProgresive?.price || null,
        isCopayUltimateProgressiveAmount: ultimateProgresive?.copayType || "",
        copayUltimateProgressiveAmount: ultimateProgresive?.price || "",
        //standard anti reflective
        isCopayStandardAntireflective: standardAntireflective?.price || null,
        isCopayStandardAntireflectiveAmount:
            standardAntireflective?.copayType || "",
        copayStandardAntireflectiveAmount: standardAntireflective?.price || "",
        //Premium anti reflective
        isCopayPremiumAntireflective: premiumAntireflective?.price || null,
        isCopayPremiumAntireflectiveAmount:
            premiumAntireflective?.copayType || "",
        copayPremiumAntireflectiveAmount: premiumAntireflective?.price || "",
        //Ultra anti reflective
        isCopayUltraAntireflective: ultraAntireflective?.price || null,
        isCopayUltraAntireflectiveAmount: ultraAntireflective?.copayType || "",
        copayUltraAntireflectiveAmount: ultraAntireflective?.price || "",
        //Ultimate anti reflective
        isCopayUltimateAntireflective: ultimateAntireflective?.price || null,
        isCopayUltimateAntireflectiveAmount:
            ultimateAntireflective?.copayType || "",
        copayUltimateAntireflectiveAmount: ultimateAntireflective?.price || "",
        // lens type
        lensType: userState?.lensType?.type || "",
        lensTypeValue: userState?.lensType?.brand || "",
        lensTypeInput: userState?.lensType?.brandPrice || "",
        lensCategory: userState?.lensType?.category || "",
        lensSubCategory: userState?.lensType?.subCategory || "",
        //lens materials
        lensMaterial: userState?.lensMaterial || "",
        lensMaterialValue: userState?.lensMaterialPrice || "",
        centerThickness: userState?.centerThickness || "",
        //photochromics
        isPhotochromics: userState?.photochromics?.status || "",
        photochromicsType: userState?.photochromics?.type || "",
        photochromicValue: userState?.photochromics?.price || "",
        photochromicsCategory: userState?.photochromics?.category || "",
        //sunglasses
        isSunglasses: userState?.sunGlassesLens?.status || "",
        sunglassesType: userState?.sunGlassesLens?.lensType || "",
        polarizedTypePrice: userState?.sunGlassesLens?.polarizedPrice || "",
        tintTypePrice: userState?.sunGlassesLens?.tintPrice || "",
        mirrorCoatingPrice: userState?.sunGlassesLens?.coatingPrice || "",
        tintType: userState?.sunGlassesLens?.tintType || "",
        isMirrorCoating: userState?.sunGlassesLens?.mirrorCoating || "",
        mirrorCoatingType: userState?.sunGlassesLens?.coatingType || "",
        tintCategory: userState?.sunGlassesLens?.tintCategory || "",
        uvProtection: userState?.sunGlassesLens?.uvProtection || "",
        //Anti-Reflective
        isAntireflective: userState?.antiReflectiveProperties?.status || "",
        antireflectiveType: userState?.antiReflectiveProperties?.type || "",
        antireflectiveValue: userState?.antiReflectiveProperties?.price || "",
        antiReflectiveCategory:
            userState?.antiReflectiveProperties?.category || "",
        //protection plan
        isProtectionPlan: userState?.protectionPlan?.status || "",
        protectionPlanType: userState?.protectionPlan?.type || "",
        isProtectionPlanPaid: userState?.protectionPlan?.paymentStatus || "",
        protectionPlanAmount: userState?.protectionPlan?.price || "",
        shipping: userState?.shipping?.status || "",
        shippingAmount: userState?.shipping?.price || "",
        discountType: userState?.discount?.type || "",
        discountValue: userState?.discount?.value || "",
        discountAmountType: userState?.discount?.amountType || "percentage",
        discountId: userState?.discount?.discountId || "",
        isAdditionalLensOptions: userState?.additionalLens || "",
        isSlabOff: userState?.slabOff?.status || "",
        slabOffPrice: userState?.slabOff?.price || "",
        isSpecialtyLens: userState?.specialtyLens?.status || "",
        specialityLensPrice: userState?.specialtyLens?.price || "",
        isPolish: userState?.polish?.status || "",
        polishType: userState?.polish?.type || "",
        polishPrice: userState?.polish?.price || "",
        tracingFee: userState?.tracing?.status || "",
        tracingPrice: userState?.tracing?.price || "",
        blueLight: userState?.blueLight || "",
        blendedBifocal: userState?.lensType?.blendedBifocal || "",
        //Aspheric
        isAspheric: userState?.aspheric?.status || "",
        asphericType: userState?.aspheric?.type || "",
        // blue protection
        isBlueProtection: userState?.blueProtection?.status || "",
        blueProtectionCategory: userState?.blueProtection?.category || "",
        blueProtectionType: userState?.blueProtection?.type || "",
        // Roll and Polish
        isRollAndPolish: userState?.rollAndPolish?.status || "",
        rollAndPolishTypes: userState?.rollAndPolish?.type || "",
        // licensed Speciality
        isLicensedSpeciality: userState?.licensedSpeciality?.status || "",
        licensedSpecialityType: userState?.licensedSpeciality?.type || "",
        // scratch risistance coating
        isScratched: userState?.scratch?.status || "",
        scratchedType: userState?.scratch?.type || "",
    };
};
