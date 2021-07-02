import { useState } from "react";
import TemperatureInput from "../components/LSU/TemperatureInput";
import { toCelsius, toFahrenheit, tryConvert } from "../components/LSU/ConvertTemperature";
import BoilingVerdict from '../components/LSU/BoilingVerdict'

export default function Calculator() {
    const [scale, setScale] = useState('c');
    const [temperature, setTemperature] = useState('');

    const handleCelsiusChange = (e, scale) => {
        setScale(scale);
        setTemperature(e.target.value);
      }
    
    const handleFahrenheitChange = (e, scale) => {
        setScale(scale);
        setTemperature(e.target.value);
    }

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div className="card">
            <div className="card-header">Lifting State Up</div>
            <div className="card-body">
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={handleCelsiusChange} />
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange} />
            </div>
            <div className="card-footer">
                <BoilingVerdict celsius={celsius} />
            </div>
        </div>
    ); 
}