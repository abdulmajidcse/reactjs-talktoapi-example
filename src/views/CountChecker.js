import ButtonCounter from "../components/counter/ButtonCounter";
import HoverCounter from "../components/counter/HoverCounter";

export default function CountChecker() {
    return (
        <div className="card">
          <div className="card-header">
            <div className="row">
                <h4>HOC - Higher Order Component</h4>
            </div>
          </div>
          <div className="card-body">
            <ButtonCounter />
            <HoverCounter />
          </div>
        </div>
    );
}