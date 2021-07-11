import { Spinner } from "react-bootstrap";

function Loading({show = false}) {
    let style = {
        width: '3rem',
        height: '3rem',
    };

    let loadingStyle = {
        position: 'fixed',
        top: '20%',
        left: '45%',
    };

    if(! show) {
        return false;
    }

    return (
        <div className="text-center" style={loadingStyle}>
            <Spinner animation="border" style={style} />
        </div>
    );
}

export default Loading;