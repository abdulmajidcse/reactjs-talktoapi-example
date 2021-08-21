import { Switch } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from '../pages/Home';
import TodoIndex from "../pages/todo/TodoIndex";
import TodoCreate from '../pages/todo/TodoCreate';
import TodoEdit from '../pages/todo/TodoEdit';
import Register from "../pages/auth/Register";
import Login from '../pages/auth/Login';
import GuardedRoute from "./guards/GuardedRoute";
import Post from "../pages/Post";

function Router() {
    
    return (
        <>
            <Switch>
                <GuardedRoute exact path="/">
                    <Home />
                </GuardedRoute>
                <GuardedRoute path="/todos/create">
                    <TodoCreate />
                </GuardedRoute>
                <GuardedRoute path="/todos/:id/edit">
                    <TodoEdit />
                </GuardedRoute>
                <GuardedRoute path="/todos">
                    <TodoIndex />
                </GuardedRoute>
                {/* auth GuardedRoutes */}
                <GuardedRoute path="/register" meta={{guard: 'guest'}}>
                    <Register />
                </GuardedRoute>
                <GuardedRoute path="/login" meta={{guard: 'guest'}}>
                    <Login />
                </GuardedRoute>

                <GuardedRoute path="/posts" meta={{guard: 'auth'}}>
                    <Post />
                </GuardedRoute>

                {/* not found route */}
                <GuardedRoute path="*">
                    <NotFound />
                </GuardedRoute>
            </Switch>
        </>
    );
}

export default Router;