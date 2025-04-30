import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WeatherErrorProps {
  message: string;
}

const WeatherError: React.FC<WeatherErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
      <div className="flex items-center">
        <AlertCircle className="text-red-600 dark:text-red-400 mr-3" size={24} />
        <div>
          <h3 className="text-red-800 dark:text-red-300 font-medium">Error Loading Weather</h3>
          <p className="text-red-700 dark:text-red-400">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherError;