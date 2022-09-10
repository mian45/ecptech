import * as ActionTypes from "../action-types";
import Http from "../../Http";

const defaultUser = {
    id: null,
    name: null,
    email: null,
};

const initialState = {
    isAuthenticated: true,
    isActiveState: 1,
    isActiveSettingState: 1,
    user: defaultUser,
};

const activeState = (state, payload) => {
    state.isActiveState = state.isActiveState;
    return state;
};

const activeSettingState = (state, payload) => {
    return { ...state, isActiveSettingState: payload };
};

const authLogin = (state, payload) => {
    const userObject = {
        id: payload?.data?.id,
        name: payload?.data?.name,
        email: payload?.data?.email,
    };

    const token = payload?.data?.token;

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
        user: JSON.parse(localStorage.getItem("user")),
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
        default:
            return state;
    }
};

export default Auth;
