import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const startFetchAllDrugStores = () => {
  return {
    type: actionTypes.FETCH_ALL_DS_START
  }
};

export const fetchAllDrugStoresSuccess = list => {
  return {
    type: actionTypes.FETCH_ALL_DS_SUCCESS,
    listDrugStores: list
  }
};

export const fetchAllDrugStoresFail = () => {
  return {
    type: actionTypes.FETCH_ALL_DS_SUCCESS
  }
};