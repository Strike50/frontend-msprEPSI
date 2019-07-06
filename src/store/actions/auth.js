import axios from '../../instance';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: data
  }
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const url = isSignup ? '/user' : '/auth/login';
    const bodyFormData = new FormData();
    bodyFormData.set('email', email);
    bodyFormData.set('password', password);
    const authData = JSON.stringify({ email: email, password: password });
    const config = {
      headers: {'content-type': 'application/json', 'accept': '*/*'}
    };
    axios.post(url, bodyFormData, config)
      .then(response => {
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()){
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      } else {
        dispatch(logout());
      }
    }
  }
};