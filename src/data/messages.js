// Door unlock dates (month is 0-indexed in JS)
// These are kept client-side for UI display ("Opens Dec 25")
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

// Client-side check for UI purposes (showing lock icon, etc.)
// Note: The actual security check happens server-side
export function isDoorUnlocked(doorNumber) {
  // Testing mode bypasses date check
  if (import.meta.env.VITE_TESTING_MODE === 'true') {
    return true;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const unlock = unlockDates[doorNumber];

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

// Fetch message from secure backend API
export async function getMessage(doorNumber) {
  try {
    const response = await fetch(`/api/message/${doorNumber}`);

    if (!response.ok) {
      if (response.status === 403) {
        // Door is locked
        return null;
      }
      throw new Error('Failed to fetch message');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching message:', error);
    return null;
  }
}

export function getUnlockDate(doorNumber) {
  const unlock = unlockDates[doorNumber];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[unlock.month]} ${unlock.day}`;
}
