import { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useUserContext } from '../../contexts/userContext';
import { getToken } from '../../utils/token';

const GuardedRoute = ({ children, ...rest }) => {
    const { user, login } = useUserContext();
    const location = useLocation();

    useEffect(() => {
        if (getToken() && !user.authIs) {
            login();
        }
    }, [user, login]);

    const component = (guard = null) => {
        if (guard === 'auth' && !user.authIs) {
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location },
                    }}
                />
            );
        }
        if (guard === 'guest' && user.authIs) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: location },
                    }}
                />
            );
        }
        return children;
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest}>{component(rest.guard)}</Route>;
};

export default GuardedRoute;
