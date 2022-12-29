export const CompareStrings = (a, b) => {
    return (a || "")?.toLowerCase() === (b || "")?.toLowerCase() ? true : false;
};

export const groupBy = (property, objectArray) => {
    return objectArray?.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
};
