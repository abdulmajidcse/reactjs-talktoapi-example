import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="card">
      <Spinner loading={loading} />
      <div className="card-header">
        <h4>Welcome to React App.</h4>
      </div>
      <div className="card-body">
        Home page.
      </div>
    </div>
  );
}