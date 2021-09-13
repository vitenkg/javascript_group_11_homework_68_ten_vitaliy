import axiosApi from "../AxiosApi";
import axios from "axios";

export const ADD = 'ADD';
export const CHANGE = 'CHANGE';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const ADDCOUNTER = 'ADDCOUNTER';
export const SUBTRACT = 'SUBTRACT';

export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';

export const FETCH_COUNTER_REQUEST = 'FETCH_COUNTER_REQUEST';
export const FETCH_COUNTER_SUCCESS = 'FETCH_COUNTER_SUCCESS';
export const FETCH_COUNTER_FAILURE = 'FETCH_COUNTER_FAILURE';

export const increase = () => ({type: INCREASE});
export const decrease = () => ({type: DECREASE});
export const addCounter = value => ({type: ADDCOUNTER, payload: value});
export const subtract = value => ({type: SUBTRACT, payload: value});

export const fetchCounterRequest = () => ({type: FETCH_COUNTER_REQUEST});
export const fetchCounterSuccess = counter => ({type: FETCH_COUNTER_SUCCESS, payload: counter});
export const fetchCounterFailure = () => ({type: FETCH_COUNTER_FAILURE});

export const fetchTodoRequest = () => ({type: FETCH_TODO_REQUEST});
export const fetchTodoSuccess = data => ({type: FETCH_TODO_SUCCESS, payload: data});
export const fetchTodoFailure = () => ({type: FETCH_TODO_FAILURE});

export const change = value => ({type: CHANGE, payload: value});
export const edit = id => ({type: EDIT, payload: id});
export const remove = id => ({type: REMOVE, payload: id});

export const fetchTodo = () => {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            const response = await axiosApi.get('/todolist.json');
            const data = Object.keys(response.data).map(type => {
                return {id: type, text: response.data[type].text}
            });
            dispatch(fetchTodoSuccess(data));
        } catch (e) {
            dispatch(fetchTodoFailure())
        }
    };
};


export const addFetch = () => {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            await axiosApi.post('/todolist.json', {text: getState().todo});
            dispatch(change(''));
            dispatch(fetchTodo())
        } catch (e) {
            dispatch(fetchTodoFailure());
        }
    };
};

export const editFetch = (id) => {
    return async (dispatch, getState) => {
        let value = '';
        getState().todoList.map(todo => {
            if (id === todo.id) {
                value = todo.text
            }
            return todo;
        });
        dispatch(fetchTodoRequest());
        try {
            await axiosApi.patch(`/todolist/${id}.json`, {text: value});
            dispatch(fetchTodo());
        } catch (e) {
            dispatch(fetchTodoFailure())
        }
    }
};

export const removeFetch = (id) => {
    return async (dispatch, getState) => {
        dispatch(fetchTodoRequest());
        try {
            await axiosApi.delete(`/todolist/${id}.json`);
            dispatch(fetchTodo());
        } catch (e) {
            dispatch(fetchTodoFailure())
        }
    }
};

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