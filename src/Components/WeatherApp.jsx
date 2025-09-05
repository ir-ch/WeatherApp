import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"

import { useState, useEffect } from 'react';

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const apiKey = import.meta.env.VITE_WEATHER_APP_API_KEY;

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            const defaultLocation = "London";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${apiKey}`;
            const res = await fetch(url);
            const defaultData = await res.json();
            setData(defaultData);
        }

        fetchDefaultWeather();
    }, [])

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            search();
        }
    }

    const search = async () => {
        if (location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apiKey}`;
            const res = await fetch(url);
            const searchData = await res.json();
            setData(searchData);
            setLocation('');
        }
    }

    return (
        <div className="container">
            <div className="weather-app">
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Enter location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                    </div>
                </div>
                <div className="weather">
                    <img src={sunny} alt="sunny" />
                    <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                    <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                </div>
                <div className="weather-date">
                    <p>Fri, 2 September</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">{data.main ? data.main.humidity : null}%</div>
                    </div>
                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data">{data.wind ? data.wind.speed : null} km/h</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp