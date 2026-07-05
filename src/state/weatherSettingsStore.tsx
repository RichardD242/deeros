import { createContext, useContext, useState, type ReactNode } from 'react';

type WeatherSettingsContextValue = {
  useFahrenheit: boolean;
  toggleUseFahrenheit: () => void;
};

const WeatherSettingsContext = createContext<WeatherSettingsContextValue | null>(null);

export function WeatherSettingsProvider({ children }: { children: ReactNode }) {
  const [useFahrenheit, setUseFahrenheit] = useState(false);

  return (
    <WeatherSettingsContext.Provider
      value={{
        useFahrenheit,
        toggleUseFahrenheit: () => setUseFahrenheit((f) => !f),
      }}
    >
      {children}
    </WeatherSettingsContext.Provider>
  );
}

export function useWeatherSettings() {
  const ctx = useContext(WeatherSettingsContext);
  if (!ctx) throw new Error('useWeatherSettings must be used within WeatherSettingsProvider');
  return ctx;
}
