import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchWeatherByCity, getCurrentLocationWeather, loading } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchWeatherByCity(searchTerm);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-700 rounded-lg shadow-md p-4 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 
                      bg-white dark:bg-slate-800 text-gray-800 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            disabled={loading}
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" 
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md 
                      transition-colors duration-300 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !searchTerm.trim()}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => getCurrentLocationWeather()}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 dark:hover:bg-slate-500 
                      text-gray-700 dark:text-white rounded-md transition-colors duration-300 
                      flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Use current location"
            disabled={loading}
          >
            <MapPin size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;