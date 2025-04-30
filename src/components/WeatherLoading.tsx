import React from 'react';

const WeatherLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
      <p className="text-gray-700 dark:text-gray-300 text-xl">Loading weather data...</p>
    </div>
  );
};

export default WeatherLoading;