import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useUserContext } from "../../contexts/userContext";

const GuardedRoute = ({ children, ...rest }) =>  {
    const { user, login } = useUserContext();
    const location = useLocation();

    useEffect(() => {
      if (!user.authIs) {
        login();
      }
    }, [user, login]);

    const component = (meta = null) => {
      if (meta && meta.guard === 'auth' && !user.authIs) {
        return <Redirect to={{
          pathname: "/login",
          state: { from: location }
        }} />;
      } else if (meta && meta.guard === 'guest' && user.authIs) {
        return <Redirect to={{
          pathname: "/",
          state: { from: location }
        }} />;
      } else {
        return children;
      }
    };

    return (
      <Route {...rest}>
        {component(rest.meta)}
      </Route>
    );
};

export default GuardedRoute;