// import React, { useState } from 'react';
// import './components/Weather.css';
// import search_icon from './assets/search.png';
// import clear_icon from './assets/clear.png';
// import humidity_icon from './assets/humidity.png';
// import wind_icon from './assets/wind.png'
// import cloud_icon from './assets/cloud.png';
// import rain_icon from './assets/rain.png';
// import drizzle_icon from './assets/drizzle.png';
// import snow_icon from './assets/snow.png';

// function App() {
//   const [city, setCity] = useState("");
//   const [error, setError] = useState("");
//   const [weather, setWeather] = useState({
//     temperature: "--",
//     windSpeed: "--",
//     description: "--",
//     humidity: "--",
//   });

//   const Api_Key = "1fdbf0a2f50cd3d40b9b0a5017429296";   
//   const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`; //dout
//  function handelcity(e){
//   const value = e.target.value;

//  }





//   function getweather(e) {

//     fetch(api)
//       .then((res) => res.json()) //dout
//         .then((resp) => { 
//           const  weathermain = resp.weather[0].main //dout  
//           if (weathermain === "Clouds"){
//             setIcon(cloud_icon)
//           }
//             else if (weathermain === "Rain"){
//               setIcon(rain_icon)
//             }     
//             else if (weathermain === "Drizzle"){
//               setIcon(drizzle_icon)
//             }
//             else if (weathermain === "Snow"){
//               setIcon(snow_icon)
//             }    
//            else if (weathermain === "Clear"){
//             setIcon(clear_icon)
//            }

//            else if (weathermain === "Thunderstorm"){
//           setIcon(thunderstrom_icon
//           )}

//           else if (weathermain === "Humidity"){
//             setIcon(humidity_icon)
//           }

//            else if (weathermain === "wind"){
//             setIcon(wind_icon)
//           }

//           {
//           setWeather({
//             temperature: Math.floor(resp.main.temp - 273.15), //dout
//             windSpeed: `${resp.wind.speed} m/s`,  //dout
//             description: resp.weather[0].description,  //dout
//             humidity: `${resp.main.humidity}%`,
//           });
//         } 
//       })
//       .catch((error) => {
//         console.error("Error fetching weather data:", error);
//       });
//   }

//   return (
//     <form onSubmit={getweather}>
//       <div className="weather">
//         <div className='search-bar'>
//           <input 
//             type="text" 
//             placeholder="Search City" 
//             value={city}
//             onChange={(e) => setCity(e.target.value)} 
//           />
//           <img src={search_icon} alt="Search Icon" onClick={getweather} />
//         </div>
//         <img src={icon} alt="Weather Icon" className='weather-icon' />
//         <p className='temperature'>{weather.temperature}°C</p>
//         <p className='Location'> {city}</p>
//         <p className='description'>{weather.description}</p>

//         <div className="weather-data">
//           <div className="col">
//             <img src={humidity} alt="Humidity" />
//             <div>
//               <p>{weather.humidity}</p>
//               <span>Humidity</span>
//             </div>
//           </div>

//           <div className="col">
//             <img src={wind_icon} alt="Wind" />
//             <div>
//               <p>{weather.windSpeed}</p>
//               <span>Wind Speed</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import "./components/Weather.css";

import search_icon from "./assets/search.png";
import clear_icon from "./assets/clear.png";
import humidity_icon from "./assets/humidity.png";
import wind_icon from "./assets/wind.png";
import cloud_icon from "./assets/cloud.png";
import rain_icon from "./assets/rain.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";

function App() {

  const [city, setCity] = useState("");
  const [icon, setIcon] = useState(clear_icon);
  const [location, setLocation] = useState("");

  const [weather, setWeather] = useState({
    temperature: "--",
    windSpeed: "--",
    description: "--",
    humidity: "--",
  });

  const Api_Key = "1fdbf0a2f50cd3d40b9b0a5017429296";

  useEffect(() => {

    const savedWeather = localStorage.getItem("weatherdata");

    if (savedWeather) {

      const resp = JSON.parse(savedWeather);

       const weathermain = resp.weather[0].main;

        if (weathermain === "Clouds") setIcon(cloud_icon);
        else if (weathermain === "Rain") setIcon(rain_icon);
        else if (weathermain === "Drizzle") setIcon(drizzle_icon);
        else if (weathermain === "Snow") setIcon(snow_icon);
        else if (weathermain === "Clear") setIcon(clear_icon);


      setWeather({
        temperature: Math.floor(resp.main.temp),
        windSpeed: `${resp.wind.speed} m/s`,
        description: resp.weather[0].description,
        humidity: `${resp.main.humidity}%`,
      });

      setLocation(resp.name);
    }

  }, []);

  function getweather(e) {

    e.preventDefault();

    if (city === "") return;

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`;

    fetch(api)
      .then((res) => res.json())
      .then((resp) => {

        if (resp.cod !== 200) {
          alert("City not found");
          return;
        }

        localStorage.setItem("weatherdata", JSON.stringify(resp));

        const weathermain = resp.weather[0].main;

        if (weathermain === "Clouds") setIcon(cloud_icon);
        else if (weathermain === "Rain") setIcon(rain_icon);
        else if (weathermain === "Drizzle") setIcon(drizzle_icon);
        else if (weathermain === "Snow") setIcon(snow_icon);
        else if (weathermain === "Clear") setIcon(clear_icon);

        setWeather({
          temperature: Math.floor(resp.main.temp),
          windSpeed: `${resp.wind.speed} m/s`,
          description: resp.weather[0].description,
          humidity: `${resp.main.humidity}%`,
        });

        setLocation(resp.name);

      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  return (

    <form onSubmit={getweather}>

      <div className="weather">

        <div className="search-bar">

          <input
            type="text"
            placeholder="Search City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <img
            src={search_icon}
            alt="Search Icon"
            onClick={getweather}
          />

        </div>

        <img src={icon} alt="Weather Icon" className="weather-icon" />

        <p className="temperature">
          {weather.temperature}<span className="unit">°C</span>
        </p>

        <p className="location">{location}</p>
        <p className="description">{weather.description}</p>

        <div className="weather-data">

          <div className="col">
            <img src={humidity_icon} alt="Humidity" />
            <div>
              <p>{weather.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={wind_icon} alt="Wind" />
            <div>
              <p>{weather.windSpeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>

        </div>

      </div>

    </form>

  );
}

export default App;