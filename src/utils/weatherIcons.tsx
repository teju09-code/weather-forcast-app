import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  CloudDrizzle, 
  Sun, 
  CloudSun,
  Thermometer,
  Droplets
} from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

export const getWeatherIcon = (weatherId: number): LucideIcon | null => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return CloudLightning;
  }
  
  // Drizzle
  if (weatherId >= 300 && weatherId < 400) {
    return CloudDrizzle;
  }
  
  // Rain
  if (weatherId >= 500 && weatherId < 600) {
    return CloudRain;
  }
  
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return CloudSnow;
  }
  
  // Atmosphere (fog, mist, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return CloudFog;
  }
  
  // Clear
  if (weatherId === 800) {
    return Sun;
  }
  
  // Clouds
  if (weatherId > 800 && weatherId < 900) {
    return weatherId === 801 ? CloudSun : Cloud;
  }
  
  return null;
};