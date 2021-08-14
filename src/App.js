import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);

  const request = async () => await axios
    .get("/.netlify/functions/weather-by-city?city=rosario")
    .then(res => {
      console.log(res.data);
      setWeather(res.data);
    });

  const getUserData = async () => await axios
    .get('https://geolocation-db.com/json')
    .then(res => console.log(res));

  useEffect(() => {
    getUserData()
    request()
  }, []);

  return (
    <div className="App">
      <div className="current-weather">
        <h1 className="city">{weather != null ? weather.name : "Ciudad"}</h1>
        <h1 className="temp">{weather != null ? weather.main.temp + " ºC" : "ºC"}</h1>
      </div>
    </div>
  );
}

export default App;