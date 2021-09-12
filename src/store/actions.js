import axiosApi from "../AxiosApi";

export const ADD = 'ADD';
export const CHANGE = 'CHANGE';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

export const FETCH_TODO_REQUEST = 'FETCH_TODO_REQUEST';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';


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
            console.log('Loaded');
            const response = await axiosApi.get('/todolist.json');
            const data = Object.keys(response.data).map(type => {
                return {id: type, text: response.data[type].text}
            });
            console.log('data ',data);
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
            console.log('state: ', getState().todo);
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
        const value = getState().todoList.map(todo => {
            if (id === todo.id) return todo.text
        });
        console.log(value);
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