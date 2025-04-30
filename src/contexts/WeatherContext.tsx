import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchWeatherByCoords, fetchWeatherByCity, fetchForecast } from '../services/weatherApi';
import { 
  WeatherData, 
  ForecastData, 
  Coordinates,
  WeatherContextType 
} from '../types/weather';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');

  const getCurrentLocationWeather = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const coords: Coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          
          // Fetch current weather
          const weatherData = await fetchWeatherByCoords(coords);
          setCurrentWeather(weatherData);
          setCity(weatherData.name);

          // Fetch forecast
          const forecastData = await fetchForecast(coords);
          setForecast(forecastData);
          
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch weather data");
          setLoading(false);
        }
      },
      (error) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const searchWeatherByCity = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherData = await fetchWeatherByCity(cityName);
      setCurrentWeather(weatherData);
      setCity(weatherData.name);

      // Fetch forecast using coordinates from weather data
      const forecastData = await fetchForecast({
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      });
      setForecast(forecastData);
      
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch weather data for this city");
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        loading,
        error,
        city,
        getCurrentLocationWeather,
        searchWeatherByCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};