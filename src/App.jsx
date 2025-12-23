import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Calendar from './components/Calendar';
import DoorDetail from './components/DoorDetail';
import './App.css';

export default function App() {
  const [selectedDoor, setSelectedDoor] = useState(null);

  const handleSelectDoor = (doorNumber) => {
    setSelectedDoor(doorNumber);
  };

  const handleCloseDoor = () => {
    setSelectedDoor(null);
  };

  return (
    <div className="app">
      <Calendar onSelectDoor={handleSelectDoor} />

      <AnimatePresence>
        {selectedDoor && (
          <DoorDetail
            key={selectedDoor}
            doorNumber={selectedDoor}
            onClose={handleCloseDoor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
