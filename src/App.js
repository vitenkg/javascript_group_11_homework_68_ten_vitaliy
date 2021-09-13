import TodoList from "./Container/TodoList/TodoList";
import './App.css';
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import Counter from "./Container/Counter/Counter";

function App() {
    return (
        <div className="Container">
            <BrowserRouter>
                <ul className="UlNav">
                    <li className="LiNav"><NavLink exact to="/" className="Link">Todo List</NavLink></li>
                    <li className="LiNav"><NavLink className="Link" to="/counter">Counter</NavLink></li>
                </ul>

                <Switch>
                  <Route path="/" exact component={TodoList}/>
                  <Route path="/counter" component={Counter}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
