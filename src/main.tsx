import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Docs from './Docs.tsx'
import Manual from './Manual.tsx'
import { ThemeProvider } from './state/themeStore'
import { TimeSettingsProvider } from './state/timeSettingsStore'
import { WeatherSettingsProvider } from './state/weatherSettingsStore'
import { WallpaperProvider } from './state/wallpaperStore'
import { SoundSettingsProvider } from './state/soundSettingsStore'
import { IconPositionsProvider } from './state/iconPositionsStore'

function Root() {
  if (window.location.pathname.startsWith('/docs')) {
    return <Docs />
  }

  if (window.location.pathname.startsWith('/manual')) {
    return <Manual />
  }

  return (
    <ThemeProvider>
      <TimeSettingsProvider>
        <WeatherSettingsProvider>
          <WallpaperProvider>
            <SoundSettingsProvider>
              <IconPositionsProvider>
                <App />
              </IconPositionsProvider>
            </SoundSettingsProvider>
          </WallpaperProvider>
        </WeatherSettingsProvider>
      </TimeSettingsProvider>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
