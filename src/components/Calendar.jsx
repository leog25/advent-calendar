import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Door from './Door';
import './Calendar.css';

const title = "12 Days of Shipmas";

export default function Calendar({ onSelectDoor }) {
  const [showCalendar, setShowCalendar] = useState(true);
  const doors = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="calendar-wrapper">
      <h1 className="calendar-title">
        {title.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + i * 0.05,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
      <motion.div
        className="calendar-byline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        By <img src="/logo.png" alt="Logo" className="byline-logo" />
      </motion.div>
      <motion.button
        className="calendar-toggle"
        onClick={() => setShowCalendar(!showCalendar)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      >
        {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
      </motion.button>
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            className="calendar-frame"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="calendar-grid">
              {doors.map((doorNumber) => (
                <Door
                  key={doorNumber}
                  doorNumber={doorNumber}
                  onSelect={onSelectDoor}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
