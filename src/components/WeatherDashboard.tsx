import React, { useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import WeatherError from './WeatherError';
import WeatherLoading from './WeatherLoading';

const WeatherDashboard: React.FC = () => {
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    getCurrentLocationWeather 
  } = useWeather();

  useEffect(() => {
    // Automatically get current location weather on first load
    getCurrentLocationWeather();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar />

      {loading ? (
        <WeatherLoading />
      ) : error ? (
        <WeatherError message={error} />
      ) : (
        <>
          {currentWeather && <CurrentWeather weather={currentWeather} />}
          {forecast && <Forecast forecast={forecast} />}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;