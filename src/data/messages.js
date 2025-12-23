// Obfuscated messages - Base64 encoded
// Placeholders: day1, day2, ... day12
// Replace with your custom messages (encode them using btoa())

const encodedMessages = {
  1: 'ZGF5MQ==',   // day1
  2: 'ZGF5Mg==',   // day2
  3: 'ZGF5Mw==',   // day3
  4: 'ZGF5NA==',   // day4
  5: 'ZGF5NQ==',   // day5
  6: 'ZGF5Ng==',   // day6
  7: 'ZGF5Nw==',   // day7
  8: 'ZGF5OA==',   // day8
  9: 'ZGF5OQ==',   // day9
  10: 'ZGF5MTA=',  // day10
  11: 'ZGF5MTE=',  // day11
  12: 'ZGF5MTI=',  // day12
};

// Door unlock dates (month is 0-indexed in JS)
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

export function isDoorUnlocked(doorNumber) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const unlock = unlockDates[doorNumber];

  // Handle year transition (Dec -> Jan)
  let unlockYear = currentYear;
  if (unlock.month === 0 && now.getMonth() === 11) {
    // If we're in December and door unlocks in January, use next year
    unlockYear = currentYear + 1;
  } else if (unlock.month === 11 && now.getMonth() === 0) {
    // If we're in January and door unlocks in December, use last year
    unlockYear = currentYear - 1;
  }

  const unlockDate = new Date(unlockYear, unlock.month, unlock.day);
  return now >= unlockDate;
}

export function getMessage(doorNumber) {
  if (!isDoorUnlocked(doorNumber)) {
    return null;
  }

  try {
    return atob(encodedMessages[doorNumber]);
  } catch {
    return null;
  }
}

export function getUnlockDate(doorNumber) {
  const unlock = unlockDates[doorNumber];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[unlock.month]} ${unlock.day}`;
}
