import Http from "../Http";
import * as action from "../store/actions";
import axios from "axios";

export function login(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            axios
                .post(
                    "http://dev.waseem-ecptech.wadic.net/api/login",
                    credentials
                )
                .then((res) => {
                    dispatch(action.authLogin(res.data));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}

export function activeSetting(res) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            dispatch(action.activeSettingState(res));
            return resolve();
        });
}

export function register(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post("/api/auth/register", credentials)
                .then((res) => resolve(res.data))
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}

export function resetPassword(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post("/api/auth/forgot-password", credentials)
                .then((res) => resolve(res.data))
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}

export function updatePassword(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post("/api/auth/password-reset", credentials)
                .then((res) => {
                    const { status } = res.data.status;
                    if (status === 202) {
                        const data = {
                            error: res.data.message,
                            status,
                        };
                        return reject(data);
                    }
                    return resolve(res);
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}

export function staffLogin(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post(
                "http://dev.waseem-ecptech.wadic.net/api/register",
                credentials
            )
                .then((res) => {
                    dispatch(action.staffLogin(res.data));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}

export function updateStaffLogin(credentials) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Http.post(
                "http://dev.waseem-ecptech.wadic.net/api/updateStaffLogin",
                credentials
            )
                .then((res) => {
                    dispatch(action.updateStaffLogin(res.data));
                    return resolve();
                })
                .catch((err) => {
                    const { status, errors } = err.response.data;
                    const data = {
                        status,
                        errors,
                    };
                    return reject(data);
                });
        });
}
