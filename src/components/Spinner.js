function Spinner({loading = false}) {
    let style = {
        width: '3rem',
        height: '3rem',
    };

    let loadingStyle = {
        position: 'fixed',
        top: '40%',
        left: '50%',
    };

    if(! loading) {
        return false;
    }

    return (
        <div className="text-center" style={loadingStyle}>
            <div className="spinner-border" style={style} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;