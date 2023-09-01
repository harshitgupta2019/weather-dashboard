import React, { useState } from 'react';
import Weather from './Weather';
import './App.css'; // Import the CSS file

function App() {
  const [cityCoordinates, setCityCoordinates] = useState({ x: 0, y: 0, z: 0 });

  return (
    <div className="container">
      <h1>Weather Station Dashboard</h1>
      <Weather setCityCoordinates={setCityCoordinates} />
    </div>
  );
}

export default App;
