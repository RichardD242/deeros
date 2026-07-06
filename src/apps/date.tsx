import { useEffect, useState } from 'react';

function getDateParts() {
    const now = new Date();
    return {
        day: now.getDate(),
        weekday: now.toLocaleDateString([], { weekday: 'long' }),
        month: now.toLocaleDateString([], { month: 'long' }),
        year: now.getFullYear(),
    };
}

export default function DateApp() {
    const [{ day, weekday, month, year }, setParts] = useState(getDateParts());

    useEffect(() => {
        const interval = setInterval(() => {
            setParts(getDateParts());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-6 bg-deer-surface">
            <div className="flex flex-col items-center overflow-hidden rounded-2xl border border-deer-primary/10 bg-deer-bg shadow-sm">
                <div className="w-full bg-deer-primary/10 px-10 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-deer-secondary">
                    {month}
                </div>
                <div className="px-10 py-6 text-7xl font-light tracking-tight text-deer-primary">
                    {day}
                </div>
            </div>

            <div className="flex flex-col items-center gap-1">
                <p className="text-xl text-deer-primary">{weekday}</p>
                <p className="text-sm text-deer-secondary/80">{month} {day}, {year}</p>
            </div>
        </div>
    );
}