import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from './components/Calendar';
import DoorDetail from './components/DoorDetail';
import Guidelines from './components/Guidelines';
import './App.css';

function Snowflakes() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 8,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="snowfall">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [doorPosition, setDoorPosition] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const handleSelectDoor = (doorNumber, position) => {
    setDoorPosition(position);
    setSelectedDoor(doorNumber);
  };

  const handleCloseDoor = () => {
    setSelectedDoor(null);
    setDoorPosition(null);
  };

  return (
    <div className="app">
      <Snowflakes />

      <motion.button
        className="guidelines-button"
        onClick={() => setShowGuidelines(true)}
        animate={{
          opacity: selectedDoor || showGuidelines ? 0 : 1,
          pointerEvents: selectedDoor || showGuidelines ? 'none' : 'auto',
        }}
        transition={{ duration: 0.3 }}
      >
        Guidelines
      </motion.button>

      <motion.div
        className="calendar-container"
        animate={{
          opacity: selectedDoor ? 0 : 1,
          scale: selectedDoor ? 0.95 : 1,
        }}
        transition={{
          duration: selectedDoor ? 0.5 : 0.4,
          ease: "easeInOut",
        }}
      >
        <Calendar onSelectDoor={handleSelectDoor} selectedDoor={selectedDoor} />
      </motion.div>

      <AnimatePresence>
        {selectedDoor && doorPosition && (
          <DoorDetail
            key={selectedDoor}
            doorNumber={selectedDoor}
            startPosition={doorPosition}
            onClose={handleCloseDoor}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGuidelines && (
          <Guidelines onClose={() => setShowGuidelines(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
