import * as ActionTypes from '../action-types';

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

export function activeState () {
    return {
        type : ActionTypes.ACTIVE_STATE
    }
}

export function activeSettingState (payload) {
    return {
        type : ActionTypes.ACTIVE_SETTING_STATE,
        payload
    }
}
