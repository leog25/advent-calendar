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

export default function DoorDetail({ doorNumber, startPosition, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isUnlocked = isDoorUnlocked(doorNumber);
  const imagePath = `/door design/${images[doorNumber]}`;

  // Calculate center position for the zoomed door
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const finalSize = Math.min(window.innerWidth * 0.85, 400);

  const handleDoorClick = async (e) => {
    e.stopPropagation();
    if (isUnlocked) {
      if (!isOpen) {
        // Opening the door - fetch message from server
        setIsOpen(true);
        setIsLoading(true);
        const fetchedMessage = await getMessage(doorNumber);
        setMessage(fetchedMessage);
        setIsLoading(false);
      } else {
        // Closing the door
        setIsOpen(false);
      }
    } else {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 500);
    }
  };

  const shakeAnimation = showShake
    ? { x: [0, -10, 10, -10, 10, 0] }
    : {};

  return (
    <motion.div
      className="door-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="zoomed-door-wrapper"
        initial={{
          position: 'fixed',
          left: startPosition.x,
          top: startPosition.y,
          width: startPosition.width,
          height: startPosition.height,
        }}
        animate={{
          left: centerX - finalSize / 2,
          top: centerY - finalSize / 2,
          width: finalSize,
          height: finalSize,
          ...shakeAnimation,
        }}
        exit={{
          left: startPosition.x,
          top: startPosition.y,
          width: startPosition.width,
          height: startPosition.height,
          opacity: 0,
        }}
        transition={{
          duration: 0.55,
          ease: [0.25, 0.1, 0.25, 1],
          x: { duration: 0.4 }
        }}
        onClick={(e) => e.stopPropagation()}
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
              {isLoading ? (
                <p className="message-loading">Loading...</p>
              ) : message ? (
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
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        ← Back
      </motion.button>
    </motion.div>
  );
}
