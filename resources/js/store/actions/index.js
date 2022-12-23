import * as ActionTypes from "../action-types";
export function showSideBar(payload) {
    return { type: ActionTypes.SHOW_SIDEBAR, payload };
}
export function authLogin(payload) {
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload,
    };
}
export function authLogout() {
    return {
        type: ActionTypes.AUTH_LOGOUT,
    };
}

export function authCheck() {
    return {
        type: ActionTypes.AUTH_CHECK,
    };
}

export function activeState() {
    return {
        type: ActionTypes.ACTIVE_STATE,
    };
}

export function activeSettingState(payload) {
    return {
        type: ActionTypes.ACTIVE_SETTING_STATE,
        payload,
    };
}
export function staffLogin(payload) {
    return {
        type: ActionTypes.STAFF_LOGIN,
        payload,
    };
}
export function updateStaffLogin(payload) {
    return {
        type: ActionTypes.UPDATE_STAFF_LOGIN,
        payload,
    };
}
export function updateSettingsTab(payload) {
    return {
        type: ActionTypes.ACTIVE_SETTINGS_TAB,
        payload,
    };
}
export function showRetailPopup(payload) {
    return {
        type: ActionTypes.RETAIL_POPUP,
        payload,
    };
}
export function calculatorPopUp(payload) {
    return {
        type: ActionTypes.CALCULATOR_POP_UP,
        payload,
    };
}

//calculator
export function retailError(payload) {
    return {
        type: ActionTypes.RETAIL_ERROR,
        payload,
    };
}
