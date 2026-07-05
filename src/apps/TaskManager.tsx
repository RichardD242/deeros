import { X } from 'lucide-react';
import { apps } from './registry';
import { useWindows } from '../state/windowsStore';

export default function TaskManagerApp() {
  const { windows, closeWindow, focusWindow } = useWindows();

  return (
    <div className="flex h-full flex-col bg-deer-surface text-deer-primary p-4">
      <h1 className="text-xl font-semibold mb-4">task manager</h1>

      {windows.length === 0 ? (
        <p className="text-sm opacity-60">no running apps</p>
      ) : (
        <div className="flex flex-col gap-2">
          {windows.map((win) => {
            const app = apps.find((a) => a.id === win.appId)!;
            return (
              <div
                key={win.id}
                onClick={() => focusWindow(win.id)}
                className="flex items-center justify-between rounded-xl bg-deer-bg px-3 py-2 cursor-pointer hover:bg-deer-border/60"
              >
                <div className="flex items-center gap-3">
                  <app.icon size={18} />
                  <span className="text-sm">{app.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(win.id);
                  }}
                  className="rounded-full p-1 hover:bg-deer-border"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
