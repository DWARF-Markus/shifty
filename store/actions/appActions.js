import { SET_LOADING } from './types';

export const setLoading = (val) => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: val
  })
}