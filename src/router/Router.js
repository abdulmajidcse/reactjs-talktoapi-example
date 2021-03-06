import { Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Category from '../pages/Category';
import Home from '../pages/Home';
import Post from '../pages/Post';
import TodoCreate from '../pages/todo/TodoCreate';
import TodoEdit from '../pages/todo/TodoEdit';
import TodoIndex from '../pages/todo/TodoIndex';
import GuardedRoute from './guards/GuardedRoute';

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
