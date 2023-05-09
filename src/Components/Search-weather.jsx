import { useState } from 'react';
import axios from 'axios';

export const SearchWeather = () => {
    const [cityInput, setCityInput] = useState("")
    const [temp, setTemp] = useState("");
    const [icon, setIcon] = useState("");
    const [desc, setDesc] = useState("");
    const [feelsLike, setFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");

    const apiKey = "40c4c1a9a98630480548bc7fe8d19b21";

    const submitHandler = (e) => {
        e.preventDefault();
        if(!cityInput){
            alert("Please provide a city name");
        }
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`).then((res) => {
            setTemp(res.data.main.temp);
            setDesc(res.data.weather[0].description);
            setFeelsLike(res.data.main.feels_like);
            setHumidity(res.data.main.humidity);
            setWindSpeed(res.data.wind.speed);
            setIcon(res.data.weather[0].icon)
        })
    }

    console.log(icon)
    return (
        <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={submitHandler} >
                <input type="text" placeholder="Enter City" value={cityInput}  onChange={(e) => setCityInput(e.target.value)} />
                <input type="submit" value="Get Weather" />
            </form>
            {temp && 
            <div className="weather-data">
                <div className="icon">
                    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
                </div>
                <div className="temperature">{`${temp}°C`}</div>
                <div className="description">{desc}</div>
                <div className="details">
                    <div>Feels like: {feelsLike}</div>
                    <div>Humidity: {humidity}%</div>
                    <div>Wind speed: {windSpeed} m/s</div>
                </div>
            </div>
            }
        </div>
    )
}