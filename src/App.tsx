import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const green = '#6F8A71';

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const handleKey = () => setEntered(true);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className="w-screen h-screen bg-deer-bg overflow-hidden font-sans"
      onClick={() => setEntered(true)}
    >
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="splash"
            className="w-full h-full flex flex-col items-center justify-center gap-6 select-none cursor-pointer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: 'easeInOut' } }}
          >
            <img
              src="/transparentdeer.png"
              alt="Deer"
              className="w-64 h-64 object-contain"
            />
            <h1 className="text-8xl font-bold tracking-tighter leading-none" style={{ color: green }}>
              Deer Os
            </h1>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
