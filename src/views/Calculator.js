import { useState } from "react";
import BoilingVerdict from "../components/LSU/BoilingVerdict";

export default function Calculator() {
    const [temperature, setTemperature] = useState(0);

    const handleChange = (e) => {
        setTemperature(e.target.value);
    }
    
    return (
        <div className="card">
            <div className="card-header">Enter Temperature in Celsius:</div>
            <div className="card-body">
                <input className="form-control" type="number" value={temperature} onChange={handleChange} />
            </div>
            <div className="card-footer">
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </div>
        </div>
    ); 
}