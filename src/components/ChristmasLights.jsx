import { useMemo } from 'react';
import './ChristmasLights.css';

const COLORS = ['red', 'green', 'blue', 'yellow', 'orange'];

export default function ChristmasLights() {
  const strands = useMemo(() => {
    // Create multiple hanging strands across the page
    const strandCount = 5;
    const lightsPerStrand = 7;

    return Array.from({ length: strandCount }, (_, strandIndex) => ({
      id: strandIndex,
      lights: Array.from({ length: lightsPerStrand }, (_, lightIndex) => ({
        id: lightIndex,
        color: COLORS[(strandIndex + lightIndex) % COLORS.length],
      })),
    }));
  }, []);

  return (
    <div className="christmas-lights">
      <svg className="lights-wire-svg" viewBox="0 0 100 8" preserveAspectRatio="none">
        {strands.map((strand, i) => {
          const startX = i * 20;
          const endX = (i + 1) * 20;
          const midX = (startX + endX) / 2;
          return (
            <path
              key={strand.id}
              d={`M ${startX} 0 Q ${midX} 7 ${endX} 0`}
              className="wire-path"
            />
          );
        })}
      </svg>

      <div className="strands-container">
        {strands.map((strand) => (
          <div key={strand.id} className="strand">
            {strand.lights.map((light, lightIndex) => (
              <div
                key={light.id}
                className={`light-bulb ${light.color}`}
                style={{
                  '--light-index': lightIndex,
                  '--total-lights': strand.lights.length,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
