import {
    DECREASE,
    FETCH_COUNTER_FAILURE,
    FETCH_COUNTER_REQUEST,
    FETCH_COUNTER_SUCCESS,
    INCREASE,
    SUBTRACT,
    ADDCOUNTER,
    CHANGE,
    EDIT,
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS
} from "../store/actions";

const initialState = {
    todoList: [],
    todo: '',
    loading: false,
    error: null,
    counter: 1,
}

const reducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case CHANGE:
            return {...state, todo: payload};
        case EDIT:
            const todoCopy = [...state.todoList];
            const newTodo = todoCopy.map(todo => {
                if (payload.id === todo.id) {
                      return {...todo, text: payload.value}
                }
                return {...todo};
            });
            return {...state, todoList: newTodo};
        case FETCH_TODO_SUCCESS:
            return {
                ...state, loading: false, todoList: payload.map(data => {
                    return {...data};
                })
            };
        case FETCH_TODO_REQUEST:
            return {...state, loading: true};

        case INCREASE:
            return {...state, counter: state.counter + 1};
        case DECREASE:
            return {...state, counter: state.counter - 1};
        case ADDCOUNTER:
            return {...state, counter: state.counter + action.payload};
        case SUBTRACT:
            return {...state, counter: state.counter - action.payload};
        case FETCH_COUNTER_REQUEST:
            return {...state, error: null, loading: true};
        case FETCH_COUNTER_SUCCESS:
            return {...state, loading: false, counter: action.payload};
        case FETCH_COUNTER_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return {...state};
    }
}

export default reducer;