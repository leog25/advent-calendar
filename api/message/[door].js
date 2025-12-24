// Vercel serverless function for secure message delivery
// Messages are stored in environment variables (MESSAGE_1, MESSAGE_2, etc.)

const unlockDates = {
  1: { month: 11, day: 25 },   // Dec 25
  2: { month: 11, day: 26 },   // Dec 26
  3: { month: 11, day: 27 },   // Dec 27
  4: { month: 11, day: 28 },   // Dec 28
  5: { month: 11, day: 29 },   // Dec 29
  6: { month: 11, day: 30 },   // Dec 30
  7: { month: 11, day: 31 },   // Dec 31
  8: { month: 0, day: 1 },     // Jan 1
  9: { month: 0, day: 2 },     // Jan 2
  10: { month: 0, day: 3 },    // Jan 3
  11: { month: 0, day: 4 },    // Jan 4
  12: { month: 0, day: 5 },    // Jan 5
};

function isDoorUnlocked(doorNumber) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const unlock = unlockDates[doorNumber];

  if (!unlock) return false;

  // Handle year transition (Dec -> Jan)
  let unlockYear = currentYear;
  if (unlock.month === 0 && now.getMonth() === 11) {
    unlockYear = currentYear + 1;
  } else if (unlock.month === 11 && now.getMonth() === 0) {
    unlockYear = currentYear - 1;
  }

  const unlockDate = new Date(unlockYear, unlock.month, unlock.day);
  return now >= unlockDate;
}

export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { door } = req.query;
  const doorNumber = parseInt(door, 10);

  // Validate door number
  if (isNaN(doorNumber) || doorNumber < 1 || doorNumber > 12) {
    return res.status(400).json({ error: 'Invalid door number' });
  }

  // Check if door is unlocked (server-side validation)
  // Skip check if TESTING_MODE is enabled
  const testingMode = process.env.TESTING_MODE === 'true';
  if (!testingMode && !isDoorUnlocked(doorNumber)) {
    return res.status(403).json({
      error: 'Door is locked',
      unlockDate: unlockDates[doorNumber]
    });
  }

  // Get message from environment variable
  const message = process.env[`MESSAGE_${doorNumber}`];

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  return res.status(200).json({ message });
}
