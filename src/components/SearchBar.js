import './SearchBar.css';
import { useEffect, useState, useRef } from 'react';

const SearchBar = (props) => {
    const [value, setValue] = useState("");
    const [searchResultsClass, setSearchResultsClass] = useState("search-results hidden");
 
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
    
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const timeoutId = setTimeout(() => {
            props.clearGeocodingData();
            if(value !== ''){
                props.geocoding(value);
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [value]);

    return (
        <div className="search-field">
            <input className="search-input" 
                onFocus={showSearchResults} 
                onBlur={hideSearchResults}  
                type="text" 
                placeholder="Enter a city..." 
                onChange={handleInputChange}/>
            <div className={searchResultsClass}>
                {props.geocodingData.map((data, index) => 
                    <div key={index} className="search-result" 
                        onClick={() => props.requestWeather(data)}>{data.name}, {data.country}</div>)}
            </div>
        </div>
    )
}

export default SearchBar

