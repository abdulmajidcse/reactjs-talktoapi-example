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
        zIndex: 99999,
    };

    if(! show) {
        return false;
    }

    return (
        <>
            <Spinner animation="border" role="status" style={loadingStyle}>
                <span className="visually-hidden" style={style}>Loading...</span>
            </Spinner>
      </>
    );
}

export default Loading;