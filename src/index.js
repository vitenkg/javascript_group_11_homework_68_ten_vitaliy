import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";
import reducer from "./store/reducer";
import App from './App';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root')
);

