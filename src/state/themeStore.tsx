import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const DARK_MODE_KEY = 'deeros_dark_mode';

type ThemeContextValue = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(DARK_MODE_KEY) === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('usetheme must be used within themeprovider');
  return ctx;
}
