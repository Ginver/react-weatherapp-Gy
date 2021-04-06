import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherDetail from '../../components/weatherDetail/WeatherDetail';
import getTimeString from '../../helpers/createTimeString';
import './TodayTab.css';

// LET OP: VOEG HIER JOUW API KEY IN
const apiKey = '050ff8be31f74868842b18a0e5465d77';

function TodayTab({ coordinates }) {
	const [forecasts, setForecasts] = useState(null);
	const [error, setError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setError(false);
			toggleLoading(true);

			try {
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,daily&appid=${apiKey}&lang=nl`);
				setForecasts([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],
				]);
			} catch (e) {
				console.error(e);
				setError(true);
			}

			toggleLoading(false);
		}

		if (coordinates) {
			fetchData();
		}

	}, [coordinates]);

	return (
		<div className="tab-wrapper">
			{forecasts &&
			<>
				<div className="chart">
					{forecasts.map((forecast) => {
						return <WeatherDetail
							key={forecast.dt}
							temp={forecast.temp}
							type={forecast.weather[0].main}
							description={forecast.weather[0].description}
						/>
					})}
				</div>
				<div className="legend">
					{forecasts.map((forecast) => {
						return <span key={forecast.dt}>{getTimeString(forecast.dt)}</span>
					})}
				</div>
			</>
			}
			{error && <span>Er is iets misgegaan met het ophalen van de data.</span>}
			{loading && (<span>Loading...</span>)}
		</div>
	);
};

export default TodayTab;