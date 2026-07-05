import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Window from './Window';
import { apps } from '../apps/registry';
import { WindowsProvider, useWindows } from '../state/windowsStore';
import { useTheme } from '../state/themeStore';

const QUICK_MENU_IDS = ['files', 'settings', 'task-manager'];

function DesktopInner() {
  const { windows, order, openApp, closeWindow, focusWindow } = useWindows();
  const { darkMode } = useTheme();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const activeWindowId = order[order.length - 1];
  const quickMenuApps = QUICK_MENU_IDS.map((id) => apps.find((a) => a.id === id)!);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onClick={() => {
        setSelectedApp(null);
        setQuickMenuOpen(false);
      }}
    >
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
            className={`flex flex-col items-center gap-1.5 select-none py-2 px-1 transition-colors rounded-deer-xl ${
              selectedApp === app.id
                ? 'text-moss'
                : `text-deer-primary ${darkMode ? '' : 'hover:bg-deer-surface/70'}`
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
        <div className="relative">
          <AnimatePresence>
            {quickMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-12 left-0 w-44 bg-deer-surface border border-deer-border rounded-deer-xl shadow-xl p-1.5 flex flex-col gap-1"
              >
                {quickMenuApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      openApp(app.id);
                      setQuickMenuOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-deer-primary hover:bg-deer-bg transition-colors"
                  >
                    <app.icon size={16} />
                    {app.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <img
            src="/transparentdeer.png"
            alt="Deer OS"
            onClick={(e) => {
              e.stopPropagation();
              setQuickMenuOpen((o) => !o);
            }}
            className="w-8 h-8 object-contain select-none cursor-pointer"
          />
        </div>

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

export default function Desktop() {
  return (
    <WindowsProvider>
      <DesktopInner />
    </WindowsProvider>
  );
}
