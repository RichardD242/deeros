import { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react';
import { useWeatherSettings } from '../state/weatherSettingsStore';
import { fetchWeather, type WeatherType } from '../lib/weather';

function toFahrenheit(c: number) {
    return Math.round((c * 9) / 5 + 32);
}

const icons = {
    sun: Sun,
    cloud: Cloud,
    rain: CloudRain,
    snow: CloudSnow,
};

export default function WeatherApp() {
    const { useFahrenheit } = useWeatherSettings();
    const [temperatureC, setTemperatureC] = useState<number | null>(null);
    const [weather, setWeather] = useState<WeatherType>('cloud');

    useEffect(() => {
        fetchWeather().then(({ temperatureC, weather }) => {
            setTemperatureC(temperatureC);
            setWeather(weather);
        });
    }, []);

    const Icon = icons[weather];

    return (
        <div className="flex h-full flex-col items-center justify-center gap-6 bg-deer-surface">
            <Icon size={96} strokeWidth={1.5} className="text-moss" />
            <h1 className="text-7xl font-light tracking-tight text-deer-primary">
                {temperatureC === null
                    ? '--'
                    : useFahrenheit
                        ? toFahrenheit(temperatureC)
                        : temperatureC}
                °{useFahrenheit ? 'F' : 'C'}
            </h1>
        </div>
    );
}
