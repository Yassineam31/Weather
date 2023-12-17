import React, { useState } from 'react';
import '../Styles/WeatherApp.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import clear_icon from '../assets/clear.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import brokenClouds_icon from '../assets/brokenClouds.png';
import scatteredClouds_icon from '../assets/scatteredClouds.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
const WeatherApp = () => {
    let APIkey="d0816c5e77af6f3f1258cd2114983de4";
    let [weatherIcon,setWeatherIcon]=useState(cloud_icon);
    const search=()=>{
        const element=document.querySelector(".cityInput");
        if(element.value===""){
            return 0;
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${APIkey}`;
        fetch(url)
        .then(responseType=>responseType.json())
        .then((response)=>{
            const humidity=document.querySelector(".humidity-percent");
            const wind=document.querySelector(".wind-speed");
            const temperature=document.querySelector(".weather-temp");
            const location=document.querySelector(".weather-location");
            humidity.innerHTML=response.main.humidity+"%";
            wind.innerHTML=response.wind.speed+" km/h";
            temperature.innerHTML=response.main.temp+"°C";
            location.innerHTML=response.name;
            console.log(response)
            if(response.weather[0].icon==="01d"|| response.weather[0].icon==="01n"){
                setWeatherIcon(clear_icon);
            }else if(response.weather[0].icon==="02d"|| response.weather[0].icon==="02n"){
                setWeatherIcon(cloud_icon);
            }else if(response.weather[0].icon==="03d"|| response.weather[0].icon==="03n"){
                setWeatherIcon(scatteredClouds_icon);
            }else if(response.weather[0].icon==="04d"|| response.weather[0].icon==="04n"){
                setWeatherIcon(brokenClouds_icon);
            }else if(response.weather[0].icon==="09d"|| response.weather[0].icon==="09n"){
                setWeatherIcon(drizzle_icon);
            }else if(response.weather[0].icon==="10d"|| response.weather[0].icon==="10n"){
                setWeatherIcon(rain_icon);
            }else if(response.weather[0].icon==="13d"|| response.weather[0].icon==="13n"){
                setWeatherIcon(snow_icon);
            }else{
                setWeatherIcon(cloud_icon);
            }
        })
        .catch((err)=>console.log(err));
}
    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className='cityInput' placeholder='Rechercher...'/>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;