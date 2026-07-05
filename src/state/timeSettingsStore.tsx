import { createContext, useContext, useState, type ReactNode } from 'react';

type TimeSettingsContextValue = {
  showSeconds: boolean;
  use24Hour: boolean;
  showDate: boolean;
  toggleShowSeconds: () => void;
  toggleUse24Hour: () => void;
  toggleShowDate: () => void;
};

const TimeSettingsContext = createContext<TimeSettingsContextValue | null>(null);

export function TimeSettingsProvider({ children }: { children: ReactNode }) {
  const [showSeconds, setShowSeconds] = useState(true);
  const [use24Hour, setUse24Hour] = useState(true);
  const [showDate, setShowDate] = useState(true);

  return (
    <TimeSettingsContext.Provider
      value={{
        showSeconds,
        use24Hour,
        showDate,
        toggleShowSeconds: () => setShowSeconds((s) => !s),
        toggleUse24Hour: () => setUse24Hour((u) => !u),
        toggleShowDate: () => setShowDate((d) => !d),
      }}
    >
      {children}
    </TimeSettingsContext.Provider>
  );
}

export function useTimeSettings() {
  const ctx = useContext(TimeSettingsContext);
  if (!ctx) throw new Error('useTimeSettings must be used within TimeSettingsProvider');
  return ctx;
}
