import {updateObject} from "../../shared/utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  loading: false,
  listProduct: null
};

const fetchProductStart = (state, action) => {
  return updateObject(state, {
    error: null, loading: true
  });
};

const fetchProductSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    listProduct: action.listProduct
  });
};

const fetchProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_PRODUCT_START: return fetchProductStart(state,action);

    case actionTypes.FETCH_PRODUCT_SUCCESS: return fetchProductSuccess(state, action);

    case actionTypes.FETCH_PRODUCT_FAIL: return fetchProductFail(state, action);

    default: return state;
  }
};

export default reducer;
