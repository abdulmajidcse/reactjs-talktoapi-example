import withCounter from "../HOC/withCounter";

function HoverCounter(props) {
    const {counter, eventCounter} = props;
    return (
        <div>
            <h1 className="border border-primary font-weight-bold" onMouseOver={eventCounter}>Hovered {counter} times.</h1>
        </div>
    );
}

export default withCounter(HoverCounter);