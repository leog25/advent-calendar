import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from './components/Calendar';
import DoorDetail from './components/DoorDetail';
import './App.css';

export default function App() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [doorPosition, setDoorPosition] = useState(null);

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
      <motion.div
        className="calendar-container"
        animate={{
          opacity: selectedDoor ? 0 : 1,
          scale: selectedDoor ? 1.5 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
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
    </div>
  );
}
