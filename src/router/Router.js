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
import Category from "../pages/Category";

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
                <GuardedRoute path="/register" guard="guest">
                    <Register />
                </GuardedRoute>
                <GuardedRoute path="/login" guard="guest">
                    <Login />
                </GuardedRoute>

                <GuardedRoute path="/categories" guard="auth">
                    <Category />
                </GuardedRoute>
                <GuardedRoute path="/posts" guard="auth">
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