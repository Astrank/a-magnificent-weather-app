/* eslint-disable */

import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';

function App() {
  const [curLocation, setCurrentLocation] = useState({country: "AR", lat: -34.6132, lon: -58.3772, name: "Buenos Aires"});
  
  const [weatherData, setWeatherData] = useState(null);
  const [geocodingData, setGeocodingData] = useState([]);

  const clearGeocodingData = () => setGeocodingData([]);
  const newLocation = (data) => setCurrentLocation(data);

  const requestWeather = async () => await axios
    .get(`/.netlify/functions/request-weather?lat=${curLocation.lat}&lon=${curLocation.lon}`)
    .then(res => {
      setWeatherData(res.data);
      console.log(res.data)
    });

  const geocoding = async (input) => await axios
    .get(`/.netlify/functions/geocoding?input=${input}`)
    .then(res => {
      setGeocodingData(res.data);
    })

  const passed = async () => {
    await navigator.geolocation.getCurrentPosition(pos => axios
      .get(`/.netlify/functions/reverse-geocoding?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
      .then(res => setCurrentLocation(res.data[0])));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(passed);
  }, []);

  useEffect(() => {
    requestWeather();
  }, [curLocation])

  return (
    <div className="App">
      <SearchBar geocoding={geocoding} 
                  geocodingData={geocodingData} 
                  clearGeocodingData={clearGeocodingData}
                  newLocation={newLocation}/>
      <div className="weather">
        {weatherData && <div className="current-weather">
          <h1 className="cur-location">{`${curLocation.name}, ${curLocation.country}`}</h1>
          <div className="weather-icon"><img src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`} alt={weatherData.current.weather[0].main} title={weatherData.current.weather[0].main} width="70px" height="70px" /></div>
          <h1 className="temp">{weatherData && Math.round(weatherData.current.temp * 10) / 10 + " ºC"}</h1>
        </div>}
        {weatherData && <div className="daily-weather">
          {weatherData.daily.map((day, index) => <div className="day-weather" key={index}>
            <div className="date">{`${new Date(new Date().setDate(new Date().getDate() + index)).getDate()} / 
                ${new Date(new Date().setDate(new Date().getDate() + index)).getMonth()}`}</div>
            <div className="weather-icon"><img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={day.weather[0].main} title={day.weather[0].main}/></div>
            <div className="daily-minmax">
              <div className="max">{Math.round(day.temp.max)}</div>
              <div className="min">{Math.round(day.temp.min)}</div>
            </div>
          </div>)}  
        </div>}
      </div>
    </div>
  );
}

export default App;