import { useEffect, useState } from "react";
import clear from '../images/clear.png'
import rainy from '../images/rainy.jpeg'
import  partial from '../images/partial.jpg'

import './Weather.css'
const About = () => {
    const [weather, setWeather] = useState('');
    const [city,setCity]=useState('');
const[condition,setCondition]=useState('')
 const weatherData = async () => {
        try {
            const url = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=LG9UYQWNRRKGZQLDL7H4NG3HS&contentType=json`);
            const data = await url.json();
            console.log(data);
            setWeather(data);
        } catch (error) {
            console.error('Error fetching Weather Data:', error);
        }
    }
    const checkCondition =(conditions) => {
        if (conditions === "Partially cloudy") {
            setCondition(partial);
        } else if (conditions === "Clear") {
            setCondition(clear);
        } else if (conditions === "Rain") {
            setCondition(rainy);
        } else {
            setCondition('');
        }
    }   
     
    useEffect(() => {
        
        if (weather && weather.days && weather.days.length > 0) {
            checkCondition(weather.days[0].conditions);
        }
    }, [weather]);

    return (
        <div className="Weather">
       <div className="input"> <h1> Check the Weather forcast</h1>
       <input type="text" placeholder="Enter city" value={city} onChange={(e)=>setCity(e.target.value)}className="inputfield"  />
        <button onClick={weatherData}>Get Weather Data</button>


            {Array.isArray(weather.days) ? (
                <div className="main-box">
                   <div className="header">
                     <h2>15 DAYS FORECAST </h2>    
                      <h3>City:{weather.address}</h3> 
                   </div>
                <div className="main">

                    {weather.days.map((day, dayIndex) => (
                        <div className="cards" key={dayIndex}>
                            <h3>Date: {day.datetime}</h3>
                            <p>Max Temp: {day.tempmax}°C</p>
                            <p>Min Temp: {day.tempmin}°C</p>
                            <p>Icon:{day.icon}</p>
                        {day.icon === "rain" || day.icon === "cloudy" || day.icon === "partly-cloudy-day" ? <img src={rainy} alt="" srcset="" /> : <img src={clear} alt="" srcset="" /> || <img src={partial} alt="" srcset="" /> }
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <h3>No weather data available Please Enter the City</h3>
            )}

</div>
        </div>
    );
};

export default About;
