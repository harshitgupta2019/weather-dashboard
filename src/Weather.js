
import React, { useState, useEffect } from 'react';
import './Weather.css'; 
import clearIcon from './icons/clear.svg';
import stormIcon from './icons/storm.svg';
import snowIcon from './icons/snow.svg';
import hazeIcon from './icons/haze.svg';
import cloudIcon from './icons/cloud.svg';
import rainIcon from './icons/rain.svg';

const Weather = ({ setCityCoordinates }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'ddb2d7c9ab904cb822fba9e7c45463fa';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit exceeded
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          throw new Error('City not found');
        }
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, setCityCoordinates]);

  // Function to map weather conditions to Font Awesome icons
  function getWeatherIcon(id) {
    if (id === 800) {
      return clearIcon;
    } else if (id >= 200 && id <= 232) {
      return stormIcon;
    } else if (id >= 600 && id <= 622) {
      return snowIcon;
    } else if (id >= 701 && id <= 781) {
      return hazeIcon;
    } else if (id >= 801 && id <= 804) {
      return cloudIcon;
    } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
      return rainIcon;
    } else {
      return null; // Default icon if no match
    }
  }

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="weather-input"
      />
      {weatherData && (
        <div className="weather-data">
         {getWeatherIcon(weatherData.weather[0].id) && (
            <img
              src={getWeatherIcon(weatherData.weather[0].id)}
              alt="Weather Icon"
              className="weather-icon"
            />
          )}
          <h2>Weather in {weatherData.name}, {weatherData.sys.country}</h2>
          <p><i>Temperature:</i> {weatherData.main.temp}°C</p>
          <p><i>Humidity:</i> {weatherData.main.humidity}%</p>
          <p><i>Wind Speed:</i> {weatherData.wind.speed} m/s</p>
          <p><i>Condition:</i> {weatherData.weather[0].description}</p>
          
        </div>
      )}
      {error && <p className="weather-error">{error}</p>}
    </div>
  );
};

export default Weather;
