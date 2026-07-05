import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  message: string;
  show: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
};

export default function Notification({ message, show, onConfirm, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -12, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -12, x: '-50%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed top-4 left-1/2 z-50 w-80 rounded-deer-xl bg-deer-surface border border-deer-border shadow-xl p-4"
        >
          <p className="text-sm text-deer-primary mb-3">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onDismiss}
              className="rounded-deer-xl px-3 py-1.5 text-sm text-deer-secondary hover:bg-deer-bg transition"
            >
              no
            </button>
            <button
              onClick={onConfirm}
              className="rounded-deer-xl px-3 py-1.5 text-sm bg-moss hover:bg-moss-hover text-white transition"
            >
              yes
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
