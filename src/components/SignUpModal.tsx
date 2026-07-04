import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

type Props = {
  show: boolean;
  step: 'password' | 'name';
  password: string;
  name: string;
  error: string;
  onPasswordChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onBack: () => void;
  onClose: (e?: React.MouseEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SignUpModal({
  show,
  step,
  password,
  name,
  error,
  onPasswordChange,
  onNameChange,
  onBack,
  onClose,
  onSubmit,
}: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-deer-primary/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            key={step}
            onClick={(e) => e.stopPropagation()}
            onSubmit={onSubmit}
            className="w-full max-w-sm bg-deer-surface border border-deer-border rounded-deer-xl shadow-xl p-7 flex flex-col gap-4"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div>
              <h2 className="text-xl font-semibold text-deer-primary">sign up</h2>
              <p className="text-sm text-deer-secondary mt-1">just for you (saved on this device locally)</p>
            </div>

            {step === 'password' ? (
              <input
                type="password"
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-deer-xl border border-deer-border bg-deer-bg text-deer-primary text-sm outline-none focus:ring-2 transition-shadow"
                placeholder="enter a password"
              />
            ) : (
              <input
                type="text"
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-deer-xl border border-deer-border bg-deer-bg text-deer-primary text-sm outline-none focus:ring-2 transition-shadow"
                placeholder="enter a name"
              />
            )}

            {error && <p className="text-xs -mt-1" style={{ color: '#B4654A' }}>{error}</p>}

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={step === 'name' ? onBack : onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium rounded-deer-xl transition-all duration-200 active:scale-95 text-deer-secondary bg-deer-bg border border-deer-border hover:bg-deer-border/40"
              >
                {step === 'name' ? 'back' : 'cancel'}
              </button>
              <Button type="submit" variant="primary" className="flex-1">
                {step === 'password' ? 'next' : 'save'}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
