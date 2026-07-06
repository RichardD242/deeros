import { useState } from 'react';
import { Book, Moon, Sun } from 'lucide-react';

const THEME_KEY = 'deeros_docs_theme';

type NavItem = { id: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const nav: NavGroup[] = [
    {
        label: 'start',
        items: [
            { id: 'overview', label: 'overview' },
            { id: 'getting-started', label: 'getting started' },
        ],
    },
    {
        label: 'project',
        items: [
            { id: 'tech-stack', label: 'tech stack' },
            { id: 'structure', label: 'structure' },
        ],
    },
    {
        label: 'apps',
        items: [
            { id: 'built-in-apps', label: 'built in apps' },
            { id: 'customization', label: 'customization' },
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

function Code({ children }: { children: React.ReactNode }) {
    return (
        <pre className="overflow-x-auto rounded-deer-xl border border-deer-border bg-deer-bg p-4 font-mono text-sm text-moss">
            {children}
        </pre>
    );
}

export default function Docs() {
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
                            <p className="mb-5 text-sm text-deer-secondary">pick a theme for the docs</p>
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
                            <Book size={20} className="text-moss" />
                            <span className="font-semibold">DeerOs docs</span>
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
                        <h1 className="mb-2 text-3xl font-bold">DeerOs Docs</h1>
                        <p className="mb-12 text-sm text-deer-secondary">a low cortisol web desktop os built with react</p>

                        <Section id="overview" title="overview">
                            <p>
                                DeerOS is a lowcortisol web desktop that runs entirely in the browser. It has cool minimal apps
                                icons a taskbar wallpapers and a few games (packages). Everything is client side and stores your
                                preferences in localstorage so nothing needs a backend or an account for maximum security.
                            </p>
                        </Section>

                        <Section id="getting-started" title="getting started">
                            <p>clone repo and install dependencies</p>
                            <Code>
                                git clone https://github.com/richardd242/deeros.git{'\n'}
                                cd deeros{'\n'}
                                npm install
                            </Code>
                            <p>start dev server</p>
                            <Code>npm run dev</Code>
                            <p>build production</p>
                            <Code>npm run build</Code>
                        </Section>

                        <Section id="tech-stack" title="tech stack">
                            <ul className="list-disc space-y-1 pl-5">
                                <li>react 19 with typescript</li>
                                <li>vite as dev server</li>
                                <li>tialwind css for styling</li>
                                <li>framer motion for animations and transitions</li>
                                <li>lucide react for icons</li>
                                <li>localstorage for security, no backend needed</li>
                            </ul>
                        </Section>

                        <Section id="structure" title="structure">
                            <ul className="list-disc space-y-1 pl-5">
                                <li><span className="text-deer-primary">src/apps</span> every app that runs inside the desktop os</li>
                                <li><span className="text-deer-primary">src/components</span> shared ui like windows and the desktop</li>
                                <li><span className="text-deer-primary">src/state</span> react context stores for sound wallpaper and more</li>
                                <li><span className="text-deer-primary">src/lib</span> playback</li>
                                <li><span className="text-deer-primary">src/data</span> shared data like the wallpaper list</li>
                            </ul>
                        </Section>

                        <Section id="built-in-apps" title="built in apps">
                            <ul className="list-disc space-y-1 pl-5">
                                <li>welcome app</li>
                                <li>notes</li>
                                <li>calendar (inside time app)</li>
                                <li>files</li>
                                <li>settings</li>
                                <li>task manager</li>
                                <li>time</li>
                                <li>time settings (for the time app)</li>
                                <li>games</li>
                                <li>weather</li>
                                <li>weather settings (for the weather app)</li>
                                <li>wallpaper picker</li>
                                <li>reader</li>
                                <li>date</li>
                                <li>todo list</li>
                                <li>gallery and img app</li>
                            </ul>
                            <p>
                                every app is a component registered in src/apps/registry.tsx
                            </p>
                        </Section>

                        <Section id="customization" title="customization">
                            <p>
                                dark mode or lightmode, sound, wallpaper and more all live in their own react context and
                                get written to localstorage so they stay same even after reloading. Right click the desktop to change the wallpaper or open settings.
                            </p>
                        </Section>
                    </main>
                </div>
            </div>
        </div>
    );
}