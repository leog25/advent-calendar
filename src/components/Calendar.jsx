import Door from './Door';
import './Calendar.css';

export default function Calendar({ onSelectDoor }) {
  const doors = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="calendar-wrapper">
      <h1 className="calendar-title">Advent Calendar</h1>
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
