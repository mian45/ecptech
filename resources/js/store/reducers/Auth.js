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

const initialState = {
    isAuthenticated: false,
    isActiveState: 1,
    isActiveSettingState: 1,
    user: defaultUser,
    staffUser: defaultStaffUser,
    userRole: defaultUserRole,
};

const activeState = (state, payload) => {
    state.isActiveState = state.isActiveState;
    return state;
};

const activeSettingState = (state, payload) => {
    return { ...state, isActiveSettingState: payload };
};

const authLogin = (state, payload) => {
    consonle.log("the payload is here in auth login",payload)
   
};

const checkAuth = (state) => {
    const token =localStorage.getItem("access_token")
    console.log("the token is here",token)
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
        case ActionTypes.AUTH_LOGIN:
           {    console.log("the payload is here",payload,state)
           const userObject = {
            id: payload?.data?.id,
            name: payload?.data?.name,
            email: payload?.data?.email,
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
            token,
        };
        return stateObj;}
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
