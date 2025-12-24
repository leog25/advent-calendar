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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * 0.06,
              duration: 0.1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
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
