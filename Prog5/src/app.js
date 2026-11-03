import React, { useState } from 'react';
import './styles.css'; // Styling strictly separated

export default function App() {
  // Step 2 & 3: Hooks and State Variables
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 5: Handle Form Submission
  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeatherData(null);

    // Step 6: Call API (Replace YOUR_API_KEY with a real OpenWeatherMap key)
    const API_KEY = 'YOUR_API_KEY'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      
      const data = await response.json();
      setWeatherData(data); // Step 7: Update weatherData state
    } catch (err) {
      setError(err.message); // Step 7: Update error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Weather Dashboard</h2>
      
      {/* Step 4: Form to Accept City Input */}
      <form onSubmit={fetchWeather} className="input-group">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {/* Step 8: Display Data or States */}
      {loading && <p>Loading weather data...</p>}
      {error && <p className="error">{error}</p>}
      
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p className="temp">{weatherData.main.temp}°C</p>
          <p>{weatherData.weather[0].description.toUpperCase()}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt="weather icon" 
          />
        </div>
      )}
    </div>
  );
}