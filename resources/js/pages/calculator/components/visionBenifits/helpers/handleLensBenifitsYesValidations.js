import * as Yup from "yup";
export const handleLensBenifitYesValidations = (
    data,
    isLoweredCopay,
    values
) => {
    const copayText = "Lower copay dollar amount";
    const slabOff =
        data?.find((ques) => ques?.question == "Slab Off")?.optional === "true";
    const specialityLens =
        data?.find((ques) => ques?.question == "Speciality Lens")?.optional ===
        "true";
    const polish =
        data?.find((ques) => ques?.question == "Polish")?.optional === "true";

    const isCopayYes = () => {
        return isLoweredCopay &&
            !(
                values?.visionPlan === "Eyemed" ||
                values?.visionPlan === "Private Pay"
            ) &&
            values?.isLoweredCopay === "Yes"
            ? true
            : false;
    };
    const validationObject = {};

    // add lens validations
    if (
        data?.find((ques) => ques?.question === "Lens Type")?.optional ===
        "true"
    ) {
        validationObject.lensType = Yup.string().required(
            "Lens type is required"
        );
    }
    if (values?.lensType) {
        validationObject.lensTypeValue =
            Yup.string().required("Brand is required");
    }
    if (values?.lensTypeValue && values?.visionPlan === "Eyemed") {
        validationObject.lensTypeInput = Yup.string().required(
            "Brand price is required"
        );
    }
    if (
        values?.visionPlan === "Davis Vision" &&
        (values?.lensType === "Bifocal" || values?.lensType === "Trifocal")
    ) {
        validationObject.blendedBifocal = Yup.string().required(
            "Blended biofocal is required"
        );
    }

    // add lens Material validations
    if (
        data?.find((ques) => ques?.question === "Lens Material")?.optional ===
        "true"
    ) {
        validationObject.lensMaterial = Yup.string().required(
            "Lens material is required"
        );
    }
    if (values?.lensMaterial && values?.visionPlan === "Eyemed") {
        validationObject.lensMaterialValue = Yup.string().required(
            "Material price is required"
        );
    }

    // add Photochromics validations
    if (
        data?.find((ques) => ques?.question === "Photochromics")?.optional ===
        "true"
    ) {
        validationObject.isPhotochromics = Yup.string().required(
            "Photochromics is required"
        );
    }
    if (values?.isPhotochromics === "Yes") {
        validationObject.photochromicsType = Yup.string().required(
            "Photochromics Type is required"
        );
    }
    if (values?.photochromicsType && values?.visionPlan === "Eyemed") {
        validationObject.photochromicValue = Yup.string().required(
            "Photochromics price is required"
        );
    }

    // add sunglass validations
    if (
        data?.find((ques) => ques?.question === "Sunglass Options")
            ?.optional === "true"
    ) {
        validationObject.isSunglasses = Yup.string().required(
            "Sunglasses lens is required"
        );
    }
    if (values?.isSunglasses === "Yes") {
        validationObject.sunglassesType = Yup.string().required(
            "Sunglasses type is required"
        );
    }
    if (
        values?.isSunglasses === "Yes" &&
        values?.sunglassesType === "Polarized"
    ) {
        validationObject.isMirrorCoating = Yup.string().required(
            "Mirror coating is required"
        );
        if (values?.visionPlan === "Eyemed") {
            validationObject.polarizedTypePrice = Yup.string().required(
                "Polarized price is required"
            );
        }
    }
    if (values?.isSunglasses === "Yes" && values?.sunglassesType === "Tint") {
        validationObject.isMirrorCoating = Yup.string().required(
            "Mirror coating is required"
        );
        validationObject.tintType = Yup.string().required(
            "Tint type is required"
        );
    }
    if (
        values?.isSunglasses === "Yes" &&
        values?.sunglassesType === "Tint" &&
        values?.tintType &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.tintTypePrice = Yup.string().required(
            "Tint price is required"
        );
    }
    if (
        values?.isSunglasses === "Yes" &&
        values?.sunglassesType &&
        values?.isMirrorCoating === "Yes"
    ) {
        validationObject.mirrorCoatingType = Yup.string().required(
            "Mirror coating type is required"
        );
    }
    if (
        values?.visionPlan === "Eyemed" &&
        values?.isSunglasses === "Yes" &&
        values?.sunglassesType &&
        values?.isMirrorCoating === "Yes" &&
        values?.mirrorCoatingType
    ) {
        validationObject.mirrorCoatingPrice = Yup.string().required(
            "Mirror coating price is required"
        );
    }

    // add Anti-Reflective validations
    if (
        data?.find((ques) => ques?.question === "Anti-Reflective Properties")
            ?.optional === "true"
    ) {
        validationObject.isAntireflective = Yup.string().required(
            "Anti-Reflective is required"
        );
    }
    if (values?.isAntireflective === "Yes") {
        validationObject.antireflectiveType = Yup.string().required(
            "Anti-Reflective Type is required"
        );
    }
    if (values?.antireflectiveType && values?.visionPlan === "Eyemed") {
        validationObject.antireflectiveValue = Yup.string().required(
            "Anti-Reflective price is required"
        );
    }

    // add blue light validation
    if (
        data?.find((ques) => ques?.question === "Blue Light Filtering")
            ?.optional === "true"
    ) {
        validationObject.blueLight = Yup.string().required(
            "Blue light filtering is required"
        );
    }

    // add Additional lens options validation
    if (
        (slabOff || specialityLens || polish) &&
        (values?.visionPlan === "Eyemed" ||
            values?.visionPlan === "Davis Vision")
    ) {
        validationObject.isAdditionalLensOptions = Yup.string().required(
            "Additional lens options is required"
        );
    }

    //add slab off validations
    if (
        slabOff &&
        values?.isAdditionalLensOptions === "Yes" &&
        (values?.visionPlan === "Eyemed" ||
            values?.visionPlan === "Davis Vision")
    ) {
        validationObject.isSlabOff = Yup.string().required(
            "Slab off is required"
        );
    }
    if (
        values?.isSlabOff === "Yes" &&
        values?.isAdditionalLensOptions === "Yes" &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.slabOffPrice = Yup.string().required(
            "Slab off price is required"
        );
    }

    //add aspheric validations
    if (
        data?.find((ques) => ques?.question === "Aspheric")?.optional ===
            "true" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.isAspheric = Yup.string().required(
            "Aspheric is required"
        );
    }
    if (values?.isAspheric === "Yes" && values?.visionPlan === "VBA") {
        validationObject.asphericType = Yup.string().required(
            "Aspheric type is required"
        );
    }

    //add blue protection validations
    if (
        data?.find((ques) => ques?.question === "Blue Protection")?.optional ===
            "true" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.isBlueProtection = Yup.string().required(
            "Blue Protection is required"
        );
    }
    if (values?.isBlueProtection === "Yes" && values?.visionPlan === "VBA") {
        validationObject.blueProtectionCategory = Yup.string().required(
            "Category is required"
        );
    }
    if (
        values?.isBlueProtection === "Yes" &&
        values?.blueProtectionCategory &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.blueProtectionType = Yup.string().required(
            "Blue Protection type is required"
        );
    }

    //add roll and Polish validations
    if (
        data?.find((ques) => ques?.question === "Roll & Polish")?.optional ===
            "true" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.isRollAndPolish = Yup.string().required(
            "Roll & Polish is required"
        );
    }
    if (values?.isRollAndPolish === "Yes" && values?.visionPlan === "VBA") {
        validationObject.rollAndPolishTypes = Yup.string().required(
            "Roll & Polish type is required"
        );
    }

    //add licensed speciality validations
    if (
        data?.find(
            (ques) => ques?.question === "Licensed Specialty Enhancement"
        )?.optional === "true" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.isLicensedSpeciality = Yup.string().required(
            "Licensed Specialty Enhancement is required"
        );
    }
    if (
        values?.isLicensedSpeciality === "Yes" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.licensedSpecialityType = Yup.string().required(
            "Licensed Specialty Enhancement type is required"
        );
    }

    //add Scratch Resistant Coatings validations
    if (
        data?.find((ques) => ques?.question === "Scratch Resistant Coatings")
            ?.optional === "true" &&
        values?.visionPlan === "VBA"
    ) {
        validationObject.isScratched = Yup.string().required(
            "Scratch Resistant Coating is required"
        );
    }
    if (values?.isScratched === "Yes" && values?.visionPlan === "VBA") {
        validationObject.scratchedType = Yup.string().required(
            "Scratch Resistant Coating type is required"
        );
    }

    //add Speciality lens validations
    if (
        specialityLens &&
        values?.isAdditionalLensOptions === "Yes" &&
        (values?.visionPlan === "Eyemed" ||
            values?.visionPlan === "Davis Vision")
    ) {
        validationObject.isSpecialtyLens = Yup.string().required(
            "Speciality lenses is required"
        );
    }
    if (
        values?.isSpecialtyLens === "Yes" &&
        values?.isAdditionalLensOptions === "Yes" &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.specialityLensPrice = Yup.string().required(
            "Speciality lenses price is required"
        );
    }

    // add Polish validations
    if (
        polish &&
        values?.isAdditionalLensOptions === "Yes" &&
        (values?.visionPlan === "Eyemed" ||
            values?.visionPlan === "Davis Vision")
    ) {
        validationObject.isPolish = Yup.string().required("Polish is required");
    }
    if (
        values?.isPolish === "Yes" &&
        values?.isAdditionalLensOptions === "Yes" &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.polishType = Yup.string().required(
            "Polish type is required"
        );
    }
    if (
        values?.isPolish === "Yes" &&
        values?.polishType &&
        values?.isAdditionalLensOptions === "Yes" &&
        values?.visionPlan === "Eyemed"
    ) {
        validationObject.polishPrice = Yup.string().required(
            "Polish price is required"
        );
    }

    // add lower copay validations
    if (
        data?.find(
            (ques) => ques?.question === "Any copay lowered than standard"
        )?.optional === "true" &&
        isLoweredCopay &&
        values?.visionPlan !== "Eyemed"
    ) {
        validationObject.isLoweredCopay = Yup.string().required(
            "copay dollar amount is required"
        );
    }
    if (
        isCopayYes() &&
        ((values?.visionPlan === "Davis Vision" &&
            (!values?.isCopayPhotochromic ||
                !values?.isCopayHighIndex ||
                !values?.isCopayPremiumProgressives ||
                !values?.isCopayStandardProgressives ||
                !values?.isCopayUltraProgressives ||
                !values?.isCopayUltimateProgressives ||
                !values?.isCopayStandardAntireflective ||
                !values?.isCopayPremiumAntireflective ||
                !values?.isCopayUltraAntireflective ||
                !values?.isCopayUltimateAntireflective)) ||
            (values?.visionPlan !== "Davis Vision" &&
                (!values?.isCopayPolycarbonate ||
                    !values?.isCopayPhotochromic ||
                    !values?.isCopayHighIndex ||
                    !values?.isCopayAntiReflective ||
                    !values?.isCopayPremiumProgressives ||
                    !values?.isCopayStandardProgressives ||
                    !values?.isCopayCustomProgressives)))
    ) {
        validationObject.isCopayChecked = Yup.mixed().required(
            "Minimum 1 sub option is required"
        );
    }

    //add polycarbonate lowered copay validations
    if (isCopayYes() && values?.isCopayPolycarbonate) {
        validationObject.isCopayPolycarbonateAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayPolycarbonate &&
        values?.isCopayPolycarbonateAmount === copayText
    ) {
        validationObject.copayPolycarbonateAmount =
            Yup.string().required("Amount is required");
    }

    //add photochromic lowered copay validations
    if (isCopayYes() && values?.isCopayPhotochromic) {
        validationObject.isCopayPhotochromicAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayPhotochromic &&
        values?.isCopayPhotochromicAmount === copayText
    ) {
        validationObject.copayPhotochromicAmount =
            Yup.string().required("Amount is required");
    }

    //add High index lowered copay validations
    if (isCopayYes() && values?.isCopayHighIndex) {
        validationObject.isCopayHighIndexAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayHighIndex &&
        values?.isCopayHighIndexAmount === copayText
    ) {
        validationObject.copayHighIndexAmount =
            Yup.string().required("Amount is required");
    }

    //add Anti-Reflective lowered copay validations
    if (isCopayYes() && values?.isCopayAntiReflective) {
        validationObject.isCopayAntiReflectiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayAntiReflective &&
        values?.isCopayAntiReflectiveAmount === copayText
    ) {
        validationObject.copayAntiReflectiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Premium Progressive lowered copay validations
    if (isCopayYes() && values?.isCopayPremiumProgressives) {
        validationObject.isCopaypremiumProgressiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayPremiumProgressives &&
        values?.isCopaypremiumProgressiveAmount === copayText
    ) {
        validationObject.copaypremiumProgressiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Standard Progressive lowered copay validations
    if (isCopayYes() && values?.isCopayStandardProgressives) {
        validationObject.isCopayStandardProgressiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayStandardProgressives &&
        values?.isCopayStandardProgressiveAmount === copayText
    ) {
        validationObject.copayStandardProgressiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Custom Progressive lowered copay validations
    if (isCopayYes() && values?.isCopayCustomProgressives) {
        validationObject.isCopayCustomProgressiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayCustomProgressives &&
        values?.isCopayCustomProgressiveAmount === copayText
    ) {
        validationObject.copayCustomProgressiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Ultra Progressive lowered copay validations
    if (isCopayYes() && values?.isCopayUltraProgressives) {
        validationObject.isCopayUltraProgressiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayUltraProgressives &&
        values?.isCopayUltraProgressiveAmount === copayText
    ) {
        validationObject.copayUltraProgressiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Ultimate Progressive lowered copay validations
    if (isCopayYes() && values?.isCopayUltimateProgressives) {
        validationObject.isCopayUltimateProgressiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayUltimateProgressives &&
        values?.isCopayUltimateProgressiveAmount === copayText
    ) {
        validationObject.copayUltimateProgressiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Standard Anti-Reflective lowered copay validations
    if (isCopayYes() && values?.isCopayStandardAntireflective) {
        validationObject.isCopayStandardAntireflectiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayStandardAntireflective &&
        values?.isCopayStandardAntireflectiveAmount === copayText
    ) {
        validationObject.copayStandardAntireflectiveAmount =
            Yup.string().required("Amount is required");
    }
    //add Premium Anti-Reflective lowered copay validations
    if (isCopayYes() && values?.isCopayPremiumAntireflective) {
        validationObject.isCopayPremiumAntireflectiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayPremiumAntireflective &&
        values?.isCopayPremiumAntireflectiveAmount === copayText
    ) {
        validationObject.copayPremiumAntireflectiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Ultra Anti-Reflective lowered copay validations
    if (isCopayYes() && values?.isCopayUltraAntireflective) {
        validationObject.isCopayUltraAntireflectiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayUltraAntireflective &&
        values?.isCopayUltraAntireflectiveAmount === copayText
    ) {
        validationObject.copayUltraAntireflectiveAmount =
            Yup.string().required("Amount is required");
    }

    //add Ultimate Anti-Reflective lowered copay validations
    if (isCopayYes() && values?.isCopayUltimateAntireflective) {
        validationObject.isCopayUltimateAntireflectiveAmount =
            Yup.string().required("Option is required");
    }
    if (
        isCopayYes() &&
        values?.isCopayUltimateAntireflective &&
        values?.isCopayUltimateAntireflectiveAmount === copayText
    ) {
        validationObject.copayUltimateAntireflectiveAmount =
            Yup.string().required("Amount is required");
    }

    return validationObject;
};
