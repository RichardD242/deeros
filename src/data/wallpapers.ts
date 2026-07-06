export type Wallpaper = {
    id: string;
    name: string;
    src: string;
    swatch?: string;
};

export const darkWallpapers: Wallpaper[] = [
    { id: 'deeros-dark', name: 'default dark', src: '', swatch: 'bg-[#1C1E1B]' },
    { id: 'dark-1', name: 'dark forest', src: '/wallpaper/dark-forestdeeros.png' },
    { id: 'dark-2', name: 'dark mountain', src: '/wallpaper/dark-mountaindeeros.png' },
];

export const lightWallpapers: Wallpaper[] = [
    { id: 'deeros-light', name: 'default light', src: '', swatch: 'bg-[#F7F6F2]' },
    { id: 'light-1', name: 'light forest', src: '/wallpaper/lights-forestdeeros.png' },
    { id: 'light-2', name: 'light mountain', src: '/wallpaper/lights-mountaindeeros.png' },
];
