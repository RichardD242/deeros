export type WeatherType = "sun" | "rain" | "cloud" | "snow";

const FALLBACK_COORDS = { latitude: 52.52, longitude: 13.405 };

function codeToWeatherType(code: number): WeatherType {
    if (code === 0 || code === 1) return "sun";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
    return "cloud";
}

function getCoords(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(FALLBACK_COORDS);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
            () => resolve(FALLBACK_COORDS),
            { timeout: 5000 }
        );
    });
}

export async function fetchWeather(): Promise<{ temperatureC: number; weather: WeatherType }> {
    const { latitude, longitude } = await getCoords();
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
    );
    const data = await res.json();
    return {
        temperatureC: Math.round(data.current.temperature_2m),
        weather: codeToWeatherType(data.current.weather_code),
    };
}
