import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from '../pages/Home';
import TodoIndex from "../pages/todo/TodoIndex";

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
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