import React from 'react';
import { DailyForecast } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';
import { Droplets } from 'lucide-react';

interface ForecastCardProps {
  forecast: DailyForecast;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const weatherIcon = getWeatherIcon(forecast.weatherId);
  
  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-center font-semibold text-gray-800 dark:text-white mb-2">
        {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
      </h3>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
        {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>
      
      <div className="flex justify-center my-3">
        {weatherIcon && React.createElement(weatherIcon, { size: 36, className: "text-blue-600 dark:text-blue-400" })}
      </div>
      
      <p className="text-center capitalize text-sm mb-3 text-gray-700 dark:text-gray-300">
        {forecast.description}
      </p>
      
      <div className="flex justify-center space-x-3 mb-2">
        <p className="font-bold text-gray-900 dark:text-white">{Math.round(forecast.tempMax)}°</p>
        <p className="text-gray-500 dark:text-gray-400">{Math.round(forecast.tempMin)}°</p>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
        <Droplets size={14} className="mr-1 text-blue-600 dark:text-blue-400" />
        <span>{forecast.humidity}%</span>
      </div>
    </div>
  );
};

export default ForecastCard;