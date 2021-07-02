const scaleNames = {
    c: 'celsius',
    f: 'farenheit'
}

export default function TemperatureInput({scale, temperature, onTemperatureChange}) {
    return (
        <div>
            <p>Enter Temperature in {scaleNames[scale]}</p>
            <input className="form-control" type="number" value={temperature} onChange={e => onTemperatureChange(e, scale)} />
        </div>
    );
}