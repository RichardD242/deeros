import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';
import { apps } from '../apps/registry';

type OpenWindow = {
  id: string;
  appId: string;
};

export default function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const openApp = (appId: string) => {
    const id = `${appId}-${Date.now()}`;
    setWindows((w) => [...w, { id, appId }]);
    setOrder((o) => [...o, id]);
  };

  const closeWindow = (id: string) => {
    setWindows((w) => w.filter((win) => win.id !== id));
    setOrder((o) => o.filter((i) => i !== id));
  };

  const focusWindow = (id: string) => {
    setOrder((o) => [...o.filter((i) => i !== id), id]);
  };

  const activeWindowId = order[order.length - 1];

  return (
    <div className="relative w-full h-full overflow-hidden" onClick={() => setSelectedApp(null)}>
      <img
        src="/transparentdeer.png"
        alt=""
        className="absolute inset-0 m-auto w-96 h-96 object-contain opacity-10 pointer-events-none select-none"
      />

      <div className="relative grid grid-cols-1 gap-4 p-6 w-24">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApp(app.id);
            }}
            onDoubleClick={() => openApp(app.id)}
            className={`flex flex-col items-center gap-1.5 select-none py-2 px-1 transition-colors ${
              selectedApp === app.id ? 'text-moss' : 'text-deer-primary hover:bg-deer-surface/70 rounded-deer-xl'
            }`}
          >
            <span
              className={`w-12 h-12 rounded-lg bg-deer-surface border shadow-sm flex items-center justify-center text-moss ${
                selectedApp === app.id ? 'border-moss border-2 bg-moss/40' : 'border-deer-border'
              }`}
            >
              <app.icon size={24} />
            </span>
            <span className="text-xs">{app.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {windows.map((win, i) => {
          const app = apps.find((a) => a.id === win.appId)!;
          const Component = app.component;
          return (
            <Window
              key={win.id}
              title={app.name}
              initialX={160 + i * 24}
              initialY={80 + i * 24}
              defaultWidth={app.defaultWidth}
              defaultHeight={app.defaultHeight}
              zIndex={order.indexOf(win.id)}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <Component />
            </Window>
          );
        })}
      </AnimatePresence>

      <div
        className="absolute bottom-0 left-0 right-0 h-14 flex items-center gap-3 px-3 bg-deer-surface/90 backdrop-blur border-t border-deer-border"
        onClick={(e) => e.stopPropagation()}
      >
        <img src="/transparentdeer.png" alt="Deer OS" className="w-8 h-8 object-contain select-none" />

        <div className="w-px h-7 bg-deer-border" />

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {windows.map((win) => {
            const app = apps.find((a) => a.id === win.appId)!;
            const active = win.id === activeWindowId;
            return (
              <button
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className={`flex items-center gap-2 rounded-deer-xl px-3 py-1.5 text-sm transition-colors select-none ${
                  active ? 'bg-moss/25 text-moss' : 'text-deer-primary hover:bg-deer-bg'
                }`}
              >
                <app.icon size={16} />
                <span className="max-w-[8rem] truncate">{app.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
