import { useState } from 'react';
import { motion } from 'framer-motion';
import { getMessage, isDoorUnlocked, getUnlockDate } from '../data/messages';
import './DoorDetail.css';

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

export default function DoorDetail({ doorNumber, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const isUnlocked = isDoorUnlocked(doorNumber);
  const message = getMessage(doorNumber);
  const imagePath = `/door design/${images[doorNumber]}`;

  const handleDoorClick = () => {
    if (isUnlocked) {
      setIsOpen(!isOpen);
    } else {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 500);
    }
  };

  const shakeAnimation = showShake
    ? { x: [0, -10, 10, -10, 10, 0] }
    : {};

  return (
    <div className="door-detail-overlay" onClick={onClose}>
      <motion.div
        className="door-detail-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="door-detail-card"
          layoutId={`door-${doorNumber}`}
          animate={shakeAnimation}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`door-flipper ${isOpen ? 'flipped' : ''}`}
            onClick={handleDoorClick}
          >
            {/* Front of door */}
            <div className="door-face door-front">
              <div className="door-content">
                <img
                  src={imagePath}
                  alt={`Door ${doorNumber}`}
                  className="door-image"
                />
                <span className="door-number">{doorNumber}</span>
              </div>
              {!isUnlocked && (
                <div className="locked-indicator">
                  <span className="lock-icon">🔒</span>
                  <span className="unlock-date">Opens {getUnlockDate(doorNumber)}</span>
                </div>
              )}
              {isUnlocked && !isOpen && (
                <div className="tap-hint">Tap to open</div>
              )}
            </div>

            {/* Back of door (message) */}
            <div className="door-face door-back">
              <div className="message-content">
                {message ? (
                  <p className="message-text">{message}</p>
                ) : (
                  <p className="message-locked">Not yet!</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          className="back-button"
          onClick={onClose}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ← Back to Calendar
        </motion.button>
      </motion.div>
    </div>
  );
}
