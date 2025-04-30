// Weather Types
export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Forecast Types
export interface ForecastItem {
  dt: number;
  main: MainWeatherData;
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Formatted Daily Forecast
export interface DailyForecast {
  dt: number;
  weatherId: number;
  description: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
}

// Context Types
export interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean;
  error: string | null;
  city: string;
  getCurrentLocationWeather: () => void;
  searchWeatherByCity: (city: string) => Promise<void>;
}