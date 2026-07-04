import type { ComponentType } from 'react';
import { NotebookPen, Calculator as CalculatorIcon, FolderOpen } from 'lucide-react';
import NotesApp from './Notes';
import CalculatorApp from './CalculatorApp';
import FilesApp from './Files';

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
    name: 'Notes',
    icon: NotebookPen,
    defaultWidth: 420,
    defaultHeight: 380,
    component: NotesApp,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: CalculatorIcon,
    defaultWidth: 380,
    defaultHeight: 600,
    component: CalculatorApp,
  },
  {
    id: 'files',
    name: 'Files',
    icon: FolderOpen,
    defaultWidth: 500,
    defaultHeight: 400,
    component: FilesApp,
  }
];
