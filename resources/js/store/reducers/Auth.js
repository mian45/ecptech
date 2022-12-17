import * as ActionTypes from "../action-types";
import Http from "../../Http";

const defaultUser = {
    id: null,
    name: null,
    email: null,
};

const defaultStaffUser = {
    id: null,
    name: null,
    email: null,
};
const defaultUserRole = {
    id: null,
    name: null,
};
const defaultClientUser = {
    id: null,
    name: null,
};

const initialState = {
    isAuthenticated: false,
    isActiveState: 1,
    isActiveSettingState: 1,
    user: defaultUser,
    staffUser: defaultStaffUser,
    clientUser: defaultClientUser,
    userRole: defaultUserRole,
    activeSettingsIndex: "1",
    sidebar: false,
    language: "en",
    retailPopup: false,
};

const activeState = (state, payload) => {
    state.isActiveState = state.isActiveState;
    return state;
};

const activeSettingState = (state, payload) => {
    return { ...state, isActiveSettingState: payload };
};

const updateSettingsTab = (state, payload) => {
    return { ...state, activeSettingsIndex: payload };
};

const authLogin = (state, payload) => {
    consonle.log("the payload is here in auth login", payload);
};

const checkAuth = (state) => {
    const token = localStorage.getItem("access_token");
    const stateObj = {
        ...state,
        isAuthenticated: !!token,
        user: JSON.parse(
            localStorage.getItem("user") || JSON.stringify(defaultUser)
        ),
    };
    if (state.isAuthenticated) {
        Http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
            "access_token"
        )}`;
    }
    return stateObj;
};

const logout = (state) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember");
    const stateObj = {
        ...state,
        isAuthenticated: false,
        user: defaultUser,
    };
    return stateObj;
};

const staffLogin = (state, payload) => {
    const staffUserObject = {
        id: payload?.data?.id,
        name: payload?.data?.name,
        email: payload?.data?.email,
    };
    const stateObj = {
        ...state,
        staffUser: staffUserObject,
    };
    return stateObj;
};

const updateStaffLogin = (state, payload) => {
    const staffUserObject = {
        id: payload?.data?.id,
        name: payload?.data?.name,
        email: payload?.data?.email,
    };
    const stateObj = {
        ...state,
        staffUser: staffUserObject,
    };
    return stateObj;
};

const Auth = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case ActionTypes.AUTH_LOGIN: {
            localStorage.setItem("access_token", payload.data.token);
            const clientObject = {
                id: payload?.data?.client?.id || null,
                name: payload?.data?.client?.name || null,
            };
            const userObject = {
                id: payload?.data?.id,
                name: payload?.data?.name,
                email: payload?.data?.email,
                logo: payload?.data?.logo,
                buisnessName: payload?.data.business_name,
                themeColor: payload?.data?.theme_color,
            };
            const roleObject = {
                id: payload?.data.role.id,
                name: payload.data.role.name,
            };
            const staffObject = {
                id: payload?.data?.staffAuth?.id || null,
                name: payload?.data?.staffAuth?.name || null,
                email: payload?.data?.staffAuth?.email || null,
            };
            const token = payload?.data?.token;

            Http.defaults.headers.common.Authorization = `Bearer ${token}`;
            const stateObj = {
                ...state,
                isAuthenticated: true,
                user: userObject,
                userRole: roleObject,
                staffUser: staffObject,
                clientUser: clientObject,
                token,
            };
            return stateObj;
        }
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.ACTIVE_STATE:
            return activeState(state, payload);
        case ActionTypes.ACTIVE_SETTING_STATE: {
            return activeSettingState(state, payload);
        }
        case ActionTypes.ACTIVE_SETTINGS_TAB: {
            return updateSettingsTab(state, payload);
        }
        case ActionTypes.STAFF_LOGIN:
            return staffLogin(state, payload);
        case ActionTypes.RETAIL_POPUP: {
            const stateObj = {
                ...state,
                retailPopup: !state.retailPopup,
            };
            return stateObj;
        }
        case ActionTypes.UPDATE_STAFF_LOGIN:
            return updateStaffLogin(state, payload);
        case ActionTypes.SHOW_SIDEBAR: {
            const stateObj = {
                ...state,
                sidebar: !state.sidebar,
            };
            return stateObj;
        }
        default:
            return state;
    }
};

export default Auth;
