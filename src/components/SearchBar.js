/* eslint-disable */

import './SearchBar.css';
import axios from "axios";
import { useEffect, useState, useRef } from 'react';

const SearchBar = (props) => {
    const [value, setValue] = useState("");
    const [searchResultsClass, setSearchResultsClass] = useState("search-results hidden");
    const [geocodingData, setGeocodingData] = useState([]);
    const [loading, setLoading] = useState(false);
 
    const firstRender = useRef(true);
    
    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const showSearchResults = () => {
        setSearchResultsClass('search-results')
    }
    
    const hideSearchResults = () => {
        setTimeout(() => {
            setSearchResultsClass('search-results hidden')
        }, 150)
    }
    
    const geocoding = async (input) => {
        setLoading(true);
        await axios
            .get(`/.netlify/functions/geocoding?input=${input}`)
            .then((res) => {
                setGeocodingData(res.data);
            });
        setLoading(false);
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            setGeocodingData([]);
            if(value !== ''){
                geocoding(value);
            }
        }, 600);
        
        return () => clearTimeout(timeoutId);
    }, [value]);

    return (
        <div className="search-field">
            <div className="search-bar">
                <input className="search-input" 
                        onFocus={showSearchResults} 
                        onBlur={hideSearchResults} 
                        type="text" 
                        placeholder="Enter a city..." 
                        onChange={handleInputChange}/>
                <div className="icon">
                    {!loading ? 
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="search-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg> :
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" class="loading-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>}
                </div>
            </div>
            <div className={searchResultsClass}>
                {geocodingData.map((data, index) => 
                    <div key={index} className="search-result" 
                        onClick={() => props.newLocation(data)}>{data.name}, {data.country}</div>)}
            </div>
        </div>
    )
}

export default SearchBar

