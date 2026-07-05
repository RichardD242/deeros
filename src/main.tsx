import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './state/themeStore'
import { TimeSettingsProvider } from './state/timeSettingsStore'
import { IconPositionsProvider } from './state/iconPositionsStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TimeSettingsProvider>
        <IconPositionsProvider>
          <App />
        </IconPositionsProvider>
      </TimeSettingsProvider>
    </ThemeProvider>
  </StrictMode>,
)
