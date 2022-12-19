import { RETAIL_ERROR } from "../action-types";

const defaultRetailError = {
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

const initialState = {
    retailError: { ...defaultRetailError },
};

function persistStore(state, payload) {
    const stateObj = { ...state, ...payload };
    return stateObj;
}
const retailError = (state, payload) => {
    const stateObj = {
        ...state,
        retailError: { ...state?.retailError, [payload.type]: payload?.error },
    };
    return { ...stateObj };
};

const reducer = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case "persist/REHYDRATE":
            return persistStore(state, payload);
        case RETAIL_ERROR:
            return retailError(state, payload);
        default:
            return state;
    }
};

export default reducer;
