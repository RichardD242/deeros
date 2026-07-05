import { useState } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../state/themeStore";

export default function SettingsApp() {
    const { darkMode, toggleDarkMode } = useTheme();
    const [sounds, setSounds] = useState(true);

    return (
        <div className="h-full bg-deer-surface text-deer-primary p-5">
            <h1 className="text-2xl font-semibold mb-6">
                settings
            </h1>

            <div className="space-y-4">

                <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                    <div className="flex items-center gap-3">
                        {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                        <div>
                            <p className="font-medium">appearance</p>
                            <p className="text-sm opacity-70">
                                {darkMode ? "darkmode" : "lightmode"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className={`relative h-7 w-12 rounded-full transition ${
                            darkMode ? "bg-moss" : "bg-deer-border"
                        }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                darkMode ? "left-6" : "left-1"
                            }`}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                    <div className="flex items-center gap-3">
                        {sounds ? <Volume2 size={22} /> : <VolumeX size={22} />}
                        <div>
                            <p className="font-medium">sounds</p>
                            <p className="text-sm opacity-70">
                                {sounds ? "enabled" : "disabled"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setSounds(!sounds)}
                        className={`relative h-7 w-12 rounded-full transition ${
                            sounds ? "bg-moss" : "bg-deer-border"
                        }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                sounds ? "left-6" : "left-1"
                            }`}
                        />
                    </button>
                </div>

            </div>
        </div>
    );
}