import { useEffect, useContext } from "react";
import Spinner from '../components/Spinner';
import ContextStore from "../contexts/ContextStore";

export default function Home() {
  const context = useContext(ContextStore);

  useEffect(() => {
    document.title = 'Home - React App';
    setTimeout(() => {
      context.toggleLoading(false);
    }, 2000);
  }, [context]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>Welcome to React App.</h4>
      </div>
      <div className="card-body">
        Lumen Category Crud with React Functional components.
        {/* consume context value(get value) */}
        <ContextStore.Consumer>
          {({loading}) => (
            <Spinner loading={loading} />
          )}
        </ContextStore.Consumer>

      </div>
    </div>
  );
}