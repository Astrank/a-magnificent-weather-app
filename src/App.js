/* eslint-disable */

import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";

function App() {
  const days = ["sun.", "mon.", "tue.", "wed.", "thu.", "fri.", "sat."];

  const [curLocation, setCurrentLocation] = useState({
    country: "AR",
    lat: -34.6132,
    lon: -58.3772,
    name: "Buenos Aires",
  });
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  const newLocation = (data) => setCurrentLocation(data);

  const requestWeather = async () => {
    setLoading(true);
    await axios
      .get(
        `/.netlify/functions/request-weather?lat=${curLocation.lat}&lon=${curLocation.lon}`
      )
      .then((res) => {
        setWeatherData(res.data);
      });
    setLoading(false);
  };

  /*const geolocationDb = async () => {
    await axios.get(`https://geolocation-db.com/json/`)
      .then(res => res.data)
      .catch(err => err)
  }*/

  const reverseGeocoding = async () => {
    await navigator.geolocation.getCurrentPosition((pos) =>
      axios
        .get(
          `/.netlify/functions/reverse-geocoding?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        )
        .then((res) => setCurrentLocation(res.data[0]))
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(reverseGeocoding);
  }, []);

  useEffect(() => {
    requestWeather();
  }, [curLocation]);

  return (
    <div className="App">
      <SearchBar newLocation={newLocation} />
      {loading && (
        <div className="loading">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {weatherData && !loading && (
        <div className="weather">
          <div className="current-weather">
            <div className="current-weather__main">
              <h1 className="cur-location">{`${curLocation.name}, ${curLocation.country}`}</h1>
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png`}
                  alt={weatherData.current.weather[0].main}
                  title={weatherData.current.weather[0].main}
                  width="80px"
                  height="80px"
                />
              </div>
              <h1 className="temp">
                {weatherData &&
                  Math.round(weatherData.current.temp * 10) / 10 + "º"}
              </h1>
            </div>
            <div className="current-weather__data">
              <div className="weather-description">
                {weatherData.current.weather[0].description}
              </div>
              <div className="humidity">
                Humidity: {weatherData.current.humidity} %
              </div>
              <div className="feels-like">
                Feels like: {weatherData.current.feels_like} ºC
              </div>
              <div className="visibility">
                Visibility: {weatherData.current.visibility / 1000} km
              </div>
              <div className="pressure">
                Pressure: {weatherData.current.pressure} mb
              </div>
            </div>
          </div>
          <div className="daily-weather">
            {weatherData.daily.map((day, index) => (
              <div className="day-weather" key={index}>
                <div className="date">{`${
                  days[
                    new Date(
                      new Date().setDate(new Date().getDate() + index)
                    ).getDay()
                  ]
                } ${new Date(
                  new Date().setDate(new Date().getDate() + index)
                ).getDate()}`}</div>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt={day.weather[0].main}
                    title={day.weather[0].main}
                  />
                </div>
                <div className="daily-minmax">
                  <div className="max">{Math.round(day.temp.max)}</div>
                  <div className="min">{Math.round(day.temp.min)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
