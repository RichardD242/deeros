import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, X, Maximize2, Minimize2 } from 'lucide-react';

type Props = {
  title: string;
  initialX: number;
  initialY: number;
  defaultWidth: number;
  defaultHeight: number;
  resizable?: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
};

const MARGIN = 16;
const MIN_WIDTH = 240;
const MIN_HEIGHT = 180;

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export default function Window({
  title,
  initialX,
  initialY,
  defaultWidth,
  defaultHeight,
  resizable = false,
  onClose,
  onFocus,
  zIndex,
  children,
}: Props) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [shaded, setShaded] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const prevBounds = useRef({ x: initialX, y: initialY });
  const drag = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeDrag = useRef<{
    dir: ResizeDir;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  const startResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    e.stopPropagation();
    onFocus();
    resizeDrag.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
      startPosX: pos.x,
      startPosY: pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onResize = (e: React.PointerEvent) => {
    const info = resizeDrag.current;
    if (!info) return;

    const dx = e.clientX - info.startX;
    const dy = e.clientY - info.startY;

    let width = info.startW;
    let height = info.startH;
    let x = info.startPosX;
    let y = info.startPosY;

    if (info.dir.includes('e')) width = Math.max(MIN_WIDTH, info.startW + dx);
    if (info.dir.includes('s')) height = Math.max(MIN_HEIGHT, info.startH + dy);
    if (info.dir.includes('w')) {
      width = Math.max(MIN_WIDTH, info.startW - dx);
      x = info.startPosX + (info.startW - width);
    }
    if (info.dir.includes('n')) {
      height = Math.max(MIN_HEIGHT, info.startH - dy);
      y = info.startPosY + (info.startH - height);
    }

    setSize({ width, height });
    setPos({ x, y });
  };

  const endResize = () => {
    resizeDrag.current = null;
  };

  const startDrag = (e: React.PointerEvent) => {
    onFocus();
    if (maximized) return;
    drag.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDrag = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const { startX, startY, origX, origY } = drag.current;
    setPos({ x: origX + (e.clientX - startX), y: origY + (e.clientY - startY) });
  };

  const endDrag = () => {
    drag.current = null;
  };

  const handleControlClick = (action: () => void) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    action();
  };

  const toggleMaximize = () => {
    if (maximized) {
      setPos({ x: prevBounds.current.x, y: prevBounds.current.y });
      setMaximized(false);
    } else {
      prevBounds.current = pos;
      setMaximized(true);
      setShaded(false);
    }
  };

  const toggleShade = () => {
    setShaded((s) => !s);
  };

  const style = maximized
    ? { left: MARGIN, top: MARGIN, right: MARGIN, bottom: MARGIN, zIndex }
    : { left: pos.x, top: pos.y, width: size.width, height: shaded ? undefined : size.height, zIndex };

  const controlClass =
    'w-6 h-6 rounded-full flex items-center justify-center transition-colors text-deer-secondary hover:bg-deer-bg hover:text-deer-primary';

  return (
    <motion.div
      className="absolute bg-deer-surface border border-deer-border rounded-deer-xl shadow-xl flex flex-col overflow-hidden"
      style={style}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      onPointerDown={onFocus}
    >
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        className="flex items-center justify-between px-3 py-2 bg-deer-bg border-b border-deer-border cursor-move select-none shrink-0"
      >
        <div className="flex items-center gap-1">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleControlClick(onClose)}
            className={controlClass}
          >
            <X size={14} />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleControlClick(toggleShade)}
            className={controlClass}
          >
            <Minus size={14} />
          </button>
        </div>

        <span className="text-sm font-medium text-deer-primary truncate px-2">{title}</span>

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleControlClick(toggleMaximize)}
          className={controlClass}
        >
          {maximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
        </button>
      </div>

      {!shaded && <div className="flex-1 overflow-auto">{children}</div>}

      {resizable && !maximized && !shaded && (
        <>
          <div
            onPointerDown={startResize('n')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute inset-x-2 top-0 h-1.5 cursor-ns-resize"
          />
          <div
            onPointerDown={startResize('s')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute inset-x-2 bottom-0 h-1.5 cursor-ns-resize"
          />
          <div
            onPointerDown={startResize('w')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute inset-y-2 left-0 w-1.5 cursor-ew-resize"
          />
          <div
            onPointerDown={startResize('e')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute inset-y-2 right-0 w-1.5 cursor-ew-resize"
          />
          <div
            onPointerDown={startResize('nw')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute left-0 top-0 h-3 w-3 cursor-nwse-resize"
          />
          <div
            onPointerDown={startResize('ne')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute right-0 top-0 h-3 w-3 cursor-nesw-resize"
          />
          <div
            onPointerDown={startResize('sw')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute left-0 bottom-0 h-3 w-3 cursor-nesw-resize"
          />
          <div
            onPointerDown={startResize('se')}
            onPointerMove={onResize}
            onPointerUp={endResize}
            className="absolute right-0 bottom-0 h-3 w-3 cursor-nwse-resize"
          />
        </>
      )}
    </motion.div>
  );
}
