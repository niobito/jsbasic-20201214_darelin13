/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  const lowerCase = str.toLowerCase();
  return lowerCase.includes('1xbet') || lowerCase.includes('xxx');
}
