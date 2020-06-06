import React, { useState } from 'react';
import 'dotenv';
import keys from './keys';

const api = {
  key : keys.API_KEY,
  url : keys.WEATHER_URL
}


function App() {

  const dateBuild = (d) => {
    let date = String (new window.Date());
    date.slice(3, 15);
    return date;
  }
  
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e => {
    if(e.key === "Enter"){
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          console.log(result);
        })
        .then(error => {
          console.log(error)
        })
    }
  }


  return (
    <div
      className = {
        typeof weather.main != "undefined"
        ? weather.main.temp > 18
        ? "App hot"
        : "App Cold"
        : "App"
      }
    >
      <main>
          <div className="search-container">
              <input
                type = "text"
                placeholder = "Search"
                className = "search-bar"
                onChange = {e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
          </div>
          { typeof weather.main != "undefined"  ? (
           <div>
             <div className="location-container">
                <div className="location">
                    {
                      weather.name
                    },
                    {weather.sys.country}
                </div>
                  <div className="date">{ dateBuild(new Date())}</div>
             </div>
             <div className="weather-container">
                <div className="temperature">
                    { Math.round(weather.main.temp) } &#176;
                </div>
                <div className="weather">
                    { weather.weather[0].main }
                </div>
             </div>
           </div>
          ) : (
            ""
          )}
      </main>
    </div>
  );
}

export default App;
