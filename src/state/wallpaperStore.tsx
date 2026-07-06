import { createContext, useContext, useState, type ReactNode } from 'react';

const WALLPAPER_ID_KEY = 'deeros_wallpaper_id';
const WALLPAPER_SRC_KEY = 'deeros_wallpaper_src';

type WallpaperContextValue = {
  wallpaperId: string;
  wallpaperSrc: string;
  setWallpaper: (id: string, src: string) => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaperId, setWallpaperId] = useState(() => localStorage.getItem(WALLPAPER_ID_KEY) ?? 'deeros-dark');
  const [wallpaperSrc, setWallpaperSrc] = useState(() => localStorage.getItem(WALLPAPER_SRC_KEY) ?? '');

  const setWallpaper = (id: string, src: string) => {
    setWallpaperId(id);
    setWallpaperSrc(src);
    localStorage.setItem(WALLPAPER_ID_KEY, id);
    localStorage.setItem(WALLPAPER_SRC_KEY, src);
  };

  return (
    <WallpaperContext.Provider value={{ wallpaperId, wallpaperSrc, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error('useWallpaper must be used within WallpaperProvider');
  return ctx;
}
