import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import WeatherDashboard from './components/WeatherDashboard';
import { WeatherProvider } from './contexts/WeatherContext';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
      ? 'dark' 
      : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <WeatherProvider>
      <div className={`min-h-screen transition-colors duration-700 ${theme === 'light' ? 'day-bg' : 'night-bg'}`}>
        {theme === 'light' ? (
          <>
            <div className="moving-clouds" />
            <div className="sun" />
          </>
        ) : (
          <>
            <div className="stars" />
            <div className="moon" />
          </>
        )}
        <div className="container mx-auto px-4 py-8 relative">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Weather Dashboard</h1>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} className="text-gray-900" /> : <Sun size={20} className="text-yellow-300" />}
            </button>
          </header>
          
          <main>
            <WeatherDashboard />
          </main>

          <footer className="mt-16 text-center text-gray-800 dark:text-gray-200 text-sm relative z-10">
          </footer>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;