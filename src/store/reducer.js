import {CHANGE, EDIT, FETCH_TODO_REQUEST, FETCH_TODO_SUCCESS} from "./actions";

const initialState = {
    todoList: [],
    todo: '',
    loading: false,
    error: null,
}


const reducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case CHANGE:
            return {...state, todo: payload};
        case EDIT:
            console.log('edit', payload);
            const todoCopy = [...state.todoList];
            console.log(todoCopy);
            const newTodo = todoCopy.map(todo => {
                if (payload.id === todo.id) {
                      return {...todo, text: payload.value}
                }
                return {...todo};
            });
            console.log('NEw: ', newTodo);
            return {...state, todoList: newTodo};
        case FETCH_TODO_SUCCESS:
            return {
                ...state, loading: false, todoList: payload.map(data => {
                    return {...data};
                })
            };
        case FETCH_TODO_REQUEST:
            return {...state, loading: true};
        default:
            return {...state};
    }
}

export default reducer;