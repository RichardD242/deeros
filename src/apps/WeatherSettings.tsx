import { Thermometer } from 'lucide-react';
import { useWeatherSettings } from '../state/weatherSettingsStore';

export default function WeatherSettings() {
    const { useFahrenheit, toggleUseFahrenheit } = useWeatherSettings();

    return (
        <div className="h-full bg-deer-surface text-deer-primary p-5">
            <div className="flex items-center gap-3 mb-6">
                <Thermometer size={24} />
                <h1 className="text-2xl font-semibold">weather settings</h1>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                <div>
                    <p className="font-medium">temperature unit</p>
                    <p className="text-sm opacity-70">
                        {useFahrenheit ? "Fahrenheit (°F)" : "Celsius (°C)"}
                    </p>
                </div>

                <button
                    onClick={toggleUseFahrenheit}
                    className={`relative h-7 w-12 rounded-full transition ${
                        useFahrenheit ? 'bg-moss' : 'bg-deer-border'
                    }`}
                >
                    <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                            useFahrenheit ? 'left-6' : 'left-1'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
}