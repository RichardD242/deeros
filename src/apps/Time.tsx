import { useEffect, useState } from 'react';
import { useTimeSettings } from '../state/timeSettingsStore';

function getTime(showSeconds: boolean, use24Hour: boolean) {
    return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: !use24Hour,
    });
}

function getDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}.${month}.${year}`;
}

export default function TimeApp() {
    const { showSeconds, use24Hour, showDate } = useTimeSettings();
    const [time, setTime] = useState(getTime(showSeconds, use24Hour));
    const [date, setDate] = useState(getDate());

    useEffect(() => {
        setTime(getTime(showSeconds, use24Hour));

        const interval = setInterval(() => {
            setTime(getTime(showSeconds, use24Hour));
            setDate(getDate());
        }, 1000);

        return () => clearInterval(interval);
    }, [showSeconds, use24Hour]);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-2 bg-deer-surface">
            <h1 className="text-7xl font-light tracking-tight text-deer-primary">{time}</h1>
            {showDate && <p className="text-lg text-deer-secondary">{date}</p>}
        </div>
    );
}
