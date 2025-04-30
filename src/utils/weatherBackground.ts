export const getBackgroundClass = (weatherId: number): string => {
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'bg-gradient-to-r from-gray-700 to-gray-900 rain';
  }
  
  // Drizzle
  if (weatherId >= 300 && weatherId < 400) {
    return 'bg-gradient-to-r from-blue-300 to-blue-500 rain';
  }
  
  // Rain
  if (weatherId >= 500 && weatherId < 600) {
    return 'bg-gradient-to-r from-blue-500 to-blue-700 rain';
  }
  
  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    return 'bg-gradient-to-r from-blue-100 to-blue-200 snow';
  }
  
  // Atmosphere (fog, mist, etc.)
  if (weatherId >= 700 && weatherId < 800) {
    return 'bg-gradient-to-r from-gray-300 to-gray-500 clouds';
  }
  
  // Clear
  if (weatherId === 800) {
    return 'bg-gradient-to-r from-yellow-400 to-orange-500 clear';
  }
  
  // Clouds
  if (weatherId > 800 && weatherId < 900) {
    return 'bg-gradient-to-r from-blue-200 to-blue-400 clouds';
  }
  
  // Default
  return 'bg-gradient-to-r from-blue-300 to-blue-500';
};