import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from './pages/forecastTab/ForecastTab';
import kelvinToCelcius from './helpers/kelvinToCelcius';
import './App.css';
import TodayTab from './pages/todayTab/TodayTab';

// LET OP: VOEG HIER JOUW API KEY IN
// const apiKey = '050ff8be31f74868842b18a0e5465d77';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      toggleLoading(true);

      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
        setWeatherData(result.data);
        toggleLoading(false);
      } catch (e) {
        console.error(e);
        setError(true);
        toggleLoading(false);
      }
    }

    if (location) {
      fetchData();
    }

  }, [location]);

  return (
      <>
        <div className="weather-container">

          {/*HEADER -------------------- */}
          <div className="weather-header">
            <SearchBar setLocationHandler={setLocation}/>

            {error && (
                <span className="wrong-location-error">
              Oeps! Deze locatie bestaat niet
            </span>
            )}

            <span className="location-details">
            {loading && (<span>Loading...</span>)}

              {weatherData &&
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToCelcius(weatherData.main.temp)}</h1>
              </>
              }
          </span>
          </div>

          {/*CONTENT ------------------ */}
          <Router>
            <div className="weather-content">
              <TabBarMenu/>

              <div className="tab-wrapper">
                <Switch>
                  <Route exact path="/">
                    <TodayTab coordinates={weatherData && weatherData.coord} />
                  </Route>
                  <Route path="/komende-week">
                    <ForecastTab coordinates={weatherData && weatherData.coord} />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>

          <MetricSlider/>
        </div>
      </>
  );
}

export default App;