import React, {useState, createContext} from 'react';
import kelvinToCelsius from "../helpers/kelvinToCelcius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";


export const TempContext = createContext(null);

function TempContextProvider({children}) {
     const [selectedMetric, toggleSelectedMetric] = useState('celsius');

    function toggleTemp() {
        console.log('hoi')
        if (selectedMetric === 'celsius') {
            toggleSelectedMetric('fahrenheit');
        } else {
            toggleSelectedMetric('celsius');
        }
        console.log(selectedMetric);
    }

    return (
        <TempContext.Provider value={{
            toggleTemp: toggleTemp,
            // kelvinToMetric: selectedMetric === 'celsius' ? kelvinToCelcius : kelvinToFahrenheit
            kelvinToMetric: selectedMetric === 'celsius' ? kelvinToFahrenheit : kelvinToCelsius,
        }}>
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;