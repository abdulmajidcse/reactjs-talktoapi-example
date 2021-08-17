import { Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import CheckGuard from '../utils/CheckGuard';
import NotFound from "../components/NotFound";
import Home from '../pages/Home';
import TodoIndex from "../pages/todo/TodoIndex";
import TodoCreate from '../pages/todo/TodoCreate';
import TodoEdit from '../pages/todo/TodoEdit';
import Register from "../pages/auth/Register";
import Login from '../pages/auth/Login';
import Loading from "../components/Loading";

function Router() {
    return (
        <>
            <GuardProvider guards={[CheckGuard]} loading={() => (<Loading show={true} />)} error={NotFound}>
                <Switch>
                    <GuardedRoute exact path="/" component={Home} />
                    <GuardedRoute path="/todos/create" component={TodoCreate} />
                    <GuardedRoute path="/todos/:id/edit" component={TodoEdit} />
                    <GuardedRoute path="/todos" component={TodoIndex} />
                    {/* auth routes */}
                    <GuardedRoute path="/register" component={Register} meta={{ guard: 'guest' }} />
                    <GuardedRoute path="/login" component={Login} meta={{ guard: 'guest' }} />

                    <GuardedRoute path="/posts" render={() => {
                        return 'post page';
                    }} meta={{ guard: 'auth' }} />

                    {/* not found route */}
                    <GuardedRoute path="*" component={NotFound} />
                </Switch>
            </GuardProvider>
        </>
    );
}

export default Router;