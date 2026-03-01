import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Error");
      }

      const data = await response.json();

      // Store only current object
      setWeather(data.current);

    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      {weather && (
        <div className="weather-cards">

          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.temp_c}°C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.condition.text}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.wind_kph} kph</p>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;