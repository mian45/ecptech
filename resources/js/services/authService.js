import Http from "../Http";
import * as action from "../store/actions";
import axios from "axios";

export function login({ email, password, remember }) {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            axios
                .post(`${process.env.MIX_REACT_APP_URL}/api/login`, {
                    email,
                    password,
                    remember_me: remember,
                })
                .then((res) => {
                    localStorage.setItem("access_token", res.data.data.token);
                    localStorage.setItem("remember", remember);

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
export function remember(dispatch) {
    const token = localStorage.getItem("access_token");
    Http.get("/api/get-user-details")
        .then((response) => {
            let res = response;
            res.data.data = { ...res.data.data, token: token };
            dispatch(action.authLogin(res.data));
            return;
        })
        .catch((err) => {
            console.log(err);
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
            Http.post(`${process.env.MIX_REACT_APP_URL}/api/auth/register`, credentials)
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
            Http.post(
                `${process.env.MIX_APP_URL}/api/forgotPassword`,
                credentials
            )
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
            Http.post(`${process.env.MIX_REACT_APP_URL}/api/auth/password-reset`, credentials)
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
            Http.post(`${process.env.MIX_REACT_APP_URL}/api/register`, credentials)
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
            Http.post(`${process.env.MIX_REACT_APP_URL}/api/updateStaffLogin`, credentials)
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
export function logout(userId) {
    return (dispatch) =>{
        new Promise((resolve, reject) => {
            Http.post(`${process.env.MIX_REACT_APP_URL}/api/logout`, {
                userId:userId
                })
                .then((res) => {
                    dispatch(action.authLogout());
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
}
export function showSideBar(){
    return (dispatch) =>
        new Promise((resolve, reject) => {
           
                    dispatch(action.showSideBar());
                    return resolve();
               
        });
}