export function generateRandomColorString() {
    const allowedChars = '0123456789ABCDEF';
    return '#' + new Array(6).fill(0).map(() => allowedChars[Math.floor(Math.random() * 16)]);
  }