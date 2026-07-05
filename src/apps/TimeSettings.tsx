import { Clock3 } from 'lucide-react';
import { useTimeSettings } from '../state/timeSettingsStore';

function Toggle({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`relative h-7 w-12 rounded-full transition ${
                enabled ? 'bg-moss' : 'bg-deer-border'
            }`}
        >
            <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    enabled ? 'left-6' : 'left-1'
                }`}
            />
        </button>
    );
}

export default function TimeSettingsApp() {
    const { showSeconds, use24Hour, showDate, toggleShowSeconds, toggleUse24Hour, toggleShowDate } = useTimeSettings();

    return (
        <div className="h-full bg-deer-surface text-deer-primary p-5">
            <div className="flex items-center justify-center gap-3 mb-6">
                <Clock3 size={24} />
                <h1 className="text-2xl font-semibold">time settings</h1>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                    <div>
                        <p className="font-medium">show seconds</p>
                        <p className="text-sm opacity-70">
                            {showSeconds ? 'enabled' : 'disabled'}
                        </p>
                    </div>

                    <Toggle enabled={showSeconds} onClick={toggleShowSeconds} />
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                    <div>
                        <p className="font-medium">24-hour format</p>
                        <p className="text-sm opacity-70">
                            {use24Hour ? '24-hour' : '12-hour'}
                        </p>
                    </div>

                    <Toggle enabled={use24Hour} onClick={toggleUse24Hour} />
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-deer-bg p-4">
                    <div>
                        <p className="font-medium">date</p>
                        <p className="text-sm opacity-70">day.month.year</p>
                    </div>

                    <Toggle enabled={showDate} onClick={toggleShowDate} />
                </div>
            </div>
        </div>
    );
}
