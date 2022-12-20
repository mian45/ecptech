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
    };
};
