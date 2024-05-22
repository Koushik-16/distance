import React, { useState } from 'react';

const RouteForm = () => {
    const [originLat, setOriginLat] = useState('');
    const [originLng, setOriginLng] = useState('');
    const [destinationLat, setDestinationLat] = useState('');
    const [destinationLng, setDestinationLng] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin_lat: originLat,
                origin_lng: originLng,
                destination_lat: destinationLat,
                destination_lng: destinationLng
            })
        })
        .then(response => response.json())
        .then(data => {
            setResult(data);
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Route Distance and Instructions</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Origin Latitude:
                    <input type="text" value={originLat} onChange={(e) => setOriginLat(e.target.value)} required />
                </label>
                <label>
                    Origin Longitude:
                    <input type="text" value={originLng} onChange={(e) => setOriginLng(e.target.value)} required />
                </label>
                <label>
                    Destination Latitude:
                    <input type="text" value={destinationLat} onChange={(e) => setDestinationLat(e.target.value)} required />
                </label>
                <label>
                    Destination Longitude:
                    <input type="text" value={destinationLng} onChange={(e) => setDestinationLng(e.target.value)} required />
                </label>
                <button type="submit">Calculate</button>
            </form>
            {result && (
                <div>
                    <h2>Distance: {result.distance.toFixed(2)} km</h2>
                    <h2>Duration: {result.duration.toFixed(2)} minutes</h2>
                    <h3>Route Instructions:</h3>
                    <ul>
                        {result.instructions.map((step, index) => (
                            <li key={index}>{step.instruction} ({(step.distance / 1000).toFixed(2)} km, {(step.duration / 60).toFixed(2)} min)</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RouteForm;
