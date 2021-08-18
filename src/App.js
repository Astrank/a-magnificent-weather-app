import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';

function App() {
  const [curLocation, setCurrentLocation] = useState("Buenos Aires");
  
  const [weatherData, setWeatherData] = useState(null);
  //const [clientLocation, setClientLocation] = useState(null);
  const [geocodingData, setGeocodingData] = useState([]);

  const clearGeocodingData = () => setGeocodingData([]);

  const requestWeather = async (data) => await axios
    .get(`/.netlify/functions/request-weather?lat=${data.lat}&lon=${data.lon}`)
    .then(res => {
      setWeatherData(res.data);
      setCurrentLocation(data.name)
    });

  const geocoding = async (input) => await axios
    .get(`/.netlify/functions/geocoding?input=${input}`)
    .then(res => {
      setGeocodingData(res.data);
    })

  /*const geoLocation = () => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => setClientLocation(pos));
    }
  }*/

  useEffect(() => {
    //geoLocation()
  }, []);

  return (
    <div className="App">
      <SearchBar requestWeather={requestWeather} 
                  geocoding={geocoding} 
                  geocodingData={geocodingData} 
                  clearGeocodingData={clearGeocodingData}/>
      <div className="search-field"></div>
      <div className="current-weather">
        <h1 className="cur-location">{curLocation}</h1>
        <h1 className="temp">{weatherData != null ? Math.round(weatherData.current.temp * 10) / 10 + " ºC" : "ºC"}</h1>
      </div>
    </div>
  );
}

export default App;