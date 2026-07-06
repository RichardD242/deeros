import { Image as ImageIcon, Lock, Moon, Sun } from 'lucide-react';
import { useTheme } from '../state/themeStore';
import { useWallpaper } from '../state/wallpaperStore';
import { darkWallpapers, lightWallpapers, type Wallpaper } from '../data/wallpapers';

function WallpaperCard({
    wallpaper,
    active,
    onSelect,
}: {
    wallpaper: Wallpaper;
    active: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            className={`overflow-hidden rounded-deer-xl border transition ${
                active ? 'border-moss ring-2 ring-moss' : 'border-deer-border hover:scale-[1.02]'
            }`}
        >
            {wallpaper.src ? (
                <img
                    src={wallpaper.src}
                    alt={wallpaper.name}
                    className="block aspect-video w-full object-cover object-center"
                />
            ) : (
                <div className={`aspect-video w-full flex items-center justify-center ${wallpaper.swatch}`}>
                    <img
                        src="/transparentdeer.png"
                        alt=""
                        className="h-2/3 w-2/3 object-contain opacity-80"
                    />
                </div>
            )}

            <div className="bg-deer-surface px-3 py-2 text-sm font-medium text-deer-primary">
                {wallpaper.name}
            </div>
        </button>
    );
}

export default function WallpaperApp() {
    const { darkMode, toggleDarkMode } = useTheme();
    const { wallpaperId, setWallpaper } = useWallpaper();

    return (
        <div className="h-full overflow-auto bg-deer-surface text-deer-primary p-6">

            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <ImageIcon size={28} />
                    <h1 className="text-2xl font-semibold">wallpapers</h1>
                </div>

                <div className="flex items-center gap-2">
                    {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                    <span className="text-sm">{darkMode ? 'dark mode' : 'light mode'}</span>

                    <button
                        onClick={toggleDarkMode}
                        className={`relative h-7 w-12 rounded-full transition ${
                            darkMode ? 'bg-moss' : 'bg-deer-border'
                        }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                darkMode ? 'left-6' : 'left-1'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <section className="mb-10">
                <div className="mb-4 flex items-center gap-2">
                    <Moon size={18} />
                    <h2 className="text-lg font-medium">dark mode</h2>
                </div>

                <div className="relative">
                    <div
                        className={`grid grid-cols-3 gap-5 transition ${
                            !darkMode ? 'pointer-events-none select-none blur-sm' : ''
                        }`}
                    >
                        {darkWallpapers.map((wallpaper) => (
                            <WallpaperCard
                                key={wallpaper.id}
                                wallpaper={wallpaper}
                                active={wallpaperId === wallpaper.id}
                                onSelect={() => setWallpaper(wallpaper.id, wallpaper.src)}
                            />
                        ))}
                    </div>

                    {!darkMode && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock size={28} className="text-deer-secondary" />
                        </div>
                    )}
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center gap-2">
                    <Sun size={18} />
                    <h2 className="text-lg font-medium">light mode</h2>
                </div>

                <div className="relative">
                    <div
                        className={`grid grid-cols-3 gap-5 transition ${
                            darkMode ? 'pointer-events-none select-none blur-sm' : ''
                        }`}
                    >
                        {lightWallpapers.map((wallpaper) => (
                            <WallpaperCard
                                key={wallpaper.id}
                                wallpaper={wallpaper}
                                active={wallpaperId === wallpaper.id}
                                onSelect={() => setWallpaper(wallpaper.id, wallpaper.src)}
                            />
                        ))}
                    </div>

                    {darkMode && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock size={28} className="text-deer-secondary" />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
