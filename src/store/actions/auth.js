import axios from '../../axios-orders';

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

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const bodyFormData = new FormData();
    bodyFormData.set('username', email);
    bodyFormData.set('password', password);
    axios({
      method: 'post',
      url: '/login',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
    })
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  };
};

export const signUp = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData= {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };
    axios.post('/userController/signUp',authData)
      .then(response => {
        console.log(response);
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
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      } else {
        dispatch(logout());
      }
    }
  }
};