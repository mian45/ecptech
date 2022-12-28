export const handleLensBenifitNo = (calValidations, setCalValidations) => {
    const validations = { ...calValidations };

    //remove lens validations
    delete validations?.lensType;
    delete validations?.lensTypeValue;
    delete validations?.lensTypeInput;
    delete validations?.blendedBifocal;

    //remove lens material validations
    delete validations?.lensMaterial;
    delete validations?.lensMaterialValue;

    //remove photochromics validations
    delete validations?.isPhotochromics;
    delete validations?.photochromicsType;
    delete validations?.photochromicValue;

    //remove sunglass validations
    delete validations?.isSunglasses;
    delete validations?.sunglassesType;
    delete validations?.polarizedTypePrice;
    delete validations?.tintType;
    delete validations?.tintTypePrice;
    delete validations?.isMirrorCoating;
    delete validations?.mirrorCoatingType;
    delete validations?.mirrorCoatingPrice;

    //remove Anti-Reflective validations
    delete validations?.isAntireflective;
    delete validations?.antireflectiveType;
    delete validations?.antireflectiveValue;

    //remove Blue Light validations
    delete validations?.blueLight;

    //remove Additional lens options validations
    delete validations?.isAdditionalLensOptions;

    //remove Slab off validations
    delete validations?.isSlabOff;
    delete validations?.slabOffPrice;

    //remove Speciality lens validations
    delete validations?.isSpecialtyLens;
    delete validations?.specialityLensPrice;

    //remove Polish validations
    delete validations?.isPolish;
    delete validations?.polishType;
    delete validations?.polishPrice;

    //remove Aspheric validations
    delete validations?.isAspheric;
    delete validations?.asphericType;

    //remove Blue Protection validations
    delete validations?.isBlueProtection;
    delete validations?.blueProtectionCategory;
    delete validations?.blueProtectionType;

    //remove roll and Polish validations
    delete validations?.isRollAndPolish;
    delete validations?.rollAndPolishTypes;

    //remove licensed speciality validations
    delete validations?.isLicensedSpeciality;
    delete validations?.licensedSpecialityType;

    //remove licensed speciality validations
    delete validations?.isScratched;
    delete validations?.scratchedType;

    //delete lowered copay validations
    delete validations?.isLoweredCopay;
    delete validations?.isCopayChecked;

    //delete polycarbonate lowered copay validations
    delete validations?.isCopayPolycarbonate;
    delete validations?.isCopayPolycarbonateAmount;
    delete validations?.copayPolycarbonateAmount;

    //delete photochromic lowered copay validations
    delete validations?.isCopayPhotochromic;
    delete validations?.isCopayPhotochromicAmount;
    delete validations?.copayPhotochromicAmount;

    //delete High index lowered copay validations
    delete validations?.isCopayHighIndex;
    delete validations?.isCopayHighIndexAmount;
    delete validations?.copayHighIndexAmount;

    //delete Anti-Reflective lowered copay validations
    delete validations?.isCopayAntiReflective;
    delete validations?.isCopayAntiReflectiveAmount;
    delete validations?.copayAntiReflectiveAmount;

    //delete Premium Progressive lowered copay validations
    delete validations?.isCopayPremiumProgressives;
    delete validations?.isCopaypremiumProgressiveAmount;
    delete validations?.copaypremiumProgressiveAmount;

    //delete Standard Progressive lowered copay validations
    delete validations?.isCopayStandardProgressives;
    delete validations?.isCopayStandardProgressiveAmount;
    delete validations?.copayStandardProgressiveAmount;

    //delete Custom Progressive lowered copay validations
    delete validations?.isCopayCustomProgressives;
    delete validations?.isCopayCustomProgressiveAmount;
    delete validations?.copayCustomProgressiveAmount;

    //delete Ultra Progressive lowered copay validations
    delete validations?.isCopayUltraProgressives;
    delete validations?.isCopayUltraProgressiveAmount;
    delete validations?.copayUltraProgressiveAmount;

    //delete Ultimate Progressive lowered copay validations
    delete validations?.isCopayUltimateProgressives;
    delete validations?.isCopayUltimateProgressiveAmount;
    delete validations?.copayUltimateProgressiveAmount;

    //delete Standard Anti-Reflective lowered copay validations
    delete validations?.isCopayStandardAntireflective;
    delete validations?.isCopayStandardAntireflectiveAmount;
    delete validations?.copayStandardAntireflectiveAmount;

    //delete Premium Anti-Reflective lowered copay validations
    delete validations?.isCopayPremiumAntireflective;
    delete validations?.isCopayPremiumAntireflectiveAmount;
    delete validations?.copayPremiumAntireflectiveAmount;

    //delete Ultra Anti-Reflective lowered copay validations
    delete validations?.isCopayUltraAntireflective;
    delete validations?.isCopayUltraAntireflectiveAmount;
    delete validations?.copayUltraAntireflectiveAmount;

    //delete Ultimate Anti-Reflective lowered copay validations
    delete validations?.isCopayUltimateAntireflective;
    delete validations?.isCopayUltimateAntireflectiveAmount;
    delete validations?.copayUltimateAntireflectiveAmount;

    // delete validations.isLoweredCopay;
    setCalValidations({
        ...validations,
    });
};
