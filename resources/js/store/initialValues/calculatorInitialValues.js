const retailError = () => {
    return {
        brand: "",
        lensMaterial: "",
        photochromics: "",
        polarized: "",
        tint: "",
        coating: "",
        antiReflective: "",
        blueLightFilter: "",
        slabOff: "",
        specialityLens: "",
        polish: "",
        aspheric: "",
        blueProtection: "",
        rollAndPolish: "",
        licensedspeciality: "",
        scratchRistanceCoating: "",
        chemistrieClip: "",
        edgeCoating: "",
        lensOptions: "",
        overSizeLens: "",
        spectraPolish: "",
        scratchCoating: "",
        uvCoating: "",
    };
};
export const defaultRetailError = () => {
    return {
        "VSP Signature": { ...retailError() },
        "VSP Choice": { ...retailError() },
        "VSP Advantage": { ...retailError() },
        Eyemed: { ...retailError() },
        "Davis Vision": { ...retailError() },
        "Private Pay": { ...retailError() },
        VBA: { ...retailError() },
        Spectra: { ...retailError() },
    };
};
