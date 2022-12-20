import { RETAIL_ERROR } from "../action-types";
import { defaultRetailError } from "../initialValues/calculatorInitialValues";

const initialState = {
    retailError: { ...defaultRetailError() },
};

function persistStore(state, payload) {
    const stateObj = { ...state, ...payload };
    return stateObj;
}
const retailError = (state, payload) => {
    const stateObj = {
        ...state,
        retailError: {
            ...state?.retailError,
            [payload.plan]: {
                ...state?.retailError[payload?.plan],
                [payload.type]: payload?.error,
            },
        },
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
