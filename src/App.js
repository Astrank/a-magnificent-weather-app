import './App.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");
  const [curLocation, setCurrentLocation] = useState("Buenos Aires");
  const [searchResultsClass, setSearchResultsClass] = useState("search-results hidden");
  const [weatherData, setWeatherData] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [geocodingData, setGeocodingData] = useState([]);

  const firstRender = useRef(true);

  const requestWeather = async (data) => await axios
    .get(`/.netlify/functions/request-weather?lat=${data.lat}&lon=${data.lon}`)
    .then(res => {
      setWeatherData(res.data);
      setCurrentLocation(data.name)
    });

  const geocoding = async () => await axios
    .get(`/.netlify/functions/geocoding?input=${value}`)
    .then(res => {
      setGeocodingData(res.data);
    })

  const geoLocation = () => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => setClientLocation(pos));
    }
  }

  const showSearchResults = () => {
    setSearchResultsClass('search-results')
  }

  const hideSearchResults = () => {
    setTimeout(() => {
      setSearchResultsClass('search-results hidden')
    }, 150)
  }

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    geoLocation()
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      setGeocodingData([])
      if(value !== ''){
        geocoding()
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className="App">
      <div className="search-field">
        <input className="search-input" 
                onFocus={showSearchResults} 
                onBlur={hideSearchResults}  
                type="text" 
                placeholder="Enter a city..." 
                onChange={handleOnChange}/>
        <div className={searchResultsClass}>
          {geocodingData.map((data, index) => 
            <a key={index} 
              className="search-result" 
              onClick={() => requestWeather(data)}>{data.name}, {data.country}</a>)}
        </div>
      </div>
      <div className="current-weather">
        <h1 className="cur-location">{curLocation}</h1>
        <h1 className="temp">{weatherData != null ? Math.round(weatherData.current.temp * 10) / 10 + " ºC" : "ºC"}</h1>
      </div>
    </div>
  );
}

export default App;