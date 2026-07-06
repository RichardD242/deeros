import { createContext, useContext, useState, type ReactNode } from 'react';
import { isSoundEnabled, setSoundEnabled } from '../lib/sound';

type SoundSettingsContextValue = {
  soundEnabled: boolean;
  toggleSoundEnabled: () => void;
};

const SoundSettingsContext = createContext<SoundSettingsContextValue | null>(null);

export function SoundSettingsProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(isSoundEnabled);

  const toggleSoundEnabled = () => {
    setSoundEnabledState((enabled) => {
      const next = !enabled;
      setSoundEnabled(next);
      return next;
    });
  };

  return (
    <SoundSettingsContext.Provider value={{ soundEnabled, toggleSoundEnabled }}>
      {children}
    </SoundSettingsContext.Provider>
  );
}

export function useSoundSettings() {
  const ctx = useContext(SoundSettingsContext);
  if (!ctx) throw new Error('useSoundSettings must be used within SoundSettingsProvider');
  return ctx;
}
