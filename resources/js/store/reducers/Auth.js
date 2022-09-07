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

const initialState = {
    isAuthenticated: true,
    isActiveState: 1,
    isActiveSettingState: 1,
    user: defaultUser,
    isStaffAuthenticated: false,
    staffUser: defaultStaffUser,
};

const activeState = (state, payload) => {
    state.isActiveState = state.isActiveState;
    return state;
};

const activeSettingState = (state, payload) => {
    return { ...state, isActiveSettingState: payload };
};

const authLogin = (state, payload) => {
    const { access_token: AccessToken, user } = payload;
    const userObject = {
        id: payload?.data?.id,
        name: payload?.data?.name,
        email: payload?.data?.email,
    };
    const token = payload?.data?.token;

    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(userObject));
    Http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const stateObj = {
        ...state,
        isAuthenticated: true,
        user: userObject,
    };
    return stateObj;
};

const checkAuth = (state) => {
    const stateObj = {
        ...state,
        isAuthenticated: !!localStorage.getItem("access_token"),
        // user: null,
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
    localStorage.removeItem("user");
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
        isStaffAuthenticated: true,
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
        isStaffAuthenticated: true,
        staffUser: staffUserObject,
    };
    return stateObj;
};

const Auth = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state, payload);
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.ACTIVE_STATE:
            return activeState(state, payload);
        case ActionTypes.ACTIVE_SETTING_STATE: {
            return activeSettingState(state, payload);
        }
        case ActionTypes.STAFF_LOGIN:
            return staffLogin(state, payload);
        case ActionTypes.UPDATE_STAFF_LOGIN:
            return updateStaffLogin(state, payload);
        default:
            return state;
    }
};

export default Auth;
