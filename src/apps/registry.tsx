import type { ComponentType } from 'react';
import { NotebookPen, Calculator as CalculatorIcon, FolderOpen, Settings, AppWindow, Clock3, Settings2, Gamepad2, Sparkles, CloudRain, Image as ImageIcon, BookOpen, FileText, Library } from 'lucide-react';
import NotesApp from './Notes';
import CalculatorApp from './CalculatorApp';
import FilesApp from './Files';
import SettingsApp from './Settings';
import TaskManagerApp from './TaskManager';
import TimeApp from './Time';
import TimeSettingsApp from './TimeSettings';
import GamesApp from './Games';
import WelcomeApp from './Welcome';
import WeatherApp from './Weather';
import WeatherSettingsApp from './WeatherSettings';
import WallpaperApp from './Wallpaper';
import ReaderApp from './Reader';

export type AppDef = {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number }>;
  defaultWidth: number;
  defaultHeight: number;
  component?: ComponentType;
  href?: string;
};

export const apps: AppDef[] = [
  {
    id: 'welcome',
    name: 'welcome',
    icon: Sparkles,
    defaultWidth: 560,
    defaultHeight: 680,
    component: WelcomeApp,
  },
  {
    id: 'notes',
    name: 'notes',
    icon: NotebookPen,
    defaultWidth: 420,
    defaultHeight: 380,
    component: NotesApp,
  },
  {
    id: 'calculator',
    name: 'calculator',
    icon: CalculatorIcon,
    defaultWidth: 380,
    defaultHeight: 600,
    component: CalculatorApp,
  },
  {
    id: 'files',
    name: 'files',
    icon: FolderOpen,
    defaultWidth: 500,
    defaultHeight: 400,
    component: FilesApp,
  },
  {
    id: 'settings',
    name: 'settings',
    icon: Settings,
    defaultWidth: 420,
    defaultHeight: 560,
    component: SettingsApp,
  },
  {
    id: 'task-manager',
    name: 'task manager',
    icon: AppWindow,
    defaultWidth: 380,
    defaultHeight: 420,
    component: TaskManagerApp,
  },
  {
    id: 'time',
    name: 'time',
    icon: Clock3,
    defaultWidth: 380,
    defaultHeight: 420,
    component: TimeApp,
  },
  {
    id: 'time-settings',
    name: 'time settings',
    icon: Settings2,
    defaultWidth: 380,
    defaultHeight: 440,
    component: TimeSettingsApp,
  },
  {
    id: 'games',
    name: 'games',
    icon: Gamepad2,
    defaultWidth: 520,
    defaultHeight: 480,
    component: GamesApp,
  },
  {
    id: 'weather',
    name: 'weather',
    icon: CloudRain,
    defaultWidth: 340,
    defaultHeight: 380,
    component: WeatherApp,
  },
  {
    id: 'weather-settings',
    name: 'weather settings',
    icon: Settings2,
    defaultWidth: 380,
    defaultHeight: 260,
    component: WeatherSettingsApp,
  },
  {
    id: 'wallpaper',
    name: 'wallpaper',
    icon: ImageIcon,
    defaultWidth: 700,
    defaultHeight: 640,
    component: WallpaperApp,
  },
  {
    id: 'reader',
    name: 'reader',
    icon: BookOpen,
    defaultWidth: 640,
    defaultHeight: 560,
    component: ReaderApp,
  },
  {
    id: 'docs',
    name: 'docs',
    icon: FileText,
    defaultWidth: 0,
    defaultHeight: 0,
    href: '/docs',
  },
  {
    id: 'manual',
    name: 'manual',
    icon: Library,
    defaultWidth: 0,
    defaultHeight: 0,
    href: '/manual',
  },
];
