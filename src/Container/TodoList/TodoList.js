import React from 'react';
import './TodoList.css';
import {useDispatch, useSelector} from "react-redux";


const TodoList = () => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todoList);

    return (
        <div>
            todo
        </div>
    );
};

export default TodoList;