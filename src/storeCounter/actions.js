import axios from 'axios';

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';

export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const FETCH_COUNTER_FAILURE = 'FETCH_COUNTER_FAILURE';

export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
export const add = value => ({type: ADD, payload: value});
export const subtract = value => ({type: SUBTRACT, payload: value});

export const fetchCounterRequest = () => ({type: FETCH_COUNTER_REQUEST});
export const fetchCounterSuccess = counter => ({type: FETCH_COUNTER_SUCCESS, payload: counter});
export const fetchCounterFailure = () => ({type: FETCH_COUNTER_FAILURE});

export const fetchCounter = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCounterRequest());

    try {
      const response = await axios.get('https://ten-vitaliy-works-default-rtdb.firebaseio.com/counter/counter.json');
      if (response.data === null) {
        dispatch(fetchCounterSuccess(0));
      } else {
        dispatch(fetchCounterSuccess(response.data));
      }
    } catch (e) {
      dispatch(fetchCounterFailure());
    }
  };
};

export const fetchCounterRec = () => {
  return async (dispatch, getState) => {
    dispatch(fetchCounterRequest());
    try {
      await axios.patch('https://ten-vitaliy-works-default-rtdb.firebaseio.com/counter.json', {counter: getState().counter});
    } catch (e) {
      dispatch(fetchCounterFailure());
    }
  };
};
