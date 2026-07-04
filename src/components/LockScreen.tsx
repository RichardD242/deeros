import { motion, AnimatePresence } from 'framer-motion';

const green = '#6F8A71';

type Props = {
  locked: boolean;
  forgiven: boolean;
  personaName: string;
  unlockPassword: string;
  unlockError: string;
  onPasswordChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgot: (e: React.MouseEvent) => void;
};

export default function LockScreen({
  locked,
  forgiven,
  personaName,
  unlockPassword,
  unlockError,
  onPasswordChange,
  onSubmit,
  onForgot,
}: Props) {
  return (
    <AnimatePresence>
      {locked && (
        <motion.div
          key="lock"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {forgiven ? (
            <motion.div
              key="forgiven"
              className="w-full max-w-sm bg-deer-surface border border-deer-border rounded-deer-xl shadow-xl p-7 flex flex-col items-center gap-2 text-center"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <h2 className="text-xl font-semibold" style={{ color: green }}>
                it's ok, welcome home
              </h2>
            </motion.div>
          ) : (
            <motion.form
              key="unlock-form"
              onSubmit={onSubmit}
              className="w-full max-w-sm bg-deer-surface border border-deer-border rounded-deer-xl shadow-xl p-7 flex flex-col gap-4"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div>
                <h2 className="text-xl font-semibold text-deer-primary">welcome back, {personaName}</h2>
                <p className="text-sm text-deer-secondary mt-1">enter your password to unlock</p>
              </div>

              <input
                type="password"
                autoFocus
                autoComplete="off"
                data-lpignore="true"
                data-1p-ignore="true"
                value={unlockPassword}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="px-3.5 py-2.5 rounded-deer-xl border border-deer-border bg-deer-bg text-deer-primary text-sm outline-none focus:ring-2 transition-shadow"
                placeholder="password"
              />

              {unlockError && <p className="text-xs -mt-1" style={{ color: '#B4654A' }}>{unlockError}</p>}

              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-medium rounded-deer-xl transition-all duration-200 active:scale-95 text-white shadow-sm hover:brightness-110"
                style={{ backgroundColor: green }}
              >
                unlock
              </button>

              <button type="button" onClick={onForgot} className="text-xs text-deer-secondary hover:underline self-center">
                forgot password?
              </button>
            </motion.form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
