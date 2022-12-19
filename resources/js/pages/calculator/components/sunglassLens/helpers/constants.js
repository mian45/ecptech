export const retailErrors = () => {
    return {
        polarized: "polarized",
        tint: "tint",
        coating: "coating",
    };
};
export const retailErrorMessage = (type) => {
    return `The Retail Price for ${type} is not added from the settings. Are you sure you want to continue?`;
};

export const retailErrorsMessage = (value) => {
    switch (value) {
        case "polarized":
            return "polarized";
        case "tint":
            return "this tint";
        case "coating":
            return "this coating";
    }
};
