import React, {useEffect} from 'react';
import './TodoList.css';
import {useDispatch, useSelector} from "react-redux";
import {addFetch, change, edit, editFetch, fetchTodo, removeFetch} from "../../store/actions";


const TodoList = () => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todoList);
    const todo = useSelector(state => state.todo)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)

    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch]);

    const onSubmitHandler = e => {
        e.preventDefault();
        dispatch(addFetch());
    };

    const onSubmitEditHandler = (e, id) => {
        e.preventDefault();
        console.log('Submit String');
        console.log(e.target.value);
        dispatch(editFetch(id));
    }

    const onChangeNewHandler = e => dispatch(change(e.target.value));
    const onChangeEditHandler = (id, value) => dispatch(edit({id, value}));
    const onClickEraseHandler = id => {
        dispatch(removeFetch(id));
    }



    return (
        <>
            <div className="InputDo">
                <form onSubmit={onSubmitHandler}>
                    <label>
                        Введите новую задачу
                        <textarea
                            value={todo}
                            onChange={onChangeNewHandler}
                            placeholder="Введите "
                        />
                    </label>
                    <button
                        type="submit"
                        className="BtnSubmit"
                    >
                        Добавить
                    </button>
                </form>
            </div>
            <div className="TodoList">
                <ul>
                    {todoList.map(todo => (
                        <li
                            className='Todo'
                            key={todo.id}
                        >
                            <form
                                className="OutPutForm"
                                onSubmit={e => onSubmitEditHandler(e, todo.id)}
                            >
                                <input
                                    className="OutputDo"
                                    type="text"
                                    value={todo.text}
                                    onChange={(e) => onChangeEditHandler(todo.id, e.target.value)}
                                />
                                <button type="submit">Edit</button>
                            </form>
                            <button
                                onClick={() => onClickEraseHandler(todo.id)}
                            >
                                Erase
                            </button>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </>
    );
};

export default TodoList;