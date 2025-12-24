import { useMemo } from 'react';
import './ChristmasLights.css';

const COLORS = ['red', 'green', 'blue', 'yellow', 'orange'];

export default function ChristmasLights() {
  const lights = useMemo(() => {
    const count = 25;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
    }));
  }, []);

  return (
    <div className="christmas-lights">
      <div className="lights-wire" />
      <div className="lights-container">
        {lights.map((light) => (
          <div
            key={light.id}
            className={`light-bulb ${light.color}`}
          />
        ))}
      </div>
    </div>
  );
}
