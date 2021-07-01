import { useState } from "react";

export default function withCounter(WrappedComponent) {
    return function() {
        const [counter, setCounter] = useState(0);

        const eventCounter = () => {
            setCounter((counter + 1));
        }

        return (
            <WrappedComponent counter={counter} eventCounter={eventCounter} />
        );
    };
}