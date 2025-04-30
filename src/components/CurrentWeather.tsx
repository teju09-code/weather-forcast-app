import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { getBackgroundClass } from '../utils/weatherBackground';

interface CurrentWeatherProps {
  weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const weatherIcon = getWeatherIcon(weather.weather[0].id);
  const bgClass = getBackgroundClass(weather.weather[0].id);

  return (
    <div className={`w-full rounded-lg shadow-md overflow-hidden transition-all duration-500 ${bgClass}`}>
      <div className="p-6 backdrop-blur-sm bg-white/30 dark:bg-black/20 text-gray-900 dark:text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="flex items-center">
            {weatherIcon && React.createElement(weatherIcon, { size: 48, className: "text-white drop-shadow-md" })}
            <div className="ml-4">
              <p className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</p>
              <p className="text-xl capitalize">{weather.weather[0].description}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg p-3">
            <Droplets className="mr-2 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm opacity-80">Humidity</p>
              <p className="font-semibold">{weather.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg p-3">
            <Wind className="mr-2 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm opacity-80">Wind Speed</p>
              <p className="font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</p>
            </div>
          </div>
          <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg p-3">
            <span className="mr-2 text-xl">🌡️</span>
            <div>
              <p className="text-sm opacity-80">Feels Like</p>
              <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
            </div>
          </div>
          <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg p-3">
            <span className="mr-2 text-xl">👁️</span>
            <div>
              <p className="text-sm opacity-80">Visibility</p>
              <p className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;