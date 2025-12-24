import { motion } from 'framer-motion';
import Door from './Door';
import './Calendar.css';

const title = "12 Days of Shipmas";

export default function Calendar({ onSelectDoor }) {
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
      <div className="calendar-frame">
        <div className="calendar-grid">
          {doors.map((doorNumber) => (
            <Door
              key={doorNumber}
              doorNumber={doorNumber}
              onSelect={onSelectDoor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
