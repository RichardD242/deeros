import { useState } from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';

const THEME_KEY = 'deeros_manual_theme';

type NavItem = { id: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const nav: NavGroup[] = [
    {
        label: 'basics',
        items: [
            { id: 'overview', label: 'overview' },
            { id: 'apps', label: 'opening apps' },
            { id: 'windows', label: 'windows' },
        ],
    },
    {
        label: 'desktop',
        items: [
            { id: 'right-click', label: 'right click menu' },
            { id: 'taskbar', label: 'taskbar' },
        ],
    },
    {
        label: 'settings',
        items: [
            { id: 'appearance', label: 'appearance' },
            { id: 'sound', label: 'sound' },
            { id: 'wallpaper', label: 'wallpaper' },
        ],
    },
    {
        label: 'other',
        items: [
            { id: 'deer', label: 'deer story' },
        ],
    },
];

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="mb-14 scroll-mt-6">
            <h2 className="mb-4 text-xl font-semibold text-deer-primary">{title}</h2>
            <div className="space-y-4 text-sm leading-relaxed text-deer-secondary">{children}</div>
        </section>
    );
}

export default function Manual() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const [theme, setTheme] = useState<'dark' | 'light'>(savedTheme === 'dark' ? 'dark' : 'light');
    const [asking, setAsking] = useState(savedTheme !== 'dark' && savedTheme !== 'light');

    function chooseTheme(value: 'dark' | 'light') {
        localStorage.setItem(THEME_KEY, value);
        setTheme(value);
        setAsking(false);
    }

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className="relative min-h-screen bg-deer-bg text-deer-primary">
                {asking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deer-bg/60 backdrop-blur-md">
                        <div className="w-80 rounded-deer-xl border border-deer-border bg-deer-surface p-6 text-center shadow-xl">
                            <p className="mb-5 text-sm text-deer-secondary">pick a theme for the manual</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => chooseTheme('light')}
                                    className="flex flex-1 flex-col items-center gap-2 rounded-deer-xl border border-deer-border bg-deer-bg py-4 text-sm hover:border-moss transition"
                                >
                                    <Sun size={20} className="text-moss" />
                                    light mode
                                </button>
                                <button
                                    onClick={() => chooseTheme('dark')}
                                    className="flex flex-1 flex-col items-center gap-2 rounded-deer-xl bg-moss py-4 text-sm text-white hover:bg-moss-hover transition"
                                >
                                    <Moon size={20} />
                                    dark mode
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`flex ${asking ? 'pointer-events-none blur-sm select-none' : ''}`}>
                    <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r border-deer-border p-6">
                        <div className="mb-8 flex items-center gap-2">
                            <BookOpen size={20} className="text-moss" />
                            <span className="font-semibold">DeerOs manual</span>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {nav.map((group) => (
                                <div key={group.label} className="mb-6">
                                    <p className="mb-2 text-xs uppercase tracking-wide text-deer-secondary">{group.label}</p>
                                    <div className="flex flex-col gap-1">
                                        {group.items.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollTo(item.id)}
                                                className="rounded-lg px-2 py-1.5 text-left text-sm text-deer-primary hover:bg-deer-surface transition"
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-deer-border pt-4">
                            <div className="flex items-center gap-2 text-sm text-deer-secondary">
                                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                                {theme === 'dark' ? 'dark mode' : 'light mode'}
                            </div>

                            <button
                                onClick={() => chooseTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`relative h-6 w-11 rounded-full transition ${
                                    theme === 'dark' ? 'bg-moss' : 'bg-deer-border'
                                }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                                        theme === 'dark' ? 'left-6' : 'left-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </aside>

                    <main className="mx-auto w-full max-w-3xl px-8 py-12">
                        <h1 className="mb-2 text-3xl font-bold">DeerOs Manual</h1>
                        <p className="mb-12 text-sm text-deer-secondary">a simple giude on how to use the os</p>

                        <Section id="overview" title="overview">
                            <p>
                                DeerOs is a simple desktop os that is designed for lowcortisol. The OS has icons a
                                taskbar and windows you can drag around like in a read OS. Nothing needs an account or a
                                server. Everything is saved client side on your browser for maximum security.
                            </p>
                        </Section>

                        <Section id="apps" title="opening apps">
                            <p>Double click an app on the desktop to open it. Single Click selects it.</p>
                            <p>You can move the apps around by dragging them</p>
                        </Section>

                        <Section id="windows" title="windows">
                            <p>Drag the top bar of the window to move it around.</p>
                            <p>Use the buttons on the bar to close, minimize or maximize the windows.</p>
                            <p>Click a window or in the taskbar to bring it to the front.</p>
                        </Section>

                        <Section id="right-click" title="right click menu">
                            <p>Right click anywhere on the desktop to open a menu</p>
                            <p>There you change the wallpaper and more</p>
                        </Section>

                        <Section id="taskbar" title="taskbar">
                            <p>The taskbar is at the bottom of the screen. Click any app to go to it</p>
                            <p>The deer logo on the left is like the windows button.</p>
                        </Section>

                        <Section id="appearance" title="appearance">
                            <p>Open settings to change to light or darkmode</p>
                            <p>Switching darkmode or lightmode updates whole ui including wallpapers</p>
                        </Section>

                        <Section id="sound" title="sound">
                            <p>In the settings app, you can also turn on sound like closing selecting opeing apps sounds.</p>
                            <p>It is turned off by default for not triggering a cortisol spike</p>
                        </Section>

                        <Section id="wallpaper" title="wallpaper">
                            <p>Open the wallpaper app to change your wallpaper</p>
                            <p>You can choose between light and dark wallpapers</p>
                        </Section>

                        <Section id="deer" title="deer story">
                            <p>
                                The deer is a symbol of low cortisol. We respect the deer.
                                Never disrespect it. It is a simple story with a simple message. 
                            </p>
                        </Section>
                    </main>
                </div>
            </div>
        </div>
    );
}