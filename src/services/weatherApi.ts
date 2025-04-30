import { WeatherData, ForecastData, Coordinates } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch current weather by coordinates
export const fetchWeatherByCoords = async (coords: Coordinates): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

// Function to fetch current weather by city name
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

// Function to fetch 5-day forecast
export const fetchForecast = async (coords: Coordinates): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return response.json();
};