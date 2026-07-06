import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image as ImageIcon, Settings } from 'lucide-react';
import Window from './Window';
import Notification from './Notification';
import { apps } from '../apps/registry';
import { WindowsProvider, useWindows } from '../state/windowsStore';
import { useTheme } from '../state/themeStore';
import { useWallpaper } from '../state/wallpaperStore';
import { useIconPositions, type IconPos } from '../state/iconPositionsStore';
import { playSound, playWelcomeSound, playNotificationSound, isFirstVisit, setSoundEnabled } from '../lib/sound';
import { darkWallpapers, lightWallpapers } from '../data/wallpapers';

const QUICK_MENU_IDS = ['files', 'settings', 'task-manager'];
const ICONS_PER_ROW = 5;
const DARKMODE_NOTIF_KEY = 'deeros_darkmode_notif_shown';

function defaultIconPos(index: number): IconPos {
  const col = index % ICONS_PER_ROW;
  const row = Math.floor(index / ICONS_PER_ROW);
  return { x: 24 + col * 100, y: 24 + row * 100 };
}

function DesktopInner() {
  const { windows, order, openApp, closeWindow, focusWindow } = useWindows();
  const { darkMode, toggleDarkMode } = useTheme();
  const { wallpaperId, wallpaperSrc, setWallpaper } = useWallpaper();
  const { iconPositions, setIconPosition } = useIconPositions();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [showDarkModeNotif, setShowDarkModeNotif] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const draggedRef = useRef(false);
  const mountedRef = useRef(false);

  const activeWindowId = order[order.length - 1];
  const quickMenuApps = QUICK_MENU_IDS.map((id) => apps.find((a) => a.id === id)!);

  useEffect(() => {
    if (isFirstVisit()) {
      playWelcomeSound();
      setSoundEnabled(false);
      openApp('welcome');
    } else {
      playSound('enter');
    }
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const from = darkMode ? lightWallpapers : darkWallpapers;
    const to = darkMode ? darkWallpapers : lightWallpapers;
    const index = from.findIndex((w) => w.id === wallpaperId);
    if (index !== -1) {
      const match = to[index];
      setWallpaper(match.id, match.src);
    }
  }, [darkMode]);

  const startIconDrag = (appId: string, pos: IconPos) => (e: React.PointerEvent) => {
    e.stopPropagation();
    dragRef.current = { id: appId, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onIconDrag = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) draggedRef.current = true;
    if (draggedRef.current) {
      setIconPosition(drag.id, { x: drag.origX + dx, y: drag.origY + dy });
    }
  };

  const endIconDrag = () => {
    dragRef.current = null;
  };

  const handleCloseWindow = (winId: string, appId: string) => {
    closeWindow(winId);
    if (appId === 'welcome' && !localStorage.getItem(DARKMODE_NOTIF_KEY)) {
      localStorage.setItem(DARKMODE_NOTIF_KEY, 'true');
      playNotificationSound();
      setShowDarkModeNotif(true);
    }
  };

  const onIconClick = (appId: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    setSelectedApp(appId);
  };

  const launchApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)!;
    if (app.href) {
      window.open(app.href, '_blank');
    } else {
      openApp(appId);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onClick={() => {
        setSelectedApp(null);
        setQuickMenuOpen(false);
        setContextMenu(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {!wallpaperSrc && (
        <img
          src="/transparentdeer.png"
          alt=""
          className="absolute inset-0 m-auto w-96 h-96 object-contain opacity-10 pointer-events-none select-none"
        />
      )}

      <div className="absolute inset-0 pointer-events-none">
        {apps.map((app, i) => {
          const pos = iconPositions[app.id] ?? defaultIconPos(i);
          return (
            <button
              key={app.id}
              style={{ left: pos.x, top: pos.y }}
              onPointerDown={startIconDrag(app.id, pos)}
              onPointerMove={onIconDrag}
              onPointerUp={endIconDrag}
              onClick={onIconClick(app.id)}
              onDoubleClick={() => launchApp(app.id)}
              className={`absolute w-20 flex flex-col items-center gap-1.5 select-none py-2 px-1 transition-colors rounded-deer-xl pointer-events-auto touch-none ${
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
          );
        })}
      </div>

      <AnimatePresence>
        {windows.map((win, i) => {
          const app = apps.find((a) => a.id === win.appId)!;
          const Component = app.component!;
          const centered = app.id === 'welcome';
          return (
            <Window
              key={win.id}
              title={app.name}
              initialX={win.pos ? win.pos.x : centered ? (window.innerWidth - app.defaultWidth) / 2 : 160 + i * 24}
              initialY={win.pos ? win.pos.y : centered ? (window.innerHeight - app.defaultHeight) / 2 : 80 + i * 24}
              defaultWidth={app.defaultWidth}
              defaultHeight={app.defaultHeight}
              zIndex={order.indexOf(win.id)}
              onClose={() => handleCloseWindow(win.id, app.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <Component />
            </Window>
          );
        })}
      </AnimatePresence>

      {contextMenu && (
        <div
          style={{ left: contextMenu.x, top: contextMenu.y }}
          className="absolute z-50 w-48 rounded-deer-xl border border-deer-border bg-deer-surface p-1.5 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              openApp('wallpaper', contextMenu);
              setContextMenu(null);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-deer-primary hover:bg-deer-bg transition-colors"
          >
            <ImageIcon size={16} />
            change background
          </button>
          <button
            onClick={() => {
              openApp('settings', contextMenu);
              setContextMenu(null);
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-deer-primary hover:bg-deer-bg transition-colors"
          >
            <Settings size={16} />
            settings
          </button>
        </div>
      )}

      <Notification
        message="want to turn on darkmode?"
        show={showDarkModeNotif}
        onConfirm={() => {
          if (!darkMode) toggleDarkMode();
          setShowDarkModeNotif(false);
        }}
        onDismiss={() => setShowDarkModeNotif(false)}
      />

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
