import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from '../pages/Home';
import TodoIndex from "../pages/todo/TodoIndex";
import TodoCreate from '../pages/todo/TodoCreate';
import TodoEdit from '../pages/todo/TodoEdit';
import Register from "../pages/auth/Register";
import Login from '../pages/auth/Login';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/todos/create">
                <TodoCreate />
            </Route>
            <Route path="/todos/:id/edit">
                <TodoEdit />
            </Route>
            <Route path="/todos">
                <TodoIndex />
            </Route>

            {/* auth routes */}
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>

            {/* not found route */}
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Router;