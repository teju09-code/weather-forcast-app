import { ForecastData, DailyForecast, ForecastItem } from '../types/weather';

export const formatForecastData = (forecastData: ForecastData): DailyForecast[] => {
  // Group forecasts by day (using the date part of dt_txt)
  const groupedByDay: Record<string, ForecastItem[]> = {};
  
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  // Format the next 5 days (skip today if it's already evening)
  const today = new Date().toISOString().split('T')[0];
  
  // Get all dates and sort them
  const allDates = Object.keys(groupedByDay).sort();
  
  // If today is in the forecast and it's late in the day, we might want to skip it
  const startIndex = allDates[0] === today && new Date().getHours() > 18 ? 1 : 0;
  
  // Get up to 5 days
  const daysToShow = allDates.slice(startIndex, startIndex + 5);
  
  // For each day, get min/max temp and most common weather condition
  return daysToShow.map(date => {
    const dayForecasts = groupedByDay[date];
    
    // Get min/max temperatures for the day
    const tempMax = Math.max(...dayForecasts.map(f => f.main.temp_max));
    const tempMin = Math.min(...dayForecasts.map(f => f.main.temp_min));
    
    // Get average humidity
    const humidity = Math.round(
      dayForecasts.reduce((sum, f) => sum + f.main.humidity, 0) / dayForecasts.length
    );
    
    // Get the most frequent weather condition
    const weatherCounts: Record<number, number> = {};
    dayForecasts.forEach(f => {
      const id = f.weather[0].id;
      weatherCounts[id] = (weatherCounts[id] || 0) + 1;
    });
    
    const mostFrequentWeatherId = Object.entries(weatherCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
    
    // Find a forecast item with this weather ID to get its description
    const representativeItem = dayForecasts.find(
      f => f.weather[0].id.toString() === mostFrequentWeatherId
    );
    
    return {
      dt: dayForecasts[0].dt,
      weatherId: parseInt(mostFrequentWeatherId),
      description: representativeItem?.weather[0].description || '',
      tempMax,
      tempMin,
      humidity
    };
  });
};