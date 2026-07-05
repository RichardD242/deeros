import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './state/themeStore'
import { TimeSettingsProvider } from './state/timeSettingsStore'
import { WeatherSettingsProvider } from './state/weatherSettingsStore'
import { IconPositionsProvider } from './state/iconPositionsStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TimeSettingsProvider>
        <WeatherSettingsProvider>
          <IconPositionsProvider>
            <App />
          </IconPositionsProvider>
        </WeatherSettingsProvider>
      </TimeSettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
