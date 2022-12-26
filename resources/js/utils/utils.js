export const CompareStrings = (a, b) => {
    return (a || "")?.toLowerCase() === (b || "").toLowerCase() ? true : false;
};
