import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const fetchProductStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START
  }
};

export const fetchProductSuccess = data => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    listProduct : data
  }
};

export const fetchProductFail = error => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error: error
  }
};

export const fetchProducts = () => {
  console.log("fetchProducts - pre function");
  return dispatch => {
    console.log("fetchProducts - post function");
    dispatch(fetchProductStart());
    axios.get('/productController/getProducts')
      .then( response => {
        dispatch(fetchProductSuccess(response.data));
      })
      .catch( err => {
        dispatch(fetchProductFail(err.response.data.error));
      });
  }
};
