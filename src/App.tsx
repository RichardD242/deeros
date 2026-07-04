import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './components/Button';
import SignUpModal from './components/SignUpModal';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const green = '#6F8A71';
const PASSWORD_KEY = 'deeros_persona_password';
const NAME_KEY = 'deeros_persona_name';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState<'password' | 'name'>('password');
  const [loggedIn, setLoggedIn] = useState(false);
  const [desktopStage, setDesktopStage] = useState<'welcome' | 'loading' | 'canvas'>('welcome');
  const [locked, setLocked] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [forgiven, setForgiven] = useState(false);
  const [personaName, setPersonaName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPassword = localStorage.getItem(PASSWORD_KEY);
    const savedName = localStorage.getItem(NAME_KEY);
    if (savedPassword && savedName) {
      setPersonaName(savedName);
      setLoggedIn(true);
      setEntered(true);
      setLocked(true);
      setForgiven(false);
    }
  }, []);

  useEffect(() => {
    const handleKey = () => setEntered(true);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openSignUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setError('');
    setName('');
    setPassword('');
    setSignUpStep('password');
    setShowSignUp(true);
  };

  const nextSignUpStep = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!password) {
      setError('need a password');
      return;
    }
    setError('');
    setSignUpStep('name');
  };

  const closeSignUp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowSignUp(false);
  };

  const logout = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
    setPersonaName('');
    setLoggedIn(false);
    setLocked(false);
    setDesktopStage('welcome');
  };

  const continueToDesktop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDesktopStage('loading');
    setTimeout(() => setDesktopStage('canvas'), 1800);
  };

  const submitUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (unlockPassword !== localStorage.getItem(PASSWORD_KEY)) {
      setUnlockError('wrong password');
      return;
    }
    setUnlockError('');
    setUnlockPassword('');
    setLocked(false);
  };

  const forgotPassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUnlockError('');
    setUnlockPassword('');
    setForgiven(true);
    setTimeout(() => setLocked(false), 2500);
  };

  const submitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name) {
      setError('need a name');
      return;
    }
    localStorage.setItem(NAME_KEY, name);
    localStorage.setItem(PASSWORD_KEY, password);
    setPersonaName(name);
    setShowSignUp(false);
    setLoggedIn(true);
  };

  return (
    <div className="w-screen h-screen bg-deer-bg overflow-hidden font-sans" onClick={() => setEntered(true)}>
      <div className={`w-full h-full transition-all duration-300 ${locked ? 'blur-md pointer-events-none select-none' : ''}`}>
        <AnimatePresence mode="wait">
          {!entered ? (
            <motion.div
              key="splash"
              className="w-full h-full flex flex-col items-center justify-center gap-6 select-none cursor-pointer relative"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeInOut' } }}
            >
              <img src="/transparentdeer.png" alt="Deer" className="w-64 h-64 object-contain" />
              <h1 className="text-8xl font-bold tracking-tighter leading-none" style={{ color: green }}>
                Deer Os
              </h1>
              <p className="absolute bottom-12 text-deer-secondary text-sm tracking-wide opacity-60">
                press any key or click anywhere to start
              </p>
            </motion.div>
          ) : loggedIn && desktopStage === 'welcome' ? (
            <motion.div
              key="welcome"
              className="w-full h-full flex flex-col items-center justify-center gap-4 select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            >
              <h1 className="text-6xl font-bold tracking-tighter leading-none" style={{ color: green }}>
                hello, {personaName}
              </h1>
              <p className="text-deer-secondary text-sm tracking-wide opacity-60">welcome back to your desktop</p>
              <div className="flex gap-3">
                <Button variant="primary" onClick={continueToDesktop}>
                  continue to desktop
                </Button>
                <Button variant="outline" onClick={logout}>
                  log out
                </Button>
              </div>
            </motion.div>
          ) : loggedIn && desktopStage === 'loading' ? (
            <motion.div
              key="loading"
              className="w-full h-full flex flex-col items-center justify-center select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
              exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
            >
              <motion.img
                src="/transparentdeer.png"
                alt="Deer"
                className="w-40 h-40 object-contain"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          ) : loggedIn && desktopStage === 'canvas' ? (
            <motion.div
              key="canvas"
              className="w-full h-full bg-deer-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
            >
              <Desktop />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              className="w-full h-full flex flex-col items-center justify-center gap-8 select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            >
              <img
                src="https://www.psmedical.com.hk/uploads/cortisol_levels_1_319eabd933.jpg"
                alt="Cortisol levels"
                className="w-80 rounded-2xl object-contain"
              />
              <p className="text-3xl font-semibold text-deer-primary text-center max-w-xl leading-snug">
                finally a low cortisol web desktop operating system
              </p>
              <Button variant="outline" onClick={openSignUp}>
                sign up
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SignUpModal
        show={showSignUp}
        step={signUpStep}
        password={password}
        name={name}
        error={error}
        onPasswordChange={setPassword}
        onNameChange={setName}
        onBack={() => setSignUpStep('password')}
        onClose={closeSignUp}
        onSubmit={signUpStep === 'password' ? nextSignUpStep : submitSignUp}
      />

      <LockScreen
        locked={locked}
        forgiven={forgiven}
        personaName={personaName}
        unlockPassword={unlockPassword}
        unlockError={unlockError}
        onPasswordChange={setUnlockPassword}
        onSubmit={submitUnlock}
        onForgot={forgotPassword}
      />
    </div>
  );
}
