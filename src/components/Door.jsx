import { useRef } from 'react';
import { motion } from 'framer-motion';
import { isDoorUnlocked } from '../data/messages';
import './Door.css';

const images = {
  1: 'tree.png',
  2: 'snowflake.png',
  3: 'bells.png',
  4: 'reindeer.png',
  5: 'snowman.png',
  6: 'sleigh.png',
  7: 'mistletoe.png',
  8: 'acorn.png',
  9: 'tree.png',
  10: 'snowflake.png',
  11: 'bells.png',
  12: 'reindeer.png',
};

export default function Door({ doorNumber, onSelect }) {
  const doorRef = useRef(null);
  const isUnlocked = isDoorUnlocked(doorNumber);
  const imagePath = `/door design/${images[doorNumber]}`;

  const handleClick = () => {
    if (doorRef.current) {
      const rect = doorRef.current.getBoundingClientRect();
      onSelect(doorNumber, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  };

  return (
    <motion.div
      ref={doorRef}
      className={`door ${isUnlocked ? 'unlocked' : 'locked'}`}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="door-content">
        <img
          src={imagePath}
          alt={`Door ${doorNumber}`}
          className="door-image"
        />
        <span className="door-number">{doorNumber}</span>
      </div>
    </motion.div>
  );
}
