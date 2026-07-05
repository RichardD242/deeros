import type { ComponentType } from 'react';
import { NotebookPen, Calculator as CalculatorIcon, FolderOpen, Settings, AppWindow } from 'lucide-react';
import NotesApp from './Notes';
import CalculatorApp from './CalculatorApp';
import FilesApp from './Files';
import SettingsApp from './Settings';
import TaskManagerApp from './TaskManager';

export type AppDef = {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number }>;
  defaultWidth: number;
  defaultHeight: number;
  component: ComponentType;
};

export const apps: AppDef[] = [
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
    defaultHeight: 400,
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
];
