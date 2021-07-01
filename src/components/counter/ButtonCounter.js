import withCounter from "../HOC/withCounter";

function ButtonCounter(props) {
    const {counter, eventCounter} = props;

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={eventCounter}>Clicked {counter} times.</button>
        </div>
    );
}

export default withCounter(ButtonCounter);