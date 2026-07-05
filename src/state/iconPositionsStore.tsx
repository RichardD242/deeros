import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const ICON_POSITIONS_KEY = 'deeros_icon_positions';

export type IconPos = { x: number; y: number };

type IconPositionsContextValue = {
  iconPositions: Record<string, IconPos>;
  setIconPosition: (appId: string, pos: IconPos) => void;
  resetIconPositions: () => void;
};

function loadIconPositions(): Record<string, IconPos> {
  try {
    return JSON.parse(localStorage.getItem(ICON_POSITIONS_KEY) ?? '{}');
  } catch {
    return {};
  }
}

const IconPositionsContext = createContext<IconPositionsContextValue | null>(null);

export function IconPositionsProvider({ children }: { children: ReactNode }) {
  const [iconPositions, setIconPositions] = useState<Record<string, IconPos>>(loadIconPositions);

  useEffect(() => {
    localStorage.setItem(ICON_POSITIONS_KEY, JSON.stringify(iconPositions));
  }, [iconPositions]);

  const setIconPosition = (appId: string, pos: IconPos) => {
    setIconPositions((p) => ({ ...p, [appId]: pos }));
  };

  const resetIconPositions = () => setIconPositions({});

  return (
    <IconPositionsContext.Provider value={{ iconPositions, setIconPosition, resetIconPositions }}>
      {children}
    </IconPositionsContext.Provider>
  );
}

export function useIconPositions() {
  const ctx = useContext(IconPositionsContext);
  if (!ctx) throw new Error('useiconpositions must be used within iconpositionproivider');
  return ctx;
}
