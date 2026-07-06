import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { playSound } from '../lib/sound';

export type OpenWindow = {
  id: string;
  appId: string;
  pos?: { x: number; y: number };
};

type WindowsContextValue = {
  windows: OpenWindow[];
  order: string[];
  openApp: (appId: string, pos?: { x: number; y: number }) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
};

const WindowsContext = createContext<WindowsContextValue | null>(null);

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const counter = useRef(0);

  const openApp = (appId: string, pos?: { x: number; y: number }) => {
    const id = `${appId}-${counter.current++}`;
    setWindows((w) => [...w, { id, appId, pos }]);
    setOrder((o) => [...o, id]);
    playSound('open');
  };

  const closeWindow = (id: string) => {
    setWindows((w) => w.filter((win) => win.id !== id));
    setOrder((o) => o.filter((i) => i !== id));
    playSound('close');
  };

  const focusWindow = (id: string) => {
    setOrder((o) => [...o.filter((i) => i !== id), id]);
  };

  return (
    <WindowsContext.Provider value={{ windows, order, openApp, closeWindow, focusWindow }}>
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error('useWindows must be used within WindowsProvider');
  return ctx;
}
