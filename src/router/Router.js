import { Switch, Route } from "react-router-dom";
import Home from '../views/Home';
import CategoryIndex from '../views/categories/CategoryIndex';
import CategoryCreate from '../views/categories/CategoryCreate';
import ShowCategory from "../views/categories/ShowCategory";
import EditCategory from "../views/categories/EditCategory";
import CountChecker from "../views/CountChecker";
import Calculator from '../views/Calculator';

function Router() {
    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/categories/create">
                    <CategoryCreate />
                </Route>
                <Route path="/categories/:id/edit">
                    <EditCategory />
                </Route>
                <Route path="/categories/:id">
                    <ShowCategory />
                </Route>
                <Route path="/categories">
                    <CategoryIndex />
                </Route>
                <Route path="/hoc-pattern">
                    <CountChecker />
                </Route>
                <Route path="/lifting-state-up">
                    <Calculator />
                </Route>
            </Switch>
        </div>
    );
}

export default Router;