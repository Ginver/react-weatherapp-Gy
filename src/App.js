import React from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import { useState } from 'react';
import './App.css';

const apiKey = 'e1c2977a9608225f95553d9bfdfc239d';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () =>  {
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=utrecht,nl&appid=${apiKey}&lang=nl`);
      setWeatherData(result.data);
      // console.log(result.data) to see where to find the info in the object
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar/>

          <span className="location-details">
            {/*<h2>Bewolkt</h2>*/}
            {/*<h3> </h3>*/}
            {/*<h1>14 &deg;</h1>*/}
            {/*place a condition to render data when the elements the data actually need it*/}
            {weatherData &&
            <>
              <h2>{weatherData.weather[0].description}</h2>
              <h3>{weatherData.name}</h3>
              <h1>{weatherData.main.temp}</h1>
            </> //* place extra fragments <> </> bc there are 3 elements en you can only retrun ONE element a time
            }

            <button
                type="button"
                onClick={fetchData}
            >
              Haal data op!
            </button>
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>

          <div className="tab-wrapper">
            Alle inhoud van de tabbladen komt hier!
          </div>
        </div>

        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
