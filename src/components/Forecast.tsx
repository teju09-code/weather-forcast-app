import React from 'react';
import { ForecastData } from '../types/weather';
import ForecastCard from './ForecastCard';
import { formatForecastData } from '../utils/forecastUtils';

interface ForecastProps {
  forecast: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const dailyForecasts = formatForecastData(forecast);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">5-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => (
          <ForecastCard key={index} forecast={day} />
        ))}
      </div>
    </div>
  );
};

export default Forecast;