import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from '../pages/Home';
import TodoIndex from "../pages/todo/TodoIndex";
import TodoCreate from '../pages/todo/TodoCreate';
import TodoEdit from '../pages/todo/TodoEdit';

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

            {/* not found route */}
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Router;